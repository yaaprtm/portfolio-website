"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Briefcase, GraduationCap, Award, FolderGit2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

function useCounter(target: number, isInView: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return count;
}

const stats = [
  { label: "Pengalaman Kerja & Magang", value: 4, suffix: " tempat", icon: Briefcase },
  { label: "Sertifikasi & Prestasi", value: 2, suffix: "", icon: Award },
  { label: "Proyek Diselesaikan", value: 4, suffix: " proyek", icon: FolderGit2 },
  { label: "Tahun Pengalaman IT", value: 3, suffix: " tahun", icon: User },
];

function StatCard({ label, value, suffix, icon: Icon }: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(value, isInView);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      className="glass-card p-6 text-center skill-card"
    >
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
          <Icon size={18} className="text-cyan-neon" />
        </div>
      </div>
      <div className="font-mono text-3xl font-bold text-slate-100 mb-1">
        {count}
        <span className="text-cyan-neon">{suffix}</span>
      </div>
      <div className="text-slate-400 text-xs">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        tag="01 / ABOUT"
        title="Profil & Latar Belakang"
        subtitle="IT Enthusiast dan Mahasiswa Teknik Rekayasa Internet PENS Surabaya dengan minat serta pengalaman praktis di bidang Networking, IT Support, dan Android Development."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Profile Photo — Clean, Human, Editorial Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="relative w-72 h-[400px] sm:w-80 sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-navy-900 group">
              <img
                src="/images/arya-photo.png"
                alt="Arya Putra Pratama"
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-navy-950/80 backdrop-blur-md border border-white/10">
                <p className="font-mono text-xs font-semibold text-slate-200">Arya Putra Pratama</p>
                <p className="text-[11px] text-slate-400">Teknik Rekayasa Internet · PENS 2026</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-5"
        >
          <h3 className="text-2xl font-bold text-slate-100 tracking-tight">
            Berkomitmen Mendorong Infrastruktur Jaringan & Aplikasi Modern.
          </h3>

          <p className="text-slate-300 leading-relaxed text-sm">
            Saya adalah seorang <span className="text-cyan-neon font-semibold">IT Enthusiast</span> dan Mahasiswa Baru program studi{" "}
            <span className="text-cyan-neon font-semibold">STr. Teknik Rekayasa Internet</span> di{" "}
            <span className="text-slate-100 font-semibold">Politeknik Elektronika Negeri Surabaya (PENS)</span> (2026–2030), serta alumni Teknik Komputer & Jaringan SMK Dinamika Pembangunan 1 Jakarta.
          </p>

          <p className="text-slate-400 leading-relaxed text-sm">
            Memiliki pengalaman kerja dan magang di IT Maintenance (Digital Solusindo), IT Support Technician (ID-Networkers), dan sebagai Android Developer Intern di{" "}
            <span className="text-slate-200 font-medium">Badan Riset dan Inovasi Nasional (BRIN)</span> di mana saya bersama tim 4 orang merancang dan membangun aplikasi & web Kebun Raya Cibinong.
          </p>

          <p className="text-slate-400 leading-relaxed text-sm">
            Tertarik pada arsitektur internet modern, cloud computing, network security, serta pengembangan sistem terdistribusi. Adaptif dan cepat berakselerasi dalam lingkungan teknis.
          </p>

          {/* Quick Info Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "🎓 PENS Surabaya — STr. Teknik Rekayasa Internet (2026-2030)",
              "📍 Surabaya / Jakarta, Indonesia",
              "🌐 MikroTik MTCNA Certified (88%)",
              "🏆 Finalist IONIC IoT & Networking PENS 2025",
              "📱 Android Dev Intern @ BRIN",
            ].map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300 font-mono"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </SectionWrapper>
  );
}
