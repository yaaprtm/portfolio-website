"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Smartphone, Cpu, Users, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";

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
          className="fixed inset-0 bg-warm-dark/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#F0EEE9] border border-warm-dark/10 p-6 sm:p-8 rounded-3xl shadow-2xl z-10 max-h-[90vh] overflow-y-auto text-warm-dark"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 rounded-full text-warm-dark hover:bg-warm-card transition-all z-20"
          >
            <X size={20} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Interactive Phone Frame or Visual Preview */}
            <div className="lg:col-span-5 flex justify-center">
              {isAndroid ? (
                /* Phone Frame Mockup */
                <div className="relative w-64 h-[440px] bg-warm-dark border-[6px] border-warm-dark rounded-[40px] shadow-2xl p-3 flex flex-col justify-between overflow-hidden group">
                  {/* Camera Notch */}
                  <div className="w-16 h-4 bg-warm-card rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-warm-dark" />
                  </div>

                  {/* App Screen Content */}
                  <div className="flex-1 rounded-2xl bg-[#F0EEE9] border border-warm-dark/10 p-4 flex flex-col justify-between overflow-hidden relative">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Smartphone size={16} className="text-olive-500" />
                        <span className="font-display font-bold text-xs text-olive-500 uppercase tracking-wider">BRIN App Preview</span>
                      </div>
                      <h4 className="font-display font-extrabold text-warm-dark text-base">Kebun Raya Cibinong</h4>
                      <p className="text-warm-gray text-xs leading-relaxed">
                        Aplikasi Android interaktif ekosistem Kebun Raya Cibinong (Magang BRIN 2 Bulan).
                      </p>

                      <div className="bg-warm-card p-3 rounded-xl border border-warm-dark/10 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-semibold text-warm-dark">
                          <CheckCircle2 size={14} className="text-olive-500" />
                          <span>Peta Interaktif & Denah</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-warm-dark">
                          <CheckCircle2 size={14} className="text-olive-500" />
                          <span>Integrasi REST API</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-warm-dark">
                          <CheckCircle2 size={14} className="text-olive-500" />
                          <span>Pencarian Tanaman</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-center pt-2">
                      <span className="px-3 py-1 rounded-full bg-olive-500 text-white font-bold text-[10px] uppercase tracking-wider">
                        Android Native · Java
                      </span>
                    </div>
                  </div>

                  {/* Navigation Pill */}
                  <div className="w-20 h-1 bg-warm-gray rounded-full mx-auto mt-2" />
                </div>
              ) : (
                /* Non-Android Project Preview */
                <div className="w-full h-64 rounded-2xl bg-warm-card border border-warm-dark/10 p-6 flex flex-col items-center justify-center text-center">
                  <Cpu size={48} className="text-olive-500 mb-3" />
                  <span className="font-display font-extrabold text-warm-dark text-lg">{project.title}</span>
                  <span className="text-xs font-bold uppercase tracking-wider text-olive-500 mt-1">{project.category}</span>
                </div>
              )}
            </div>

            {/* Right side: Project Details & Technical Architecture */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="px-3.5 py-1 rounded-full bg-olive-500 text-white text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="font-display font-extrabold text-warm-dark text-3xl mt-4 mb-3">{project.title}</h3>
                <p className="text-warm-gray text-base leading-relaxed">{project.description}</p>
              </div>

              {/* Team Architecture Info (For BRIN internship project) */}
              {project.title.includes("BRIN") && (
                <div className="bg-warm-card border border-warm-dark/10 p-5 rounded-2xl space-y-3">
                  <h4 className="font-display text-xs font-bold text-olive-500 uppercase tracking-widest flex items-center gap-2">
                    <Users size={16} /> Struktur Tim Magang BRIN (4 Orang)
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-warm-dark">
                    <div className="bg-[#F0EEE9] p-3 rounded-xl border border-warm-dark/10">📱 1 Android Developer (Arya)</div>
                    <div className="bg-[#F0EEE9] p-3 rounded-xl border border-warm-dark/10">💻 1 Frontend Web Dev</div>
                    <div className="bg-[#F0EEE9] p-3 rounded-xl border border-warm-dark/10">⚙️ 2 Backend Developers</div>
                    <div className="bg-[#F0EEE9] p-3 rounded-xl border border-warm-dark/10">🌐 Website & Mobile Sync</div>
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-warm-muted mb-3">Teknologi & Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3.5 py-1.5 rounded-full bg-warm-card border border-warm-dark/10 text-xs font-semibold text-warm-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-6 border-t border-warm-dark/10">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-3 px-5 text-xs uppercase tracking-wider flex items-center gap-2"
                  >
                    <Github size={16} /> Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-3 px-5 text-xs uppercase tracking-wider flex items-center gap-2"
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
