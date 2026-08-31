// ============================================================
// DATA: Certifications & Achievements — ARYA PUTRA PRATAMA
// ============================================================

export interface Certification {
  id: number;
  name: string;
  shortName: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  category: "networking" | "android" | "cloud" | "security" | "achievement" | "other";
  color: string;
  image?: string;
  fileUrl?: string;
  description?: string;
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "Sertifikat Kelulusan Magang — Android Native Developer",
    shortName: "BRIN INTERNSHIP",
    issuer: "BRIN - Kebun Raya Cibinong",
    date: "Agustus 2026",
    credentialId: "SE-KM-002/MAP-VIII/2026",
    category: "android",
    color: "#10B981",
    credentialUrl: "/images/certifications/BRIN-Sertifikat-Magang-2026.pdf",
    fileUrl: "/images/certifications/BRIN-Sertifikat-Magang-2026.pdf",
    description: "Sertifikat kelulusan magang dengan predikat SANGAT BAIK dari PT. Mayaksa Alam Permai selaku pengelola Kebun Raya Cibinong. Menyelesaikan proyek 'Pengembangan Sistem Pelaporan Terpadu Internal Operasional Kebun Raya Cibinong' sebagai Android Native Developer (Java) pada periode 01 Juli 2026 - 31 Agustus 2026.",
  },
  {
    id: 2,
    name: "Letter of Acceptance (LOA) — BRIN Internship Program",
    shortName: "LOA BRIN",
    issuer: "BRIN - Kebun Raya Cibinong",
    date: "Juli 2026",
    credentialId: "LOA-002/MAP-VII/2026",
    category: "android",
    color: "#3B82F6",
    credentialUrl: "/images/certifications/BRIN-LOA-2026.pdf",
    fileUrl: "/images/certifications/BRIN-LOA-2026.pdf",
    description: "Letter of Acceptance (Surat Penerimaan Magang) dari PT. Mayaksa Alam Permai selaku mitra pengelola Kebun Raya Cibinong di bawah naungan BRIN. Diterima sebagai Android Native Developer (Java) untuk proyek 'Pengembangan Sistem Pelaporan Terpadu Internal Operasional Kebun Raya Cibinong' pada periode 01 Juli - 31 Agustus 2026.",
  },
  {
    id: 3,
    name: "MikroTik Certified Network Associate (MTCNA)",
    shortName: "MTCNA",
    issuer: "MikroTik",
    date: "2024",
    category: "networking",
    color: "#00F0FF",
    credentialUrl: "/images/certifications/MTCNA.pdf",
    fileUrl: "/images/certifications/MTCNA.pdf",
    description: "Sertifikasi resmi internasional MikroTik (Score: 88%). Memvalidasi kompetensi dalam manajemen MikroTik RouterOS, konfigurasi IP Routing, Firewall, Bandwidth Management (Queues), Wireless Networking, dan VPN/Tunneling.",
  },
  {
    id: 4,
    name: "Finalist IONIC IoT & Networking Competition 2025",
    shortName: "FINALIST",
    issuer: "Politeknik Elektronika Negeri Surabaya (PENS)",
    date: "2025",
    category: "achievement",
    color: "#F59E0B",
    credentialUrl: "/images/certifications/Networking IONIC 2025.pdf",
    fileUrl: "/images/certifications/Networking IONIC 2025.pdf",
    description: "Penghargaan sebagai Finalis Kompetisi Nasional IONIC (IoT & Networking Competition) 2025 di PENS Surabaya. Menguji kemampuan perancangan arsitektur jaringan komputer skala besar dan integrasi sistem terdistribusi.",
  },
  {
    id: 5,
    name: "Sertifikat Kompetensi Keahlian Teknik Komputer & Jaringan",
    shortName: "TKJ / UKK",
    issuer: "SMK Dinamika Pembangunan 1 Jakarta",
    date: "2026",
    category: "other",
    color: "#3DCA75",
    credentialUrl: "/images/certifications/sertifikat-kompetensi-jaringan.pdf",
    fileUrl: "/images/certifications/sertifikat-kompetensi-jaringan.pdf",
    description: "Sertifikat Uji Kompetensi Keahlian (UKK) Teknik Komputer dan Jaringan. Membuktikan kompetensi teknis dalam perakitan jaringan LAN/WLAN, instalasi server, pengkabelan UTP/Fiber Optik, dan administrasi sistem jaringan.",
  },
];
