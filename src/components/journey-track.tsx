"use client";

import * as React from "react";
import { motion, useInView } from "motion/react";
import { modules } from "@/lib/data";
import { useProgress, activeModuleId } from "@/lib/progress";

export function JourneyTrack() {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const progress = useProgress();

  const activeId = activeModuleId(progress);
  const activeIndex = modules.findIndex((m) => m.id === activeId);
  const fillIndex = activeIndex >= 0 ? activeIndex : 0;
  const fillPct = (fillIndex / (modules.length - 1)) * 100;

  return (
    <div ref={ref} className="rounded-md border border-line bg-card p-6 sm:p-8">
      <p className="eyebrow mb-8 text-ink-2">Perjalanan Belajarmu</p>

      <div className="relative flex items-start justify-between pb-2">
        <div className="absolute left-0 right-0 top-[10px] h-0.5 bg-line" />
        <motion.div
          className="absolute left-0 top-[10px] h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={inView ? { width: `${fillPct}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />

        {modules.map((m, i) => {
          const isDone = progress.completedModules.includes(m.id);
          const isActive = m.id === activeId;
          return (
            <div
              key={m.id}
              className="relative z-10 flex flex-1 flex-col items-center gap-2"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.3 + i * 0.08,
                }}
                className={`h-5 w-5 rounded-full border-2 transition-colors ${
                  isActive
                    ? "border-primary bg-primary ring-4 ring-accent"
                    : isDone
                      ? "border-primary bg-primary"
                      : "border-line bg-card"
                }`}
              />
              <span className="max-w-[64px] text-center text-[10px] leading-tight text-ink-2">
                {m.short}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
