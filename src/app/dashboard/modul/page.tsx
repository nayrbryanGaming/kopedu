import { ModuleCard } from "@/components/module-card";
import { Reveal } from "@/components/motion";
import { modules } from "@/lib/data";

export const metadata = { title: "Modul Saya — KopEdu" };

export default function ModulPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <Reveal y={12}>
        <p className="eyebrow mb-2">Kurikulum lengkap</p>
        <h1 className="font-display text-3xl font-bold text-ink">Modul Saya</h1>
        <p className="mt-2 max-w-[52ch] text-sm text-ink-2">
          Delapan modul tersusun dari dasar hingga lanjutan. Selesaikan secara
          berurutan untuk hasil terbaik.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {modules.map((m, i) => (
          <ModuleCard key={m.id} m={m} showProgress index={i} />
        ))}
      </div>
    </div>
  );
}
