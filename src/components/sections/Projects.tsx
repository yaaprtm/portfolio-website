"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Github, Eye } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { projects, Project } from "@/data/projects";
import ProjectModal from "@/components/ui/ProjectModal";

const categories = [
  { id: "all", label: "Semua Proyek" },
  { id: "android", label: "Android Dev" },
  { id: "networking", label: "Networking" },
  { id: "other", label: "IT Support" },
];

const placeholderGradients = [
  "from-emerald-950/40 via-navy-900 to-navy-800",
  "from-cyan-950/40 via-navy-900 to-navy-800",
  "from-slate-900 via-navy-900 to-slate-900",
  "from-blue-950/40 via-navy-900 to-navy-800",
];

function getBadgeVariant(tech: string): "cyan" | "blue" | "green" | "amber" | "default" {
  const t = tech.toLowerCase();
  if (t.includes("kotlin") || t.includes("android")) return "green";
  if (t.includes("react") || t.includes("next")) return "blue";
  if (t.includes("cisco") || t.includes("mikrotik") || t.includes("vlan")) return "cyan";
  return "default";
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag="03 / PROJECTS"
        title="Proyek Unggulan"
        subtitle="Beberapa proyek praktis dan aplikasi yang telah dikembangkan."
      />

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-all ${
              activeCategory === cat.id
                ? "text-navy-950 font-bold bg-cyan-neon shadow-lg"
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
          {filteredProjects.map((project, idx) => (
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
                  className={`relative h-44 bg-gradient-to-br ${
                    placeholderGradients[idx % placeholderGradients.length]
                  } flex items-center justify-center overflow-hidden border-b border-white/5 cursor-pointer`}
                  onClick={() => setSelectedProject(project)}
                >
                  <FolderGit2
                    size={44}
                    className="text-slate-600 group-hover:text-cyan-neon transition-colors duration-300"
                    strokeWidth={1.5}
                  />

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase bg-navy-950/80 border border-white/10 text-slate-300">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay Button */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-neon text-navy-950 font-mono text-xs font-bold flex items-center gap-1.5">
                      <Eye size={14} /> Detail & Interactive Preview
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="font-bold text-slate-100 text-lg mb-2 group-hover:text-cyan-neon transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
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
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-mono text-cyan-neon hover:underline flex items-center gap-1"
                >
                  <Eye size={13} /> Pratinjau Detail
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-100 text-xs font-mono transition-colors flex items-center gap-1"
                    >
                      <Github size={13} /> Repo
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-neon text-xs font-mono transition-colors flex items-center gap-1"
                    >
                      Demo <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
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
