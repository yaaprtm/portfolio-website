"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Github, Eye, ArrowRight, BookOpen, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { projects, Project } from "@/data/projects";
import ProjectModal from "@/components/ui/ProjectModal";
import { useLanguage } from "@/context/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const placeholderGradients = [
  "from-emerald-950/40 via-navy-900 to-navy-800",
  "from-cyan-950/40 via-navy-900 to-navy-800",
  "from-slate-900 via-navy-900 to-slate-900",
  "from-blue-950/40 via-navy-900 to-navy-800",
];

function getBadgeVariant(tech: string): "cyan" | "blue" | "green" | "amber" | "default" {
  const t = tech.toLowerCase();
  if (t.includes("java") || t.includes("android")) return "green";
  if (t.includes("react") || t.includes("next")) return "blue";
  if (t.includes("cisco") || t.includes("mikrotik") || t.includes("vlan")) return "cyan";
  return "default";
}

export default function Projects() {
  const { t } = useLanguage();
  const { play } = useSoundEffects();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: t.projects.categories.all },
    { id: "android", label: t.projects.categories.android },
    { id: "networking", label: t.projects.categories.networking },
    { id: "other", label: t.projects.categories.other },
  ];

  const filteredProjects = projects
    .filter((p) => activeCategory === "all" || p.category === activeCategory)
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((tech) => tech.toLowerCase().includes(q))
      );
    });

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag={t.projects.tag}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      {/* Live Search Bar */}
      <div className="relative max-w-md mx-auto mb-6">
        <div className="relative flex items-center">
          <Search size={15} className="absolute left-3.5 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              play("type");
            }}
            placeholder="Cari proyek... (contoh: Java, VSAT, Android)"
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs font-mono text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-neon/40 focus:bg-white/[0.05] transition-all"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { setSearchQuery(""); play("click"); }}
                className="absolute right-3 text-slate-500 hover:text-slate-200 transition-colors"
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); play("click"); }}
            className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeCategory === cat.id
                ? "text-[var(--color-cyan-text)] font-bold bg-cyan-neon shadow-lg"
                : "text-slate-400 hover:text-slate-200 bg-white/[0.03] border border-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="col-span-2 py-16 text-center"
            >
              <Search size={32} className="mx-auto mb-4 text-slate-700" />
              <p className="text-slate-500 font-mono text-sm">
                Tidak ada proyek yang cocok dengan &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); play("click"); }}
                className="mt-4 text-xs font-mono text-cyan-neon hover:underline"
              >
                Reset pencarian
              </button>
            </motion.div>
          )}
          {filteredProjects.map((project, idx) => {
            const hasCaseStudy = Boolean(project.hasCaseStudy && project.slug);

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card overflow-hidden group project-card flex flex-col justify-between"
              >
                <div>
                  {/* Banner Preview */}
                  <div
                    className={`relative overflow-hidden border-b border-white/5 ${
                      project.imageOrientation === "portrait" ? "h-64" : "h-44"
                    }`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                          project.imageOrientation === "portrait"
                            ? "object-top"
                            : "object-center"
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${
                          placeholderGradients[idx % placeholderGradients.length]
                        } flex items-center justify-center`}
                      >
                        <FolderGit2
                          size={44}
                          className="text-slate-600 group-hover:text-cyan-neon transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    )}

                    {/* Overlay gelap tipis agar badge terbaca */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    <div className="absolute top-3 right-3 flex items-center gap-2">
                      {hasCaseStudy && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-black/60 text-slate-100 border border-white/20 font-semibold backdrop-blur-md shadow-sm">
                          {t.projects.caseStudyAvailable}
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-black/70 border border-white/10 text-slate-300 backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 text-center">
                      {hasCaseStudy ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="px-4 py-2 rounded-xl bg-cyan-neon text-[var(--color-cyan-text)] font-mono text-xs font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
                        >
                          <BookOpen size={14} /> {t.projects.readCaseStudy} <ArrowRight size={14} />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2 rounded-xl bg-cyan-neon text-[var(--color-cyan-text)] font-mono text-xs font-bold flex items-center gap-2 shadow-lg"
                        >
                          <Eye size={14} /> {t.projects.detailPreview}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {hasCaseStudy ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-bold text-slate-100 text-lg mb-2 group-hover:text-cyan-neon transition-colors block"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-bold text-slate-100 text-lg mb-2 group-hover:text-cyan-neon transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                    )}

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.map((tech) => (
                        <Badge key={tech} variant={getBadgeVariant(tech)}>
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                  {hasCaseStudy ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-mono text-cyan-neon hover:underline flex items-center gap-1.5 font-bold"
                    >
                      <BookOpen size={13} /> {t.projects.caseStudyDetail} <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-mono text-cyan-neon hover:underline flex items-center gap-1"
                    >
                      <Eye size={13} /> {t.projects.preview}
                    </button>
                  )}

                  <div className="flex items-center gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-slate-100 text-xs font-mono transition-colors flex items-center gap-1"
                      >
                        <Github size={13} /> {t.projects.repo}
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-cyan-neon text-xs font-mono transition-colors flex items-center gap-1"
                      >
                        {t.projects.demo} <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  );
}
