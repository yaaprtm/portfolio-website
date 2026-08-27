"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Smartphone, Cpu, Users, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";
import Badge from "@/components/ui/Badge";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  const isAndroid = project.category === "android";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-card border border-white/10 p-6 sm:p-8 rounded-2xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-slate-200"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-white/10 transition-all z-20"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Interactive Android Phone Frame (for Android app) or Visual Preview */}
            <div className="lg:col-span-5 flex justify-center">
              {isAndroid ? (
                /* Interactive Android Phone Frame Mockup */
                <div className="relative w-64 h-[440px] bg-slate-900 border-[6px] border-slate-700 rounded-[40px] shadow-2xl p-3 flex flex-col justify-between overflow-hidden group">
                  {/* Camera Punchhole */}
                  <div className="w-16 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700" />
                  </div>

                  {/* App Screen Content */}
                  <div className="flex-1 rounded-2xl bg-gradient-to-b from-slate-900 via-emerald-950/40 to-slate-900 border border-white/10 p-4 flex flex-col justify-between overflow-hidden relative">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} className="text-cyan-neon" />
                        <span className="font-mono text-[11px] text-cyan-neon font-bold">BRIN App Preview</span>
                      </div>
                      <h4 className="font-bold text-slate-100 text-sm">Kebun Raya Cibinong</h4>
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Aplikasi Android interaktif ekosistem Kebun Raya Cibinong (Magang BRIN 2 Bulan).
                      </p>

                      <div className="bg-white/[0.04] p-2.5 rounded-xl border border-white/10 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                          <CheckCircle2 size={12} className="text-cyan-neon" />
                          <span>Peta Interaktif & Denah</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                          <CheckCircle2 size={12} className="text-cyan-neon" />
                          <span>Integrasi REST API</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                          <CheckCircle2 size={12} className="text-cyan-neon" />
                          <span>Pencarian Tanaman</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-soft text-cyan-neon font-mono text-[9px]">
                        Android Native · Java
                      </span>
                    </div>
                  </div>

                  {/* Navigation Pill */}
                  <div className="w-20 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
                </div>
              ) : (
                /* Non-Android Project Preview */
                <div className="w-full h-64 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-navy-900 to-slate-900 border border-white/10 p-6 flex flex-col items-center justify-center text-center">
                  <Cpu size={48} className="text-cyan-neon mb-3 opacity-80" />
                  <span className="font-mono text-xs text-slate-300 font-semibold">{project.title}</span>
                  <span className="font-mono text-[10px] text-slate-500 mt-1 uppercase">{project.category}</span>
                </div>
              )}
            </div>

            {/* Right side: Project Details & Technical Architecture */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-soft text-cyan-neon text-xs font-mono border border-cyan-neon/30">
                  {project.category.toUpperCase()}
                </span>
                <h3 className="text-2xl font-bold text-slate-100 mt-3 mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Team Architecture Info (For BRIN internship project) */}
              {project.title.includes("BRIN") && (
                <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl space-y-2">
                  <h4 className="font-mono text-xs font-semibold text-cyan-neon flex items-center gap-2">
                    <Users size={14} /> Struktur Tim Magang BRIN (4 Orang)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                    <div className="bg-white/5 p-2 rounded border border-white/5">📱 1 Android Developer (Arya)</div>
                    <div className="bg-white/5 p-2 rounded border border-white/5">💻 1 Frontend Web Dev</div>
                    <div className="bg-white/5 p-2 rounded border border-white/5">⚙️ 2 Backend Developers</div>
                    <div className="bg-white/5 p-2 rounded border border-white/5">🌐 Website & Mobile Sync</div>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="font-mono text-xs font-semibold text-slate-400 mb-2">Teknologi & Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <Badge key={tech} variant="cyan">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-4 py-2 text-xs font-mono flex items-center gap-2"
                  >
                    <Github size={14} /> Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary px-4 py-2 text-xs font-mono flex items-center gap-2"
                  >
                    Live Demo <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
