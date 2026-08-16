"use client";

import { motion } from "framer-motion";
import {
  Network,
  Smartphone,
  Wrench,
  CheckCircle2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, levelConfig } from "@/data/skills";

// Map icon name string to actual Lucide component
const iconMap: Record<string, React.ElementType> = {
  Network,
  Smartphone,
  Wrench,
};

// Level badge colors
const levelBadge: Record<string, string> = {
  beginner: "text-slate-500 bg-slate-500/10",
  intermediate: "text-blue-400 bg-blue-400/10",
  advanced: "text-cyan-neon bg-cyan-soft",
  expert: "text-cyan-neon bg-cyan-neon/20 border border-cyan-neon/30",
};

export default function Skills() {
  return (
    <SectionWrapper id="skills" withGrid>
      <SectionHeading
        tag="02. Skills"
        title="Keahlian & Teknologi"
        subtitle="Stack yang saya gunakan sehari-hari — dari konfigurasi router hingga deploy aplikasi Android."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, catIdx) => {
          const Icon = iconMap[category.icon] ?? Wrench;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-card p-6 skill-card"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${category.accentColor}15`,
                    border: `1px solid ${category.accentColor}30`,
                  }}
                >
                  <Icon size={18} style={{ color: category.accentColor }} />
                </div>
                <div>
                  <h3 className="font-mono font-bold text-slate-200 text-sm">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {category.description.length > 50
                      ? category.description.slice(0, 48) + "…"
                      : category.description}
                  </p>
                </div>
              </div>

              {/* Skill list */}
              <ul className="space-y-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.04 }}
                    className="flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2
                        size={13}
                        className="flex-shrink-0 transition-colors"
                        style={{ color: category.accentColor, opacity: 0.7 }}
                      />
                      <span className="text-slate-300 text-xs font-mono truncate group-hover:text-slate-100 transition-colors">
                        {skill.name}
                      </span>
                    </div>

                    {/* Level badge */}
                    <span
                      className={`flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-full ${levelBadge[skill.level]}`}
                    >
                      {levelConfig[skill.level].label}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom gradient line accent */}
              <div
                className="mt-5 h-0.5 rounded-full opacity-30"
                style={{
                  background: `linear-gradient(90deg, ${category.accentColor}, transparent)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4 mt-8"
      >
        <span className="text-slate-600 text-xs font-mono mr-2">Legend:</span>
        {Object.entries(levelConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: cfg.color }}
            />
            <span className="text-slate-600 text-xs font-mono">{cfg.label}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
