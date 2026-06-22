"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Magnetic } from "@/components/motion";

const NAV = [
  { label: "Modul", href: "/#modul" },
  { label: "Tentang", href: "/#tentang" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-[150] w-full"
    >
      <div
        className={`w-full border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-background/85 backdrop-blur-md"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="container-edge flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-ink"
          >
            KopEdu<span className="text-primary">.</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="group relative text-sm text-ink-2 transition-colors hover:text-ink"
                >
                  {n.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-primary transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/masuk"
              className="text-sm font-medium text-ink-2 transition-colors hover:text-ink"
            >
              Masuk
            </Link>
            <Magnetic>
              <Link
                href="/daftar"
                className="inline-flex h-10 items-center rounded-sm bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#1e4d38]"
              >
                Mulai Belajar
              </Link>
            </Magnetic>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Menu"
          >
            <div className="space-y-1.5">
              <motion.span
                animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-ink"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-6 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-ink"
              />
            </div>
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-background md:hidden"
          >
            <ul className="container-edge flex flex-col gap-1 py-4">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-ink-2"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li className="mt-2 flex gap-3">
                <Link
                  href="/masuk"
                  className="flex-1 rounded-sm border border-primary py-2 text-center text-sm font-semibold text-primary"
                >
                  Masuk
                </Link>
                <Link
                  href="/daftar"
                  className="flex-1 rounded-sm bg-primary py-2 text-center text-sm font-semibold text-primary-foreground"
                >
                  Daftar
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
