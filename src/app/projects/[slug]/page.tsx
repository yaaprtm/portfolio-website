"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  UserCheck,
  Users,
  CheckCircle2,
  AlertTriangle,
  Image as ImageIcon,
  X,
  Maximize2,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = caseStudies[slug];

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!study) {
    return (
      <div className="min-h-screen bg-[#F0EEE9] text-warm-dark flex flex-col items-center justify-center p-6 text-center">
        <h1 className="font-display font-extrabold text-3xl mb-4">Case Study Tidak Ditemukan</h1>
        <p className="text-warm-gray mb-6">Proyek yang Anda cari belum memiliki halaman case study.</p>
        <Link
          href="/"
          className="btn-primary"
        >
          <ArrowLeft size={16} className="mr-2" /> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen pt-28 sm:pt-36 pb-20 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F0EEE9] text-warm-dark font-sans">
        {/* Back Link Button */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warm-card border border-warm-dark/10 text-xs font-semibold uppercase tracking-wider text-warm-dark hover:bg-olive-500 hover:text-white transition-all"
          >
            <ArrowLeft size={14} className="text-olive-500 group-hover:text-white" />
            <span>Kembali ke Portofolio Proyek</span>
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="editorial-card p-6 sm:p-10 mb-10"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-olive-500 text-white">
              {study.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#F0EEE9] text-warm-dark border border-warm-dark/10 flex items-center gap-1.5">
              <Calendar size={13} className="text-olive-500" />
              {study.period}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-warm-dark tracking-tight leading-tight mb-4">
            {study.title}
          </h1>

          <p className="text-warm-gray text-base sm:text-lg leading-relaxed mb-6 font-normal">
            {study.tagline}
          </p>

          {/* Quick Meta Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-warm-dark/10 text-xs">
            <div className="p-4 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 flex items-center gap-3">
              <UserCheck size={20} className="text-olive-500 flex-shrink-0" />
              <div>
                <p className="text-warm-muted text-[10px] font-bold uppercase tracking-wider">Peran Saya</p>
                <p className="text-warm-dark font-bold">{study.role}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 flex items-center gap-3">
              <Users size={20} className="text-olive-500 flex-shrink-0" />
              <div>
                <p className="text-warm-muted text-[10px] font-bold uppercase tracking-wider">Struktur Tim & Kolaborasi</p>
                <p className="text-warm-dark font-bold">{study.team}</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-[#F0EEE9] border border-warm-dark/10 text-xs font-semibold text-warm-dark"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Content Details */}
        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="editorial-card p-6 sm:p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-olive-500 block mb-2">01 / Overview</span>
            <h2 className="font-display font-extrabold text-2xl text-warm-dark mb-4">1. Ringkasan Proyek & Peran</h2>
            <p className="text-warm-gray text-base leading-relaxed">{study.summary}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="editorial-card p-6 sm:p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-olive-500 block mb-2">02 / Background</span>
            <h2 className="font-display font-extrabold text-2xl text-warm-dark mb-4">2. Latar Belakang & Masalah</h2>
            <p className="text-warm-gray text-base leading-relaxed">{study.problem}</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="editorial-card p-6 sm:p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-olive-500 block mb-2">03 / Workflow</span>
            <h2 className="font-display font-extrabold text-2xl text-warm-dark mb-6">3. Tahapan Pengerjaan & Tim</h2>
            <div className="space-y-3">
              {study.process.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 text-warm-dark text-sm font-medium">
                  {step}
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="editorial-card p-6 sm:p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-olive-500 block mb-2">04 / Challenges</span>
            <h2 className="font-display font-extrabold text-2xl text-warm-dark mb-6">4. Tantangan Teknis & Solusi</h2>
            <div className="space-y-4">
              {study.challenges.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 space-y-3">
                  <div className="flex items-start gap-2 text-warm-dark text-sm font-bold">
                    <AlertTriangle size={18} className="text-olive-500 flex-shrink-0 mt-0.5" />
                    <span>Tantangan: {item.challenge}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-warm-gray text-xs sm:text-sm pl-7 border-l-2 border-olive-500">
                    <span className="font-bold text-olive-500 uppercase tracking-wider">Solusi:</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="editorial-card p-6 sm:p-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-olive-500 block mb-2">05 / Results</span>
            <h2 className="font-display font-extrabold text-2xl text-warm-dark mb-6">5. Hasil Akhir & Pembelajaran</h2>
            <div className="space-y-3">
              {study.results.map((res, idx) => (
                <div key={idx} className="flex items-start gap-3 text-warm-dark text-sm sm:text-base leading-relaxed font-medium">
                  <CheckCircle2 size={20} className="text-olive-500 flex-shrink-0 mt-1" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="editorial-card p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-olive-500 block mb-1">06 / Showcase</span>
                <h2 className="font-display font-extrabold text-2xl text-warm-dark">6. Galeri Screenshot & Diagram</h2>
              </div>
              <span className="text-xs font-semibold text-warm-muted uppercase tracking-wider">Klik untuk memperbesar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {study.gallery.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className="group relative h-56 rounded-2xl bg-warm-card border border-warm-dark/10 overflow-hidden cursor-pointer hover:border-olive-500 transition-all flex flex-col justify-between p-4"
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-warm-dark/40 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
                    <span className="text-xs font-semibold text-white truncate">{item.caption}</span>
                    <Maximize2 size={16} className="text-white flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#projects"
            className="btn-primary inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Kembali ke Halaman Portofolio
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
