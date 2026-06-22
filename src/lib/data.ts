export type Level = "Dasar" | "Menengah" | "Lanjutan";

export type ModuleItem = {
  id: number;
  tag: Level;
  title: string;
  desc: string;
  duration: string;
  quizCount: number;
  level: Level;
  done: boolean;
  progress: number;
  short: string;
};

export const modules: ModuleItem[] = [
  {
    id: 1,
    tag: "Dasar",
    title: "Apa Itu Koperasi?",
    desc: "Kenali definisi, sejarah, dan nilai-nilai dasar koperasi Indonesia.",
    duration: "15 menit",
    quizCount: 4,
    level: "Dasar",
    done: true,
    progress: 100,
    short: "Pengantar",
  },
  {
    id: 2,
    tag: "Dasar",
    title: "Jenis-Jenis Koperasi",
    desc: "Dari koperasi konsumen hingga produsen — pelajari perbedaannya.",
    duration: "18 menit",
    quizCount: 5,
    level: "Dasar",
    done: true,
    progress: 100,
    short: "Jenis",
  },
  {
    id: 3,
    tag: "Menengah",
    title: "Cara Bergabung & Hak Anggota",
    desc: "Langkah daftar, kewajiban, dan hak yang kamu dapat sebagai anggota.",
    duration: "20 menit",
    quizCount: 6,
    level: "Menengah",
    done: false,
    progress: 40,
    short: "Bergabung",
  },
  {
    id: 4,
    tag: "Menengah",
    title: "Simpanan & Pinjaman Koperasi",
    desc: "Bedanya simpanan pokok, wajib, sukarela, dan cara ajukan pinjaman.",
    duration: "22 menit",
    quizCount: 7,
    level: "Menengah",
    done: false,
    progress: 0,
    short: "Simpan Pinjam",
  },
  {
    id: 5,
    tag: "Menengah",
    title: "SHU — Sisa Hasil Usaha",
    desc: "Cara koperasi membagi keuntungan dan rumus menghitung SHU kamu.",
    duration: "16 menit",
    quizCount: 5,
    level: "Menengah",
    done: false,
    progress: 0,
    short: "SHU",
  },
  {
    id: 6,
    tag: "Lanjutan",
    title: "Rapat Anggota Tahunan (RAT)",
    desc: "Demokrasi ekonomi — suaramu menentukan arah koperasi.",
    duration: "25 menit",
    quizCount: 6,
    level: "Lanjutan",
    done: false,
    progress: 0,
    short: "RAT",
  },
  {
    id: 7,
    tag: "Lanjutan",
    title: "Koperasi Digital & Fintech",
    desc: "Bagaimana teknologi mengubah cara koperasi bekerja hari ini.",
    duration: "20 menit",
    quizCount: 5,
    level: "Lanjutan",
    done: false,
    progress: 0,
    short: "Digital",
  },
  {
    id: 8,
    tag: "Lanjutan",
    title: "Membangun Koperasi di Desamu",
    desc: "Panduan praktis mendirikan koperasi dari nol di komunitas lokal.",
    duration: "30 menit",
    quizCount: 8,
    level: "Lanjutan",
    done: false,
    progress: 0,
    short: "Membangun",
  },
];

export const userStats = {
  name: "Marvel",
  points: 340,
  moduleDone: 2,
  streak: 5,
  totalModules: modules.length,
};

export type Activity = { text: string; time: string };

export const recentActivity: Activity[] = [
  { text: "Menyelesaikan Kuis Modul 2 — Jenis-Jenis Koperasi", time: "2 jam lalu" },
  { text: "Bertanya ke KopBot tentang perhitungan SHU", time: "Kemarin" },
  { text: "Menyelesaikan Modul 1 — Apa Itu Koperasi?", time: "2 hari lalu" },
];

export const chatSuggestions = [
  "Apa itu SHU?",
  "Cara daftar koperasi?",
  "Bedanya simpanan & pinjaman?",
];

/* Lesson content — used in the learning page */
export type QuizOption = { id: string; text: string };
export type Quiz = {
  question: string;
  options: QuizOption[];
  correct: string;
  explanation: string;
};
export type LessonSection = {
  heading: string;
  body: string[];
  highlight?: { term: string; def: string };
  bigNumber?: { value: string; label: string };
};
export type Lesson = {
  moduleId: number;
  title: string;
  sections: LessonSection[];
  quizzes: Quiz[];
};

export const lessons: Record<number, Lesson> = {
  3: {
    moduleId: 3,
    title: "Cara Bergabung & Hak Anggota",
    sections: [
      {
        heading: "Langkah Menjadi Anggota",
        body: [
          "Bergabung dengan koperasi jauh lebih sederhana daripada yang dibayangkan kebanyakan orang. Pada dasarnya kamu hanya perlu memenuhi syarat keanggotaan, membayar simpanan pokok, dan menyetujui anggaran dasar koperasi tersebut.",
          "Setelah resmi terdaftar, kamu bukan sekadar nasabah. Kamu adalah pemilik. Inilah perbedaan paling mendasar antara koperasi dan perusahaan biasa: anggota adalah pemilik sekaligus pengguna jasa.",
        ],
        highlight: {
          term: "Simpanan Pokok",
          def: "Sejumlah uang yang dibayarkan satu kali saat mendaftar sebagai tanda kepemilikan. Nilainya sama untuk setiap anggota dan tidak dapat ditarik selama menjadi anggota.",
        },
      },
      {
        heading: "Hak dan Kewajibanmu",
        body: [
          "Sebagai anggota, kamu punya hak suara dalam Rapat Anggota — dan suara setiap anggota bernilai sama, terlepas dari besar simpanannya. Satu anggota, satu suara. Prinsip inilah yang membuat koperasi disebut demokrasi ekonomi.",
          "Di sisi lain, kamu berkewajiban membayar simpanan wajib secara rutin dan berpartisipasi dalam kegiatan koperasi. Hak dan kewajiban berjalan beriringan.",
        ],
        bigNumber: {
          value: "1 : 1",
          label: "Satu anggota selalu setara satu suara, berapa pun simpanannya",
        },
      },
    ],
    quizzes: [
      {
        question:
          "Apa yang membedakan anggota koperasi dari nasabah bank biasa?",
        options: [
          { id: "a", text: "Anggota mendapat bunga lebih tinggi" },
          { id: "b", text: "Anggota adalah pemilik sekaligus pengguna jasa" },
          { id: "c", text: "Anggota tidak perlu membayar apa pun" },
          { id: "d", text: "Anggota hanya boleh menabung, tidak meminjam" },
        ],
        correct: "b",
        explanation:
          "Tepat. Dalam koperasi, anggota berperan ganda sebagai pemilik dan pengguna jasa — bukan sekadar pelanggan.",
      },
      {
        question: "Dalam Rapat Anggota, bagaimana nilai suara dihitung?",
        options: [
          { id: "a", text: "Sesuai besar simpanan" },
          { id: "b", text: "Sesuai lama keanggotaan" },
          { id: "c", text: "Satu anggota satu suara" },
          { id: "d", text: "Hanya pengurus yang punya suara" },
        ],
        correct: "c",
        explanation:
          "Benar. Prinsip 'satu anggota satu suara' adalah inti demokrasi ekonomi koperasi.",
      },
    ],
  },
};

export function getLesson(id: number): Lesson {
  return lessons[id] ?? lessons[3];
}
