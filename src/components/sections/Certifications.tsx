"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Award,
  ExternalLink,
  Calendar,
  Building,
  Maximize2,
  X,
  FileText,
  Eye,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications, Certification } from "@/data/certifications";
import { useLanguage } from "@/context/LanguageContext";

export default function Certifications() {
  const { t } = useLanguage();
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        tag={t.certifications.tag}
        title={t.certifications.title}
        subtitle={t.certifications.subtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => {
          const pdfPath = cert.fileUrl || cert.credentialUrl;
          const isPdf = pdfPath?.toLowerCase().endsWith(".pdf");

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card p-6 skill-card flex flex-col justify-between overflow-hidden border border-white/10 rounded-2xl group transition-all duration-300"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded-md font-mono font-semibold text-xs bg-white/[0.05] text-slate-200 border border-white/10 shadow-sm">
                    {cert.shortName}
                  </span>
                  <Award size={20} className="text-slate-400 group-hover:text-cyan-neon transition-colors" />
                </div>

                {/* PDF Document Preview Card Badge */}
                {pdfPath && (
                  <div
                    onClick={() => setActiveCert(cert)}
                    className="relative w-full p-3.5 rounded-xl mb-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 cursor-pointer group/pdf transition-all flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 flex-shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-mono font-bold text-slate-200 truncate group-hover/pdf:text-cyan-neon transition-colors">
                          Dokumen PDF Sertifikat
                        </p>
                        <p className="text-[10px] font-mono text-slate-400 truncate">
                          {pdfPath.split("/").pop()}
                        </p>
                      </div>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover/pdf:border-cyan-neon/40 group-hover/pdf:text-cyan-neon flex-shrink-0">
                      <Eye size={14} />
                    </div>
                  </div>
                )}

                {/* Certificate Name */}
                <h3 className="font-semibold text-slate-100 text-base mb-2 leading-snug group-hover:text-cyan-neon transition-colors">
                  {cert.name}
                </h3>

                {/* Issuer & Date */}
                <div className="flex items-center gap-2 text-slate-400 text-xs mb-1.5">
                  <Building size={13} />
                  <span>{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                  <Calendar size={13} />
                  <span>{cert.date}</span>
                </div>

                {/* Description */}
                {cert.description && (
                  <p className="text-slate-300 text-xs leading-relaxed mb-4 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {pdfPath && (
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveCert(cert)}
                    className="flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-cyan-neon transition-colors"
                  >
                    <Eye size={13} />
                    <span>Pratinjau PDF</span>
                  </button>

                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-neon hover:underline"
                  >
                    <span>Buka File</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* PDF / Image Document Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[85vh] glass-card p-6 border border-white/20 shadow-2xl flex flex-col justify-between space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-md font-mono font-semibold text-xs bg-cyan-soft border border-cyan-neon/30 text-cyan-neon">
                      {activeCert.shortName}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{activeCert.issuer}</span>
                  </div>
                  <h3 className="text-slate-100 font-bold text-lg">{activeCert.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  {(activeCert.fileUrl || activeCert.credentialUrl) && (
                    <a
                      href={activeCert.fileUrl || activeCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-cyan-soft border border-cyan-neon/30 text-cyan-neon text-xs font-mono font-semibold flex items-center gap-1.5 hover:bg-cyan-neon/20 transition-all min-h-[44px]"
                    >
                      <span>Buka Tab Baru</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Tutup PDF Modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Frame Viewer */}
              <div className="relative flex-1 w-full rounded-xl overflow-hidden bg-navy-950 border border-white/10">
                {activeCert.fileUrl || activeCert.credentialUrl ? (
                  <iframe
                    src={activeCert.fileUrl || activeCert.credentialUrl}
                    title={activeCert.name}
                    className="w-full h-full border-none"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-sm font-mono">
                    Dokumen PDF tidak ditemukan.
                  </div>
                )}
              </div>

              {/* Footer info */}
              {activeCert.description && (
                <div className="text-left pt-2 border-t border-white/10">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {activeCert.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
