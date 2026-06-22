"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ModuleItem } from "@/lib/data";

export function ModuleCard({
  m,
  showProgress = false,
  index = 0,
}: {
  m: ModuleItem;
  showProgress?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group flex h-full flex-col gap-3 rounded-sm border border-line bg-card p-6 transition-shadow hover:shadow-[0_8px_30px_rgba(28,28,26,0.07)]"
    >
      <div className="flex items-center justify-between">
        <span className="inline-block rounded-[2px] bg-accent px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          {m.tag}
        </span>
        {m.done && (
          <span className="rounded-[2px] bg-accent px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            Selesai
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold leading-snug text-ink">{m.title}</h3>
      <p className="text-sm leading-relaxed text-ink-2">{m.desc}</p>

      {showProgress && (
        <div className="mt-1">
          <div className="h-1 overflow-hidden rounded-[2px] bg-line">
            <motion.div
              className="h-full rounded-[2px] bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: `${m.progress}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            />
          </div>
          <span className="mt-1.5 block font-mono-data text-[11px] text-ink-2">
            {m.progress}% selesai
          </span>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-line pt-3 text-[13px] text-ink-2">
        <span className="font-mono-data">
          {m.duration} · {m.quizCount} latihan
        </span>
        <Link
          href={`/dashboard/modul/${m.id}`}
          className="font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100"
        >
          Buka &rarr;
        </Link>
      </div>
    </motion.div>
  );
}
