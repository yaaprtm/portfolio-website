"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { workExperiences, educationList } from "@/data/experience";
import { certifications } from "@/data/certifications";
import Link from "next/link";
import { ArrowLeft, Printer, AlertCircle } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function PrintCVPage() {
  const { lang } = useLanguage();
  const [showInstructions, setShowInstructions] = useState(true);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      {/* Set page title singkat untuk print header */}
      <title>CV - Arya Putra Pratama</title>

      <div className="min-h-screen bg-slate-50 print:bg-white">
        {/* Top Control Bar (Hidden when printing) */}
        <header className="no-print sticky top-0 z-50 bg-slate-900 text-white py-3 px-4 sm:px-6 shadow-lg">
          <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-2 transition-all"
            >
              <ArrowLeft size={14} />
              {lang === "id" ? "Kembali" : "Back"}
            </Link>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-2 transition-all shadow-md"
              >
                <Printer size={16} />
                {lang === "id" ? "Print / Save as PDF" : "Print / Save as PDF"}
              </button>
            </div>
          </div>

          {/* Print Instructions - Visible only on screen */}
          {showInstructions && (
            <div className="max-w-4xl mx-auto mt-3 p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-100 text-xs flex items-start gap-2">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold mb-1">
                  {lang === "id" 
                    ? "⚠️ PENTING: Sebelum menyimpan sebagai PDF" 
                    : "⚠️ IMPORTANT: Before saving as PDF"}
                </p>
                <p className="leading-relaxed">
                  {lang === "id"
                    ? "Pastikan opsi 'Headers and footers' di pengaturan print browser dalam keadaan MATI (OFF), supaya hasil PDF bersih tanpa tanggal/URL tambahan di pojok halaman."
                    : "Make sure the 'Headers and footers' option in your browser's print settings is turned OFF, so the PDF output is clean without extra date/URL elements in the corners."}
                </p>
              </div>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-amber-200 hover:text-white font-bold text-lg leading-none"
              >
                ×
              </button>
            </div>
          )}
        </header>

        {/* ATS-Friendly CV Document */}
        <main className="max-w-[210mm] mx-auto bg-white p-8 print:p-[15mm] my-6 print:my-0 shadow-lg print:shadow-none">
          
          {/* ============================================================
              1. HEADER (Nama, Tagline, Kontak) - ATS Format
             ============================================================ */}
          <header className="mb-5 break-inside-avoid">
            <h1 className="text-2xl font-bold text-black mb-1 tracking-tight" style={{ fontFamily: 'Arial, sans-serif' }}>
              ARYA PUTRA PRATAMA
            </h1>
            <p className="text-sm text-gray-700 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id" 
                ? "IT Enthusiast — Networking, Android Development & IT Support"
                : "IT Enthusiast — Networking, Android Development & IT Support"}
            </p>
            <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
              aryattt45@gmail.com | +62 838-9022-7712 | linkedin.com/in/arya-putra-pratama-848871338 | yaaporto.my.id
            </p>
          </header>

          {/* ============================================================
              2. SUMMARY (3 Kalimat Ringkas)
             ============================================================ */}
          <section className="mb-4 break-inside-avoid">
            <h2 className="text-sm font-bold text-black mb-2 uppercase border-b border-gray-300 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id" ? "RINGKASAN" : "SUMMARY"}
            </h2>
            <p className="text-xs text-gray-800 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id"
                ? "Saya tipe orang yang lebih suka belajar sambil praktik langsung dibanding cuma membaca teori — makanya selama sekolah dan awal kuliah saya sudah mencoba berbagai hal secara langsung di lapangan: menangani jaringan komputer, ikut proyek instalasi VSAT hingga ke pelosok Kalimantan, sampai mengembangkan aplikasi Android bersama tim di BRIN. Dari segi hard skill, saya cukup terbiasa dengan networking (bersertifikat MikroTik MTCNA), pengembangan Android, dan troubleshooting IT sehari-hari. Di sisi soft skill, saya terbiasa bekerja sama dalam tim lintas divisi, cepat beradaptasi di lingkungan baru, dan selalu penasaran untuk mempelajari hal teknis yang belum saya kuasai. Saat ini saya melanjutkan studi D4 Teknik Rekayasa Internet di PENS untuk terus memperdalam kemampuan di bidang jaringan dan infrastruktur digital."
                : "I'm someone who prefers learning by doing rather than just reading theory — throughout school and early college, I've gotten hands-on experience across several areas: handling computer networks, joining a VSAT installation project all the way to rural Kalimantan, and building an Android app with a team at BRIN. On the hard skill side, I'm comfortable with networking (MikroTik MTCNA certified), Android development, and everyday IT troubleshooting. On the soft skill side, I work well in cross-functional teams, adapt quickly to new environments, and stay curious about picking up technical skills I haven't mastered yet. I'm currently pursuing a D4 in Internet Engineering at PENS to keep deepening my expertise in networking and digital infrastructure."}
            </p>
          </section>

          {/* ============================================================
              3. SKILLS (List Ringkas per Kategori)
             ============================================================ */}
          <section className="mb-4 break-inside-avoid">
            <h2 className="text-sm font-bold text-black mb-2 uppercase border-b border-gray-300 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id" ? "KEAHLIAN" : "SKILLS"}
            </h2>
            <div className="text-xs text-gray-800 space-y-1.5" style={{ fontFamily: 'Arial, sans-serif' }}>
              <p>
                <strong>Networking:</strong> MikroTik (MTCNA Certified), Cisco Packet Tracer, Routing & Switching, Network Troubleshooting, VSAT Installation
              </p>
              <p>
                <strong>Android & Programming:</strong> Android Development (Java, Kotlin), REST API Integration, Git & Version Control, Material Design
              </p>
              <p>
                <strong>IT Support:</strong> Hardware/Software Maintenance, Windows Installation & Setup, System Diagnostics & Repair, Microsoft Office Suite
              </p>
            </div>
          </section>

          {/* ============================================================
              4. EXPERIENCE (Maksimal 2 Bullet per Posisi)
             ============================================================ */}
          <section className="mb-4">
            <h2 className="text-sm font-bold text-black mb-2 uppercase border-b border-gray-300 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id" ? "PENGALAMAN KERJA" : "WORK EXPERIENCE"}
            </h2>

            <div className="space-y-3">
              {/* Android Developer Intern - BRIN */}
              <div className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Android Native Developer — {lang === "id" ? "BRIN (Kebun Raya Cibinong)" : "BRIN (Cibinong Botanical Garden)"}
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {lang === "id" ? "Jul 2026 - Agu 2026" : "Jul 2026 - Aug 2026"}
                  </p>
                </div>
                <p className="text-xs text-gray-600 italic mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {lang === "id" ? "Cibinong, Bogor, Jawa Barat" : "Cibinong, Bogor, West Java"}
                </p>
                <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5 pl-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <li>
                    {lang === "id"
                      ? "Mengembangkan Sistem Pelaporan Terpadu Internal Operasional Kebun Raya Cibinong menggunakan Android native (Java) dengan integrasi REST API"
                      : "Developed Integrated Internal Operational Reporting System for Cibinong Botanical Garden using Android native (Java) with REST API integration"}
                  </li>
                  <li>
                    {lang === "id"
                      ? "Menyelesaikan program magang dengan predikat SANGAT BAIK (Sertifikat ID: SE-KM-002/MAP-VIII/2026)"
                      : "Completed internship program with EXCELLENT predicate (Certificate ID: SE-KM-002/MAP-VIII/2026)"}
                  </li>
                </ul>
              </div>

              {/* IT Support - PT. Trima Anugrah Sejahtera */}
              <div className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                    IT Support — PT. Trima Anugrah Sejahtera
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {lang === "id" ? "Mar 2025 - Jul 2026" : "Mar 2025 - Jul 2026"}
                  </p>
                </div>
                <p className="text-xs text-gray-600 italic mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Jakarta, Indonesia
                </p>
                <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5 pl-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <li>
                    {lang === "id"
                      ? "Menangani troubleshooting hardware/software, instalasi OS Windows, dan perawatan sistem IT kantor"
                      : "Handled hardware/software troubleshooting, Windows OS installation, and office IT system maintenance"}
                  </li>
                  <li>
                    {lang === "id"
                      ? "Memberikan technical support kepada 50+ pengguna dan mengurangi downtime sistem hingga 30%"
                      : "Provided technical support to 50+ users and reduced system downtime by 30%"}
                  </li>
                </ul>
              </div>

              {/* IT Support - ID-Networkers */}
              <div className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                    IT Support — ID-Networkers
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {lang === "id" ? "Des 2024 - Mar 2025" : "Dec 2024 - Mar 2025"}
                  </p>
                </div>
                <p className="text-xs text-gray-600 italic mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Jakarta, Indonesia
                </p>
                <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5 pl-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <li>
                    {lang === "id"
                      ? "Melakukan konfigurasi jaringan, troubleshooting koneksi, dan perawatan perangkat networking"
                      : "Performed network configuration, connection troubleshooting, and networking device maintenance"}
                  </li>
                  <li>
                    {lang === "id"
                      ? "Mendokumentasikan solusi teknis dan membuat panduan troubleshooting untuk tim internal"
                      : "Documented technical solutions and created troubleshooting guides for internal team"}
                  </li>
                </ul>
              </div>

              {/* Assistant Project Manager - PT. Telnusa Intrakom */}
              <div className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Assistant Project Manager — PT. Telnusa Intrakom
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {lang === "id" ? "Des 2023" : "Dec 2023"}
                  </p>
                </div>
                <p className="text-xs text-gray-600 italic mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {lang === "id" ? "Pontianak, Kalimantan Barat" : "Pontianak, West Kalimantan"}
                </p>
                <ul className="list-disc list-inside text-xs text-gray-800 space-y-0.5 pl-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <li>
                    {lang === "id"
                      ? "Mengkoordinasikan instalasi VSAT untuk 3 lokasi remote di Kalimantan Barat dengan tim teknisi lapangan"
                      : "Coordinated VSAT installation for 3 remote locations in West Kalimantan with field technician team"}
                  </li>
                  <li>
                    {lang === "id"
                      ? "Memastikan instalasi selesai tepat waktu dan sesuai standar teknis perusahaan"
                      : "Ensured installations completed on time and met company technical standards"}
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* ============================================================
              5. EDUCATION (Ringkas 1-2 Baris per Institusi)
             ============================================================ */}
          <section className="mb-4 break-inside-avoid">
            <h2 className="text-sm font-bold text-black mb-2 uppercase border-b border-gray-300 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id" ? "PENDIDIKAN" : "EDUCATION"}
            </h2>

            <div className="space-y-2">
              {/* PENS */}
              <div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                    {lang === "id" 
                      ? "Politeknik Elektronika Negeri Surabaya (PENS)" 
                      : "Politeknik Elektronika Negeri Surabaya (PENS)"}
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    2026 - 2030
                  </p>
                </div>
                <p className="text-xs text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {lang === "id" 
                    ? "Sarjana Terapan (D4) Teknik Rekayasa Internet — Surabaya, Jawa Timur"
                    : "Bachelor of Applied Science (D4) Internet Engineering — Surabaya, East Java"}
                </p>
              </div>

              {/* SMK */}
              <div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-xs font-bold text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
                    SMK Dinamika Pembangunan 1 Jakarta
                  </p>
                  <p className="text-xs text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    2023 - 2026
                  </p>
                </div>
                <p className="text-xs text-gray-700" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {lang === "id"
                    ? "Teknik Komputer dan Jaringan (TKJ) — Jakarta, Indonesia"
                    : "Computer and Network Engineering (TKJ) — Jakarta, Indonesia"}
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================
              6. CERTIFICATIONS (List Singkat)
             ============================================================ */}
          <section className="break-inside-avoid">
            <h2 className="text-sm font-bold text-black mb-2 uppercase border-b border-gray-300 pb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              {lang === "id" ? "SERTIFIKASI" : "CERTIFICATIONS"}
            </h2>

            <ul className="text-xs text-gray-800 space-y-1" style={{ fontFamily: 'Arial, sans-serif' }}>
              <li>
                • <strong>Sertifikat Kelulusan Magang — Android Native Developer</strong> — BRIN (Kebun Raya Cibinong), {lang === "id" ? "Agustus" : "August"} 2026 (ID: SE-KM-002/MAP-VIII/2026, {lang === "id" ? "Predikat: SANGAT BAIK" : "Predicate: EXCELLENT"})
              </li>
              <li>
                • <strong>MikroTik Certified Network Associate (MTCNA)</strong> — MikroTik, 2024 (Score: 88%)
              </li>
              <li>
                • <strong>Finalist, IONIC IoT & Networking Competition</strong> — Politeknik Elektronika Negeri Surabaya (PENS), 2025
              </li>
              <li>
                • <strong>Sertifikat Kompetensi Keahlian Teknik Komputer dan Jaringan (TKJ)</strong> — SMK Dinamika Pembangunan 1 Jakarta, 2026
              </li>
            </ul>
          </section>

        </main>
      </div>

      {/* Print-specific CSS */}
      <style jsx global>{`
        @page {
          size: A4;
          margin: 12mm; /* Dikurangi dari 15mm */
        }

        @media print {
          .no-print {
            display: none !important;
          }

          body {
            background: white;
          }

          main {
            max-width: 100%;
            margin: 0;
            padding: 0 !important;
            box-shadow: none;
          }

          * {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          section {
            page-break-inside: avoid;
          }

          /* Optimasi spacing untuk 1 halaman */
          h2 {
            margin-bottom: 6px !important; /* Dikurangi dari ~8-10px */
          }

          p {
            margin-bottom: 0 !important;
          }

          .space-y-1 > * + * {
            margin-top: 3px !important; /* Dikurangi dari 4px */
          }

          .space-y-1\.5 > * + * {
            margin-top: 4px !important; /* Dikurangi dari 6px */
          }

          .space-y-2 > * + * {
            margin-top: 6px !important; /* Dikurangi dari 8px */
          }

          .space-y-3 > * + * {
            margin-top: 9px !important; /* Dikurangi dari 12px */
          }

          .mb-4 {
            margin-bottom: 10px !important; /* Dikurangi dari 16px */
          }

          .mb-5 {
            margin-bottom: 12px !important; /* Dikurangi dari 20px */
          }

          .pb-1 {
            padding-bottom: 3px !important; /* Dikurangi dari 4px */
          }

          .mb-0\.5 {
            margin-bottom: 1.5px !important; /* Dikurangi dari 2px */
          }

          .mb-1 {
            margin-bottom: 3px !important; /* Dikurangi dari 4px */
          }

          .mb-2 {
            margin-bottom: 6px !important; /* Dikurangi dari 8px */
          }

          /* Perkecil line-height summary untuk lebih ringkas */
          .leading-relaxed {
            line-height: 1.4 !important; /* Dikurangi dari 1.625 */
          }

          /* Optimasi spacing untuk 1 halaman */
          h2 {
            margin-bottom: 6px !important; /* Dikurangi dari ~8-10px */
          }

          p {
            margin-bottom: 0 !important;
          }

          .space-y-1 > * + * {
            margin-top: 3px !important; /* Dikurangi dari 4px */
          }

          .space-y-2 > * + * {
            margin-top: 6px !important; /* Dikurangi dari 8px */
          }

          .mb-4 {
            margin-bottom: 10px !important; /* Dikurangi dari 16px */
          }

          .mb-5 {
            margin-bottom: 12px !important; /* Dikurangi dari 20px */
          }

          .pb-1 {
            padding-bottom: 3px !important; /* Dikurangi dari 4px */
          }
        }
      `}</style>
    </>
  );
}
