"use client";

import Link from "next/link";
import { Link001 } from "@/components/ui/skiper-ui/skiper40";
import { Reveal } from "@/components/motion";

export function Footer() {
  return (
    <footer className="border-t border-line bg-card">
      <div className="container-edge py-16">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <Link
                href="/"
                className="font-display text-lg font-bold text-ink"
              >
                KopEdu<span className="text-primary">.</span>
              </Link>
              <p className="mt-3 max-w-[28ch] text-sm text-ink-2">
                Platform edukasi koperasi untuk generasi muda Indonesia. Dibangun
                oleh tim GotongDigital.
              </p>
            </div>

            <div>
              <h4 className="eyebrow mb-4">Navigasi</h4>
              <ul className="space-y-2 text-sm text-ink-2">
                <li>
                  <Link className="hover:text-ink" href="/#modul">
                    Modul Belajar
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-ink" href="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-ink" href="/dashboard/tanya">
                    KopBot AI Tutor
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-ink" href="/daftar">
                    Daftar Gratis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="eyebrow mb-4">Kontak</h4>
              <div className="flex flex-col items-start gap-2 text-sm text-ink-2">
                <Link001 href="mailto:halo@kopedu.id">halo@kopedu.id</Link001>
                <Link001 href="https://github.com">github.com/GotongDigital</Link001>
                <span className="font-mono-data text-xs">
                  Hackathon Kemenkop RI 2026 — Pilar 4
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-2 sm:flex-row sm:items-center">
          <span>
            &copy; {new Date().getFullYear()} KopEdu by GotongDigital. Semua hak
            dilindungi.
          </span>
          <span className="font-mono-data">
            Dibangun dengan Next.js · Groq LLM · Skiper UI
          </span>
        </div>
      </div>
    </footer>
  );
}
