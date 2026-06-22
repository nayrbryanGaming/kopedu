import Link from "next/link";
import { JourneyTrack } from "@/components/journey-track";
import { ModuleCard } from "@/components/module-card";
import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/motion";
import { modules, userStats, recentActivity } from "@/lib/data";

export const metadata = { title: "Dashboard — KopEdu" };

function today() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export default function DashboardPage() {
  const active = modules.find((m) => !m.done && m.progress > 0) ?? modules[2];

  return (
    <div className="bg-background">
      {/* Greeting */}
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

      <div className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        {/* Stats */}
        <Stagger className="grid grid-cols-3 overflow-hidden rounded-md border border-line bg-card">
          <Stat label="Total Poin" value={userStats.points} />
          <Stat
            label="Modul Selesai"
            value={userStats.moduleDone}
            suffix={` / ${userStats.totalModules}`}
            border
          />
          <Stat label="Streak Belajar" value={userStats.streak} suffix=" hari" border />
        </Stagger>

        {/* Journey */}
        <Reveal>
          <JourneyTrack activeId={active.id} />
        </Reveal>

        {/* Continue */}
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 rounded-md bg-primary p-6 text-primary-foreground sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-primary-foreground/70">
                Lanjutkan
              </p>
              <h2 className="mt-1 font-display text-xl font-bold">
                {active.title}
              </h2>
              <div className="mt-3 h-1 w-48 overflow-hidden rounded-[2px] bg-primary-foreground/25">
                <div
                  className="h-full rounded-[2px] bg-primary-foreground"
                  style={{ width: `${active.progress}%` }}
                />
              </div>
            </div>
            <Link
              href={`/dashboard/modul/${active.id}`}
              className="inline-flex h-11 items-center rounded-sm bg-card px-6 text-sm font-semibold text-primary transition-transform hover:-translate-y-0.5"
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
          <div className="grid gap-4 sm:grid-cols-2">
            {modules.map((m, i) => (
              <ModuleCard key={m.id} m={m} showProgress index={i} />
            ))}
          </div>
        </div>

        {/* Activity */}
        <div>
          <Reveal>
            <h2 className="mb-2 font-display text-xl font-bold text-ink">
              Aktivitas Terakhir
            </h2>
          </Reveal>
          <Stagger className="rounded-md border border-line bg-card px-5">
            {recentActivity.map((a) => (
              <StaggerItem key={a.text}>
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
      <div className="p-6">
        <div className="font-mono-data text-3xl font-medium leading-none text-ink">
          <CountUp to={value} suffix={suffix} />
        </div>
        <div className="mt-2 text-[13px] text-ink-2">{label}</div>
      </div>
    </StaggerItem>
  );
}
