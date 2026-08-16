"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, FolderOpen } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { projects } from "@/data/projects";

// Placeholder gradient images for projects without actual images
const placeholderGradients = [
  "from-cyan-900/40 via-navy-800 to-blue-900/40",
  "from-emerald-900/40 via-navy-800 to-cyan-900/40",
  "from-violet-900/40 via-navy-800 to-blue-900/40",
  "from-amber-900/40 via-navy-800 to-orange-900/40",
];

// Map tech name to badge variant
function getBadgeVariant(tech: string): "cyan" | "blue" | "green" | "amber" | "default" {
  const t = tech.toLowerCase();
  if (t.includes("kotlin") || t.includes("android") || t.includes("jetpack")) return "green";
  if (t.includes("react") || t.includes("next") || t.includes("tailwind")) return "blue";
  if (t.includes("python") || t.includes("docker") || t.includes("firebase")) return "amber";
  if (t.includes("cisco") || t.includes("mikrotik") || t.includes("vpn")) return "cyan";
  return "default";
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        tag="03. Projects"
        title="Proyek Unggulan"
        subtitle="Beberapa proyek yang menggambarkan skill saya di bidang networking dan Android development."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card overflow-hidden group project-card cursor-default"
          >
            {/* Project image / gradient placeholder */}
            <div
              className={`relative h-44 bg-gradient-to-br ${placeholderGradients[idx % placeholderGradients.length]}
                          flex items-center justify-center overflow-hidden`}
            >
              {/* Grid overlay on image */}
              <div className="absolute inset-0 bg-grid opacity-30" />

              {/* Folder icon placeholder */}
              <FolderOpen
                size={48}
                className="text-slate-700 group-hover:text-cyan-neon/30 transition-colors"
                strokeWidth={1}
              />

              {/* Category tag */}
              <div className="absolute top-3 right-3">
                <Badge
                  variant={
                    project.category === "android"
                      ? "green"
                      : project.category === "networking"
                      ? "cyan"
                      : "default"
                  }
                >
                  {project.category}
                </Badge>
              </div>

              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(0, 240, 255, 0.05) 100%)",
                }}
              />
            </div>

            {/* Card content */}
            <div className="p-5">
              <h3 className="font-mono font-bold text-slate-100 text-base mb-2 group-hover:text-cyan-neon transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant={getBadgeVariant(tech)}>
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-slate-500 hover:text-slate-200 text-xs font-mono transition-colors"
                  >
                    <Github size={14} />
                    GitHub
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-cyan-neon/70 hover:text-cyan-neon text-xs font-mono transition-colors ml-auto"
                  >
                    Live Demo
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>

            {/* Bottom glow line on hover */}
            <div
              className="h-0.5 bg-gradient-to-r from-transparent via-cyan-neon/60 to-transparent
                         opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.article>
        ))}
      </div>

      {/* View All on GitHub */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-10"
      >
        <a
          href="https://github.com/username"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-slate-500
                     hover:text-cyan-neon border-b border-transparent hover:border-cyan-neon/50
                     transition-all pb-0.5"
        >
          <Github size={16} />
          Lihat semua proyek di GitHub
        </a>
      </motion.div>
    </SectionWrapper>
  );
}
