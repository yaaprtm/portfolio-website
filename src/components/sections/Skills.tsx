"use client";

import { motion } from "framer-motion";
import { Network, Smartphone, Wrench, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, levelConfig } from "@/data/skills";

const iconMap: Record<string, React.ElementType> = {
  Network,
  Smartphone,
  Wrench,
};

const levelBadge: Record<string, string> = {
  beginner: "text-slate-400 bg-white/[0.04]",
  intermediate: "text-blue-400 bg-blue-500/10 border border-blue-500/20",
  advanced: "text-cyan-neon bg-cyan-soft border border-cyan-neon/20",
  expert: "text-cyan-neon bg-cyan-neon/15 border border-cyan-neon/30 font-semibold",
};

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        tag="02 / SKILLS"
        title="Keahlian & Teknologi"
        subtitle="Stack dan kompetensi teknis yang dikuasai — dari arsitektur jaringan hingga pengembangan aplikasi."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, catIdx) => {
          const Icon = iconMap[category.icon] ?? Wrench;

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1 }}
              className="glass-card p-6 skill-card"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-cyan-neon" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-base">
                    {category.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5 leading-normal">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skill List */}
              <ul className="space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.03 }}
                    className="flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <CheckCircle2 size={14} className="text-cyan-neon flex-shrink-0 opacity-80" />
                      <span className="text-slate-300 text-xs font-medium truncate group-hover:text-slate-100 transition-colors">
                        {skill.name}
                      </span>
                    </div>

                    <span
                      className={`flex-shrink-0 text-[10px] font-mono px-2 py-0.5 rounded-md ${levelBadge[skill.level]}`}
                    >
                      {levelConfig[skill.level].label}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-5 mt-10"
      >
        <span className="text-slate-500 text-xs font-mono">Tingkat Kemahiran:</span>
        {Object.entries(levelConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: cfg.color }}
            />
            <span className="text-slate-400 text-xs font-mono">{cfg.label}</span>
          </div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
