"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { projects } from "@/data/projects";

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
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag="03 / PROJECTS"
        title="Proyek Unggulan"
        subtitle="Beberapa proyek praktis dan aplikasi yang telah dikembangkan."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-card overflow-hidden group project-card"
          >
            {/* Card Header Banner */}
            <div
              className={`relative h-44 bg-gradient-to-br ${placeholderGradients[idx % placeholderGradients.length]}
                          flex items-center justify-center overflow-hidden border-b border-white/5`}
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
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-bold text-slate-100 text-lg mb-2 group-hover:text-cyan-neon transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant={getBadgeVariant(tech)}>
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 text-xs font-mono transition-colors"
                  >
                    <Github size={14} />
                    Repository
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-cyan-neon hover:underline text-xs font-mono transition-colors ml-auto"
                  >
                    Live Demo
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
