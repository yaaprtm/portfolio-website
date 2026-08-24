"use client";

import { useLanguage } from "@/context/LanguageContext";
import { workExperiences, educationList } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { certifications } from "@/data/certifications";
import Link from "next/link";
import { ArrowLeft, Printer, Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";
import LanguageToggle from "@/components/ui/LanguageToggle";

export default function PrintPortfolioPage() {
  const { t, lang } = useLanguage();

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans print:bg-white print:text-black">
      {/* Top Floating Control Bar (Hidden when printing) */}
      <header className="no-print sticky top-0 z-50 bg-navy-950/90 backdrop-blur-md border-b border-white/10 text-white py-3 px-4 sm:px-8 shadow-xl">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-semibold flex items-center gap-2 transition-all"
            >
              <ArrowLeft size={14} />
              {t.print.backHome}
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
              | {t.print.pageTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <button
              onClick={handlePrint}
              className="btn-primary px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <Printer size={16} />
              {t.print.downloadPdf}
            </button>
          </div>
        </div>
      </header>

      {/* Main Printable Document Container */}
      <main className="max-w-4xl mx-auto bg-white p-8 sm:p-12 print:p-0 print:max-w-none text-slate-900 leading-relaxed font-sans shadow-xl print:shadow-none my-6 print:my-0 rounded-2xl print:rounded-none">
        
        {/* ============================================================
            1. HEADER & ABOUT SECTION
           ============================================================ */}
        <section className="border-b-2 border-slate-900 pb-6 mb-6 break-inside-avoid">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
                Arya Putra Pratama
              </h1>
              <p className="text-sm font-semibold text-blue-700 print:text-slate-800 font-mono mt-1">
                {t.print.headerRole}
              </p>
              <p className="text-xs text-slate-600 font-mono mt-0.5">
                Surabaya / Jakarta, Indonesia · STr. Teknik Rekayasa Internet (PENS Surabaya &apos;26 - &apos;30)
              </p>
            </div>

            <div className="text-xs font-mono space-y-1 text-slate-700">
              <p className="flex items-center gap-1.5">
                <Mail size={12} className="text-slate-500" />
                aryattt45@gmail.com
              </p>
              <p className="flex items-center gap-1.5">
                <Phone size={12} className="text-slate-500" />
                +62 838-9022-7712
              </p>
              <p className="flex items-center gap-1.5">
                <Linkedin size={12} className="text-slate-500" />
                linkedin.com/in/arya-putra-pratama-848871338
              </p>
              <p className="flex items-center gap-1.5">
                <Globe size={12} className="text-slate-500" />
                aryaputrapratama.vercel.app
              </p>
            </div>
          </div>

          {/* Profile Bio */}
          <div className="mt-4 pt-4 border-t border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>
              {lang === "id"
                ? "IT Enthusiast dan Mahasiswa STr. Teknik Rekayasa Internet di Politeknik Elektronika Negeri Surabaya (PENS) dengan latar belakang kuat di bidang Networking, IT Support, dan Android Mobile Development. Berpengalaman magang sebagai Android Developer di BRIN (Kebun Raya Cibinong App) dan sebagai Assistant Project Manager instalasi VSAT di Kalimantan Barat."
                : "IT Enthusiast and D4 Internet Engineering student at Politeknik Elektronika Negeri Surabaya (PENS) with a solid background in Networking, IT Support, and Android Mobile Development. Experienced as an Android Developer Intern at BRIN (Kebun Raya Cibinong App) and Assistant Project Manager for VSAT installation in West Kalimantan."}
            </p>
          </div>
        </section>

        {/* ============================================================
            2. TECHNICAL SKILLS SECTION
           ============================================================ */}
        <section className="mb-6 break-inside-avoid">
          <h2 className="text-base font-bold font-mono text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
            {t.print.skillsTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg print:border-slate-300">
                <h3 className="font-bold text-slate-900 font-mono mb-1.5">
                  {cat.title}
                </h3>
                <ul className="space-y-1 text-slate-700">
                  {cat.skills.map((s) => (
                    <li key={s.name} className="flex items-center justify-between">
                      <span>• {s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            3. WORK EXPERIENCE SECTION
           ============================================================ */}
        <section className="mb-6">
          <h2 className="text-base font-bold font-mono text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
            {t.print.experienceTitle}
          </h2>

          <div className="space-y-4">
            {workExperiences.map((exp) => (
              <div key={exp.id} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-mono text-xs mb-1">
                  <div>
                    <span className="font-bold text-sm text-slate-900">{exp.title}</span>
                    <span className="text-slate-600"> — {exp.company}</span>
                  </div>
                  <span className="text-slate-500 font-semibold">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-500 font-mono italic mb-1.5">{exp.location}</p>

                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                  {exp.description.map((desc, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            4. EDUCATION SECTION
           ============================================================ */}
        <section className="mb-6">
          <h2 className="text-base font-bold font-mono text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
            {t.print.educationTitle}
          </h2>

          <div className="space-y-4">
            {educationList.map((edu) => (
              <div key={edu.id} className="break-inside-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between font-mono text-xs mb-1">
                  <div>
                    <span className="font-bold text-sm text-slate-900">{edu.company}</span>
                    <span className="text-slate-600"> — {edu.title}</span>
                  </div>
                  <span className="text-slate-500 font-semibold">{edu.period}</span>
                </div>
                <p className="text-xs text-slate-500 font-mono italic mb-1.5">{edu.location}</p>

                <ul className="list-disc list-inside text-xs text-slate-700 space-y-1 pl-1">
                  {edu.description.map((desc, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            5. TECHNICAL CASE STUDIES (STAR SUMMARY)
           ============================================================ */}
        <section className="mb-6">
          <h2 className="text-base font-bold font-mono text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
            {t.print.caseStudiesTitle}
          </h2>

          <div className="space-y-4">
            {/* VSAT */}
            <div className="break-inside-avoid p-3.5 bg-slate-50 border border-slate-200 rounded-lg print:border-slate-300">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-xs text-slate-900 font-mono">
                  {t.caseStudies.vsat.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-500">PT. Telnusa Intrakom</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>[Situation &amp; Task]</strong> {t.caseStudies.vsat.situation} {t.caseStudies.vsat.task}</p>
                <p><strong>[Action]</strong> {t.caseStudies.vsat.action}</p>
                <p><strong>[Result]</strong> {t.caseStudies.vsat.result}</p>
              </div>
            </div>

            {/* BRIN */}
            <div className="break-inside-avoid p-3.5 bg-slate-50 border border-slate-200 rounded-lg print:border-slate-300">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-bold text-xs text-slate-900 font-mono">
                  {t.caseStudies.brin.title}
                </h3>
                <span className="text-[11px] font-mono text-slate-500">BRIN Internship</span>
              </div>
              <div className="text-xs text-slate-700 space-y-1">
                <p><strong>[Situation &amp; Task]</strong> {t.caseStudies.brin.situation} {t.caseStudies.brin.task}</p>
                <p><strong>[Action]</strong> {t.caseStudies.brin.action}</p>
                <p><strong>[Result]</strong> {t.caseStudies.brin.result}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            6. CERTIFICATIONS & HONORS
           ============================================================ */}
        <section className="break-inside-avoid">
          <h2 className="text-base font-bold font-mono text-slate-900 border-b border-slate-300 pb-1 mb-3 uppercase tracking-wider">
            {t.print.certificationsTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-md print:border-slate-300 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 font-mono">{cert.name}</p>
                  <p className="text-slate-600 text-[11px]">{cert.issuer}</p>
                </div>
                <span className="font-mono text-slate-500 font-semibold">{cert.date}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Print Document Footer */}
        <footer className="mt-8 pt-4 border-t border-slate-300 text-center text-[10px] font-mono text-slate-500">
          <p>
            Generated from Official Portfolio Website: aryaputrapratama.vercel.app · Arya Putra Pratama
          </p>
        </footer>
      </main>
    </div>
  );
}
