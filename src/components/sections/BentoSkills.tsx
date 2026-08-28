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
    <SectionWrapper id="skills" className="bg-[#FAFAFA]">
      <SectionHeading
        tag={t.skills.tag}
        title={t.skills.title}
        subtitle={t.skills.subtitle}
      />

      {/* Asymmetric Editorial Bento Grid - Mobile Optimized */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {/* BENTO CARD 1: Networking & Infrastructure Architecture */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 editorial-card p-5 sm:p-6 lg:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-olive text-white flex items-center justify-center flex-shrink-0">
                <Network size={20} className="sm:w-[24px] sm:h-[24px]" />
              </div>
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-olive/10 border border-olive/20 text-olive">
                {t.skills.networking.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-mono-black mb-2 sm:mb-3">
              {t.skills.networking.title}
            </h3>
            <p className="text-mono-gray text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
              {t.skills.networking.desc}
            </p>

            {/* Skill Badges List - Better Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
              {networkingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[#FAFAFA] border border-mono-border flex items-center gap-2 sm:gap-3"
                >
                  <CheckCircle2 size={14} className="sm:w-4 sm:h-4 text-olive flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-mono-black text-[11px] sm:text-xs font-bold truncate">{skill.name}</p>
                    <p className="text-mono-muted text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">
                      {t.skills.networking.levels[skill.levelKey]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BENTO CARD 2: Android Development */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="editorial-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-olive text-white flex items-center justify-center mb-4 sm:mb-6">
              <Smartphone size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <h3 className="font-display font-extrabold text-lg sm:text-xl text-mono-black mb-2 sm:mb-3">
              {t.skills.android.title}
            </h3>
            <p className="text-mono-gray text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-5">
              {t.skills.android.desc}
            </p>

            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
              {androidSkills.map((tech) => (
                <div key={tech} className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold text-mono-black">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-olive flex-shrink-0" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-mono-border">
            <span className="text-[11px] sm:text-xs font-extrabold text-olive tracking-wider uppercase">
              BRIN Kebun Raya App
            </span>
          </div>
        </motion.div>

        {/* BENTO CARD 3: IT Support & Systems */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="editorial-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-olive text-white flex items-center justify-center mb-4 sm:mb-6">
              <Wrench size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>

            <h3 className="font-display font-extrabold text-lg sm:text-xl text-mono-black mb-2 sm:mb-3">
              {t.skills.itSupport.title}
            </h3>
            <p className="text-mono-gray text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-5">
              {t.skills.itSupport.desc}
            </p>

            <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-6">
              {itSupportSkills.map((item) => (
                <div key={item} className="flex items-center gap-2 sm:gap-2.5 text-[11px] sm:text-xs font-bold text-mono-black">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-olive flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 sm:pt-4 border-t border-mono-border">
            <span className="text-[11px] sm:text-xs font-bold text-mono-muted tracking-wider uppercase">
              Field & Enterprise Support
            </span>
          </div>
        </motion.div>

        {/* BENTO CARD 4: Tools & Dev Ecosystem */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="editorial-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-olive text-white flex items-center justify-center">
                <Layers size={18} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-olive/10 border border-olive/20 text-olive">
                {t.skills.tools.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-lg sm:text-xl text-mono-black mb-2 sm:mb-3">
              {t.skills.tools.title}
            </h3>
            <p className="text-mono-gray text-[11px] sm:text-xs leading-relaxed mb-4 sm:mb-5">
              {t.skills.tools.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {devTools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FAFAFA] border border-mono-border text-[11px] sm:text-xs font-bold text-mono-black hover:border-olive hover:text-olive transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BENTO CARD 5: Interpersonal Competencies */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2 editorial-card p-5 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-olive text-white flex items-center justify-center">
                <Users size={18} className="sm:w-[22px] sm:h-[22px]" />
              </div>
              <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-wider bg-olive/10 border border-olive/20 text-olive">
                {t.skills.softSkills.badge}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-lg sm:text-xl text-mono-black mb-4 sm:mb-3">
              {t.skills.softSkills.title}
            </h3>

            <div className="space-y-2.5 sm:space-y-3">
              {t.skills.softSkills.items.map((item) => (
                <div key={item.title} className="p-3 sm:p-3.5 rounded-2xl bg-[#FAFAFA] border border-mono-border">
                  <p className="text-mono-black font-display text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 size={12} className="sm:w-[14px] sm:h-[14px] text-olive flex-shrink-0" />
                    <span>{item.title}</span>
                  </p>
                  <p className="text-mono-gray text-[11px] sm:text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
