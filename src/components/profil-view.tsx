"use client";

import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/motion";
import { userStats, modules } from "@/lib/data";
import {
  useProgress,
  moduleDoneCount,
  relativeTime,
  resetProgress,
} from "@/lib/progress";

export function ProfilView() {
  const progress = useProgress();
  const done = moduleDoneCount(progress);

  const badges = [
    {
      name: "Langkah Pertama",
      desc: "Menyelesaikan modul pertama",
      earned: done >= 1,
    },
    {
      name: "Pembelajar Tekun",
      desc: "Streak belajar 5 hari",
      earned: progress.streak >= 5,
    },
    {
      name: "Ahli Dasar",
      desc: "Tamatkan semua modul Dasar",
      earned: [1, 2].every((id) => progress.completedModules.includes(id)),
    },
    {
      name: "Master SHU",
      desc: "Lulus modul Sisa Hasil Usaha",
      earned: progress.completedModules.includes(5),
    },
    {
      name: "Pegiat Menengah",
      desc: "Selesaikan 5 modul atau lebih",
      earned: done >= 5,
    },
    {
      name: "Penggerak Desa",
      desc: "Selesaikan seluruh kurikulum",
      earned: done >= modules.length,
    },
  ];
  const earned = badges.filter((b) => b.earned).length;

  const history = [
    ...progress.activity.map((a) => ({ text: a.text, time: relativeTime(a.ts) })),
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 pb-28 md:pb-10">
      <Reveal y={12}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {userStats.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-ink">
                {userStats.name}
              </h1>
              <p className="text-sm text-ink-2">
                Anggota sejak Juni 2026 · {done} dari {modules.length} modul
              </p>
            </div>
          </div>
          <button
            onClick={resetProgress}
            className="rounded-sm border border-line px-3 py-1.5 text-xs font-medium text-ink-2 transition-colors hover:border-primary hover:text-primary"
          >
            Atur ulang progres
          </button>
        </div>
      </Reveal>

      <Stagger className="mt-8 grid grid-cols-2 overflow-hidden rounded-md border border-line bg-card sm:grid-cols-4">
        <Cell label="Total Poin" value={progress.points} />
        <Cell label="Modul Selesai" value={done} border />
        <Cell label="Streak" value={progress.streak} suffix=" hr" border />
        <Cell label="Badge" value={earned} suffix={` / ${badges.length}`} border />
      </Stagger>

      {/* Certificate */}
      <Reveal>
        <div className="mt-6 overflow-hidden rounded-md border border-line bg-card">
          <div className="flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="eyebrow mb-1">Sertifikat Digital</p>
              <h2 className="font-display text-xl font-bold text-ink">
                Literasi Dasar Koperasi
              </h2>
              <p className="mt-1 text-sm text-ink-2">
                {done >= modules.length
                  ? "Selamat! Sertifikat penuh telah terbuka."
                  : `Selesaikan ${modules.length - done} modul lagi untuk membuka sertifikat penuh.`}
              </p>
            </div>
            <button
              disabled={done < modules.length}
              className={`inline-flex h-10 items-center rounded-sm px-5 text-sm font-medium transition-colors ${
                done >= modules.length
                  ? "bg-primary text-primary-foreground hover:bg-[#1e4d38]"
                  : "cursor-not-allowed border border-line text-ink-2"
              }`}
            >
              {done >= modules.length ? "Unduh Sertifikat" : "Terkunci"}
            </button>
          </div>
          <div className="h-1.5 w-full bg-line">
            <div
              className="h-full bg-primary transition-[width] duration-700"
              style={{ width: `${(done / modules.length) * 100}%` }}
            />
          </div>
        </div>
      </Reveal>

      {/* Badges */}
      <div className="mt-10">
        <Reveal>
          <h2 className="mb-4 font-display text-xl font-bold text-ink">Badge</h2>
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((b, i) => (
            <StaggerItem key={b.name}>
              <div
                className={`rounded-md border p-5 transition-colors ${
                  b.earned
                    ? "border-line bg-card"
                    : "border-dashed border-line bg-transparent opacity-60"
                }`}
              >
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full font-mono-data text-sm ${
                    b.earned ? "bg-accent text-primary" : "bg-muted text-ink-2"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-sm font-semibold text-ink">{b.name}</h3>
                <p className="mt-1 text-xs text-ink-2">{b.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* History */}
      <div className="mt-10">
        <Reveal>
          <h2 className="mb-2 font-display text-xl font-bold text-ink">
            Riwayat Belajar
          </h2>
        </Reveal>
        <div className="rounded-md border border-line bg-card px-5">
          {history.length === 0 && (
            <p className="py-6 text-sm text-ink-2">
              Riwayat akan muncul saat kamu mulai belajar.
            </p>
          )}
          {history.map((a, i) => (
            <div
              key={i}
              className="flex items-center gap-3 border-b border-line py-4 text-sm last:border-b-0"
            >
              <span className="h-2 w-2 shrink-0 rounded-full border-2 border-primary bg-accent" />
              <span className="text-ink">{a.text}</span>
              <span className="ml-auto whitespace-nowrap text-xs text-ink-2">
                {a.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Cell({
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
      <div className="p-4 sm:p-5">
        <div className="font-mono-data text-2xl font-medium text-ink">
          <CountUp to={value} suffix={suffix} />
        </div>
        <div className="mt-1 text-xs text-ink-2">{label}</div>
      </div>
    </StaggerItem>
  );
}
