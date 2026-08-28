"use client";

import { motion } from "framer-motion";
import {
  Network,
  Smartphone,
  Wrench,
  Users,
  CheckCircle2,
  Layers,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const networkingSkills = [
  { name: "MikroTik (MTCNA Certified)", levelKey: "Expert" as const },
  { name: "Cisco & Packet Tracer", levelKey: "Advanced" as const },
  { name: "Routing & Switching", levelKey: "Advanced" as const },
  { name: "Network Troubleshooting", levelKey: "Advanced" as const },
  { name: "Server Administration", levelKey: "Intermediate" as const },
  { name: "VSAT Installation", levelKey: "Intermediate" as const },
];

const androidSkills = [
  "Android Native (Java & Kotlin)",
  "REST API Integration",
  "Git & Team Workflow",
  "Material Design 3",
];

const itSupportSkills = [
  "Hardware & Software Maintenance",
  "Windows OS Deployment",
  "Network Diagnostics & Support",
  "System Troubleshooting",
];

const devTools = [
  "Git & GitHub",
  "Linux (Ubuntu/Debian)",
  "Postman API",
  "VS Code & Android Studio",
  "Figma UI/UX",
  "Microsoft Office Suite",
  "Bash Scripting",
];

export default function BentoSkills() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="skills" className="bg-[#F0EEE9]">
      <SectionHeading
        tag={t.skills.tag}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />

      {/* Asymmetric Editorial Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ============================================================
            BENTO CARD 1: Networking & Infrastructure Architecture
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 lg:col-span-2 editorial-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center">
                <Network size={24} className="text-olive-500" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-warm-card border border-warm-dark/10 text-olive-500">
                {t.skills.networking.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl text-warm-dark mb-3">
              {t.skills.networking.title}
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed mb-6">
              {t.skills.networking.desc}
            </p>

            {/* Skill Badges List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {networkingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3.5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 flex items-center gap-3"
                >
                  <CheckCircle2 size={16} className="text-olive-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-warm-dark text-xs font-bold truncate">{skill.name}</p>
                    <p className="text-warm-muted text-[11px] font-medium uppercase tracking-wider">
                      {t.skills.networking.levels[skill.levelKey]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            BENTO CARD 2: Android Development (BRIN Highlight)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="editorial-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center mb-6">
              <Smartphone size={22} className="text-olive-500" />
            </div>

            <h3 className="font-display font-extrabold text-xl text-warm-dark mb-3">
              {t.skills.android.title}
            </h3>
            <p className="text-warm-gray text-xs leading-relaxed mb-5">
              {t.skills.android.desc}
            </p>

            <div className="space-y-2.5 mb-6">
              {androidSkills.map((tech) => (
                <div key={tech} className="flex items-center gap-2.5 text-xs font-semibold text-warm-dark">
                  <span className="w-2 h-2 rounded-full bg-olive-500" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-warm-dark/10">
            <span className="text-xs font-bold text-olive-500 tracking-wider uppercase">
              BRIN Kebun Raya App
            </span>
          </div>
        </motion.div>

        {/* ============================================================
            BENTO CARD 3: IT Support & Systems Maintenance
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="editorial-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center mb-6">
              <Wrench size={22} className="text-olive-500" />
            </div>

            <h3 className="font-display font-extrabold text-xl text-warm-dark mb-3">
              {t.skills.itSupport.title}
            </h3>
            <p className="text-warm-gray text-xs leading-relaxed mb-5">
              {t.skills.itSupport.desc}
            </p>

            <div className="space-y-2.5 mb-6">
              {itSupportSkills.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs font-semibold text-warm-dark">
                  <span className="w-2 h-2 rounded-full bg-olive-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-warm-dark/10">
            <span className="text-xs font-bold text-warm-muted tracking-wider uppercase">
              Field & Enterprise Support
            </span>
          </div>
        </motion.div>

        {/* ============================================================
            BENTO CARD 4: Tools & Developer Ecosystem
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="editorial-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center">
                <Layers size={22} className="text-olive-500" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-warm-card border border-warm-dark/10 text-olive-500">
                {t.skills.tools.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl text-warm-dark mb-3">
              {t.skills.tools.title}
            </h3>
            <p className="text-warm-gray text-xs leading-relaxed mb-5">
              {t.skills.tools.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {devTools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-full bg-[#F0EEE9] border border-warm-dark/10 text-xs font-semibold text-warm-dark"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            BENTO CARD 5: Interpersonal Competencies
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="editorial-card p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center">
                <Users size={22} className="text-olive-500" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-warm-card border border-warm-dark/10 text-olive-500">
                {t.skills.softSkills.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl text-warm-dark mb-3">
              {t.skills.softSkills.title}
            </h3>

            <div className="space-y-3">
              {t.skills.softSkills.items.map((item) => (
                <div key={item.title} className="p-3.5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10">
                  <p className="text-olive-500 font-display text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-olive-500 flex-shrink-0" />
                    <span>{item.title}</span>
                  </p>
                  <p className="text-warm-gray text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
