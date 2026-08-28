"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Sparkles, Network, Smartphone, Wrench } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative pt-28 sm:pt-36 pb-16 min-h-screen flex flex-col justify-between overflow-hidden bg-offwhite text-mono-black"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        {/* Asymmetrical Split Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center py-8">
          
          {/* Left Column — Statement Typography & Intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Minimalist Top Tagline */}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-[2px] bg-mono-black" />
              <span className="text-xs font-extrabold tracking-widest text-mono-black uppercase">
                ARYA PUTRA PRATAMA · PENS SURABAYA
              </span>
            </div>

            {/* Massive Statement Headline */}
            <h1 className="editorial-title text-5xl sm:text-7xl xl:text-8xl mb-6 text-mono-black leading-[0.9] tracking-tighter">
              IT ENTHUSIAST <br />
              <span className="text-mono-black inline-flex items-center gap-2">
                NOT JUST <ArrowDownRight className="w-10 h-10 sm:w-16 sm:h-16 text-mono-black stroke-[2.5]" />
              </span> <br />
              A TITLE
            </h1>

            {/* Description Paragraph */}
            <p className="text-mono-gray text-base sm:text-lg max-w-xl mb-10 leading-relaxed font-normal">
              {t.hero.tagline ||
                "IT Enthusiast yang antusias mengeksplorasi teknologi — dari jaringan komputer, pengembangan Android, hingga infrastruktur digital modern."}
            </p>

            {/* High Contrast Pill CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="btn-primary group"
              >
                <span>{t.hero.viewProjects || "Lihat Proyek Saya"}</span>
                <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="#contact"
                className="btn-secondary"
              >
                <span>{t.hero.contact || "Hubungi Saya"}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column — Dominant Grayscale Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-mono-card border border-mono-border shadow-editorial group">
              <Image
                src="/images/arya-photo.png"
                alt="Arya Putra Pratama"
                fill
                priority
                className="object-cover object-top filter grayscale contrast-110 group-hover:scale-105 transition-all duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Editorial Frame Overlay */}
              <div className="absolute inset-0 border-[8px] border-white/20 rounded-3xl pointer-events-none" />

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

        {/* Bottom Strip Cards — Skill Domains */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-mono-border grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {/* Card 1: Networking */}
          <a
            href="#skills"
            className="editorial-card p-5 flex items-start gap-4 group hover:border-mono-black transition-all"
          >
            <div className="p-3 rounded-xl bg-mono-black text-white group-hover:scale-105 transition-transform">
              <Network size={22} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-mono-black uppercase block mb-1">
                #NETWORKING
              </span>
              <h3 className="font-display font-extrabold text-mono-black text-base">
                Jaringan Komputer
              </h3>
              <p className="text-xs text-mono-gray mt-1">
                Router, Switch, MikroTik MTCNA, Cisco Packet Tracer & Topology.
              </p>
            </div>
          </a>

          {/* Card 2: Android Dev */}
          <a
            href="#skills"
            className="editorial-card p-5 flex items-start gap-4 group hover:border-mono-black transition-all"
          >
            <div className="p-3 rounded-xl bg-mono-black text-white group-hover:scale-105 transition-transform">
              <Smartphone size={22} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-mono-black uppercase block mb-1">
                #ANDROIDDEV
              </span>
              <h3 className="font-display font-extrabold text-mono-black text-base">
                Android Development
              </h3>
              <p className="text-xs text-mono-gray mt-1">
                Kotlin, Android Studio, REST API integration & Mobile UX.
              </p>
            </div>
          </a>

          {/* Card 3: IT Support */}
          <a
            href="#skills"
            className="editorial-card p-5 flex items-start gap-4 group hover:border-mono-black transition-all"
          >
            <div className="p-3 rounded-xl bg-mono-black text-white group-hover:scale-105 transition-transform">
              <Wrench size={22} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-widest text-mono-black uppercase block mb-1">
                #ITSUPPORT
              </span>
              <h3 className="font-display font-extrabold text-mono-black text-base">
                IT Support & Maintenance
              </h3>
              <p className="text-xs text-mono-gray mt-1">
                Hardware, OS troubleshooting, network maintenance & field support.
              </p>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
