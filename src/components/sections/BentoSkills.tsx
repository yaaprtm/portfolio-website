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
  MessageCircle,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import SubnetCalculator from "@/components/ui/SubnetCalculator";

const softSkills = [
  {
    title: "Kerja Tim & Kolaborasi",
    desc: "Pengalaman kerja dalam tim 4 orang lintas divisi (Frontend, Backend, Android) saat magang di BRIN.",
  },
  {
    title: "Komunikasi Teknis",
    desc: "Mampu menjelaskan solusi teknis ke pengguna non-teknis dari pengalaman IT Support & maintenance lapangan.",
  },
  {
    title: "Problem Solving",
    desc: "Terbiasa troubleshooting cepat di lapangan (hardware, software, jaringan) dengan tekanan waktu.",
  },
  {
    title: "Adaptif & Cepat Belajar",
    desc: "Terbukti dari perpindahan antar bidang (Networking, IT Support, Android Dev) secara efisien.",
  },
];

export default function BentoSkills() {
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
        tag="02 / SKILLS & EXPERTISE"
        title="Keahlian & Ekosistem Teknologi"
        subtitle="Eksplorasi kompetensi teknis yang dikuasai — dari infrastruktur jaringan hingga pengembangan mobile."
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
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-soft text-cyan-neon border border-cyan-neon/30">
                Primary Specialty
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Networking & Infrastructure Architecture
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Pengalaman praktis dalam mendesain, mengonfigurasi, dan memelihara infrastruktur jaringan komputer berskala menengah hingga besar.
            </p>

            {/* Skill Badges List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
              {[
                { name: "MikroTik (MTCNA 88%)", level: "Expert" },
                { name: "Cisco & Packet Tracer", level: "Advanced" },
                { name: "Routing & Switching", level: "Advanced" },
                { name: "Network Troubleshooting", level: "Advanced" },
                { name: "Server Administration", level: "Intermediate" },
                { name: "VSAT Installation", level: "Intermediate" },
              ].map((skill) => (
                <div
                  key={skill.name}
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-2 group-hover:border-cyan-neon/30 transition-colors"
                >
                  <CheckCircle2 size={14} className="text-cyan-neon flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-slate-200 text-xs font-medium truncate">{skill.name}</p>
                    <p className="text-slate-500 text-[10px] font-mono">{skill.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Latency Simulator Widget */}
          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3 bg-white/[0.02] p-3 rounded-xl">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-cyan-neon" />
              <span className="text-xs font-mono text-slate-300">Network Simulator:</span>
              {latency !== null ? (
                <span className="text-xs font-mono text-cyan-neon font-bold">
                  {latency}ms (Optimal)
                </span>
              ) : (
                <span className="text-xs font-mono text-slate-500">Ready</span>
              )}
            </div>

            <button
              onClick={simulatePing}
              disabled={pinging}
              className="btn-primary px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 disabled:opacity-50 min-h-[36px]"
            >
              <Radio size={12} className={pinging ? "animate-spin" : ""} />
              {pinging ? "Pinging..." : "Test Latency"}
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

            <h3 className="text-lg font-bold text-slate-100 mb-2">Android Development</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Pengembangan aplikasi mobile native Android. Pengalaman magang di Badan Riset dan Inovasi Nasional (BRIN).
            </p>

            <div className="space-y-2 mb-4">
              {["Android Native (Kotlin/Java)", "REST API Integration", "Git & Team Workflow", "Material Design 3"].map((tech) => (
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

            <h3 className="text-lg font-bold text-slate-100 mb-2">IT Support & Systems</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Pemeliharaan hardware/software, troubleshooting sistem komputer, dan asistensi teknis lapangan.
            </p>

            <div className="space-y-2 mb-4">
              {["Hardware & Software Repair", "Windows OS Deployment", "Network Maintenance", "System Diagnostics"].map((item) => (
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
              <span className="text-xs font-mono text-slate-400">Dev Stack</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-2">Tools & Developer Ecosystem</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              Tooling sehari-hari untuk alur kerja pengkodean, pengujian API, dan manajemen versi repositori.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Git & GitHub",
                "Linux (Ubuntu/Debian)",
                "Postman API",
                "VS Code & Android Studio",
                "Figma UI/UX",
                "Microsoft Office Suite",
                "Bash Scripting",
              ].map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-300"
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
              <span className="text-xs font-mono text-cyan-neon">Soft Skills</span>
            </div>

            <h3 className="text-lg font-bold text-slate-100 mb-3">Kemampuan Interpersonal</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {softSkills.map((item) => (
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

      {/* ============================================================
          INTERACTIVE SUBNET CALCULATOR WIDGET SECTION
         ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8"
      >
        <SubnetCalculator />
      </motion.div>
    </SectionWrapper>
  );
}
