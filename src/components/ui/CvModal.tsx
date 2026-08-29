"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, Check, Award, Briefcase, GraduationCap } from "lucide-react";
import { useState } from "react";
import { certifications } from "@/data/certifications";

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
            className="fixed inset-0 bg-mono-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl bg-[#FAFAFA] border border-mono-border p-6 sm:p-8 rounded-3xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-mono-black"
          >
            {/* Header Action Bar */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-mono-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-mono-black text-white flex items-center justify-center">
                  <FileText size={20} />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-mono-black text-lg">Curriculum Vitae</h3>
                  <p className="text-mono-gray text-xs font-bold uppercase tracking-wider">Arya Putra Pratama · Official Resume</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-full border border-mono-black bg-mono-card text-xs font-bold text-mono-black hover:bg-mono-black hover:text-white transition-all flex items-center gap-1.5"
                >
                  {copied ? <Check size={14} /> : null}
                  {copied ? "Link Copied" : "Share"}
                </button>
                <a
                  href="/print"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-mono-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-mono-gray transition-all"
                >
                  <FileText size={14} />
                  Print / Save as PDF
                </a>
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full text-mono-black hover:bg-mono-card transition-all ml-2"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Resume Content */}
            <div className="space-y-6 text-sm leading-relaxed">
              {/* Profile Header */}
              <div className="bg-mono-card border border-mono-border p-5 rounded-2xl">
                <h2 className="font-display font-extrabold text-2xl text-mono-black mb-1">ARYA PUTRA PRATAMA</h2>
                <p className="text-mono-black font-extrabold text-xs uppercase tracking-wider mb-3">
                  STr. Teknik Rekayasa Internet (PENS Surabaya) · IT Support Technician · Android Dev Intern
                </p>
                <p className="text-mono-gray text-xs leading-relaxed font-medium">
                  Siswa/Mahasiswa berorientasi praktis di bidang Teknik Komputer & Jaringan, IT Support, dan Android Development. Berpengalaman magang di Badan Riset dan Inovasi Nasional (BRIN) mengembangkan aplikasi & web Kebun Raya Cibinong.
                </p>
              </div>

              {/* Education */}
              <div>
                <h4 className="font-display text-xs font-extrabold text-mono-black tracking-widest uppercase mb-3 flex items-center gap-2">
                  <GraduationCap size={16} /> Riwayat Pendidikan
                </h4>
                <div className="space-y-3">
                  <div className="border-l-2 border-mono-black pl-4">
                    <p className="font-bold text-mono-black text-xs">Politeknik Elektronika Negeri Surabaya (PENS)</p>
                    <p className="text-mono-gray text-xs font-bold uppercase tracking-wider">STr. Teknik Rekayasa Internet · 2026 - 2030</p>
                  </div>
                  <div className="border-l-2 border-mono-border pl-4">
                    <p className="font-bold text-mono-black text-xs">SMK Dinamika Pembangunan 1 Jakarta</p>
                    <p className="text-mono-gray text-xs font-bold uppercase tracking-wider">Teknik Komputer dan Jaringan (TKJ) · 2023 - 2026</p>
                  </div>
                </div>
              </div>

              {/* Work & Internship Experience */}
              <div>
                <h4 className="font-display text-xs font-extrabold text-mono-black tracking-widest uppercase mb-3 flex items-center gap-2">
                  <Briefcase size={16} /> Pengalaman Kerja & Magang
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="bg-mono-card p-4 rounded-2xl border border-mono-border">
                    <div className="flex justify-between font-bold text-mono-black mb-1 uppercase tracking-wider">
                      <span>Android Developer Intern — BRIN</span>
                      <span className="text-mono-muted">Juli 2026 - Agu 2026</span>
                    </div>
                    <p className="text-mono-gray font-medium">Pengembangan aplikasi mobile Kebun Raya Cibinong dalam tim 4 orang (1 FE, 2 BE, 1 Android).</p>
                  </div>

                  <div className="bg-mono-card p-4 rounded-2xl border border-mono-border">
                    <div className="flex justify-between font-bold text-mono-black mb-1 uppercase tracking-wider">
                      <span>IT Support — PT. Trima Anugrah Sejahtera</span>
                      <span className="text-mono-muted">Mar 2025 - Juli 2026</span>
                    </div>
                    <p className="text-mono-gray font-medium">Pemeliharaan dasar komputer dan jaringan rutin, troubleshooting hardware/software, instalasi OS.</p>
                  </div>

                  <div className="bg-mono-card p-4 rounded-2xl border border-mono-border">
                    <div className="flex justify-between font-bold text-mono-black mb-1 uppercase tracking-wider">
                      <span>IT Support — ID-Networkers</span>
                      <span className="text-mono-muted">Des 2024 - Mar 2025</span>
                    </div>
                    <p className="text-mono-gray font-medium">Troubleshooting teknis, maintenance perangkat jaringan & infrastruktur IT operasional.</p>
                  </div>

                  <div className="bg-mono-card p-4 rounded-2xl border border-mono-border">
                    <div className="flex justify-between font-bold text-mono-black mb-1 uppercase tracking-wider">
                      <span>Assistant Project Manager — PT. Telnusa Intrakom</span>
                      <span className="text-mono-muted">Desember 2023</span>
                    </div>
                    <p className="text-mono-gray font-medium">Koordinasi lapangan instalasi VSAT di Kalimantan Barat, pemantauan progress & dokumentasi teknis.</p>
                  </div>
                </div>
              </div>

              {/* Certifications & Achievements */}
              <div>
                <h4 className="font-display text-xs font-extrabold text-mono-black tracking-widest uppercase mb-3 flex items-center gap-2">
                  <Award size={16} /> Sertifikasi & Prestasi
                </h4>
                <ul className="list-disc list-inside text-xs text-mono-gray space-y-1 font-medium">
                  {certifications.map((cert) => (
                    <li key={cert.id}>
                      <strong className="text-mono-black">{cert.name}</strong> — {cert.issuer} ({cert.date})
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
