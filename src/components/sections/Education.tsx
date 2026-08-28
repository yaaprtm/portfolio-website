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
      className="relative flex gap-6 pb-12 last:pb-0"
    >
      {/* Timeline Bullet */}
      <div className="relative flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center flex-shrink-0 z-10">
          <GraduationCap size={22} className="text-olive-500" />
        </div>
        <div className="w-0.5 flex-1 bg-warm-dark/10 mt-3" />
      </div>

      {/* Content Card */}
      <div className="flex-1 editorial-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-olive-500 text-white">
                {edu.current ? t.education.active : t.education.alumni}
              </span>
            </div>
            <h3 className="font-display font-extrabold text-warm-dark text-xl">{edu.title}</h3>
            <p className="text-warm-gray text-xs font-semibold uppercase tracking-wider mt-1 flex items-center gap-1.5">
              <School size={14} className="text-olive-500" />
              <span>{edu.company} · {edu.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-warm-dark bg-[#F0EEE9] px-3.5 py-1.5 rounded-full border border-warm-dark/10">
              {edu.period}
            </span>
          </div>
        </div>

        {/* Description Bullet List */}
        <ul className="space-y-2.5 mb-5">
          {edu.description.map((desc, i) => (
            <li key={i} className="flex gap-3 text-warm-gray text-xs sm:text-sm leading-relaxed">
              <span className="text-olive-500 font-bold">•</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Tech / Focus Areas */}
        {edu.technologies && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-warm-dark/10">
            {edu.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-semibold text-warm-dark bg-[#F0EEE9] px-3 py-1 rounded-full border border-warm-dark/10"
              >
                {tech}
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
    <SectionWrapper id="education" className="bg-[#F0EEE9]">
      <SectionHeading
        tag={t.education.tag}
        title={t.education.title}
        subtitle={t.education.subtitle}
      />

      <div className="max-w-4xl mx-auto">
        {educationList.map((edu, idx) => (
          <EducationTimelineEntry key={edu.id} edu={edu} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
