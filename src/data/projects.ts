// ============================================================
// DATA: Projects — ARYA PUTRA PRATAMA
// ============================================================

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  imageOrientation?: "landscape" | "portrait";
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: "networking" | "android" | "web" | "other";
  slug?: string;
  hasCaseStudy?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Proyek Instalasi & Koordinasi Lapangan VSAT",
    description:
      "Asistensi koordinasi proyek instalasi VSAT bersama PT. Telnusa Intrakom, pemantauan progress pekerjaan di lapangan, dan penyusunan dokumentasi teknis.",
    image: "/images/kalimantan.jpg",
    imageOrientation: "landscape",
    techStack: ["VSAT", "Project Management", "Field Documentation"],
    featured: true,
    category: "networking",
  },
  {
    id: 2,
    title: "Sistem Pemeliharaan IT & Troubleshooting Perangkat",
    description:
      "Dokumentasi dan eksekusi perawatan rutin hardware/software, instalasi OS Windows, perbaikan masalah sistem, dan pengelolaan perangkat jaringan di Digital Solusindo & ID-Networkers.",
    image: "/images/it-troubleshooting.jpg",
    imageOrientation: "portrait",
    techStack: ["Windows OS", "Hardware Repair", "Network Maintenance", "IT Support"],
    featured: true,
    category: "other",
  },
  {
    id: 3,
    title: "Aplikasi Mobile Kebun Raya Cibinong (BRIN Internship)",
    description:
      "Aplikasi Android interaktif yang dikembangkan saat magang di Badan Riset dan Inovasi Nasional (BRIN) dalam tim 4 orang (1 Frontend, 2 Backend, 1 Android Developer). Memudahkan pengunjung mengakses informasi kebun raya dan ekosistem digitalnya.",
    image: "/images/aplikasi-brin.jpg",
    imageOrientation: "portrait",
    techStack: ["Android", "Java", "REST API", "Git"],
    featured: true,
    category: "android",
    slug: "kebun-raya-cibinong",
    hasCaseStudy: true,
  },
];
