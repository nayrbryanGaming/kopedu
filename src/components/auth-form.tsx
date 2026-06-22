"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

type Mode = "daftar" | "masuk";

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const isRegister = mode === "daftar";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // MVP: no real auth — proceed to dashboard
    setTimeout(() => router.push("/dashboard"), 650);
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between bg-primary p-12 text-primary-foreground md:flex">
        <div className="paper-grain pointer-events-none absolute inset-0 opacity-20" />
        <Link href="/" className="relative font-display text-2xl font-bold">
          KopEdu<span className="opacity-60">.</span>
        </Link>
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-4xl font-bold leading-tight"
          >
            Ekonomi yang adil
            <br />
            dimulai dari paham.
          </motion.h2>
          <p className="mt-4 max-w-[36ch] text-primary-foreground/80">
            Bergabung dengan ribuan pelajar yang sedang belajar membangun ekonomi
            bersama lewat koperasi.
          </p>
        </div>
        <p className="relative font-mono-data text-xs text-primary-foreground/60">
          GotongDigital — Hackathon Kemenkop RI 2026
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          <Link
            href="/"
            className="mb-8 inline-block font-display text-xl font-bold text-ink md:hidden"
          >
            KopEdu<span className="text-primary">.</span>
          </Link>

          <h1 className="font-display text-3xl font-bold text-ink">
            {isRegister ? "Buat akun gratis" : "Selamat datang kembali"}
          </h1>
          <p className="mt-2 text-sm text-ink-2">
            {isRegister
              ? "Mulai perjalanan belajar koperasimu dalam satu menit."
              : "Masuk untuk melanjutkan belajar."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {isRegister && (
              <Field
                label="Nama lengkap"
                type="text"
                placeholder="Marvel Pratama"
                autoComplete="name"
              />
            )}
            <Field
              label="Email"
              type="email"
              placeholder="kamu@email.com"
              autoComplete="email"
            />
            <Field
              label="Kata sandi"
              type="password"
              placeholder="Minimal 8 karakter"
              autoComplete={isRegister ? "new-password" : "current-password"}
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-sm bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-[#1e4d38] disabled:opacity-70"
            >
              {loading
                ? "Memproses..."
                : isRegister
                  ? "Daftar Sekarang"
                  : "Masuk"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-2">
            {isRegister ? "Sudah punya akun? " : "Belum punya akun? "}
            <Link
              href={isRegister ? "/masuk" : "/daftar"}
              className="font-semibold text-primary hover:underline"
            >
              {isRegister ? "Masuk" : "Daftar gratis"}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        {...props}
        required
        className="h-11 w-full rounded-sm border border-line bg-background px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-2/60 focus:border-primary"
      />
    </label>
  );
}
