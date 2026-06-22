import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { ModuleCard } from "@/components/module-card";
import {
  Reveal,
  Stagger,
  StaggerItem,
  CountUp,
  ScrollProgress,
  Parallax,
} from "@/components/motion";
import { modules } from "@/lib/data";

const features = [
  {
    num: "01",
    title: "Modul Terstruktur",
    desc: "Dari dasar hingga lanjutan. Setiap modul dirancang 15–20 menit agar mudah diselesaikan di sela waktu.",
  },
  {
    num: "02",
    title: "KopBot AI Tutor",
    desc: "Tanya apa saja tentang koperasi. Dijawab dalam bahasa yang kamu mengerti, kapan pun kamu butuh.",
  },
  {
    num: "03",
    title: "Poin & Sertifikat",
    desc: "Selesaikan modul, kumpulkan poin, dan dapatkan sertifikat digital yang bisa dibagikan ke LinkedIn.",
  },
];

const testimonials = [
  {
    quote:
      "Aku kira koperasi itu kuno. Ternyata ini cara paling masuk akal buat ngatur ekonomi bareng-bareng. KopBot ngejelasinnya santai banget.",
    name: "Dinda A.",
    city: "Yogyakarta",
  },
  {
    quote:
      "Modulnya pendek tapi nempel. Aku akhirnya paham beda simpanan pokok sama wajib, dan langsung daftar koperasi kampus minggu ini.",
    name: "Rizki H.",
    city: "Makassar",
  },
];

const faqs = [
  {
    q: "Apakah KopEdu benar-benar gratis?",
    a: "Ya. Seluruh modul, kuis, dan KopBot dapat diakses tanpa biaya. KopEdu dibuat untuk meningkatkan literasi koperasi generasi muda.",
  },
  {
    q: "Apakah saya butuh latar belakang ekonomi?",
    a: "Tidak sama sekali. Materi dirancang untuk pemula. Kamu mulai dari pengertian paling dasar dan naik bertahap.",
  },
  {
    q: "Apa itu sertifikat digital?",
    a: "Setelah menyelesaikan rangkaian modul, kamu mendapat sertifikat yang bisa diunduh dan dibagikan sebagai bukti kompetensi.",
  },
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* PROBLEM */}
        <section id="tentang" className="bg-card py-20 md:py-28">
          <div className="container-edge grid gap-12 md:grid-cols-[1fr_auto] md:items-start">
            <div className="max-w-[58ch]">
              <Reveal>
                <p className="eyebrow mb-6">Kenapa ini penting</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-[1.35rem] leading-relaxed text-ink md:text-[1.6rem]">
                  Koperasi menyimpan model ekonomi yang adil dan kolektif, namun
                  bagi sebagian besar pelajar ia terasa abstrak dan ketinggalan
                  zaman. Tanpa pemahaman yang dekat dengan keseharian mereka,
                  generasi muda kehilangan satu alat paling demokratis untuk
                  membangun ekonomi bersama — sebelum sempat mencobanya.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <Parallax offset={30} className="md:pl-8 md:text-right">
                <div className="font-mono-data text-6xl font-medium text-primary md:text-7xl">
                  <CountUp to={78} suffix="%" />
                </div>
                <p className="mt-3 max-w-[20ch] text-sm text-ink-2 md:ml-auto">
                  pelajar SMA tidak tahu cara bergabung koperasi
                  <span className="mt-1 block text-xs">
                    (ilustrasi survei, BPS 2024)
                  </span>
                </p>
              </Parallax>
            </Reveal>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-20 md:py-28">
          <div className="container-edge">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                Cara KopEdu bekerja
              </h2>
            </Reveal>
            <Stagger className="mt-12 hairline">
              {features.map((f) => (
                <StaggerItem key={f.num}>
                  <div className="grid grid-cols-[64px_1fr] gap-6 border-b border-line py-8 md:grid-cols-[100px_1fr]">
                    <span className="font-mono-data text-sm text-ink-2">
                      {f.num}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">
                        {f.title}
                      </h3>
                      <p className="mt-2 max-w-[52ch] text-ink-2">{f.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* MODULE PREVIEW */}
        <section id="modul" className="bg-card py-20 md:py-28">
          <div className="container-edge">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow mb-3">Kurikulum</p>
                  <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                    Delapan modul, satu perjalanan
                  </h2>
                </div>
                <Link
                  href="/dashboard"
                  className="hidden whitespace-nowrap text-sm font-medium text-primary hover:underline sm:block"
                >
                  Lihat semua &rarr;
                </Link>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {modules.slice(0, 3).map((m, i) => (
                <ModuleCard key={m.id} m={m} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 md:py-28">
          <div className="container-edge grid gap-12 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.12}>
                <div>
                  <span className="font-display text-6xl leading-none text-accent">
                    &ldquo;
                  </span>
                  <p className="-mt-4 text-xl leading-relaxed text-ink">
                    {t.quote}
                  </p>
                  <p className="mt-5 text-sm text-ink-2">
                    <strong className="font-semibold text-ink">{t.name}</strong>{" "}
                    — {t.city}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-card py-20 md:py-28">
          <div className="container-edge grid gap-12 md:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
                Pertanyaan yang sering muncul
              </h2>
            </Reveal>
            <Stagger className="hairline">
              {faqs.map((f) => (
                <StaggerItem key={f.q}>
                  <div className="border-b border-line py-6">
                    <h3 className="text-lg font-semibold text-ink">{f.q}</h3>
                    <p className="mt-2 max-w-[58ch] text-ink-2">{f.a}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary py-24 text-primary-foreground">
          <div className="container-edge text-center">
            <Reveal>
              <h2 className="mx-auto max-w-[18ch] font-display text-4xl font-bold leading-tight md:text-5xl">
                Mulai pahami koperasi hari ini.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mx-auto mt-4 max-w-[42ch] text-base text-primary-foreground/80">
                Gratis selamanya untuk pelajar. Tidak perlu kartu kredit.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link
                href="/daftar"
                className="mt-8 inline-flex h-12 items-center rounded-sm bg-card px-8 text-[0.95rem] font-semibold text-primary transition-transform hover:-translate-y-0.5"
              >
                Daftar Sekarang — Gratis
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
