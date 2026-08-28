"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Sparkles, Network, Smartphone, Wrench } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function Hero() {
  const { t } = useLanguage();
  const { play } = useSoundEffects();

  return (
    <section
      id="home"
      className="relative pt-24 sm:pt-36 pb-12 sm:pb-16 min-h-screen flex flex-col justify-between overflow-hidden bg-offwhite text-mono-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Asymmetrical Split Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center py-4 sm:py-8">
          
          {/* Left Column — Statement Typography & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Minimalist Top Tagline */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-6 sm:w-8 h-[2px] bg-mono-black" />
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-mono-black uppercase">
                ARYA PUTRA PRATAMA · PENS
              </span>
            </div>

            {/* Massive Statement Headline - Optimized for Mobile */}
            <h1 className="editorial-title text-4xl sm:text-7xl xl:text-8xl mb-4 sm:mb-6 text-mono-black leading-[0.9] tracking-tighter">
              IT ENTHUSIAST <br />
              <span className="text-mono-black inline-flex items-center gap-1 sm:gap-2">
                NOT JUST <ArrowDownRight className="w-8 h-8 sm:w-16 sm:h-16 text-mono-black stroke-[2.5]" />
              </span> <br />
              A TITLE
            </h1>

            {/* Description Paragraph - Smaller on Mobile */}
            <p className="text-mono-gray text-sm sm:text-lg max-w-xl mb-6 sm:mb-10 leading-relaxed font-normal">
              {t.hero.tagline ||
                "IT Enthusiast yang antusias mengeksplorasi teknologi — dari jaringan komputer, pengembangan Android, hingga infrastruktur digital modern."}
            </p>

            {/* High Contrast Pill CTA Buttons - Better Mobile Layout */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                onClick={() => play("click")}
                onMouseEnter={() => play("hover")}
                className="btn-primary group text-center justify-center"
              >
                <span>{t.hero.viewProjects || "Lihat Proyek Saya"}</span>
                <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                onClick={() => play("click")}
                onMouseEnter={() => play("hover")}
                className="btn-secondary text-center justify-center"
              >
                <span>{t.hero.contact || "Hubungi Saya"}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column — Dominant Grayscale Profile Image - Better Mobile Sizing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-mono-card border border-mono-border shadow-editorial group">
              <Image
                src="/images/arya-photo.png"
                alt="Arya Putra Pratama"
                fill
                priority
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                className="object-cover object-top group-hover:scale-105 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 280px, 50vw"
              />

              {/* Editorial Frame Overlay */}
              <div className="absolute inset-0 border-[6px] sm:border-[8px] border-white/20 rounded-3xl pointer-events-none" />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 bg-[#FAFAFA]/95 backdrop-blur-md p-4 rounded-2xl border border-mono-border shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mono-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-mono-black"></span>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-mono-black uppercase tracking-wider">
                      Open for Opportunities
                    </span>
                    <span className="text-[11px] text-mono-gray font-medium">
                      Internships & Projects
                    </span>
                  </div>
                </div>
                <Sparkles size={16} className="text-mono-black" />
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Strip Cards — Skill Domains - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-mono-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {/* Card 1: Networking */}
          <a
            href="#skills"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="editorial-card p-4 sm:p-5 flex items-start gap-3 sm:gap-4 group hover:border-olive transition-all"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-olive text-white group-hover:scale-105 transition-transform flex-shrink-0">
              <Network size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-olive uppercase block mb-1">
                #NETWORKING
              </span>
              <h3 className="font-display font-extrabold text-mono-black text-sm sm:text-base">
                {t.hero?.skillCards?.networking || "Jaringan Komputer"}
              </h3>
              <p className="text-[11px] sm:text-xs text-mono-gray mt-1 leading-relaxed">
                {t.hero?.skillCards?.networkingDesc || "Router, Switch, MikroTik MTCNA, Cisco Packet Tracer & Topology."}
              </p>
            </div>
          </a>

          {/* Card 2: Android Dev */}
          <a
            href="#skills"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="editorial-card p-4 sm:p-5 flex items-start gap-3 sm:gap-4 group hover:border-olive transition-all"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-olive text-white group-hover:scale-105 transition-transform flex-shrink-0">
              <Smartphone size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-olive uppercase block mb-1">
                #ANDROIDDEV
              </span>
              <h3 className="font-display font-extrabold text-mono-black text-sm sm:text-base">
                {t.hero?.skillCards?.android || "Android Development"}
              </h3>
              <p className="text-[11px] sm:text-xs text-mono-gray mt-1 leading-relaxed">
                {t.hero?.skillCards?.androidDesc || "Kotlin, Android Studio, REST API integration & Mobile UX."}
              </p>
            </div>
          </a>

          {/* Card 3: IT Support */}
          <a
            href="#skills"
            onClick={() => play("click")}
            onMouseEnter={() => play("hover")}
            className="editorial-card p-4 sm:p-5 flex items-start gap-3 sm:gap-4 group hover:border-olive transition-all sm:col-span-2 md:col-span-1"
          >
            <div className="p-2.5 sm:p-3 rounded-xl bg-olive text-white group-hover:scale-105 transition-transform flex-shrink-0">
              <Wrench size={18} className="sm:w-[22px] sm:h-[22px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs font-bold tracking-widest text-olive uppercase block mb-1">
                #ITSUPPORT
              </span>
              <h3 className="font-display font-extrabold text-mono-black text-sm sm:text-base">
                {t.hero?.skillCards?.itSupport || "IT Support & Maintenance"}
              </h3>
              <p className="text-[11px] sm:text-xs text-mono-gray mt-1 leading-relaxed">
                {t.hero?.skillCards?.itSupportDesc || "Hardware, OS troubleshooting, network maintenance & field support."}
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
