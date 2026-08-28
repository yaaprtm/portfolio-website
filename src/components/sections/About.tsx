"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Briefcase, GraduationCap, Award, FolderGit2, MapPin, Network, Smartphone, Wrench } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const chipIcons: Record<string, React.ReactNode> = {
  pens: <GraduationCap size={14} className="text-mono-black" />,
  location: <MapPin size={14} className="text-mono-black" />,
  networking: <Network size={14} className="text-mono-black" />,
  android: <Smartphone size={14} className="text-mono-black" />,
  support: <Wrench size={14} className="text-mono-black" />,
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
    <motion.div ref={ref} whileHover={{ y: -4 }} className="editorial-card p-4 sm:p-6 text-center">
      <div className="flex justify-center mb-2 sm:mb-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-mono-black text-white flex items-center justify-center">
          <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
        </div>
      </div>
      <div className="font-display text-3xl sm:text-4xl font-extrabold text-mono-black mb-1 tracking-tight">
        {count}
        <span>{suffix}</span>
      </div>
      <div className="text-mono-gray text-[10px] sm:text-xs font-bold uppercase tracking-wider">{label}</div>
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
    <SectionWrapper id="about" className="bg-[#FAFAFA]">
      <SectionHeading
        tag={t.about.tag}
        title={t.about.title}
        subtitle={t.about.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-12 sm:mb-16">
        {/* Profile Frame - Better Mobile Sizing */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex justify-center"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-[4/5] rounded-3xl overflow-hidden bg-mono-card border border-mono-border shadow-editorial">
            <Image
              src="/images/arya-photo.png"
              alt="Arya Putra Pratama - IT Enthusiast"
              fill
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              className="object-cover object-top"
              sizes="(max-width: 768px) 280px, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute bottom-4 sm:bottom-5 left-4 sm:left-5 right-4 sm:right-5 p-3 sm:p-4 rounded-2xl bg-[#FAFAFA]/95 backdrop-blur-md border border-mono-border shadow-md">
              <p className="font-display font-extrabold text-xs sm:text-sm text-mono-black uppercase tracking-tight">
                Arya Putra Pratama
              </p>
              <p className="text-[11px] sm:text-xs text-mono-gray font-medium">
                Teknik Rekayasa Internet · PENS 2026–2030
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bio Editorial Text - Better Mobile Typography */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-7 space-y-4 sm:space-y-6"
        >
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-mono-black tracking-tight leading-snug">
            {t.about.heading}
          </h3>

          <p className="text-mono-gray leading-relaxed text-sm sm:text-base">
            {t.about.bio1a}{" "}
            <span className="text-mono-black font-extrabold">{t.about.bio1role}</span>{" "}
            {t.about.bio1b}{" "}
            <span className="text-mono-black font-extrabold">{t.about.bio1program}</span>{" "}
            {t.about.bio1c}{" "}
            <span className="text-mono-black font-extrabold">{t.about.bio1school}</span>{" "}
            {t.about.bio1d}
          </p>

          <p className="text-mono-gray leading-relaxed text-sm sm:text-base">
            {t.about.bio2a}{" "}
            <span className="text-mono-black font-bold">{t.about.bio2org}</span>
            {t.about.bio2b}
          </p>

          <p className="text-mono-gray leading-relaxed text-sm sm:text-base">{t.about.bio3}</p>

          {/* Quick Info Chips - Better Mobile Layout */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
            {Object.entries(t.about.chips).map(([key, text]) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-mono-card border border-mono-border text-[11px] sm:text-xs font-bold text-mono-black"
              >
                {chipIcons[key]}
                <span>{text}</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Stats Grid - Better Mobile Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </SectionWrapper>
  );
}
