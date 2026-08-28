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
    <SectionWrapper id="projects" className="bg-[#FAFAFA]">
      <SectionHeading
        tag={t.projects.tag}
        title={t.projects.title}
        subtitle={t.projects.subtitle}
      />

      {/* Search Input Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-4 text-mono-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              play("type");
            }}
            placeholder="Cari proyek... (Java, VSAT, Android)"
            className="w-full bg-mono-card border border-mono-border rounded-full pl-11 pr-10 py-3 text-xs font-bold text-mono-black placeholder-mono-muted focus:outline-none focus:border-mono-black focus:ring-2 focus:ring-mono-black/10 transition-all"
          />
          <AnimatePresence>
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => { setSearchQuery(""); play("click"); }}
                className="absolute right-4 text-mono-muted hover:text-mono-black transition-colors"
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
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeCategory === cat.id
                ? "bg-mono-black text-white shadow-md"
                : "text-mono-gray hover:text-mono-black bg-mono-card border border-mono-border"
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
              <Search size={36} className="mx-auto mb-4 text-mono-muted" />
              <p className="text-mono-gray font-semibold text-sm">
                Tidak ada proyek yang cocok dengan &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); play("click"); }}
                className="mt-4 text-xs font-extrabold text-mono-black hover:underline uppercase tracking-wider"
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
                    className={`relative overflow-hidden border-b border-mono-border bg-mono-card ${
                      project.imageOrientation === "portrait" ? "h-64" : "h-52"
                    }`}
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className={`object-cover filter grayscale contrast-110 group-hover:scale-105 transition-all duration-500 ${
                          project.imageOrientation === "portrait"
                            ? "object-top"
                            : "object-center"
                        }`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-mono-card flex items-center justify-center">
                        <FolderGit2
                          size={48}
                          className="text-mono-muted group-hover:text-mono-black transition-colors duration-300"
                          strokeWidth={1.5}
                        />
                      </div>
                    )}

                    {/* Category Badges */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      {hasCaseStudy && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-mono-black text-white shadow-sm">
                          Case Study
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FAFAFA]/95 border border-mono-border text-mono-black shadow-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Button Overlay */}
                    <div className="absolute inset-0 bg-mono-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
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
                        className="font-display font-extrabold text-mono-black text-xl mb-2 group-hover:text-mono-gray transition-colors block"
                      >
                        {project.title}
                      </Link>
                    ) : (
                      <h3
                        onClick={() => setSelectedProject(project)}
                        className="font-display font-extrabold text-mono-black text-xl mb-2 group-hover:text-mono-gray transition-colors cursor-pointer"
                      >
                        {project.title}
                      </h3>
                    )}

                    <p className="text-mono-gray text-xs sm:text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 rounded-full bg-[#FAFAFA] border border-mono-border text-xs font-bold text-mono-black"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link Actions */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-mono-border">
                  {hasCaseStudy ? (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-xs font-extrabold text-mono-black hover:underline uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <BookOpen size={14} /> {t.projects.caseStudyDetail} <ArrowRight size={12} />
                    </Link>
                  ) : (
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs font-extrabold text-mono-black hover:underline uppercase tracking-wider flex items-center gap-1"
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
                        className="text-mono-gray hover:text-mono-black text-xs font-bold transition-colors flex items-center gap-1"
                      >
                        <Github size={14} /> GitHub
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-mono-gray hover:text-mono-black text-xs font-bold transition-colors flex items-center gap-1"
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
