"use client";

import { motion } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
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
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      {/* Timeline Indicator */}
      <div className="relative flex flex-col items-center">
        <div className="w-10 h-10 rounded-xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center flex-shrink-0 z-10">
          <Icon size={18} className="text-cyan-neon" />
          {exp.current && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-neon border-2 border-navy-950 animate-pulse" />
          )}
        </div>
        <div className="w-px flex-1 bg-white/10 mt-2" />
      </div>

      {/* Content Card */}
      <div className="flex-1 glass-card p-6 mb-2">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 mb-3">
          <div>
            <h3 className="font-bold text-slate-100 text-base">{exp.title}</h3>
            <p className="text-slate-400 text-xs font-mono mt-0.5">
              {exp.company} · {exp.location}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0 sm:self-start">
            <span className="text-xs font-mono text-slate-300 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/10">
              {exp.period}
            </span>
            <Badge variant="cyan">{config.label}</Badge>
          </div>
        </div>

        {/* Description */}
        <ul className="space-y-2 mb-4">
          {exp.description.map((desc, i) => (
            <li key={i} className="flex gap-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
              <span className="text-cyan-neon font-mono text-xs mt-0.5">•</span>
              {desc}
            </li>
          ))}
        </ul>

        {/* Technologies */}
        {exp.technologies && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-mono text-slate-400 bg-white/[0.03] px-2 py-0.5 rounded border border-white/5"
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
    <SectionWrapper id="experience">
      <SectionHeading
        tag={t.experience.tag}
        title={t.experience.title}
        subtitle={t.experience.subtitle}
      />

      <div className="max-w-3xl mx-auto">
        {workExperiences.map((exp, idx) => (
          <WorkTimelineEntry key={exp.id} exp={exp} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
