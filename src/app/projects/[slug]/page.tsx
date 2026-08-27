"use client";

import { useState } from "react";
import { notFound, useParams } from "next/navigation";
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
  Award,
  Layers,
  Image as ImageIcon,
  X,
  Maximize2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import NetworkNavigation from "@/components/layout/NetworkNavigation";
import LiquidBackground from "@/components/ui/LiquidBackground";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/ui/AiAssistant";
import Badge from "@/components/ui/Badge";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const study = caseStudies[slug];

  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!study) {
    return (
      <div className="min-h-screen bg-navy-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Case Study Tidak Ditemukan</h1>
        <p className="text-slate-400 mb-6">Proyek yang Anda cari belum memiliki halaman case study.</p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-cyan-neon text-[var(--color-cyan-text)] font-mono text-sm font-bold flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Background & Navigation */}
      <LiquidBackground />
      <NetworkNavigation />

      <main className="min-h-screen pt-28 sm:pt-36 pb-20 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link Button */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/40 transition-all shadow-md"
          >
            <ArrowLeft size={14} className="text-cyan-neon" />
            <span>Kembali ke Portofolio Proyek</span>
          </Link>
        </motion.div>

        {/* ============================================================
            1. HEADER SECTION
           ============================================================ */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 sm:p-10 mb-10 border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-soft text-cyan-neon border border-cyan-neon/30 font-bold uppercase">
              {study.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/[0.04] text-slate-300 border border-white/10 flex items-center gap-1.5">
              <Calendar size={12} className="text-cyan-neon" />
              {study.period}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight mb-4">
            {study.title}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
            {study.tagline}
          </p>

          {/* Quick Meta Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 border-t border-white/10 text-xs font-mono">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <UserCheck size={18} className="text-cyan-neon flex-shrink-0" />
              <div>
                <p className="text-slate-500 text-[10px] uppercase">Peran Saya</p>
                <p className="text-slate-200 font-semibold">{study.role}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <Users size={18} className="text-cyan-neon flex-shrink-0" />
              <div>
                <p className="text-slate-500 text-[10px] uppercase">Struktur Tim & Kolaborasi</p>
                <p className="text-slate-200 font-semibold">{study.team}</p>
              </div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <Badge key={tech} variant="cyan">
                {tech}
              </Badge>
            ))}
          </div>
        </motion.header>

        {/* ============================================================
            MAIN CONTENT BODY (Case Study Details)
           ============================================================ */}
        <div className="space-y-10">
          {/* 2. RINGKASAN PROYEK */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">{"// Overview"}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">1. Ringkasan Proyek & Peran</h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {study.summary}
            </p>
          </motion.section>

          {/* 3. LATAR BELAKANG MASALAH */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">{"// Background"}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">2. Latar Belakang & Masalah</h2>
            </div>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {study.problem}
            </p>
          </motion.section>

          {/* 4. PROSES PENGERJAAN & KOLABORASI */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">{"// Workflow"}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">3. Tahapan Pengerjaan & Tim</h2>
            </div>
            <div className="space-y-4">
              {study.process.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 text-sm leading-relaxed"
                >
                  {step}
                </div>
              ))}
            </div>
          </motion.section>

          {/* 5. TANTANGAN & SOLUSI TEKNIS */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">{"// Engineering Challenges"}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">4. Tantangan Teknis & Solusi</h2>
            </div>
            <div className="space-y-4">
              {study.challenges.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-start gap-2.5 text-amber-400 text-sm font-semibold">
                    <AlertTriangle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>Tantangan: {item.challenge}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm pl-7 border-l-2 border-cyan-neon/40 leading-relaxed">
                    <span className="font-bold text-cyan-neon font-mono">Solusi:</span>
                    <span>{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 6. HASIL & DAMPAK */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">{"// Deliverables"}</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100">5. Hasil Akhir & Pembelajaran</h2>
            </div>
            <div className="space-y-3">
              {study.results.map((res, idx) => (
                <div key={idx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                  <CheckCircle2 size={18} className="text-cyan-neon flex-shrink-0 mt-1" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 7. GALERI VISUAL (With Interactive Lightbox Modal) */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sm:p-8"
          >
            <div className="flex items-center justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-mono text-cyan-neon uppercase tracking-widest">{"// Visual Showcase"}</span>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-100">6. Galeri Screenshot & Diagram</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">Klik untuk memperbesar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {study.gallery.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImageIndex(idx)}
                  className="group relative h-56 rounded-2xl bg-white/[0.03] border border-white/10 overflow-hidden cursor-pointer hover:border-cyan-neon/40 transition-all flex flex-col justify-between p-4"
                >
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.caption}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-cyan-neon font-mono text-xs font-bold border border-white/10">
                      0{item.id}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center text-slate-300 group-hover:text-cyan-neon transition-colors border border-white/10">
                      <Maximize2 size={14} />
                    </div>
                  </div>

                  {!item.src && (
                    <div className="relative z-10 my-auto text-center p-2">
                      <ImageIcon size={32} className="mx-auto text-slate-600 group-hover:text-cyan-neon transition-colors mb-2" />
                      <p className="text-xs font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                        {item.placeholderText}
                      </p>
                    </div>
                  )}

                  <div className="relative z-10">
                    <p className="text-[11px] font-mono text-slate-200 font-semibold truncate drop-shadow">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Back Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/#projects"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-mono font-bold"
          >
            <ArrowLeft size={16} /> Kembali ke Halaman Portofolio
          </Link>
        </div>
      </main>

      {/* LIGHTBOX MODAL FOR GALLERY IMAGES */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImageIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full glass-card p-6 sm:p-8 border border-white/20 shadow-2xl text-center"
            >
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={20} />
              </button>

              <div className="relative h-72 sm:h-96 w-full rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden flex items-center justify-center mb-4">
                {study.gallery[activeImageIndex].src ? (
                  <Image
                    src={study.gallery[activeImageIndex].src!}
                    alt={study.gallery[activeImageIndex].caption}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="p-6">
                    <ImageIcon size={56} className="mx-auto text-cyan-neon mb-3 animate-bounce" />
                    <h3 className="text-slate-100 font-bold text-lg mb-1">
                      {study.gallery[activeImageIndex].placeholderText}
                    </h3>
                    <p className="text-slate-400 text-xs font-mono">
                      Placeholder Screenshot / Diagram Visual Proyek
                    </p>
                  </div>
                )}
              </div>

              <p className="text-slate-200 text-sm font-mono">
                {study.gallery[activeImageIndex].caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <AiAssistant />
    </>
  );
}
