"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Home,
  User,
  Code,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Award,
  Mail,
  FileText,
  Command,
  Menu,
  X,
  Radio,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import CommandPalette from "@/components/ui/CommandPalette";
import CvModal from "@/components/ui/CvModal";

export interface NodeItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  tooltip: string;
  x: number; // percentage in SVG topology
  y: number;
}

const topologyNodes: NodeItem[] = [
  { id: "home", label: "Core", href: "/#home", icon: Home, tooltip: "Arya Putra Pratama · STr. Rekayasa Internet", x: 7, y: 50 },
  { id: "about", label: "About", href: "/#about", icon: User, tooltip: "Bio, Background & PENS Surabaya", x: 18, y: 50 },
  { id: "skills", label: "Skills", href: "/#skills", icon: Code, tooltip: "Networking, Android Dev & IT Support", x: 29, y: 50 },
  { id: "projects", label: "Projects", href: "/#projects", icon: FolderGit2, tooltip: "BRIN Android App & Cisco Projects", x: 40, y: 50 },
  { id: "experience", label: "Work", href: "/#experience", icon: Briefcase, tooltip: "Digital Solusindo, ID-Networkers & BRIN", x: 51, y: 50 },
  { id: "education", label: "Education", href: "/#education", icon: GraduationCap, tooltip: "PENS Surabaya & SMK TKJ", x: 62, y: 50 },
  { id: "notes", label: "Notes", href: "/notes", icon: BookOpen, tooltip: "Catatan Teknis Networking & Android", x: 73, y: 50 },
  { id: "certifications", label: "Certs", href: "/#certifications", icon: Award, tooltip: "MikroTik MTCNA (88%) & Honors", x: 85, y: 50 },
  { id: "contact", label: "Contact", href: "/#contact", icon: Mail, tooltip: "Direct Email, WhatsApp & Socials", x: 96, y: 50 },
];

export default function NetworkNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeNode, setActiveNode] = useState("home");
  const [hoveredNode, setHoveredNode] = useState<NodeItem | null>(null);
  const [isPacketAnimating, setIsPacketAnimating] = useState(false);
  const [packetProgress, setPacketProgress] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  // Scroll detection for homepage sections
  useEffect(() => {
    if (pathname.startsWith("/notes")) {
      setActiveNode("notes");
      return;
    }

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "experience", "education", "certifications", "contact"];
      const scrollPos = window.scrollY + 160;

      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveNode(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleNodeClick = (node: NodeItem) => {
    setMobileOpen(false);

    // Packet Animation
    const fromNode = topologyNodes.find((n) => n.id === activeNode) || topologyNodes[0];
    setPacketProgress({
      startX: fromNode.x,
      startY: fromNode.y,
      endX: node.x,
      endY: node.y,
    });
    setIsPacketAnimating(true);
    setActiveNode(node.id);

    setTimeout(() => {
      setIsPacketAnimating(false);
    }, 600);

    if (node.href.startsWith("/notes")) {
      router.push("/notes");
    } else {
      if (pathname !== "/") {
        router.push(node.href);
      } else {
        const target = document.querySelector(node.href.replace("/", ""));
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <>
      {/* ============================================================
          1. DESKTOP FLOATING NETWORK TOPOLOGY NAVIGATION BAR (>= 768px)
         ============================================================ */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden md:block fixed top-4 left-4 right-4 z-40 max-w-7xl mx-auto"
      >
        <div className="glass-card border border-white/10 p-3 sm:px-4 rounded-2xl shadow-2xl backdrop-blur-2xl bg-navy-950/85">
          <div className="flex items-center justify-between gap-2">
            {/* Left Quick Profile Branding */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-cyan-neon/40 flex-shrink-0 bg-navy-900 shadow-md">
                <img
                  src="/images/arya-photo.png"
                  alt="Arya"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="hidden xl:block min-w-0">
                <h1 className="font-bold text-slate-100 text-xs tracking-tight truncate">
                  Arya Putra Pratama
                </h1>
                <p className="text-[10px] text-cyan-neon font-mono truncate">
                  PENS Surabaya
                </p>
              </div>
            </div>

            {/* CENTER: INTERACTIVE SVG NETWORK TOPOLOGY MAP */}
            <div className="flex-1 relative h-12 flex items-center px-2 max-w-4xl">
              {/* SVG Cables / Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                {/* Main Cable Backbone Line */}
                <line
                  x1="7%"
                  y1="50%"
                  x2="97%"
                  y2="50%"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Active Highlight Cable Segment */}
                {hoveredNode && (
                  <line
                    x1="7%"
                    y1="50%"
                    x2={`${hoveredNode.x}%`}
                    y2="50%"
                    stroke="var(--color-cyan)"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                  />
                )}

                {/* Animated Data Packet Glow (Traveling Dot) */}
                {isPacketAnimating && (
                  <motion.circle
                    initial={{ cx: `${packetProgress.startX}%`, cy: "50%" }}
                    animate={{ cx: `${packetProgress.endX}%`, cy: "50%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    r="4"
                    fill="var(--color-cyan)"
                    style={{ filter: "drop-shadow(0 0 8px var(--color-cyan))" }}
                  />
                )}
              </svg>

              {/* Node Buttons */}
              <div className="relative w-full flex items-center justify-between z-10">
                {topologyNodes.map((node) => {
                  const Icon = node.icon;
                  const isActive = activeNode === node.id;

                  return (
                    <div key={node.id} className="relative group">
                      <button
                        onClick={() => handleNodeClick(node)}
                        onMouseEnter={() => setHoveredNode(node)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={cn(
                          "relative flex items-center justify-center transition-all duration-300 rounded-xl min-h-[36px] px-2 py-1 gap-1.5",
                          isActive
                            ? "bg-cyan-soft border border-cyan-neon/40 text-cyan-neon font-bold shadow-md"
                            : "bg-white/[0.04] border border-white/10 text-slate-400 hover:text-slate-100 hover:border-white/30"
                        )}
                      >
                        {/* Pulsing Active Node Ring */}
                        {isActive && (
                          <motion.span
                            layoutId="node-pulse"
                            className="absolute -inset-1 rounded-xl border border-cyan-neon/40 animate-pulse"
                          />
                        )}

                        <Icon size={13} className={isActive ? "text-cyan-neon" : "text-slate-400"} />
                        <span className="text-[11px] font-mono">{node.label}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Hover Tooltip Popup */}
              <AnimatePresence>
                {hoveredNode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    style={{ left: `${hoveredNode.x}%` }}
                    className="absolute top-14 -translate-x-1/2 px-3 py-1.5 rounded-xl glass-card border border-white/10 shadow-2xl z-50 text-[11px] font-mono text-slate-200 whitespace-nowrap pointer-events-none"
                  >
                    <div className="flex items-center gap-1.5 text-cyan-neon font-bold">
                      <Radio size={12} className="animate-pulse" />
                      <span>{hoveredNode.label} Node</span>
                    </div>
                    <p className="text-slate-400 text-[10px]">{hoveredNode.tooltip}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Tools: Preview CV + Command Palette + Theme Switcher */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => setCvOpen(true)}
                className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/30 transition-all flex items-center gap-1.5 min-h-[36px]"
              >
                <FileText size={14} className="text-cyan-neon" />
                <span className="hidden lg:inline">Preview</span> CV
              </button>

              <button
                onClick={() => setCmdOpen(true)}
                className="px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] text-xs font-mono text-slate-400 hover:text-slate-200 transition-all hidden lg:flex items-center gap-1.5 min-h-[36px]"
                title="Tekan Ctrl+K"
              >
                <Command size={13} />
                <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-white/10">Ctrl K</kbd>
              </button>

              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </motion.header>

      {/* ============================================================
          2. MOBILE TOP STICKY BAR & HAMBURGER SLIDE-IN (mobile: < 768px)
         ============================================================ */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-navy-950/90 backdrop-blur-xl border-b border-white/10 px-4 h-16 flex items-center justify-between">
        {/* Mobile Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-neon/40 flex-shrink-0 bg-navy-900">
            <img
              src="/images/arya-photo.png"
              alt="Arya"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 text-xs truncate">Arya Putra Pratama</h1>
            <p className="text-[10px] text-cyan-neon font-mono truncate">PENS Surabaya</p>
          </div>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCvOpen(true)}
            className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-[11px] font-mono text-cyan-neon flex items-center gap-1 min-h-[44px]"
          >
            <FileText size={13} />
            <span>CV</span>
          </button>

          <ThemeSwitcher />

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-cyan-neon transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 bottom-0 left-0 z-50 w-72 bg-navy-950/95 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-neon/40">
                      <img
                        src="/images/arya-photo.png"
                        alt="Arya"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-100 text-sm">Arya Putra Pratama</h3>
                      <p className="text-[11px] font-mono text-cyan-neon">STr. Teknik Rekayasa Internet</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-2 rounded-lg text-slate-400 hover:text-white min-h-[44px] min-w-[44px]"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Mobile Topology List */}
                <div className="space-y-1">
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 mb-2">
                    Network Map Nodes
                  </p>

                  {topologyNodes.map((node) => {
                    const Icon = node.icon;
                    const isActive = activeNode === node.id;

                    return (
                      <button
                        key={node.id}
                        onClick={() => handleNodeClick(node)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-mono transition-all text-left min-h-[44px]",
                          isActive
                            ? "bg-cyan-soft text-cyan-neon border border-cyan-neon/30 font-semibold"
                            : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} className={isActive ? "text-cyan-neon" : "text-slate-500"} />
                          <span>{node.label}</span>
                        </div>
                        {isActive && <span className="w-2 h-2 rounded-full bg-cyan-neon" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setCmdOpen(true);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/[0.04] text-xs font-mono text-slate-300 flex items-center justify-between min-h-[44px]"
                >
                  <div className="flex items-center gap-2">
                    <Command size={14} className="text-cyan-neon" />
                    <span>Command Palette</span>
                  </div>
                  <kbd className="px-1.5 py-0.5 rounded text-[9px] bg-white/10 text-slate-400">
                    Ctrl K
                  </kbd>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Modals */}
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} onOpenCv={() => setCvOpen(true)} />
      <CvModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </>
  );
}
