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
        tag="05 / CERTIFICATIONS"
        title="Sertifikasi & Prestasi"
        subtitle="Bukti kompetensi dan penghargaan teknis yang telah dicapai."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass-card p-6 skill-card flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-md font-mono font-semibold text-xs bg-cyan-soft border border-cyan-neon/30 text-cyan-neon">
                  {cert.shortName}
                </span>
                <Award size={20} className="text-slate-400" />
              </div>

              <h3 className="font-semibold text-slate-100 text-base mb-2 leading-snug">
                {cert.name}
              </h3>

              <div className="flex items-center gap-2 text-slate-400 text-xs mb-2">
                <Building size={13} />
                <span>{cert.issuer}</span>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                <Calendar size={13} />
                <span>{cert.date}</span>
              </div>
            </div>

            {cert.credentialUrl && cert.credentialUrl !== "#" && (
              <div className="pt-3 border-t border-white/5 flex items-center justify-end">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-mono text-cyan-neon hover:underline"
                >
                  Verifikasi
                  <ExternalLink size={12} />
                </a>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
