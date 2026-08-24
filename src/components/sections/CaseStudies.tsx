"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Radio,
  Code2,
  ChevronDown,
  ChevronUp,
  Compass,
  ListTodo,
  Wrench,
  Trophy,
  ImageIcon,
  Maximize2,
  X,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { useLanguage } from "@/context/LanguageContext";

interface StarItem {
  id: "vsat" | "brin";
  icon: React.ElementType;
  techs: string[];
}

interface CaseStudyImage {
  src: string;
  alt: string;
  caption?: string;
}

const caseStudyItems: StarItem[] = [
  {
    id: "vsat",
    icon: Radio,
    techs: ["VSAT Antenna", "LNB & Modem", "Coaxial Cables", "Pointing / Alignment", "Field Documentation"],
  },
  {
    id: "brin",
    icon: Code2,
    techs: ["Android Native", "Kotlin / Java", "REST API", "JSON Schema", "Git"],
  },
];

export default function CaseStudies() {
  const { t } = useLanguage();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    vsat: true,
    brin: true,
  });

  const [activeImage, setActiveImage] = useState<CaseStudyImage | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => setOpenItems({ vsat: true, brin: true });
  const collapseAll = () => setOpenItems({ vsat: false, brin: false });

  const handleImageError = (src: string) => {
    setFailedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <SectionWrapper id="casestudies" className="relative z-10">
      <SectionHeading
        tag={t.caseStudies.tag}
        title={t.caseStudies.title}
        subtitle={t.caseStudies.subtitle}
      />

      {/* Control Buttons */}
      <div className="flex justify-end gap-3 mb-6 -mt-4">
        <button
          onClick={expandAll}
          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/40 transition-all"
        >
          {t.caseStudies.expandAll}
        </button>
        <button
          onClick={collapseAll}
          className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/40 transition-all"
        >
          {t.caseStudies.collapseAll}
        </button>
      </div>

      {/* Case Study Cards */}
      <div className="space-y-8">
        {caseStudyItems.map((item, index) => {
          const data = t.caseStudies[item.id];
          const isOpen = openItems[item.id];
          const Icon = item.icon;
          const images: CaseStudyImage[] = data.images || [];

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card overflow-hidden border border-white/10 rounded-2xl transition-all duration-300"
            >
              {/* Card Header Bar */}
              <div
                onClick={() => toggleItem(item.id)}
                className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-soft border border-cyan-neon/30 flex items-center justify-center text-cyan-neon flex-shrink-0 mt-0.5">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-cyan-soft text-cyan-neon border border-cyan-neon/30">
                        {data.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {data.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-100 group-hover:text-cyan-neon transition-colors">
                      {data.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-mono text-cyan-neon font-semibold hidden sm:inline">
                    {isOpen ? t.caseStudies.collapseAll : t.caseStudies.viewStar}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-slate-300">
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>

              {/* STAR Content Accordion Body */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="border-t border-white/10 px-6 sm:px-8 pb-8 pt-6 space-y-6"
                  >
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1 pb-2 border-b border-white/5">
                      {item.techs.map((tech) => (
                        <Badge key={tech} variant="cyan">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* STAR Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* S — Situation */}
                      <div className="p-5 rounded-xl bg-navy-900/60 border border-blue-500/20 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold uppercase tracking-wider">
                          <Compass size={16} />
                          <span>S — Situation</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {data.situation}
                        </p>
                      </div>

                      {/* T — Task */}
                      <div className="p-5 rounded-xl bg-navy-900/60 border border-amber-500/20 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                          <ListTodo size={16} />
                          <span>T — Task</span>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed">
                          {data.task}
                        </p>
                      </div>

                      {/* A — Action */}
                      <div className="p-5 rounded-xl bg-navy-900/60 border border-cyan-neon/30 space-y-2 md:col-span-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-cyan-neon font-mono text-xs font-bold uppercase tracking-wider">
                          <Wrench size={16} />
                          <span>A — Action</span>
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed font-normal">
                          {data.action}
                        </p>
                      </div>

                      {/* R — Result */}
                      <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 md:col-span-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider">
                          <Trophy size={16} />
                          <span>R — Result & Impact</span>
                        </div>
                        <p className="text-emerald-100/90 text-sm leading-relaxed">
                          {data.result}
                        </p>
                      </div>
                    </div>

                    {/* Photo Gallery Support (Task 4) */}
                    {images && images.length > 0 && (
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-mono text-cyan-neon uppercase tracking-wider font-semibold flex items-center gap-1.5">
                            <ImageIcon size={14} /> Foto & Dokumentasi Lapangan ({images.length})
                          </span>
                          <span className="text-[11px] font-mono text-slate-400">
                            Klik foto untuk memperbesar
                          </span>
                        </div>

                        {/* Layout: Single Image Full-Width OR Responsive Multi-Image Grid */}
                        {images.length === 1 ? (
                          <div
                            onClick={() => setActiveImage(images[0])}
                            className="group relative w-full aspect-video rounded-xl border border-white/10 overflow-hidden cursor-pointer bg-navy-900/60 hover:border-cyan-neon/40 transition-all"
                          >
                            {!failedImages[images[0].src] ? (
                              <Image
                                src={images[0].src}
                                alt={images[0].alt}
                                fill
                                sizes="100vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={() => handleImageError(images[0].src)}
                              />
                            ) : (
                              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                                <ImageIcon size={32} className="text-slate-500 mb-2" />
                                <p className="text-xs font-mono text-slate-300 font-bold mb-1">
                                  {images[0].caption || images[0].alt}
                                </p>
                                <p className="text-[10px] font-mono text-cyan-neon">
                                  File: {images[0].src}
                                </p>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end justify-between">
                              <span className="text-xs font-mono text-slate-200 truncate">
                                {images[0].caption || images[0].alt}
                              </span>
                              <Maximize2 size={16} className="text-cyan-neon flex-shrink-0" />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {images.map((img, imgIdx) => (
                              <div
                                key={imgIdx}
                                onClick={() => setActiveImage(img)}
                                className="group relative aspect-video rounded-xl border border-white/10 overflow-hidden cursor-pointer bg-navy-900/60 hover:border-cyan-neon/40 transition-all flex flex-col justify-between"
                              >
                                {!failedImages[img.src] ? (
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={() => handleImageError(img.src)}
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                                    <ImageIcon size={24} className="text-slate-500 mb-1" />
                                    <p className="text-[11px] font-mono text-slate-300 font-semibold line-clamp-2">
                                      {img.caption || img.alt}
                                    </p>
                                    <p className="text-[9px] font-mono text-cyan-neon truncate w-full mt-1">
                                      {img.src.split("/").pop()}
                                    </p>
                                  </div>
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
                                  <span className="text-[11px] font-mono text-slate-200 truncate pr-2">
                                    {img.caption || img.alt}
                                  </span>
                                  <Maximize2 size={14} className="text-cyan-neon flex-shrink-0" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full glass-card p-6 border border-white/20 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 text-slate-300 hover:text-white transition-colors z-10 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={20} />
              </button>

              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-navy-950 border border-white/10 flex items-center justify-center">
                {!failedImages[activeImage.src] ? (
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="p-6 text-center space-y-2">
                    <ImageIcon size={48} className="mx-auto text-cyan-neon mb-2 animate-bounce" />
                    <p className="text-sm font-bold text-slate-100 font-mono">
                      {activeImage.caption || activeImage.alt}
                    </p>
                    <p className="text-xs font-mono text-slate-400">
                      Foto pendukung case study. Simpan foto di path:
                    </p>
                    <p className="text-xs font-mono text-cyan-neon font-bold bg-white/5 p-2 rounded-lg inline-block">
                      public{activeImage.src}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-left space-y-1">
                <p className="text-slate-100 font-bold text-sm font-mono">
                  {activeImage.caption || activeImage.alt}
                </p>
                <p className="text-slate-400 text-xs font-mono">
                  Alt: {activeImage.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
