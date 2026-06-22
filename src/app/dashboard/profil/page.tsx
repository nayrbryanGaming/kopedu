import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/motion";
import { userStats, recentActivity, modules } from "@/lib/data";

export const metadata = { title: "Profil — KopEdu" };

const badges = [
  { name: "Langkah Pertama", desc: "Menyelesaikan modul pertama", earned: true },
  { name: "Pembelajar Tekun", desc: "Streak 5 hari berturut", earned: true },
  { name: "Ahli Dasar", desc: "Tamatkan semua modul Dasar", earned: true },
  { name: "Penanya Kritis", desc: "Bertanya 10 kali ke KopBot", earned: false },
  { name: "Master SHU", desc: "Lulus modul SHU dengan nilai penuh", earned: false },
  { name: "Penggerak Desa", desc: "Selesaikan seluruh kurikulum", earned: false },
];

export default function ProfilPage() {
  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      {/* Header */}
      <Reveal y={12}>
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
            {userStats.name.charAt(0)}
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold text-ink">
              {userStats.name}
            </h1>
            <p className="text-sm text-ink-2">
              Anggota sejak Juni 2026 · Level Menengah
            </p>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <Stagger className="mt-8 grid grid-cols-2 overflow-hidden rounded-md border border-line bg-card sm:grid-cols-4">
        <Cell label="Total Poin" value={userStats.points} />
        <Cell label="Modul Selesai" value={userStats.moduleDone} border />
        <Cell label="Streak" value={userStats.streak} suffix=" hr" border />
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
                Selesaikan {userStats.totalModules - userStats.moduleDone} modul
                lagi untuk membuka sertifikat penuh.
              </p>
            </div>
            <button
              disabled
              className="inline-flex h-10 cursor-not-allowed items-center rounded-sm border border-line px-5 text-sm font-medium text-ink-2"
            >
              Terkunci
            </button>
          </div>
          <div className="h-1.5 w-full bg-line">
            <div
              className="h-full bg-primary"
              style={{
                width: `${(userStats.moduleDone / userStats.totalModules) * 100}%`,
              }}
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
          {badges.map((b) => (
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
                    b.earned
                      ? "bg-accent text-primary"
                      : "bg-muted text-ink-2"
                  }`}
                >
                  {String(badges.indexOf(b) + 1).padStart(2, "0")}
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
        <Stagger className="rounded-md border border-line bg-card px-5">
          {[...recentActivity, ...modules.filter((m) => m.done).map((m) => ({
            text: `Menamatkan modul ${m.title}`,
            time: "Minggu ini",
          }))].map((a, i) => (
            <StaggerItem key={i}>
              <div className="flex items-center gap-3 border-b border-line py-4 text-sm last:border-b-0">
                <span className="h-2 w-2 shrink-0 rounded-full border-2 border-primary bg-accent" />
                <span className="text-ink">{a.text}</span>
                <span className="ml-auto whitespace-nowrap text-xs text-ink-2">
                  {a.time}
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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
      <div className="p-5">
        <div className="font-mono-data text-2xl font-medium text-ink">
          <CountUp to={value} suffix={suffix} />
        </div>
        <div className="mt-1 text-xs text-ink-2">{label}</div>
      </div>
    </StaggerItem>
  );
}
