"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, MapPin, Briefcase, GraduationCap, Award } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";

// Animated counter hook
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

// Stats data for Arya
const stats = [
  { label: "Pengalaman Kerja & Magang", value: 4, suffix: " tempat", icon: Briefcase },
  { label: "Sertifikasi & Prestasi", value: 2, suffix: "", icon: Award },
  { label: "Skor MikroTik MTCNA", value: 88, suffix: "%", icon: GraduationCap },
  { label: "Tahun di Bidang IT/TKJ", value: 3, suffix: " thn", icon: User },
];

function StatCard({ label, value, suffix, icon: Icon }: (typeof stats)[0]) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(value, isInView);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      className="glass-card p-5 text-center skill-card"
    >
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-soft border border-cyan-neon/20 flex items-center justify-center">
          <Icon size={18} className="text-cyan-neon" />
        </div>
      </div>
      <div className="font-mono text-3xl font-bold text-cyan-neon mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-slate-500 text-xs">{label}</div>
    </motion.div>
  );
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        tag="01. About Me"
        title="Tentang Saya"
        subtitle="Mahasiswa Teknik Rekayasa Internet PENS Surabaya dengan latar belakang TKJ, IT Support, dan Android Development."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Avatar & visual side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Glow ring */}
            <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-cyan-neon/40 to-blue-electric/30 blur-xl" />

            {/* Avatar container */}
            <div className="relative w-72 h-[400px] sm:w-80 sm:h-[450px] rounded-2xl glass-card border border-cyan-neon/30 overflow-hidden flex flex-col items-center justify-center p-2 shadow-2xl">
              <img
                src="/images/arya-photo.png"
                alt="Arya Putra Pratama"
                className="w-full h-full object-cover object-top rounded-xl filter brightness-[1.02] contrast-[1.02]"
              />

              {/* Decorative corner marks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-cyan-neon pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-cyan-neon pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-cyan-neon pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-cyan-neon pointer-events-none" />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 glass-card px-3.5 py-2 border border-cyan-neon/40 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-200 font-medium">Arya Putra Pratama</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-5"
        >
          <p className="font-mono text-xs text-cyan-neon tracking-widest uppercase mb-2">
            $ cat summary.txt
          </p>

          <h3 className="font-mono font-bold text-2xl text-slate-100">
            Arya Putra Pratama
          </h3>

          <p className="text-slate-300 leading-relaxed text-sm">
            Saya adalah Mahasiswa Baru program studi{" "}
            <span className="text-cyan-neon font-medium">STr. Teknik Rekayasa Internet</span> di{" "}
            <span className="text-cyan-neon font-medium">Politeknik Elektronika Negeri Surabaya (PENS)</span> (2026–2030), serta alumni Teknik Komputer & Jaringan SMK Dinamika Pembangunan 1 Jakarta.
          </p>

          <p className="text-slate-400 leading-relaxed text-sm">
            Saya memiliki pengalaman kerja dan magang di bidang IT Maintenance (Digital Solusindo), IT Support Technician (ID-Networkers), dan sebagai Android Developer Intern di{" "}
            <span className="text-cyan-neon font-medium">Badan Riset dan Inovasi Nasional (BRIN)</span> di mana saya bersama tim 4 orang membangun aplikasi & web Kebun Raya Cibinong.
          </p>

          <p className="text-slate-400 leading-relaxed text-sm">
            Sangat tertarik dengan arsitektur jaringan internet modern, cloud infrastructure, serta pengembangan sistem terdistribusi. Adaptif, berorientasi tim, dan cepat mempelajari teknologi baru.
          </p>

          {/* Quick info chips */}
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
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-mono"
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
