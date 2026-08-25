"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Briefcase, GraduationCap, Award, FolderGit2 } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

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

function StatCard({
  label,
  value,
  suffix,
  icon: Icon,
}: {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useCounter(value, isInView);

  return (
    <motion.div ref={ref} whileHover={{ y: -4 }} className="glass-card p-6 text-center skill-card">
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
  const { t } = useLanguage();

  const stats = [
    { label: t.about.stats.workExp, value: 4, suffix: t.about.stats.suffixPlaces, icon: Briefcase },
    { label: t.about.stats.certifications, value: 2, suffix: "", icon: Award },
    { label: t.about.stats.projects, value: 4, suffix: t.about.stats.suffixProjects, icon: FolderGit2 },
    { label: t.about.stats.yearsExp, value: 3, suffix: t.about.stats.suffixYears, icon: User },
  ];

  return (
    <SectionWrapper id="about">
      <SectionHeading
        tag={t.about.tag}
        title={t.about.title}
        subtitle={t.about.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative">
            <div className="relative w-72 h-[400px] sm:w-80 sm:h-[450px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-navy-900 group">
              <Image
                src="/images/arya-photo.png"
                alt="Arya Putra Pratama"
                fill
                sizes="(max-width: 640px) 288px, 320px"
                className="object-cover object-top filter brightness-[1.02] contrast-[1.02] group-hover:scale-105 transition-transform duration-500"
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
            {t.about.heading}
          </h3>

          <p className="text-slate-300 leading-relaxed text-sm">
            {t.about.bio1a}{" "}
            <span className="text-cyan-neon font-semibold">{t.about.bio1role}</span>{" "}
            {t.about.bio1b}{" "}
            <span className="text-cyan-neon font-semibold">{t.about.bio1program}</span>{" "}
            {t.about.bio1c}{" "}
            <span className="text-slate-100 font-semibold">{t.about.bio1school}</span>{" "}
            {t.about.bio1d}
          </p>

          <p className="text-slate-400 leading-relaxed text-sm">
            {t.about.bio2a}{" "}
            <span className="text-slate-200 font-medium">{t.about.bio2org}</span>
            {t.about.bio2b}
          </p>

          <p className="text-slate-400 leading-relaxed text-sm">{t.about.bio3}</p>

          {/* Quick Info Chips */}
          <div className="flex flex-wrap gap-2 pt-2">
            {Object.values(t.about.chips).map((chip) => (
              <span
                key={chip}
                className="px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-slate-300 font-mono"
              >
                {chip}
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
