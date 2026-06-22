import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KopEdu — Pahami Koperasi. Kuasai Ekonomimu.",
  description:
    "Platform edukasi koperasi interaktif berbasis gamifikasi dan AI tutor untuk pelajar dan mahasiswa Indonesia. Gratis, terstruktur, dan bersertifikat.",
  keywords: [
    "koperasi",
    "edukasi koperasi",
    "literasi keuangan",
    "KopEdu",
    "GotongDigital",
  ],
  authors: [{ name: "GotongDigital" }],
  openGraph: {
    title: "KopEdu — Pahami Koperasi. Kuasai Ekonomimu.",
    description:
      "Belajar koperasi dengan modul terstruktur, KopBot AI tutor, dan sistem poin. Gratis untuk semua pelajar Indonesia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
