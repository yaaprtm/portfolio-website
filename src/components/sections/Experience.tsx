"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users, Building2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { experiences } from "@/data/experience";
import type { Experience } from "@/data/experience";

const typeConfig = {
  work: { icon: Briefcase, color: "#00F0FF", label: "Work" },
  internship: { icon: Building2, color: "#3B82F6", label: "Internship" },
  education: { icon: GraduationCap, color: "#F59E0B", label: "Education" },
  organization: { icon: Users, color: "#3DCA75", label: "Organization" },
};

function TimelineEntry({
  exp,
  idx,
}: {
  exp: Experience;
  idx: number;
}) {
  const config = typeConfig[exp.type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.12 }}
      className="relative flex gap-5 pb-10 last:pb-0"
    >
      {/* Timeline vertical line */}
      <div className="relative flex flex-col items-center">
        {/* Icon dot */}
        <div
          className="relative z-10 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border"
          style={{
            background: `${config.color}15`,
            borderColor: `${config.color}30`,
          }}
        >
          <Icon size={16} style={{ color: config.color }} />
          {exp.current && (
            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-navy-950 animate-pulse" />
          )}
        </div>

        {/* Connector line */}
        <div
          className="w-px flex-1 mt-2"
          style={{
            background: `linear-gradient(180deg, ${config.color}40, transparent)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 glass-card p-5 mb-2 skill-card">
        {/* Terminal-style header */}
        <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-cyan-neon/40 text-xs">$</span>
              <h3 className="font-mono font-bold text-slate-100 text-sm">
                {exp.title}
              </h3>
            </div>
            <p className="text-slate-400 text-xs font-mono">
              {exp.company} · {exp.location}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded border border-white/10">
              {exp.period}
            </span>
            <Badge
              variant={
                exp.type === "work"
                  ? "cyan"
                  : exp.type === "internship"
                  ? "blue"
                  : exp.type === "organization"
                  ? "green"
                  : "amber"
              }
            >
              {config.label}
            </Badge>
          </div>
        </div>

        {/* Description bullets — styled as terminal output */}
        <ul className="space-y-1.5 mb-3">
          {exp.description.map((desc, i) => (
            <li key={i} className="flex gap-2 text-slate-400 text-xs leading-relaxed">
              <span className="text-cyan-neon/50 font-mono mt-0.5 flex-shrink-0">
                ›
              </span>
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
                className="text-[10px] font-mono text-slate-600 bg-white/5 px-2 py-0.5 rounded border border-white/5"
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
  return (
    <SectionWrapper id="experience" withGrid>
      <SectionHeading
        tag="04. Experience"
        title="Pengalaman"
        subtitle="Riwayat perjalanan profesional dan pendidikan yang membentuk skill saya hari ini."
      />

      <div className="max-w-3xl mx-auto">
        {/* Terminal-style header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs text-slate-600 mb-8 flex items-center gap-2"
        >
          <span className="text-cyan-neon/50">$</span>
          <span>cat experience.log</span>
          <span className="text-slate-700 ml-2">
            {experiences.length} entries found
          </span>
        </motion.div>

        {/* Timeline entries */}
        {experiences.map((exp, idx) => (
          <TimelineEntry key={exp.id} exp={exp} idx={idx} />
        ))}
      </div>
    </SectionWrapper>
  );
}
