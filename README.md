# KopEdu

> Pahami Koperasi. Kuasai Ekonomimu.

Platform edukasi koperasi interaktif berbasis gamifikasi dan AI tutor untuk pelajar
dan mahasiswa Indonesia. Dibangun oleh tim **GotongDigital** untuk Hackathon Kemenkop
RI 2026 — Pilar 4: Literasi Gen-Z & Gen-Alpha dalam Berkoperasi.

## Fitur

- **Landing editorial** dengan hero 3D interaktif (React Three Fiber) dan animasi
  bertahap di seluruh halaman.
- **Dashboard** dengan signature "journey track" — visualisasi perjalanan belajar
  delapan modul.
- **Halaman modul** dengan materi dan kuis interaktif inline (feedback langsung).
- **KopBot** — AI tutor koperasi yang dialiri streaming melalui **Groq LLM**
  (`llama-3.3-70b-versatile`), dipanggil dari server-side route agar API key aman.
- **Profil** dengan poin, badge, dan progress sertifikat digital.

## Tech Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · shadcn/ui · Skiper UI (`@skiper-ui/skiper40`)
- motion (Framer Motion) untuk animasi · React Three Fiber + drei untuk 3D
- Groq SDK untuk KopBot

## Menjalankan Lokal

```bash
npm install
cp .env.example .env.local   # lalu isi GROQ_API_KEY
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Environment

| Variable       | Deskripsi                                             |
| -------------- | ----------------------------------------------------- |
| `GROQ_API_KEY` | API key Groq (server-side). Wajib untuk fitur KopBot. |

API key **tidak pernah** dikirim ke browser — seluruh panggilan LLM melewati
route `app/api/kopbot`.

## Struktur

```
src/
  app/
    page.tsx                  Landing
    daftar/ masuk/            Auth (UI)
    dashboard/                Beranda, modul, modul/[id], tanya (KopBot), profil
    api/kopbot/route.ts       Endpoint streaming Groq
  components/                 Navbar, footer, hero 3D, motion primitives, dll.
  lib/data.ts                 Data modul, statistik, materi & kuis
```

## Lisensi

Dibuat untuk keperluan hackathon. Komponen Skiper UI mengikuti lisensinya
masing-masing.
