"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Radio,
  Code2,
  ChevronDown,
  ChevronUp,
  Compass,
  CheckCircle2,
  ListTodo,
  Wrench,
  Trophy,
  Layers,
  Sparkles,
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

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => setOpenItems({ vsat: true, brin: true });
  const collapseAll = () => setOpenItems({ vsat: false, brin: false });

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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
