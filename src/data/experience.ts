// ============================================================
// DATA: Experience & Education — ARYA PUTRA PRATAMA
// ============================================================

export interface Experience {
  id: number;
  type: "work" | "internship" | "education" | "organization";
  title: string;
  company: string;
  location: string;
  period: string;
  startDate: string;
  endDate?: string;
  description: string[];
  technologies?: string[];
  current?: boolean;
}

export const workExperiences: Experience[] = [
  {
    id: 1,
    type: "internship",
    title: "Android Developer Intern",
    company: "Badan Riset dan Inovasi Nasional (BRIN)",
    location: "Cibinong, Indonesia",
    period: "Juli 2026 – Agustus 2026 (2 Bulan)",
    startDate: "2026-07",
    endDate: "2026-08",
    description: [
      "Magang sebagai Android Developer dalam tim 4 orang (1 frontend, 2 backend, 1 Android).",
      "Mengembangkan aplikasi mobile Android untuk Kebun Raya Cibinong.",
      "Berkolaborasi dengan tim frontend dan backend dalam pengembangan ekosistem digital Kebun Raya Cibinong.",
      "Membangun fitur-fitur utama aplikasi menggunakan teknologi Android native.",
    ],
    technologies: ["Android", "Java", "REST API", "Git"],
  },
  {
    id: 2,
    type: "work",
    title: "IT Support",
    company: "PT. Trima Anugrah Sejahtera",
    location: "Cikarang, Indonesia",
    period: "Maret 2025 – Juli 2026 (1 Tahun 4 Bulan)",
    startDate: "2025-03",
    endDate: "2026-07",
    description: [
      "Melakukan pemeliharaan dasar komputer dan jaringan secara rutin.",
      "Membantu troubleshooting permasalahan hardware dan software.",
      "Mendukung proses instalasi perangkat dan pengecekan sistem.",
    ],
    technologies: ["Hardware Maintenance", "Network Troubleshooting", "IT Support"],
  },
  {
    id: 3,
    type: "work",
    title: "IT Support",
    company: "ID-Networkers",
    location: "Semarang, Indonesia",
    period: "Desember 2024 – Maret 2025 (3 Bulan)",
    startDate: "2024-12",
    endDate: "2025-03",
    description: [
      "Membantu pengguna dengan troubleshooting teknis dan dukungan IT.",
      "Membantu pemeliharaan perangkat jaringan dan sistem komputer.",
      "Mendukung kegiatan operasional harian terkait infrastruktur IT.",
      "Bekerja sama dengan tim teknis selama proses maintenance dan instalasi.",
    ],
    technologies: ["IT Support", "Network Devices", "Troubleshooting", "Infrastructure"],
  },
  {
    id: 4,
    type: "work",
    title: "Assistant Project Manager",
    company: "PT. Telnusa Intrakom",
    location: "Kalimantan Barat, Indonesia",
    period: "Desember 2023 (1 Bulan)",
    startDate: "2023-12",
    endDate: "2023-12",
    description: [
      "Membantu koordinasi proyek untuk kegiatan instalasi VSAT.",
      "Membantu memantau kemajuan proyek dan dokumentasi lapangan.",
      "Mendukung komunikasi antar anggota tim selama pekerjaan on-site.",
    ],
    technologies: ["VSAT", "Project Coordination", "Field Documentation"],
  },
];

export const educationList: Experience[] = [
  {
    id: 1,
    type: "education",
    title: "STr. Teknik Rekayasa Internet",
    company: "Politeknik Elektronika Negeri Surabaya (PENS)",
    location: "Surabaya, Jawa Timur",
    period: "2026 – 2030",
    startDate: "2026-08",
    current: true,
    description: [
      "Mahasiswa Baru Program Studi Sarjana Terapan (STr.) Teknik Rekayasa Internet.",
      "Fokus studi: Arsitektur Internet Modern, Infrastruktur Jaringan Broadband, Cloud Computing, Network Security, dan Distributed Systems.",
      "Melanjutkan passion dan penguatan keahlian teknis di kampus teknologi terkemuka Indonesia.",
    ],
    technologies: ["Internet Engineering", "Network Architecture", "Broadband", "Cloud & Security"],
  },
  {
    id: 6,
    type: "education",
    title: "Teknik Komputer dan Jaringan",
    company: "SMK Dinamika Pembangunan 1 Jakarta",
    location: "Jakarta, Indonesia",
    period: "2023 – 2026",
    startDate: "2023-07",
    endDate: "2026-05",
    description: [
      "Lulusan Jurusan Teknik Komputer dan Jaringan (TKJ).",
      "Mempelajari Computer Networking, Routing & Switching, IT Support, dan Server Administration.",
      "Aktif mengerjakan proyek akademis: VLAN & Routing Configuration, Network Topology Simulation, dan VSAT Installation Assistance.",
      "Finalis IONIC IoT & Networking PENS 2025.",
    ],
    technologies: ["Computer Networking", "Routing & Switching", "IT Support", "Server Admin"],
  },
];
