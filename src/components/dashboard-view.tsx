"use client";

import Link from "next/link";
import { JourneyTrack } from "@/components/journey-track";
import { ModuleGrid } from "@/components/module-grid";
import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/motion";
import { modules, userStats } from "@/lib/data";
import {
  useProgress,
  moduleDoneCount,
  activeModuleId,
  relativeTime,
} from "@/lib/progress";

function today() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function DashboardView() {
  const progress = useProgress();
  const activeId = activeModuleId(progress);
  const active = modules.find((m) => m.id === activeId) ?? modules[0];
  const activePct = progress.moduleProgress[active.id] ?? 0;
  const done = moduleDoneCount(progress);

  return (
    <div className="bg-background">
      <div className="border-b border-line bg-card">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <Reveal y={12}>
            <h1 className="font-display text-3xl font-bold text-ink">
              Selamat datang, {userStats.name}.
            </h1>
            <p className="mt-1 text-sm text-ink-2">{today()}</p>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 px-6 py-8 pb-28 md:pb-8">
        {/* Stats */}
        <Stagger className="grid grid-cols-3 overflow-hidden rounded-md border border-line bg-card">
          <Stat label="Total Poin" value={progress.points} />
          <Stat
            label="Modul Selesai"
            value={done}
            suffix={` / ${userStats.totalModules}`}
            border
          />
          <Stat label="Streak Belajar" value={progress.streak} suffix=" hari" border />
        </Stagger>

        <Reveal>
          <JourneyTrack />
        </Reveal>

        {/* Continue */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 rounded-md bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center">
            <div className="w-full sm:w-auto">
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">
                Lanjutkan
              </p>
              <h2 className="mt-1 font-display text-xl font-bold">
                {active.title}
              </h2>
              <div className="mt-3 h-1 w-full max-w-48 overflow-hidden rounded-[2px] bg-primary-foreground/25">
                <div
                  className="h-full rounded-[2px] bg-primary-foreground transition-[width] duration-500"
                  style={{ width: `${Math.max(activePct, 4)}%` }}
                />
              </div>
            </div>
            <Link
              href={`/dashboard/modul/${active.id}`}
              className="inline-flex h-11 w-full items-center justify-center rounded-sm bg-card px-6 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5 sm:w-auto"
            >
              Lanjutkan Modul
            </Link>
          </div>
        </Reveal>

        {/* All modules */}
        <div>
          <Reveal>
            <h2 className="mb-4 font-display text-xl font-bold text-ink">
              Semua Modul
            </h2>
          </Reveal>
          <ModuleGrid />
        </div>

        {/* Activity */}
        <div>
          <Reveal>
            <h2 className="mb-2 font-display text-xl font-bold text-ink">
              Aktivitas Terakhir
            </h2>
          </Reveal>
          <div className="rounded-md border border-line bg-card px-5">
            {progress.activity.length === 0 && (
              <p className="py-6 text-sm text-ink-2">
                Belum ada aktivitas. Mulai satu modul untuk mengisinya.
              </p>
            )}
            {progress.activity.slice(0, 5).map((a, i) => (
              <div
                key={i}
                className="flex items-center gap-3 border-b border-line py-4 text-sm last:border-b-0"
              >
                <span className="h-2 w-2 shrink-0 rounded-full border-2 border-primary bg-accent" />
                <span className="text-ink">{a.text}</span>
                <span className="ml-auto whitespace-nowrap text-xs text-ink-2">
                  {relativeTime(a.ts)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  suffix = "",
  border = false,
}: {
  label: string;
  value: number;
  suffix?: string;
  border?: boolean;
}) {
  return (
    <StaggerItem className={border ? "border-l border-line" : ""}>
      <div className="p-4 sm:p-6">
        <div className="font-mono-data text-2xl font-medium leading-none text-ink sm:text-3xl">
          <CountUp to={value} suffix={suffix} />
        </div>
        <div className="mt-2 text-[13px] text-ink-2">{label}</div>
      </div>
    </StaggerItem>
  );
}
