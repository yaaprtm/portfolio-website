"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { workExperiences } from "@/data/experience";
import type { Experience as ExperienceType } from "@/data/experience";
import { useLanguage } from "@/context/LanguageContext";

function WorkTimelineEntry({
  exp,
  idx,
}: {
  exp: ExperienceType;
  idx: number;
}) {
  const { t } = useLanguage();

  const typeConfig = {
    work: { icon: Briefcase, label: t.experience.types.work },
    internship: { icon: Building2, label: t.experience.types.internship },
    education: { icon: Briefcase, label: t.experience.types.education },
    organization: { icon: Briefcase, label: t.experience.types.organization },
  };

  const config = typeConfig[exp.type];
  const Icon = config.icon;

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
          <Icon size={20} />
        </div>
        <div className="w-0.5 flex-1 bg-mono-border mt-3" />
      </div>

      {/* Content Card */}
      <div className="flex-1 editorial-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="font-display font-extrabold text-mono-black text-xl">{exp.title}</h3>
            <p className="text-mono-gray text-xs font-bold uppercase tracking-wider mt-1">
              {exp.company} · {exp.location}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-mono-black bg-[#FAFAFA] px-3.5 py-1.5 rounded-full border border-mono-border">
              {exp.period}
            </span>
            <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-mono-black px-3.5 py-1.5 rounded-full">
              {config.label}
            </span>
          </div>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-2.5 mb-5">
          {exp.description.map((desc, i) => (
            <li key={i} className="flex gap-3 text-mono-gray text-xs sm:text-sm leading-relaxed">
              <span className="text-mono-black font-extrabold">•</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Tech Badges */}
        {exp.technologies && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-mono-border">
            {exp.technologies.map((tech) => (
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

export default function Experience() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="experience" className="bg-[#FAFAFA]">
      <SectionHeading
        tag={t.experience.tag}
        title={t.experience.title}
        subtitle={t.experience.subtitle}
      />

      <div className="max-w-4xl mx-auto">
        {workExperiences.map((exp, idx) => (
          <WorkTimelineEntry key={exp.id} exp={exp} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
