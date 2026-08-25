"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Network,
  Smartphone,
  Wrench,
  Users,
  CheckCircle2,
  Activity,
  Layers,
  Radio,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const networkingSkills = [
  { name: "MikroTik (MTCNA 88%)", levelKey: "Expert" as const },
  { name: "Cisco & Packet Tracer", levelKey: "Advanced" as const },
  { name: "Routing & Switching", levelKey: "Advanced" as const },
  { name: "Network Troubleshooting", levelKey: "Advanced" as const },
  { name: "Server Administration", levelKey: "Intermediate" as const },
  { name: "VSAT Installation", levelKey: "Intermediate" as const },
];

const androidSkills = [
  "Android Native (Kotlin/Java)",
  "REST API Integration",
  "Git & Team Workflow",
  "Material Design 3",
];

const itSupportSkills = [
  "Hardware & Software Repair",
  "Windows OS Deployment",
  "Network Maintenance",
  "System Diagnostics",
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
  const [pinging, setPinging] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);

  const simulatePing = () => {
    setPinging(true);
    setLatency(null);
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 12) + 8);
      setPinging(false);
    }, 800);
  };

  return (
    <SectionWrapper id="skills">
      <SectionHeading
        tag={t.skills.tag}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* ============================================================
            BENTO CARD 1: Networking & Infrastructure (Large Feature Card)
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 lg:col-span-2 glass-card p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden skill-card border border-white/10"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center">
                <Network size={24} className="text-cyan-neon" />
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.04] text-slate-300 border border-white/10 shadow-sm">
                {t.skills.networking.badge}
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2">
              {t.skills.networking.title}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              {t.skills.networking.desc}
            </p>

            {/* Skill Badges List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              {networkingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2 group-hover:border-cyan-neon/30 transition-colors"
                >
                  <CheckCircle2 size={14} className="text-cyan-neon flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-slate-200 text-xs font-medium truncate">{skill.name}</p>
                    <p className="text-slate-500 text-[10px] font-mono">
                      {t.skills.networking.levels[skill.levelKey]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Latency Simulator Widget */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 bg-white/[0.02] p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-neon" />
              <span className="text-xs font-mono text-slate-300">
                {t.skills.networking.simulatorLabel}
              </span>
              {latency !== null ? (
                <span className="text-xs font-mono text-cyan-neon font-bold">
                  {latency}{t.skills.networking.optimal}
                </span>
              ) : (
                <span className="text-xs font-mono text-slate-500">
                  {t.skills.networking.ready}
                </span>
              )}
            </div>

            <button
              onClick={simulatePing}
              disabled={pinging}
              className="btn-primary px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 disabled:opacity-50 min-h-[36px]"
            >
              <Radio size={12} className={pinging ? "animate-spin" : ""} />
              {pinging ? t.skills.networking.pinging : t.skills.networking.testLatency}
            </button>
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
          className="glass-card p-6 flex flex-col justify-between skill-card border border-white/10"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
              <Smartphone size={20} className="text-cyan-neon" />
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">{t.skills.android.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              {t.skills.android.desc}
            </p>

            <div className="space-y-2 mb-4">
              {androidSkills.map((tech) => (
                <div key={tech} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <span className="text-[11px] font-mono text-cyan-neon">kebun-raya-cibinong.apk</span>
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
          className="glass-card p-6 flex flex-col justify-between skill-card border border-white/10"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-4">
              <Wrench size={20} className="text-cyan-neon" />
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">{t.skills.itSupport.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              {t.skills.itSupport.desc}
            </p>

            <div className="space-y-2 mb-4">
              {itSupportSkills.map((item) => (
                <div key={item} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5">
            <span className="text-[11px] font-mono text-slate-400">Digital Solusindo & ID-Networkers</span>
          </div>
        </motion.div>

        {/* ============================================================
            BENTO CARD 4: Tools & Dev Ecosystem
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="md:col-span-2 lg:col-span-2 glass-card p-6 flex flex-col justify-between skill-card border border-white/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <Layers size={20} className="text-cyan-neon" />
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.04] text-slate-300 border border-white/10 shadow-sm">{t.skills.tools.badge}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">{t.skills.tools.title}</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              {t.skills.tools.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {devTools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300 hover:border-white/30 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            BENTO CARD 5: Soft Skills & Interpersonal Competencies
           ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 lg:col-span-2 glass-card p-6 flex flex-col justify-between skill-card border border-white/10"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <Users size={20} className="text-cyan-neon" />
              </div>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.04] text-slate-300 border border-white/10 shadow-sm">{t.skills.softSkills.badge}</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-3">{t.skills.softSkills.title}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {t.skills.softSkills.items.map((item) => (
                <div key={item.title} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <p className="text-cyan-neon font-mono text-xs font-bold mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-cyan-neon flex-shrink-0" />
                    <span>{item.title}</span>
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
