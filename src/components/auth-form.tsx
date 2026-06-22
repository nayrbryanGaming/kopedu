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

          {/* Google — coming soon (optional) */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="mt-8 flex h-11 w-full cursor-not-allowed items-center justify-center gap-3 rounded-sm border border-line bg-card text-sm font-medium text-ink-2"
          >
            <GoogleMark />
            <span>Lanjutkan dengan Google</span>
            <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-2">
              Segera
            </span>
          </button>

          <div className="my-5 flex items-center gap-3 text-xs text-ink-2">
            <span className="h-px flex-1 bg-line" />
            atau pakai email
            <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

function GoogleMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
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
