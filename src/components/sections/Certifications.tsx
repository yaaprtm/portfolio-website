"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  Calendar,
  Building,
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
    <SectionWrapper id="certifications" className="bg-[#F0EEE9]">
      <SectionHeading
        tag={t.certifications.tag}
        title={t.certifications.title}
        subtitle={t.certifications.subtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, idx) => {
          const pdfPath = cert.fileUrl || cert.credentialUrl;

          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="editorial-card p-6 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F0EEE9] text-olive-500 border border-warm-dark/10">
                    {cert.shortName}
                  </span>
                  <Award size={22} className="text-warm-muted group-hover:text-olive-500 transition-colors" />
                </div>

                {/* PDF Document Preview Card Badge */}
                {pdfPath && (
                  <div
                    onClick={() => setActiveCert(cert)}
                    className="relative w-full p-4 rounded-2xl mb-5 border border-warm-dark/10 bg-[#F0EEE9] hover:bg-warm-card cursor-pointer group/pdf transition-all flex items-center justify-between gap-3 shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-olive-500/10 border border-olive-500/20 flex items-center justify-center text-olive-500 flex-shrink-0">
                        <FileText size={20} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-warm-dark truncate group-hover/pdf:text-olive-500 transition-colors">
                          Dokumen PDF Sertifikat
                        </p>
                        <p className="text-[11px] text-warm-muted truncate font-mono">
                          {pdfPath.split("/").pop()}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-warm-card border border-warm-dark/10 flex items-center justify-center text-warm-dark group-hover/pdf:border-olive-500 group-hover/pdf:text-olive-500 flex-shrink-0">
                      <Eye size={14} />
                    </div>
                  </div>
                )}

                {/* Certificate Name */}
                <h3 className="font-display font-extrabold text-warm-dark text-lg mb-2 leading-snug group-hover:text-olive-500 transition-colors">
                  {cert.name}
                </h3>

                {/* Issuer & Date */}
                <div className="flex items-center gap-2 text-warm-gray text-xs font-semibold uppercase tracking-wider mb-1.5">
                  <Building size={14} className="text-olive-500" />
                  <span>{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 text-warm-muted text-xs font-semibold mb-4">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>

                {/* Description */}
                {cert.description && (
                  <p className="text-warm-gray text-xs leading-relaxed mb-5 bg-[#F0EEE9] p-4 rounded-2xl border border-warm-dark/10">
                    {cert.description}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              {pdfPath && (
                <div className="pt-4 border-t border-warm-dark/10 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveCert(cert)}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-warm-dark hover:text-olive-500 transition-colors"
                  >
                    <Eye size={14} />
                    <span>Pratinjau PDF</span>
                  </button>

                  <a
                    href={pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-olive-500 hover:underline"
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

      {/* PDF Viewer Modal */}
      <AnimatePresence>
        {activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCert(null)}
            className="fixed inset-0 z-50 bg-warm-dark/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[85vh] bg-[#F0EEE9] rounded-3xl p-6 border border-warm-dark/20 shadow-2xl flex flex-col justify-between space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-warm-dark/10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-olive-500 text-white">
                      {activeCert.shortName}
                    </span>
                    <span className="text-xs font-semibold text-warm-gray uppercase tracking-wider">{activeCert.issuer}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-warm-dark text-xl">{activeCert.name}</h3>
                </div>

                <div className="flex items-center gap-2">
                  {(activeCert.fileUrl || activeCert.credentialUrl) && (
                    <a
                      href={activeCert.fileUrl || activeCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-2 px-4 text-xs uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <span>Buka Tab Baru</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setActiveCert(null)}
                    className="p-2.5 rounded-full bg-warm-card text-warm-dark hover:bg-warm-dark hover:text-white transition-colors"
                    aria-label="Tutup PDF Modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Frame Viewer */}
              <div className="relative flex-1 w-full rounded-2xl overflow-hidden bg-warm-card border border-warm-dark/10">
                {activeCert.fileUrl || activeCert.credentialUrl ? (
                  <iframe
                    src={activeCert.fileUrl || activeCert.credentialUrl}
                    title={activeCert.name}
                    className="w-full h-full border-none"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-warm-gray text-sm">
                    Dokumen PDF tidak ditemukan.
                  </div>
                )}
              </div>

              {/* Footer info */}
              {activeCert.description && (
                <div className="text-left pt-3 border-t border-warm-dark/10">
                  <p className="text-warm-gray text-xs sm:text-sm leading-relaxed">
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
