"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar, Building } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionHeading
        tag="05. Certifications"
        title="Sertifikasi"
        subtitle="Bukti kompetensi yang telah diakui secara resmi oleh lembaga industri terpercaya."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            className="glass-card p-5 skill-card group relative overflow-hidden"
          >
            {/* Accent glow blob */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: cert.color }}
            />

            {/* Short name badge */}
            <div className="flex items-center justify-between mb-4">
              <div
                className="px-3 py-1 rounded-lg font-mono font-bold text-xs border"
                style={{
                  color: cert.color,
                  borderColor: `${cert.color}40`,
                  background: `${cert.color}12`,
                }}
              >
                {cert.shortName}
              </div>
              <Award size={18} className="text-slate-700 group-hover:text-slate-500 transition-colors" />
            </div>

            {/* Cert name */}
            <h3 className="font-mono font-semibold text-slate-200 text-sm mb-1 leading-snug group-hover:text-white transition-colors">
              {cert.name}
            </h3>

            {/* Issuer */}
            <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-3">
              <Building size={11} />
              <span>{cert.issuer}</span>
            </div>

            {/* Date info */}
            <div className="flex items-center gap-1.5 text-slate-600 text-xs mb-4">
              <Calendar size={11} />
              <span>
                Issued: {cert.date}
                {cert.expiryDate && ` · Exp: ${cert.expiryDate}`}
              </span>
            </div>

            {/* Credential footer */}
            <div className="pt-3 border-t border-white/5 flex items-center justify-between">
              {cert.credentialId && (
                <span className="font-mono text-[10px] text-slate-700 truncate">
                  ID: {cert.credentialId}
                </span>
              )}
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-mono transition-colors ml-auto"
                  style={{ color: `${cert.color}80` }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = cert.color;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = `${cert.color}80`;
                  }}
                >
                  Verify
                  <ExternalLink size={10} />
                </a>
              )}
            </div>

            {/* Bottom color line */}
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-60 transition-opacity"
              style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
