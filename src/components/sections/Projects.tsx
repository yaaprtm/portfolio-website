"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Github, Eye, ArrowRight, BookOpen, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, Project } from "@/data/projects";
import ProjectModal from "@/components/ui/ProjectModal";
import { useLanguage } from "@/context/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

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
    <SectionWrapper id="projects" className="bg-[#F0EEE9]">
      <SectionHeading
        tag={t.projects.tag}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      {/* Search Input Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-4 text-warm-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              play("type");
            }}
            placeholder="Cari proyek... (Java, VSAT, Android)"
            className="w-full bg-warm-card border border-warm-dark/10 rounded-full pl-11 pr-10 py-3 text-xs font-semibold text-warm-dark placeholder-warm-muted focus:outline-none focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20 transition-all"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { setSearchQuery(""); play("click"); }}
                className="absolute right-4 text-warm-muted hover:text-warm-dark transition-colors"
              >
                <X size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.id); play("click"); }}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              activeCategory === cat.id
                ? "bg-olive-500 text-white shadow-md font-bold"
                : "text-warm-gray hover:text-warm-dark bg-warm-card border border-warm-dark/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="col-span-2 py-16 text-center"
            >
              <Search size={36} className="mx-auto mb-4 text-warm-muted" />
              <p className="text-warm-gray font-medium text-sm">
                Tidak ada proyek yang cocok dengan &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); play("click"); }}
                className="mt-4 text-xs font-bold text-olive-500 hover:underline uppercase tracking-wider"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="editorial-card overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* Banner Preview Frame */}
                  <div
                    className={`relative overflow-hidden border-b border-warm-dark/10 bg-warm-card ${
                      project.imageOrientation === "portrait" ? "h-64" : "h-52"
                    }`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ${
                          project.imageOrientation === "portrait"
                            ? "object-top"
                            : "object-center"
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-warm-card flex items-center justify-center">
                        <FolderGit2
                          size={48}
                          className="text-warm-muted group-hover:text-olive-500 transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    )}

                    {/* Editorial Category Pill */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {hasCaseStudy && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-warm-dark text-white shadow-sm">
                          Case Study
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F0EEE9]/90 border border-warm-dark/10 text-warm-dark shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Button Overlay */}
                    <div className="absolute inset-0 bg-warm-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      {hasCaseStudy ? (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="btn-primary"
                        >
                          <BookOpen size={14} className="mr-2" /> {t.projects.readCaseStudy} <ArrowRight size={14} className="ml-1" />
                        </Link>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="btn-primary"
                        >
                          <Eye size={14} className="mr-2" /> {t.projects.detailPreview}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    {hasCaseStudy ? (
                      <Link
                        href={`/projects/${project.slug}`}
                        className="font-display font-extrabold text-warm-dark text-xl mb-2 group-hover:text-olive-500 transition-colors block"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-display font-extrabold text-warm-dark text-xl mb-2 group-hover:text-olive-500 transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                    )}

                    <p className="text-warm-gray text-xs sm:text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#F0EEE9] border border-warm-dark/10 text-xs font-semibold text-warm-dark"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link Actions */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-warm-dark/10">
                  {hasCaseStudy ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-bold text-olive-500 hover:underline uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <BookOpen size={14} /> {t.projects.caseStudyDetail} <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-bold text-olive-500 hover:underline uppercase tracking-wider flex items-center gap-1"
                    >
                      <Eye size={14} /> {t.projects.preview}
                    </button>
                  )}

                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gray hover:text-warm-dark text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-warm-gray hover:text-olive-500 text-xs font-semibold transition-colors flex items-center gap-1"
                      >
                        Demo <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionWrapper>
  );
}
