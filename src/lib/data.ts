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
  1: {
    moduleId: 1,
    title: "Apa Itu Koperasi?",
    sections: [
      {
        heading: "Definisi yang Sebenarnya",
        body: [
          "Koperasi sering dianggap sekadar toko atau tempat pinjam uang. Padahal koperasi adalah badan usaha yang dimiliki dan dikelola bersama oleh para anggotanya untuk memenuhi kebutuhan ekonomi mereka. Yang membuatnya unik: orang yang menggunakan jasanya adalah orang yang sama yang memilikinya.",
          "Menurut Undang-Undang No. 25 Tahun 1992, koperasi adalah badan usaha yang beranggotakan orang-seorang atau badan hukum koperasi dengan melandaskan kegiatannya pada prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasar atas asas kekeluargaan.",
        ],
        highlight: {
          term: "Asas Kekeluargaan",
          def: "Prinsip bahwa koperasi dijalankan dari, oleh, dan untuk anggota — keuntungan dan keputusan dibagi secara adil, bukan dikuasai segelintir pemodal.",
        },
      },
      {
        heading: "Kenapa Ini Penting untukmu",
        body: [
          "Di banyak desa Indonesia, koperasi adalah satu-satunya lembaga keuangan yang bisa diakses petani, nelayan, dan pedagang kecil. Tanpa koperasi, mereka terjebak pada rentenir dengan bunga mencekik.",
          "Memahami koperasi berarti memahami cara membangun ekonomi yang adil dari bawah — keterampilan yang justru makin relevan di era ketimpangan ekonomi saat ini.",
        ],
        bigNumber: {
          value: "1895",
          label: "Tahun koperasi pertama Indonesia berdiri di Purwokerto, dipelopori R. Aria Wiriaatmadja",
        },
      },
    ],
    quizzes: [
      {
        question: "Apa yang paling membedakan koperasi dari perusahaan biasa?",
        options: [
          { id: "a", text: "Koperasi tidak mencari keuntungan sama sekali" },
          { id: "b", text: "Pengguna jasa koperasi adalah pemiliknya sendiri" },
          { id: "c", text: "Koperasi hanya boleh dimiliki pemerintah" },
          { id: "d", text: "Koperasi tidak boleh menjual barang" },
        ],
        correct: "b",
        explanation:
          "Tepat. Di koperasi, anggota berperan ganda sebagai pemilik sekaligus pengguna jasa.",
      },
      {
        question: "Undang-undang mana yang mengatur perkoperasian di Indonesia?",
        options: [
          { id: "a", text: "UU No. 25 Tahun 1992" },
          { id: "b", text: "UU No. 11 Tahun 2008" },
          { id: "c", text: "UU No. 40 Tahun 2007" },
          { id: "d", text: "UU No. 13 Tahun 2003" },
        ],
        correct: "a",
        explanation:
          "Benar. UU No. 25/1992 tentang Perkoperasian adalah dasar hukum utamanya.",
      },
    ],
  },
  2: {
    moduleId: 2,
    title: "Jenis-Jenis Koperasi",
    sections: [
      {
        heading: "Dikelompokkan dari Kegiatannya",
        body: [
          "Koperasi tidak seragam. Berdasarkan jenis usahanya kita mengenal koperasi konsumen (menyediakan kebutuhan sehari-hari anggota), koperasi produsen (menampung dan memasarkan hasil produksi anggota), koperasi simpan pinjam (mengelola tabungan dan pinjaman), dan koperasi jasa (menyediakan layanan seperti transportasi atau asuransi).",
          "Banyak koperasi modern bersifat serba usaha — menggabungkan beberapa fungsi sekaligus, misalnya koperasi karyawan yang melayani simpan pinjam sekaligus toko.",
        ],
        highlight: {
          term: "Koperasi Simpan Pinjam (KSP)",
          def: "Koperasi yang fokus mengelola simpanan anggota dan menyalurkannya kembali sebagai pinjaman dengan jasa yang wajar — alternatif sehat dari rentenir.",
        },
      },
      {
        heading: "Dikelompokkan dari Keanggotaannya",
        body: [
          "Selain dari jenis usaha, koperasi juga dibedakan dari tingkatannya: koperasi primer (beranggotakan orang-perorangan, minimal 20 orang) dan koperasi sekunder (beranggotakan koperasi-koperasi lain, seperti pusat atau induk koperasi).",
          "Memahami pengelompokan ini membantumu memilih koperasi yang paling sesuai dengan kebutuhanmu — apakah sebagai pelajar, pekerja, atau pelaku usaha.",
        ],
        bigNumber: {
          value: "20",
          label: "Jumlah minimal anggota untuk mendirikan satu koperasi primer",
        },
      },
    ],
    quizzes: [
      {
        question: "Koperasi yang menampung dan memasarkan hasil produksi anggota disebut?",
        options: [
          { id: "a", text: "Koperasi konsumen" },
          { id: "b", text: "Koperasi produsen" },
          { id: "c", text: "Koperasi jasa" },
          { id: "d", text: "Koperasi sekunder" },
        ],
        correct: "b",
        explanation:
          "Tepat. Koperasi produsen membantu anggota memasarkan hasil produksinya dengan harga lebih baik.",
      },
      {
        question: "Apa itu koperasi sekunder?",
        options: [
          { id: "a", text: "Koperasi dengan anggota di bawah 20 orang" },
          { id: "b", text: "Koperasi yang beranggotakan koperasi lain" },
          { id: "c", text: "Koperasi milik pemerintah" },
          { id: "d", text: "Koperasi yang baru berdiri" },
        ],
        correct: "b",
        explanation:
          "Benar. Koperasi sekunder beranggotakan koperasi-koperasi primer, misalnya pusat dan induk koperasi.",
      },
    ],
  },
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
        question: "Apa yang membedakan anggota koperasi dari nasabah bank biasa?",
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
  4: {
    moduleId: 4,
    title: "Simpanan & Pinjaman Koperasi",
    sections: [
      {
        heading: "Tiga Jenis Simpanan",
        body: [
          "Uang anggota di koperasi terbagi tiga. Simpanan pokok dibayar sekali saat masuk dan tidak bisa ditarik selama jadi anggota. Simpanan wajib dibayar rutin (misalnya bulanan) dengan nominal yang ditentukan bersama. Simpanan sukarela bersifat bebas — kamu menabung sebanyak dan sekapan yang kamu mau, dan bisa ditarik sesuai aturan.",
          "Ketiga simpanan inilah modal koperasi. Karena modalnya berasal dari anggota sendiri, keuntungan pun kembali ke anggota — bukan ke pemodal luar.",
        ],
        highlight: {
          term: "Simpanan Wajib vs Sukarela",
          def: "Simpanan wajib bersifat rutin dan mengikat sebagai modal; simpanan sukarela bersifat fleksibel layaknya tabungan biasa dan dapat ditarik.",
        },
      },
      {
        heading: "Meminjam dengan Sehat",
        body: [
          "Pinjaman koperasi umumnya berbunga lebih ringan dan lebih manusiawi daripada pinjaman online atau rentenir, karena tujuannya membantu anggota, bukan menumpuk laba. Pengajuan biasanya melalui pengurus dengan mempertimbangkan kemampuan bayar dan riwayat keanggotaan.",
          "Jasa pinjaman yang dibayar anggota nantinya ikut menjadi sumber Sisa Hasil Usaha — yang sebagian akan kembali lagi ke anggota di akhir tahun.",
        ],
        bigNumber: {
          value: "3",
          label: "Jenis simpanan anggota: pokok, wajib, dan sukarela",
        },
      },
    ],
    quizzes: [
      {
        question: "Simpanan mana yang dibayar hanya sekali saat menjadi anggota?",
        options: [
          { id: "a", text: "Simpanan wajib" },
          { id: "b", text: "Simpanan sukarela" },
          { id: "c", text: "Simpanan pokok" },
          { id: "d", text: "Simpanan berjangka" },
        ],
        correct: "c",
        explanation:
          "Tepat. Simpanan pokok dibayar sekali di awal sebagai tanda kepemilikan.",
      },
      {
        question: "Mengapa pinjaman koperasi cenderung lebih sehat daripada rentenir?",
        options: [
          { id: "a", text: "Karena tidak perlu dikembalikan" },
          { id: "b", text: "Karena tujuannya membantu anggota, bukan menumpuk laba" },
          { id: "c", text: "Karena dijamin pemerintah sepenuhnya" },
          { id: "d", text: "Karena bunganya selalu nol persen" },
        ],
        correct: "b",
        explanation:
          "Benar. Koperasi mengutamakan kesejahteraan anggota sehingga jasanya lebih wajar.",
      },
    ],
  },
  5: {
    moduleId: 5,
    title: "SHU — Sisa Hasil Usaha",
    sections: [
      {
        heading: "Apa Itu SHU",
        body: [
          "SHU adalah keuntungan bersih koperasi dalam satu tahun buku setelah dikurangi biaya, penyusutan, dan kewajiban lain termasuk pajak. Berbeda dengan dividen perusahaan yang dibagi berdasarkan besar saham, SHU dibagi berdasarkan jasa dan partisipasi tiap anggota.",
          "Artinya, semakin aktif kamu bertransaksi dan berkontribusi di koperasi, semakin besar pula bagian SHU yang kamu terima. Ini mendorong partisipasi, bukan sekadar penanaman modal.",
        ],
        highlight: {
          term: "Dasar Pembagian SHU",
          def: "SHU dibagi menurut dua komponen: jasa modal (berdasarkan simpanan) dan jasa usaha (berdasarkan transaksi anggota dengan koperasi).",
        },
      },
      {
        heading: "Gambaran Perhitungan",
        body: [
          "Misalkan koperasi membagi SHU jasa usaha sebesar Rp10.000.000 untuk total transaksi anggota Rp500.000.000. Jika transaksimu setahun Rp5.000.000, maka bagianmu adalah (5.000.000 / 500.000.000) x 10.000.000 = Rp100.000. Tambahkan bagian jasa modal dari simpananmu untuk mendapat total SHU-mu.",
          "Rumus persisnya diatur dalam anggaran dasar tiap koperasi, tetapi prinsipnya selalu sama: adil, proporsional, dan transparan.",
        ],
        bigNumber: {
          value: "Rp100rb",
          label: "Contoh bagian SHU jasa usaha dari transaksi Rp5 juta setahun",
        },
      },
    ],
    quizzes: [
      {
        question: "Atas dasar apa SHU dibagikan kepada anggota koperasi?",
        options: [
          { id: "a", text: "Hanya berdasarkan besar saham" },
          { id: "b", text: "Berdasarkan jasa dan partisipasi anggota" },
          { id: "c", text: "Dibagi rata tanpa memandang aktivitas" },
          { id: "d", text: "Berdasarkan lama menjadi anggota saja" },
        ],
        correct: "b",
        explanation:
          "Tepat. SHU mencerminkan kontribusi nyata anggota lewat jasa modal dan jasa usaha.",
      },
      {
        question: "Apa kepanjangan dari SHU?",
        options: [
          { id: "a", text: "Simpanan Hasil Usaha" },
          { id: "b", text: "Sisa Hasil Usaha" },
          { id: "c", text: "Surplus Harta Usaha" },
          { id: "d", text: "Saldo Harian Usaha" },
        ],
        correct: "b",
        explanation: "Benar. SHU adalah Sisa Hasil Usaha koperasi dalam satu tahun buku.",
      },
    ],
  },
  6: {
    moduleId: 6,
    title: "Rapat Anggota Tahunan (RAT)",
    sections: [
      {
        heading: "Kekuasaan Tertinggi Ada di Tanganmu",
        body: [
          "Dalam koperasi, kekuasaan tertinggi bukan di pengurus atau pengawas, melainkan di Rapat Anggota. Sekali setahun, koperasi wajib menggelar Rapat Anggota Tahunan (RAT) untuk mempertanggungjawabkan kinerja, mengesahkan laporan keuangan, dan menetapkan rencana ke depan.",
          "Di forum inilah SHU dibagi, pengurus dipilih, dan kebijakan besar diputuskan — semuanya lewat suara anggota yang setara.",
        ],
        highlight: {
          term: "RAT",
          def: "Forum tahunan pemegang kekuasaan tertinggi koperasi tempat anggota menilai kinerja pengurus, mengesahkan laporan, dan menetapkan arah koperasi.",
        },
      },
      {
        heading: "Demokrasi Ekonomi yang Nyata",
        body: [
          "RAT adalah praktik demokrasi yang konkret: kamu tidak hanya menerima hasil, tetapi ikut menentukannya. Inilah yang membedakan anggota koperasi dari sekadar pelanggan — kamu punya suara atas uang dan masa depan usahamu bersama.",
          "Kehadiran dan partisipasi aktif di RAT adalah bentuk tanggung jawab kepemilikan. Koperasi yang sehat ditandai oleh RAT yang ramai dan transparan.",
        ],
        bigNumber: {
          value: "1x / tahun",
          label: "Frekuensi minimal penyelenggaraan Rapat Anggota Tahunan",
        },
      },
    ],
    quizzes: [
      {
        question: "Siapa pemegang kekuasaan tertinggi dalam koperasi?",
        options: [
          { id: "a", text: "Ketua pengurus" },
          { id: "b", text: "Pengawas" },
          { id: "c", text: "Rapat Anggota" },
          { id: "d", text: "Pemerintah daerah" },
        ],
        correct: "c",
        explanation:
          "Tepat. Rapat Anggota adalah pemegang kekuasaan tertinggi koperasi.",
      },
      {
        question: "Apa salah satu agenda utama RAT?",
        options: [
          { id: "a", text: "Mengesahkan laporan keuangan dan membagi SHU" },
          { id: "b", text: "Menaikkan harga barang sepihak" },
          { id: "c", text: "Menghapus keanggotaan tanpa alasan" },
          { id: "d", text: "Melarang anggota menabung" },
        ],
        correct: "a",
        explanation:
          "Benar. RAT mengesahkan pertanggungjawaban pengurus dan menetapkan pembagian SHU.",
      },
    ],
  },
  7: {
    moduleId: 7,
    title: "Koperasi Digital & Fintech",
    sections: [
      {
        heading: "Koperasi Naik Kelas",
        body: [
          "Teknologi mengubah cara koperasi bekerja. Pendaftaran anggota, pembayaran simpanan, pengajuan pinjaman, hingga laporan SHU kini bisa dilakukan lewat aplikasi. Koperasi digital memperluas jangkauan ke anggota muda yang terbiasa dengan ponsel.",
          "Banyak koperasi kini bermitra atau mengadopsi sistem fintech untuk pembukuan otomatis, skor kredit anggota, dan transparansi real-time — tanpa kehilangan asas kekeluargaannya.",
        ],
        highlight: {
          term: "Koperasi Digital",
          def: "Koperasi yang memanfaatkan platform digital untuk layanan keanggotaan, simpan pinjam, dan pelaporan agar lebih cepat, transparan, dan inklusif.",
        },
      },
      {
        heading: "Peluang sekaligus Kewaspadaan",
        body: [
          "Digitalisasi membuka peluang besar, tapi juga menuntut kehati-hatian. Anggota perlu memastikan koperasi digital benar-benar berbadan hukum dan diawasi, bukan sekadar aplikasi pinjaman berkedok koperasi.",
          "Literasi digital dan literasi koperasi harus berjalan bersama agar generasi muda bisa memanfaatkan teknologi tanpa terjebak penipuan.",
        ],
        bigNumber: {
          value: "24/7",
          label: "Layanan koperasi digital dapat diakses anggota kapan saja",
        },
      },
    ],
    quizzes: [
      {
        question: "Apa manfaat utama koperasi digital bagi anggota muda?",
        options: [
          { id: "a", text: "Menghapus kewajiban simpanan" },
          { id: "b", text: "Akses layanan lebih cepat, transparan, dan inklusif" },
          { id: "c", text: "Menghilangkan Rapat Anggota" },
          { id: "d", text: "Menjadikan koperasi mencari laba semata" },
        ],
        correct: "b",
        explanation:
          "Tepat. Digitalisasi mempermudah akses dan transparansi tanpa meninggalkan prinsip koperasi.",
      },
      {
        question: "Apa yang perlu diwaspadai dari koperasi digital?",
        options: [
          { id: "a", text: "Aplikasi pinjaman berkedok koperasi yang tidak berbadan hukum" },
          { id: "b", text: "Laporan keuangan yang terlalu transparan" },
          { id: "c", text: "Anggota yang terlalu aktif" },
          { id: "d", text: "Bunga pinjaman yang terlalu rendah" },
        ],
        correct: "a",
        explanation:
          "Benar. Pastikan koperasi berbadan hukum dan diawasi resmi sebelum bergabung.",
      },
    ],
  },
  8: {
    moduleId: 8,
    title: "Membangun Koperasi di Desamu",
    sections: [
      {
        heading: "Dari Ide ke Badan Hukum",
        body: [
          "Mendirikan koperasi dimulai dari mengumpulkan minimal 20 orang dengan kebutuhan ekonomi yang sama. Bersama mereka kamu menyusun anggaran dasar, menggelar rapat pembentukan, lalu mengajukan akta pendirian ke notaris dan pengesahan badan hukum melalui Kementerian Koperasi dan UKM.",
          "Setelah berbadan hukum, koperasi bisa membuka rekening, menerima simpanan, dan menjalankan usaha secara resmi. Tahap ini memang menuntut komitmen, tetapi fondasinya menentukan keberlanjutan.",
        ],
        highlight: {
          term: "Akta Pendirian",
          def: "Dokumen resmi yang dibuat di hadapan notaris dan disahkan sebagai badan hukum, menandai lahirnya koperasi secara sah.",
        },
      },
      {
        heading: "Menjaga Koperasi Tetap Hidup",
        body: [
          "Koperasi yang berhasil bukan yang paling besar modalnya, melainkan yang anggotanya paling aktif. Partisipasi dalam simpanan, transaksi, dan RAT adalah nyawa koperasi. Pengurus yang amanah dan pembukuan yang transparan menjaga kepercayaan.",
          "Sebagai generasi muda, kamu bisa menjadi penggerak: membawa keterampilan digital, ide usaha baru, dan semangat gotong royong untuk menghidupkan kembali koperasi di komunitasmu.",
        ],
        bigNumber: {
          value: "20",
          label: "Jumlah pendiri minimal untuk membentuk koperasi primer",
        },
      },
    ],
    quizzes: [
      {
        question: "Berapa jumlah orang minimal untuk mendirikan koperasi primer?",
        options: [
          { id: "a", text: "5 orang" },
          { id: "b", text: "10 orang" },
          { id: "c", text: "20 orang" },
          { id: "d", text: "50 orang" },
        ],
        correct: "c",
        explanation:
          "Tepat. Koperasi primer membutuhkan minimal 20 pendiri dengan kebutuhan ekonomi yang sama.",
      },
      {
        question: "Apa kunci utama agar koperasi tetap hidup dan berkelanjutan?",
        options: [
          { id: "a", text: "Modal yang sangat besar dari satu orang" },
          { id: "b", text: "Partisipasi aktif anggota dan pengelolaan transparan" },
          { id: "c", text: "Tidak pernah menggelar RAT" },
          { id: "d", text: "Membatasi jumlah anggota" },
        ],
        correct: "b",
        explanation:
          "Benar. Nyawa koperasi adalah partisipasi anggota dan transparansi pengelolaan.",
      },
    ],
  },
};

export function getLesson(id: number): Lesson {
  return lessons[id] ?? lessons[1];
}
