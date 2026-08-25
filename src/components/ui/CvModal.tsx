"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Check, Award, Briefcase, GraduationCap } from "lucide-react";
import { useState } from "react";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CvModal({ isOpen, onClose }: CvModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl glass-card border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-200"
          >
            {/* Header Action Bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center">
                  <FileText size={20} className="text-cyan-neon" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-100 text-lg">Curriculum Vitae</h3>
                  <p className="text-slate-400 text-xs font-mono">Arya Putra Pratama · Official Resume</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.04] text-xs font-mono text-slate-300 hover:text-slate-100 transition-all flex items-center gap-1.5"
                >
                  {copied ? <Check size={14} className="text-cyan-neon" /> : null}
                  {copied ? "Link Copied" : "Share"}
                </button>
                <a
                  href="/print"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg border border-cyan-neon/40 bg-cyan-soft text-cyan-neon text-xs font-mono flex items-center gap-1.5 hover:bg-cyan-neon hover:text-[var(--color-cyan-text)] transition-all font-semibold"
                >
                  <FileText size={14} />
                  Printable PDF
                </a>
                <a
                  href="/docs/CV-Arya-Putra-Pratama.pdf"
                  download="CV_Arya_Putra_Pratama.pdf"
                  className="btn-primary px-3.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5"
                >
                  <Download size={14} />
                  Download PDF
                </a>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all ml-2"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="space-y-6 text-sm leading-relaxed">
              {/* Profile Header */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <h2 className="text-xl font-bold text-slate-100 mb-1">ARYA PUTRA PRATAMA</h2>
                <p className="text-cyan-neon font-mono text-xs mb-3">
                  STr. Teknik Rekayasa Internet (PENS Surabaya) · IT Support Technician · Android Dev Intern
                </p>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Siswa/Mahasiswa berorientasi praktis di bidang Teknik Komputer & Jaringan, IT Support, dan Android Development. Berpengalaman magang di Badan Riset dan Inovasi Nasional (BRIN) mengembangkan aplikasi & web Kebun Raya Cibinong.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-cyan-neon tracking-wider uppercase mb-3 flex items-center gap-2">
                  <GraduationCap size={16} /> Riwayat Pendidikan
                </h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-cyan-neon pl-3">
                    <p className="font-bold text-slate-100 text-xs">Politeknik Elektronika Negeri Surabaya (PENS)</p>
                    <p className="text-slate-400 text-xs font-mono">STr. Teknik Rekayasa Internet · 2026 - 2030</p>
                  </div>
                  <div className="border-l-2 border-white/20 pl-3">
                    <p className="font-bold text-slate-200 text-xs">SMK Dinamika Pembangunan 1 Jakarta</p>
                    <p className="text-slate-400 text-xs font-mono">Teknik Komputer dan Jaringan (TKJ) · 2023 - 2026</p>
                  </div>
                </div>
              </div>

              {/* Work & Internship Experience */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-cyan-neon tracking-wider uppercase mb-3 flex items-center gap-2">
                  <Briefcase size={16} /> Pengalaman Kerja & Magang
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <div className="flex justify-between font-mono text-slate-300 font-semibold mb-1">
                      <span>IT Maintenance — Digital Solusindo</span>
                      <span className="text-slate-500">Mar 2025 - Present</span>
                    </div>
                    <p className="text-slate-400">Pemeliharaan perangkat jaringan, troubleshooting hardware/software, dan instalasi sistem.</p>
                  </div>

                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <div className="flex justify-between font-mono text-slate-300 font-semibold mb-1">
                      <span>IT Support Technician — ID-Networkers</span>
                      <span className="text-slate-500">Des 2024 - Mar 2025</span>
                    </div>
                    <p className="text-slate-400">Troubleshooting teknis pengguna, maintenance perangkat jaringan & infrastruktur IT.</p>
                  </div>

                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <div className="flex justify-between font-mono text-slate-300 font-semibold mb-1">
                      <span>Android Developer Intern — Badan Riset dan Inovasi Nasional (BRIN)</span>
                      <span className="text-slate-500">2024 · 2 Bulan</span>
                    </div>
                    <p className="text-slate-400">Bekerja dalam tim 4 orang (1 FE, 2 BE, 1 Android) membangun aplikasi mobile & web Kebun Raya Cibinong.</p>
                  </div>
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-cyan-neon tracking-wider uppercase mb-3 flex items-center gap-2">
                  <Award size={16} /> Sertifikasi & Prestasi
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-300 space-y-1 font-mono">
                  <li>MikroTik Certified Network Associate (MTCNA) — Skor 88% (2024)</li>
                  <li>Finalist IONIC IoT & Networking PENS (2025)</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
