// ============================================================
// DATA: Case Studies — ARYA PUTRA PRATAMA
// ============================================================

export interface CaseStudyChallenge {
  challenge: string;
  solution: string;
}

export interface GalleryItem {
  id: number;
  caption: string;
  placeholderText: string;
  src?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  period: string;
  role: string;
  team: string;
  technologies: string[];
  summary: string;
  problem: string;
  process: string[];
  challenges: CaseStudyChallenge[];
  results: string[];
  gallery: GalleryItem[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "kebun-raya-cibinong": {
    slug: "kebun-raya-cibinong",
    title: "Aplikasi Mobile Kebun Raya Cibinong (BRIN)",
    category: "Android Mobile App",
    tagline: "Aplikasi Android Native untuk digitalisasi layanan pengunjung dan navigasi informasi flora di Kebun Raya Cibinong BRIN.",
    period: "Juni 2024 – Agustus 2024 (2 Bulan)",
    role: "Android Developer Intern",
    team: "Tim 4 Orang (1 Android Dev - Arya, 1 Frontend Web, 2 Backend)",
    technologies: ["Android Native", "Kotlin", "Java", "REST API Integration", "Git / GitHub", "Material Design 3"],
    summary:
      "Selama program magang 2 bulan di Badan Riset dan Inovasi Nasional (BRIN), saya bertanggung jawab penuh sebagai tunggal Android Developer dalam tim beranggotakan 4 orang untuk membangun aplikasi mobile resmi Kebun Raya Cibinong.",
    problem:
      "Sebelum adanya aplikasi ini, pengunjung Kebun Raya Cibinong mengalami kesulitan dalam mengakses katalog flora riset secara langsung di lokasi, informasi pemetaan zonasi taman, serta jadwal kegiatan edukasi lingkungan. BRIN membutuhkan solusi digital berbasis mobile yang ringan, responsif, dan dapat terhubung dengan backend database riset tanaman.",
    process: [
      "1. Pembagian Peran & Sinkronisasi API: Berkolaborasi dengan 2 developer backend untuk menyepakati struktur endpoint REST API (JSON schema) data flora dan zonasi taman.",
      "2. Perancangan UI/UX Native: Mengimplementasikan desain Material Design 3 ke dalam layout XML Android untuk memastikan antarmuka mudah digunakan oleh berbagai kelompok umur pengunjung.",
      "3. Integrasi Network Layer & Caching: Membangun layer jaringan menggunakan HTTP client library Android untuk menarik data dari server backend dan menyimpan cache lokal agar aplikasi tetap responsif.",
      "4. Pengujian & Bug Fixing: Melakukan testing berkala pada berbagai perangkat Android dengan ukuran layar dan versi OS yang berbeda.",
    ],
    challenges: [
      {
        challenge: "Keterbatasan Koneksi Internet Lapangan di Area Kebun Raya",
        solution:
          "Mengimplementasikan mekanisme caching lokal temporary pada aplikasi Android sehingga data informasi flora yang telah dibuka tetap dapat dibaca pengunjung meskipun sinyal internet melemah di dalam area kebun.",
      },
      {
        challenge: "Sinkronisasi Data Real-time dengan Tim Backend",
        solution:
          "Membuat penanganan error exception dan status loading state yang informatif pada UI Android untuk menangani skenario saat respon API backend tertunda.",
      },
    ],
    results: [
      "Berhasil menyelesaikan prototipe aplikasi mobile Android Kebun Raya Cibinong tepat waktu sesuai jadwal magang 2 bulan.",
      "Meningkatkan keterampilan kolaborasi tim profesional berskala riset nasional (1 Android, 1 Frontend, 2 Backend).",
      "Memperkuat keahlian dalam integrasi RESTful API dan arsitektur Android native.",
    ],
    gallery: [
      {
        id: 1,
        caption: "Tampilan Beranda Utama & Katalog Flora Kebun Raya Cibinong",
        placeholderText: "Screenshot Layout Utama Aplikasi Android",
      },
      {
        id: 2,
        caption: "Peta Zonasi & Informasi Detail Jenis Tanaman Riset",
        placeholderText: "Screenshot Detail Informasi Tanaman",
      },
      {
        id: 3,
        caption: "Arsitektur Integrasi REST API Android dengan Backend Server",
        placeholderText: "Diagram Alur Arsitektur Aplikasi",
      },
    ],
  },

  "vlan-routing-cisco": {
    slug: "vlan-routing-cisco",
    title: "VLAN & Routing Configuration (Cisco Packet Tracer)",
    category: "Network Engineering",
    tagline: "Perancangan dan simulasi infrastruktur jaringan bertingkat dengan VLAN segmentasi dan inter-VLAN routing.",
    period: "2024",
    role: "Network Designer & Configuration Specialist",
    team: "Proyek Mandiri (Network Engineering)",
    technologies: ["Cisco Packet Tracer", "Cisco IOS CLI", "VLAN (IEEE 802.1Q)", "Inter-VLAN Routing", "DHCP Server", "Subnetting / VLSM"],
    summary:
      "Proyek infrastruktur jaringan komputer yang berfokus pada segmentasi jaringan lokal menggunakan Virtual Local Area Network (VLAN) serta konfigurasi Inter-VLAN routing pada Switch Layer 3 dan Router Cisco.",
    problem:
      "Dalam infrastruktur jaringan perusahaan modern, penggabungan seluruh departemen dalam satu broadcast domain menyebabkan kemacetan lalu lintas data (broadcast storm) dan risiko keamanan tinggi. Diperlukan isolasi lalu lintas antar departemen (HRD, Finance, Engineering, Guest) yang efisien tanpa mengorbankan konektivitas teratur antar cabang.",
    process: [
      "1. Perencanaan Topologi & Subnetting: Menghitung pembagian blok IP address menggunakan metode VLSM (Variable Length Subnet Mask) untuk efisiensi ruang alokasi IP.",
      "2. Konfigurasi Switch Layer 2 (VLAN Creation & Trunking): Membuat VLAN 10, VLAN 20, VLAN 30 pada Switch Cisco dan mengonfigurasi port Trunking (802.1Q) antar switch.",
      "3. Konfigurasi Inter-VLAN Routing (Router-on-a-Stick & Layer 3 Switch): Mengaktifkan sub-interface pada router dengan enkapsulasi 802.1Q agar tiap VLAN dapat saling berkomunikasi secara terkontrol.",
      "4. Pengujian Konektivitas & Network Diagnostics: Menguji ICMP ping, traceroute, dan verifikasi tabel routing untuk memastikan nol packet loss antar subnet.",
    ],
    challenges: [
      {
        challenge: "Terjadinya Mismatch Encapsulation pada Connection Trunking",
        solution:
          "Melakukan debugging via Cisco CLI (`show interfaces trunk`, `show vlan brief`) untuk memastikan Native VLAN dan alokasi VLAN allowed di kedua ujung port switch berada pada konfigurasi yang persis seragam.",
      },
      {
        challenge: "Optimalisasi Alokasi IP Automatic DHCP per VLAN",
        solution:
          "Mengonfigurasi DHCP Pool terpisah untuk masing-masing VLAN ID lengkap dengan IP default-gateway dan DNS server spesifik.",
      },
    ],
    results: [
      "Topologi jaringan berhasil disimulasikan 100% lulus uji konektivitas pada Cisco Packet Tracer.",
      "Mencapai isolasi broadcast domain yang aman antar departemen dengan performa routing optimal.",
      "Menjadi landasan praktis kuat yang mendukung pencapaian kelulusan sertifikasi MikroTik MTCNA dengan skor 88%.",
    ],
    gallery: [
      {
        id: 1,
        caption: "Topologi Lengkap Jaringan Multi-VLAN di Cisco Packet Tracer",
        placeholderText: "Diagram Topologi Cisco Packet Tracer",
      },
      {
        id: 2,
        caption: "Tabel Konfigurasi CLI Sub-interface & Encapsulation dot1Q",
        placeholderText: "Screenshot Terminal Cisco IOS CLI",
      },
      {
        id: 3,
        caption: "Hasil Pengujian Ping & Verification Route Inter-VLAN",
        placeholderText: "Screenshot Diagnostic Ping Success",
      },
    ],
  },
};
