"use client";

import { ModuleCard } from "@/components/module-card";
import { modules } from "@/lib/data";
import { useProgress } from "@/lib/progress";

export function ModuleGrid({
  className = "grid gap-4 sm:grid-cols-2",
  showProgress = true,
}: {
  className?: string;
  showProgress?: boolean;
}) {
  const progress = useProgress();
  return (
    <div className={className}>
      {modules.map((m, i) => (
        <ModuleCard
          key={m.id}
          m={m}
          index={i}
          showProgress={showProgress}
          progress={progress.moduleProgress[m.id] ?? 0}
          done={progress.completedModules.includes(m.id)}
        />
      ))}
    </div>
  );
}
