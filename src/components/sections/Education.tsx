"use client";

import { motion } from "framer-motion";
import { GraduationCap, School } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { educationList } from "@/data/experience";
import type { Experience as ExperienceType } from "@/data/experience";
import { useLanguage } from "@/context/LanguageContext";

function EducationTimelineEntry({
  edu,
  idx,
}: {
  edu: ExperienceType;
  idx: number;
}) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      {/* Timeline Indicator with Graduation Cap */}
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-cyan-soft border border-cyan-neon/40 flex items-center justify-center flex-shrink-0 z-10 shadow-lg">
          <GraduationCap size={20} className="text-cyan-neon" />
          {edu.current && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-neon border-2 border-navy-950 animate-pulse" />
          )}
        </div>
        <div className="w-px flex-1 bg-white/10 mt-2" />
      </div>

      {/* Content Card */}
      <div className="flex-1 glass-card p-6 mb-2 border border-white/10">
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono bg-cyan-soft text-cyan-neon border border-cyan-neon/30 font-bold uppercase">
                {edu.current ? t.education.active : t.education.alumni}
              </span>
            </div>
            <h3 className="font-bold text-slate-100 text-base">{edu.title}</h3>
            <p className="text-slate-400 text-xs font-mono mt-0.5 flex items-center gap-1.5">
              <School size={13} className="text-cyan-neon" />
              <span>{edu.company} · {edu.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-neon bg-cyan-soft px-3 py-1 rounded-md border border-cyan-neon/30 font-semibold">
              {edu.period}
            </span>
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {edu.description.map((desc, i) => (
            <li key={i} className="flex gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <span className="text-cyan-neon font-mono text-xs mt-0.5">•</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Focus Areas */}
        {edu.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {edu.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono text-slate-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10"
              >
                🎓 {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Education() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="education">
      <SectionHeading
        tag={t.education.tag}
        title={t.education.title}
        subtitle={t.education.subtitle}
      />

      <div className="max-w-3xl mx-auto">
        {educationList.map((edu, idx) => (
          <EducationTimelineEntry key={edu.id} edu={edu} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
