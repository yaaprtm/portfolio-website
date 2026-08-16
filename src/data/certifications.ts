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
}

export const certifications: Certification[] = [
  {
    id: 1,
    name: "MikroTik Certified Network Associate (Score: 88%)",
    shortName: "MTCNA",
    issuer: "MikroTik",
    date: "2024",
    category: "networking",
    color: "#00F0FF",
  },
  {
    id: 2,
    name: "Finalist IONIC IoT & Networking PENS",
    shortName: "FINALIST",
    issuer: "Politeknik Elektronika Negeri Surabaya (PENS)",
    date: "2025",
    category: "achievement",
    color: "#F59E0B",
  },
  {
    id: 3,
    name: "SMK Computer and Network Engineering Certificate",
    shortName: "TKJ",
    issuer: "SMK Dinamika Pembangunan 1 Jakarta",
    date: "2023 - 2026",
    category: "other",
    color: "#3DCA75",
  },
];
