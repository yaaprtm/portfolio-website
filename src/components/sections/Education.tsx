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
        <div className="w-12 h-12 rounded-full bg-mono-black text-white flex items-center justify-center flex-shrink-0 z-10">
          <GraduationCap size={22} />
        </div>
        <div className="w-0.5 flex-1 bg-mono-border mt-3" />
      </div>

      {/* Content Card */}
      <div className="flex-1 editorial-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-mono-black text-white">
                {edu.current ? t.education.active : t.education.alumni}
              </span>
            </div>
            <h3 className="font-display font-extrabold text-mono-black text-xl">{edu.title}</h3>
            <p className="text-mono-gray text-xs font-bold uppercase tracking-wider mt-1 flex items-center gap-1.5">
              <School size={14} className="text-mono-black" />
              <span>{edu.company} · {edu.location}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-mono-black bg-[#FAFAFA] px-3.5 py-1.5 rounded-full border border-mono-border">
              {edu.period}
            </span>
          </div>
        </div>

        {/* Description Bullet List */}
        <ul className="space-y-2.5 mb-5">
          {edu.description.map((desc, i) => (
            <li key={i} className="flex gap-3 text-mono-gray text-xs sm:text-sm leading-relaxed">
              <span className="text-mono-black font-extrabold">•</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Tech / Focus Areas */}
        {edu.technologies && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-mono-border">
            {edu.technologies.map((tech) => (
              <span
                key={tech}
                className="text-xs font-bold text-mono-black bg-[#FAFAFA] px-3 py-1 rounded-full border border-mono-border"
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
    <SectionWrapper id="education" className="bg-[#FAFAFA]">
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
