// ============================================================
// DATA: Skills — ARYA PUTRA PRATAMA
// ============================================================

export interface Skill {
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "networking",
    title: "Networking & Infrastructure",
    description: "Pemeliharaan jaringan, konfigurasi perangkat, dan administrasi server dasar.",
    icon: "Network",
    accentColor: "#00F5A0",
    skills: [
      { name: "MikroTik (MTCNA Certified - 88%)", level: "advanced" },
      { name: "Cisco Networking & Packet Tracer", level: "advanced" },
      { name: "Routing & Switching", level: "advanced" },
      { name: "Network Troubleshooting", level: "advanced" },
      { name: "Basic Server Administration", level: "intermediate" },
      { name: "VSAT Installation Assistance", level: "intermediate" },
      { name: "Computer Networking Fundamentals", level: "expert" },
    ],
  },
  {
    id: "android",
    title: "Android & Programming",
    description: "Pengembangan aplikasi Android dan pemrograman software.",
    icon: "Smartphone",
    accentColor: "#8B5CF6",
    skills: [
      { name: "Android App Development", level: "intermediate" },
      { name: "Java (Android Development)", level: "intermediate" },
      { name: "REST API Integration", level: "intermediate" },
      { name: "Git & Version Control", level: "intermediate" },
      { name: "Programming Logic", level: "intermediate" },
    ],
  },
  {
    id: "it-support",
    title: "IT Support & Maintenance",
    description: "Pemeliharaan sistem komputer, hardware, software, dan koordinasi teknis.",
    icon: "Wrench",
    accentColor: "#F59E0B",
    skills: [
      { name: "Hardware & Software Maintenance", level: "expert" },
      { name: "IT Support Fundamentals", level: "expert" },
      { name: "Windows Installation & Setup", level: "expert" },
      { name: "System Diagnostics & Repair", level: "advanced" },
      { name: "Microsoft Office Suite", level: "advanced" },
      { name: "Team Communication & Coordination", level: "expert" },
    ],
  },
];

export const levelConfig = {
  beginner: { label: "Beginner", width: "25%", color: "#64748B" },
  intermediate: { label: "Intermediate", width: "55%", color: "#8B5CF6" },
  advanced: { label: "Advanced", width: "80%", color: "#00A86B" },
  expert: { label: "Expert", width: "100%", color: "#00F5A0" },
};
