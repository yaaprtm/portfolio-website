import type { Metadata } from "next";
import "./globals.css";

// ============================================================
// SEO Metadata — ARYA PUTRA PRATAMA
// ============================================================
export const metadata: Metadata = {
  title: "Arya Putra Pratama — IT Enthusiast | Network & Android Developer",
  description:
    "Portofolio Profesional Arya Putra Pratama: Siswa Teknik Komputer dan Jaringan (TKJ) SMK Dinamika Pembangunan 1 Jakarta, IT Support Technician, dan Android Developer Intern di BRIN.",
  keywords: [
    "Arya Putra Pratama",
    "IT Enthusiast",
    "Computer and Network Engineering",
    "TKJ",
    "IT Maintenance",
    "IT Support Technician",
    "Android Developer",
    "BRIN Intern",
    "MikroTik MTCNA",
    "Cisco Packet Tracer",
    "Jakarta",
  ],
  authors: [{ name: "Arya Putra Pratama", url: "https://aryaputrapratama.vercel.app" }],
  creator: "Arya Putra Pratama",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aryaputrapratama.vercel.app",
    title: "Arya Putra Pratama — IT Enthusiast | Network & Android Developer",
    description:
      "Portofolio profesional: IT Maintenance, Network Engineering, IT Support, dan Magang Android Developer BRIN.",
    siteName: "Arya Putra Pratama Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arya Putra Pratama — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya Putra Pratama — IT Enthusiast | Network & Android Developer",
    description: "Portofolio profesional: IT Maintenance, Networking, dan Android Development.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Google Fonts: Inter + JetBrains Mono */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy-950 text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
