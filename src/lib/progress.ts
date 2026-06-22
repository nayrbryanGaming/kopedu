"use client";

/**
 * KopEdu progress engine.
 *
 * Persists a learner's real progress on-device (localStorage) so points, streak,
 * completed modules, quiz results and activity actually track across sessions —
 * works offline and on limited connections.
 *
 * When a cloud database is connected (Neon/Postgres via Vercel), `syncToCloud`
 * mirrors the same shape to /api/progress. The local store always stays the
 * source of truth for instant UX; the cloud copy is additive.
 */

import * as React from "react";
import { modules } from "@/lib/data";

const STORAGE_KEY = "kopedu:progress:v2";
const POINTS_PER_QUIZ = 20;
const POINTS_PER_MODULE = 60;

export type ProgressState = {
  points: number;
  completedModules: number[];
  moduleProgress: Record<number, number>;
  quizSolved: Record<number, number[]>;
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  activity: { text: string; ts: number }[];
};

function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function seed(): ProgressState {
  return {
    points: 340,
    completedModules: [1, 2],
    moduleProgress: { 1: 100, 2: 100, 3: 40 },
    quizSolved: {},
    streak: 5,
    lastActiveDate: todayKey(),
    activity: [
      { text: "Menyelesaikan Kuis Modul 2 — Jenis-Jenis Koperasi", ts: Date.now() - 7200_000 },
      { text: "Bertanya ke KopBot tentang perhitungan SHU", ts: Date.now() - 86400_000 },
      { text: "Menyelesaikan Modul 1 — Apa Itu Koperasi?", ts: Date.now() - 172800_000 },
    ],
  };
}

/* ---------------- store (external, SSR-safe) ---------------- */

let state: ProgressState = seed();
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage may be unavailable; in-memory still works for the session */
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ProgressState;
      state = { ...seed(), ...parsed };
    }
  } catch {
    /* fall back to seed */
  }
  rollStreak();
  emit();
}

function rollStreak() {
  const today = todayKey();
  if (state.lastActiveDate === today) return;
  const yesterday = todayKey(new Date(Date.now() - 86400_000));
  state.streak = state.lastActiveDate === yesterday ? state.streak + 1 : 1;
  state.lastActiveDate = today;
  persist();
}

function setState(next: Partial<ProgressState>) {
  state = { ...state, ...next };
  persist();
  emit();
  void syncToCloud();
}

/* ---------------- public actions ---------------- */

export function recordActivity(text: string) {
  setState({
    activity: [{ text, ts: Date.now() }, ...state.activity].slice(0, 12),
  });
}

export function solveQuiz(lessonId: number, quizIndex: number) {
  const solved = state.quizSolved[lessonId] ?? [];
  if (solved.includes(quizIndex)) return;
  setState({
    quizSolved: { ...state.quizSolved, [lessonId]: [...solved, quizIndex] },
    points: state.points + POINTS_PER_QUIZ,
  });
}

export function setModuleProgress(moduleId: number, pct: number) {
  const current = state.moduleProgress[moduleId] ?? 0;
  if (pct <= current) return;
  setState({
    moduleProgress: { ...state.moduleProgress, [moduleId]: pct },
  });
}

export function completeModule(moduleId: number) {
  if (state.completedModules.includes(moduleId)) {
    setModuleProgress(moduleId, 100);
    return;
  }
  const mod = modules.find((m) => m.id === moduleId);
  setState({
    completedModules: [...state.completedModules, moduleId],
    moduleProgress: { ...state.moduleProgress, [moduleId]: 100 },
    points: state.points + POINTS_PER_MODULE,
    activity: [
      { text: `Menyelesaikan Modul ${moduleId}${mod ? ` — ${mod.title}` : ""}`, ts: Date.now() },
      ...state.activity,
    ].slice(0, 12),
  });
}

export function resetProgress() {
  state = { ...seed(), activity: [], points: 0, completedModules: [], moduleProgress: {}, streak: 1 };
  persist();
  emit();
}

/* ---------------- cloud sync (optional, no-op without DB) ---------------- */

let syncTimer: ReturnType<typeof setTimeout> | null = null;
async function syncToCloud() {
  if (typeof window === "undefined") return;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(async () => {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
        keepalive: true,
      });
    } catch {
      /* offline or DB not connected — local store remains source of truth */
    }
  }, 800);
}

/* ---------------- React binding ---------------- */

function subscribe(cb: () => void) {
  if (!hydrated) hydrate();
  listeners.add(cb);
  return () => listeners.delete(cb);
}
function getSnapshot() {
  return state;
}
function getServerSnapshot() {
  return state;
}

export function useProgress() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/* ---------------- derived selectors ---------------- */

export function moduleDoneCount(s: ProgressState) {
  return s.completedModules.length;
}
export function activeModuleId(s: ProgressState): number {
  const inProgress = modules.find(
    (m) => !s.completedModules.includes(m.id) && (s.moduleProgress[m.id] ?? 0) > 0,
  );
  if (inProgress) return inProgress.id;
  const firstUndone = modules.find((m) => !s.completedModules.includes(m.id));
  return firstUndone?.id ?? modules[modules.length - 1].id;
}
export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "Baru saja";
  if (min < 60) return `${min} menit lalu`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} jam lalu`;
  const day = Math.floor(hr / 24);
  if (day === 1) return "Kemarin";
  if (day < 7) return `${day} hari lalu`;
  return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short" }).format(ts);
}

export { POINTS_PER_QUIZ, POINTS_PER_MODULE };
