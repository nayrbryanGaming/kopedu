"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { getLesson, modules, type Quiz } from "@/lib/data";
import {
  useProgress,
  solveQuiz,
  setModuleProgress,
  completeModule,
  POINTS_PER_QUIZ,
} from "@/lib/progress";

export function LessonView({ id }: { id: number }) {
  const lesson = getLesson(id);
  const moduleMeta = modules.find((m) => m.id === lesson.moduleId);
  const totalParts = lesson.sections.length + lesson.quizzes.length;
  const store = useProgress();

  const solvedList = store.quizSolved[lesson.moduleId] ?? [];
  const solvedCount = solvedList.length;
  const points = solvedCount * POINTS_PER_QUIZ;

  const completedParts = lesson.sections.length + solvedCount;
  const progress = Math.min(
    100,
    Math.round((completedParts / totalParts) * 100),
  );

  // Persist incremental module progress as quizzes are solved.
  React.useEffect(() => {
    if (!store.completedModules.includes(lesson.moduleId)) {
      setModuleProgress(lesson.moduleId, progress);
    }
  }, [progress, lesson.moduleId, store.completedModules]);

  const allSolved = solvedCount >= lesson.quizzes.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-6 py-3.5">
          <Link
            href="/dashboard/modul"
            className="text-sm text-ink-2 transition-colors hover:text-ink"
          >
            &larr; Kembali
          </Link>
          <span className="truncate text-sm font-medium text-ink">
            {lesson.title}
          </span>
          <span className="whitespace-nowrap font-mono-data text-[13px] text-ink-2">
            {progress}%
          </span>
        </div>
        <div className="h-0.5 w-full bg-line">
          <motion.div
            className="h-full bg-primary"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-3">{moduleMeta?.tag ?? "Modul"}</p>
          <h1 className="font-display text-4xl font-bold leading-tight text-ink">
            {lesson.title}
          </h1>
        </motion.div>

        {lesson.sections.map((s, i) => (
          <motion.section
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12"
          >
            <h2 className="font-display text-2xl font-bold text-ink">
              {s.heading}
            </h2>
            {s.body.map((p, j) => (
              <p key={j} className="mt-4 leading-[1.85] text-ink-2">
                {p}
              </p>
            ))}

            {s.highlight && (
              <div className="my-6 rounded-r-sm border-l-[3px] border-primary bg-accent px-5 py-4">
                <strong className="block text-xs font-semibold uppercase tracking-wider text-primary">
                  {s.highlight.term}
                </strong>
                <p className="mt-1.5 text-sm leading-relaxed text-ink">
                  {s.highlight.def}
                </p>
              </div>
            )}

            {s.bigNumber && (
              <div className="my-8 text-center">
                <div className="font-mono-data text-5xl font-medium text-primary">
                  {s.bigNumber.value}
                </div>
                <p className="mx-auto mt-2 max-w-[36ch] text-sm text-ink-2">
                  {s.bigNumber.label}
                </p>
              </div>
            )}

            {/* Inline quiz after each section */}
            {lesson.quizzes[i] && (
              <QuizBlock
                quiz={lesson.quizzes[i]}
                index={i}
                solved={solvedList.includes(i)}
                onSolve={() => solveQuiz(lesson.moduleId, i)}
              />
            )}
          </motion.section>
        ))}

        {/* Footer nav */}
        <div className="mt-16 flex items-center justify-between border-t border-line pt-6">
          <Link
            href="/dashboard/modul"
            className="inline-flex h-10 items-center rounded-sm border border-line px-4 text-sm font-medium text-ink-2 transition-colors hover:border-primary hover:text-primary"
          >
            &larr; Sebelumnya
          </Link>
          <span className="font-mono-data text-sm text-primary">
            +{points} poin
          </span>
          <Link
            href="/dashboard"
            onClick={() => completeModule(lesson.moduleId)}
            aria-disabled={!allSolved}
            className={`inline-flex h-10 items-center rounded-sm px-4 text-sm font-semibold transition-colors ${
              allSolved
                ? "bg-primary text-primary-foreground hover:bg-[#1e4d38]"
                : "pointer-events-none bg-muted text-ink-2"
            }`}
          >
            {allSolved ? "Selesaikan Modul" : "Jawab semua kuis"} &rarr;
          </Link>
        </div>
      </article>
    </div>
  );
}

function QuizBlock({
  quiz,
  index,
  solved,
  onSolve,
}: {
  quiz: Quiz;
  index: number;
  solved: boolean;
  onSolve: () => void;
}) {
  const [selected, setSelected] = React.useState<string | null>(
    solved ? quiz.correct : null,
  );
  const [checked, setChecked] = React.useState(solved);
  const isCorrect = checked && selected === quiz.correct;

  function check() {
    if (!selected) return;
    setChecked(true);
    if (selected === quiz.correct) onSolve();
  }

  return (
    <div className="my-10 rounded-md border border-line bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-2">
        Latihan {index + 1}
      </p>
      <p className="mt-2 font-semibold text-ink">{quiz.question}</p>

      <div className="mt-4 space-y-2">
        {quiz.options.map((opt) => {
          const state =
            checked && opt.id === quiz.correct
              ? "correct"
              : checked && opt.id === selected && selected !== quiz.correct
                ? "wrong"
                : selected === opt.id
                  ? "selected"
                  : "idle";
          return (
            <button
              key={opt.id}
              type="button"
              disabled={checked}
              onClick={() => setSelected(opt.id)}
              className={`flex w-full items-center gap-3 rounded-sm border px-4 py-3 text-left text-sm transition-colors ${
                state === "correct"
                  ? "border-primary bg-accent"
                  : state === "wrong"
                    ? "border-destructive bg-[#fdecea]"
                    : state === "selected"
                      ? "border-primary bg-accent"
                      : "border-line hover:border-primary hover:bg-accent/40"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  state === "correct" || state === "selected"
                    ? "border-primary"
                    : state === "wrong"
                      ? "border-destructive"
                      : "border-line"
                }`}
              >
                {(state === "correct" || state === "selected") && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                )}
              </span>
              <span className="text-ink">{opt.text}</span>
            </button>
          );
        })}
      </div>

      {!checked ? (
        <button
          type="button"
          onClick={check}
          disabled={!selected}
          className="mt-4 inline-flex h-10 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#1e4d38] disabled:opacity-50"
        >
          Cek Jawaban
        </button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className={`mt-4 rounded-sm px-4 py-3 text-sm ${
              isCorrect
                ? "bg-accent text-[#1a5c3a]"
                : "bg-[#fdecea] text-[#7f1d1d]"
            }`}
          >
            <strong>{isCorrect ? "Benar. " : "Belum tepat. "}</strong>
            {quiz.explanation}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
