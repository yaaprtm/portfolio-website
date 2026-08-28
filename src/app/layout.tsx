import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

// ============================================================
// SEO Metadata — ARYA PUTRA PRATAMA
// ============================================================
export const metadata: Metadata = {
  title: "Arya Putra Pratama — IT Enthusiast | Networking, Android Dev & IT Support",
  description:
    "Portofolio Arya Putra Pratama, seorang IT Enthusiast dan Mahasiswa STr. Teknik Rekayasa Internet (PENS Surabaya) dengan minat serta keahlian di bidang Networking, Android Development, dan IT Support.",
  keywords: [
    "Arya Putra Pratama",
    "IT Enthusiast",
    "Teknik Rekayasa Internet",
    "PENS Surabaya",
    "IT Maintenance",
    "IT Support Technician",
    "Android Developer",
    "BRIN Intern",
    "MikroTik MTCNA",
    "Cisco Packet Tracer",
    "Surabaya",
  ],
  authors: [{ name: "Arya Putra Pratama", url: "https://aryaputrapratama.vercel.app" }],
  creator: "Arya Putra Pratama",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://aryaputrapratama.vercel.app",
    title: "Arya Putra Pratama — IT Enthusiast | Networking, Android Dev & IT Support",
    description:
      "Portofolio Arya Putra Pratama: IT Enthusiast dengan minat di bidang Networking, Android Development, dan IT Support.",
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
    title: "Arya Putra Pratama — IT Enthusiast | Networking, Android Dev & IT Support",
    description: "Portofolio Arya Putra Pratama: IT Enthusiast dengan minat di bidang Networking, Android Development, dan IT Support.",
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
    <html lang="id" className={`scroll-smooth ${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-offwhite text-warm-dark antialiased font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
