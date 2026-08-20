import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

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
    <html lang="id" className="scroll-smooth">
      <head>
        {/* Anti-FOUC Theme Init Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem("portfolio-theme-mode");if(m==="light"||(!m&&window.matchMedia("(prefers-color-scheme: light)").matches)){document.documentElement.classList.add("light");}}catch(e){}})();`,
          }}
        />
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}

