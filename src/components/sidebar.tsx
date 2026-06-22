"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { userStats } from "@/lib/data";

const NAV = [
  { label: "Beranda", href: "/dashboard" },
  { label: "Modul Saya", href: "/dashboard/modul" },
  { label: "KopBot", href: "/dashboard/tanya" },
  { label: "Profil", href: "/dashboard/profil" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-card p-6 md:flex">
      <Link
        href="/"
        className="mb-10 block font-display text-lg font-bold text-ink"
      >
        KopEdu<span className="text-primary">.</span>
      </Link>

      <nav className="flex-1">
        <ul className="space-y-1">
          {NAV.map((n) => {
            const active =
              n.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={`relative flex items-center rounded-sm px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "font-semibold text-primary"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 -z-0 rounded-sm bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{n.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-6 border-t border-line pt-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {userStats.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <strong className="block truncate text-sm text-ink">
              {userStats.name}
            </strong>
            <Link href="/" className="text-xs text-ink-2 hover:text-ink">
              Keluar
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileTabbar() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-line bg-card md:hidden">
      {NAV.map((n) => {
        const active =
          n.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(n.href);
        return (
          <Link
            key={n.href}
            href={n.href}
            className={`flex-1 py-3 text-center text-xs ${
              active ? "font-semibold text-primary" : "text-ink-2"
            }`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}
