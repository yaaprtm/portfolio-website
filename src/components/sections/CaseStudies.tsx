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
  description?: string;
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
    techs: ["Android Native", "Java", "REST API", "JSON Schema", "Git"],
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
    <SectionWrapper id="casestudies" className="bg-[#F0EEE9]">
      <SectionHeading
        tag={t.caseStudies.tag}
        title={t.caseStudies.title}
        subtitle={t.caseStudies.subtitle}
      />

      {/* Control Buttons */}
      <div className="flex justify-end gap-3 mb-6 -mt-4">
        <button
          onClick={expandAll}
          className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-warm-card border border-warm-dark/10 text-warm-dark hover:bg-olive-500 hover:text-white transition-all"
        >
          {t.caseStudies.expandAll}
        </button>
        <button
          onClick={collapseAll}
          className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-warm-card border border-warm-dark/10 text-warm-dark hover:bg-olive-500 hover:text-white transition-all"
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
          const imagesNote = (data as { imagesNote?: string }).imagesNote;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="editorial-card overflow-hidden"
            >
              {/* Card Header Bar */}
              <div
                onClick={() => toggleItem(item.id)}
                className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none hover:bg-warm-card-hover transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-olive-500/10 border border-olive-500/20 flex items-center justify-center text-olive-500 flex-shrink-0 mt-0.5">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#F0EEE9] text-olive-500 border border-warm-dark/10">
                        {data.category}
                      </span>
                      <span className="text-xs font-semibold text-warm-gray">
                        {data.subtitle}
                      </span>
                    </div>
                    <h3 className="font-display font-extrabold text-xl sm:text-2xl text-warm-dark group-hover:text-olive-500 transition-colors">
                      {data.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-olive-500 hidden sm:inline">
                    {isOpen ? t.caseStudies.collapseAll : t.caseStudies.viewStar}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-warm-card border border-warm-dark/10 flex items-center justify-center text-warm-dark">
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
                    className="border-t border-warm-dark/10 px-6 sm:px-8 pb-8 pt-6 space-y-6"
                  >
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-1 pb-2 border-b border-warm-dark/10">
                      {item.techs.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#F0EEE9] border border-warm-dark/10 text-xs font-semibold text-warm-dark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* STAR Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* S — Situation */}
                      <div className="p-5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-olive-500 font-display text-xs font-bold uppercase tracking-wider">
                          <Compass size={16} />
                          <span>S — Situation</span>
                        </div>
                        <p className="text-warm-gray text-sm leading-relaxed">
                          {data.situation}
                        </p>
                      </div>

                      {/* T — Task */}
                      <div className="p-5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 space-y-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-warm-dark font-display text-xs font-bold uppercase tracking-wider">
                          <ListTodo size={16} />
                          <span>T — Task</span>
                        </div>
                        <p className="text-warm-gray text-sm leading-relaxed">
                          {data.task}
                        </p>
                      </div>

                      {/* A — Action */}
                      <div className="p-5 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 space-y-2 md:col-span-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-olive-500 font-display text-xs font-bold uppercase tracking-wider">
                          <Wrench size={16} />
                          <span>A — Action</span>
                        </div>
                        <p className="text-warm-dark text-sm leading-relaxed font-normal">
                          {data.action}
                        </p>
                      </div>

                      {/* R — Result */}
                      <div className="p-5 rounded-2xl bg-olive-500/10 border border-olive-500/30 space-y-2 md:col-span-2 relative overflow-hidden">
                        <div className="flex items-center gap-2 text-olive-500 font-display text-xs font-bold uppercase tracking-wider">
                          <Trophy size={16} />
                          <span>R — Result & Impact</span>
                        </div>
                        <p className="text-warm-dark text-sm leading-relaxed font-medium">
                          {data.result}
                        </p>
                      </div>
                    </div>

                    {/* Photo Gallery Support */}
                    {images && images.length > 0 && (
                      <div className="pt-4 border-t border-warm-dark/10 space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-olive-500 flex items-center gap-1.5">
                            <ImageIcon size={14} /> Foto & Dokumentasi Lapangan ({images.length})
                          </span>
                          <span className="text-[11px] text-warm-muted uppercase tracking-wider">
                            Klik foto untuk memperbesar
                          </span>
                        </div>

                        {imagesNote && (
                          <p className="text-xs text-warm-gray bg-[#F0EEE9] border border-warm-dark/10 p-4 rounded-2xl leading-relaxed italic flex items-start gap-2">
                            <span className="text-olive-500 font-bold not-italic">ℹ️</span>
                            <span>{imagesNote}</span>
                          </p>
                        )}

                        {/* Responsive Multi-Image Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {images.map((img, imgIdx) => (
                            <div
                              key={imgIdx}
                              onClick={() => setActiveImage(img)}
                              className="group relative aspect-video rounded-2xl border border-warm-dark/10 overflow-hidden cursor-pointer bg-warm-card hover:border-olive-500 transition-all flex flex-col justify-between"
                            >
                              {!failedImages[img.src] ? (
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  className="object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                                  onError={() => handleImageError(img.src)}
                                />
                              ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                                  <ImageIcon size={24} className="text-warm-muted mb-1" />
                                  <p className="text-[11px] text-warm-dark font-bold line-clamp-2">
                                    {img.caption || img.alt}
                                  </p>
                                </div>
                              )}

                              <div className="absolute inset-0 bg-warm-dark/60 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex items-end justify-between">
                                <span className="text-[11px] font-semibold text-white truncate pr-2">
                                  {img.caption || img.alt}
                                </span>
                                <Maximize2 size={14} className="text-white flex-shrink-0" />
                              </div>
                            </div>
                          ))}
                        </div>
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
            className="fixed inset-0 z-50 bg-warm-dark/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#F0EEE9] rounded-3xl p-6 border border-warm-dark/20 shadow-2xl text-center space-y-4"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-warm-card text-warm-dark hover:bg-warm-dark hover:text-white transition-colors z-10"
              >
                <X size={20} />
              </button>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-warm-card border border-warm-dark/10 flex items-center justify-center">
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
                    <ImageIcon size={48} className="mx-auto text-olive-500 mb-2" />
                    <p className="text-sm font-bold text-warm-dark">
                      {activeImage.caption || activeImage.alt}
                    </p>
                  </div>
                )}
              </div>

              <div className="text-left space-y-2 max-w-3xl mx-auto">
                <p className="text-warm-dark font-display font-extrabold text-lg text-olive-500">
                  {activeImage.caption || activeImage.alt}
                </p>
                {activeImage.description && (
                  <p className="text-warm-gray text-xs sm:text-sm leading-relaxed bg-warm-card border border-warm-dark/10 p-4 rounded-2xl">
                    {activeImage.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
