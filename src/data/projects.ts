// ============================================================
// DATA: Projects — ARYA PUTRA PRATAMA
// ============================================================

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  techStack: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  category: "networking" | "android" | "web" | "other";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Aplikasi Mobile Kebun Raya Cibinong (BRIN Internship)",
    description:
      "Aplikasi Android interaktif yang dikembangkan saat magang di Badan Riset dan Inovasi Nasional (BRIN) dalam tim 4 orang (1 Frontend, 2 Backend, 1 Android Developer). Memudahkan pengunjung mengakses informasi kebun raya dan ekosistem digitalnya.",
    image: "/images/project-kebun-raya.png",
    techStack: ["Android", "Kotlin", "Java", "REST API", "Git"],
    featured: true,
    category: "android",
  },
  {
    id: 2,
    title: "VLAN & Routing Configuration using Cisco Packet Tracer",
    description:
      "Simulasi topologi jaringan kompleks yang mencakup konfigurasi VLAN, inter-VLAN routing, subnetting, dan troubleshooting sistem jaringan berbasis perangkat Cisco.",
    image: "/images/project-vlan.png",
    techStack: ["Cisco Packet Tracer", "Routing & Switching", "VLAN", "Subnetting"],
    featured: true,
    category: "networking",
  },
  {
    id: 3,
    title: "Sistem Pemeliharaan IT & Troubleshooting Perangkat",
    description:
      "Dokumentasi dan eksekusi perawatan rutin hardware/software, instalasi OS Windows, perbaikan masalah sistem, dan pengelolaan perangkat jaringan di Digital Solusindo & ID-Networkers.",
    image: "/images/project-it-support.png",
    techStack: ["Windows OS", "Hardware Repair", "Network Maintenance", "IT Support"],
    featured: true,
    category: "other",
  },
  {
    id: 4,
    title: "Proyek Instalasi & Koordinasi Lapangan VSAT",
    description:
      "Asistensi koordinasi proyek instalasi VSAT bersama PT. Telnusa Intrakom, pemantauan progress pekerjaan di lapangan, dan penyusunan dokumentasi teknis.",
    image: "/images/project-vsat.png",
    techStack: ["VSAT", "Project Management", "Field Documentation"],
    category: "networking",
  },
];
