"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Briefcase, GraduationCap, Award, FolderGit2, MapPin, Network, Smartphone, Wrench } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const chipIcons: Record<string, React.ReactNode> = {
  pens: <GraduationCap size={14} className="text-olive-500" />,
  location: <MapPin size={14} className="text-olive-500" />,
  networking: <Network size={14} className="text-olive-500" />,
  android: <Smartphone size={14} className="text-olive-500" />,
  support: <Wrench size={14} className="text-olive-500" />,
};

function useCounter(target: number, isInView: boolean, duration = 1800) {
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
    <motion.div ref={ref} whileHover={{ y: -4 }} className="editorial-card p-6 text-center">
      <div className="flex justify-center mb-3">
        <div className="w-10 h-10 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center">
          <Icon size={18} className="text-olive-500" />
        </div>
      </div>
      <div className="font-display text-4xl font-extrabold text-warm-dark mb-1 tracking-tight">
        {count}
        <span className="text-olive-500">{suffix}</span>
      </div>
      <div className="text-warm-gray text-xs font-medium uppercase tracking-wider">{label}</div>
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
    <SectionWrapper id="about" className="bg-[#F0EEE9]">
      <SectionHeading
        tag={t.about.tag}
        title={t.about.title}
        subtitle={t.about.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        {/* Profile Frame */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-warm-card border border-warm-dark/10 shadow-editorial">
            <Image
              src="/images/arya-photo.png"
              alt="Arya Putra Pratama"
              fill
              sizes="(max-width: 640px) 288px, 360px"
              className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-dark/60 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#F0EEE9]/90 backdrop-blur-md border border-warm-dark/10">
              <p className="font-display font-bold text-sm text-warm-dark uppercase tracking-tight">
                Arya Putra Pratama
              </p>
              <p className="text-xs text-warm-gray font-medium">
                Teknik Rekayasa Internet · PENS 2026–2030
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bio Editorial Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 space-y-6"
        >
          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-warm-dark tracking-tight leading-snug">
            {t.about.heading}
          </h3>

          <p className="text-warm-gray leading-relaxed text-base">
            {t.about.bio1a}{" "}
            <span className="text-olive-500 font-bold">{t.about.bio1role}</span>{" "}
            {t.about.bio1b}{" "}
            <span className="text-olive-500 font-bold">{t.about.bio1program}</span>{" "}
            {t.about.bio1c}{" "}
            <span className="text-warm-dark font-bold">{t.about.bio1school}</span>{" "}
            {t.about.bio1d}
          </p>

          <p className="text-warm-gray leading-relaxed text-base">
            {t.about.bio2a}{" "}
            <span className="text-warm-dark font-semibold">{t.about.bio2org}</span>
            {t.about.bio2b}
          </p>

          <p className="text-warm-gray leading-relaxed text-base">{t.about.bio3}</p>

          {/* Quick Info Chips */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {Object.entries(t.about.chips).map(([key, text]) => (
              <span
                key={key}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-warm-card border border-warm-dark/10 text-xs font-semibold text-warm-dark"
              >
                {chipIcons[key]}
                <span>{text}</span>
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
