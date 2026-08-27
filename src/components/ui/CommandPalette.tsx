"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Phone,
  Mail,
  User,
  Briefcase,
  Award,
  Code,
  FolderGit2,
  Home,
  ExternalLink,
  Globe,
  Moon,
  Sun,
  BookOpen,
  Satellite,
  Smartphone,
  Wrench,
  Download,
  ChevronRight,
} from "lucide-react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCv: () => void;
}

type ItemGroup = {
  label: string;
  items: CommandItem[];
};

type CommandItem = {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  action?: () => void;
  href?: string;
  keywords?: string[];
};

export default function CommandPalette({ isOpen, onClose, onOpenCv }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang, setLang } = useLanguage();
  const { play } = useSoundEffects();

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains("light")) {
      html.classList.remove("light");
      localStorage.setItem("theme-mode", "dark");
    } else {
      html.classList.add("light");
      localStorage.setItem("theme-mode", "light");
    }
  };

  const isLightMode =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("light");

  const navItems: CommandItem[] = [
    { id: "nav-home", label: "Home", sublabel: "Kembali ke atas", icon: Home, href: "#home" },
    { id: "nav-about", label: "About Me", sublabel: "Bio & Latar Belakang", icon: User, href: "#about" },
    { id: "nav-skills", label: "Skills", sublabel: "Networking, Android, IT Support", icon: Code, href: "#skills" },
    { id: "nav-projects", label: "Projects", sublabel: "Semua Proyek Unggulan", icon: FolderGit2, href: "#projects" },
    { id: "nav-experience", label: "Experience", sublabel: "Riwayat Kerja & Magang", icon: Briefcase, href: "#experience" },
    { id: "nav-certs", label: "Certifications", sublabel: "MTCNA, IONIC Finalist", icon: Award, href: "#certifications" },
    { id: "nav-contact", label: "Contact", sublabel: "Hubungi Saya", icon: Mail, href: "#contact" },
    { id: "nav-notes", label: "Catatan Teknis", sublabel: "Networking & Android Notes", icon: BookOpen, href: "/notes" },
  ];

  const projectItems: CommandItem[] = projects.map((p) => ({
    id: `project-${p.id}`,
    label: p.title,
    sublabel: p.techStack.slice(0, 3).join(" · "),
    icon:
      p.category === "android"
        ? Smartphone
        : p.category === "networking"
        ? Satellite
        : Wrench,
    href: p.hasCaseStudy && p.slug ? `/projects/${p.slug}` : "#projects",
    keywords: [...p.techStack, p.category],
  }));

  const actionItems: CommandItem[] = [
    {
      id: "action-cv-open",
      label: "Buka CV (Live Preview)",
      sublabel: "Lihat CV langsung di halaman",
      icon: FileText,
      action: () => { onClose(); onOpenCv(); play("success"); },
    },
    {
      id: "action-cv-print",
      label: "Download / Print CV",
      sublabel: "Buka halaman cetak PDF",
      icon: Download,
      href: "/print",
    },
    {
      id: "action-wa",
      label: "Hubungi via WhatsApp",
      sublabel: "+62 838-9022-7712",
      icon: Phone,
      action: () => { window.open("https://wa.me/6283890227712", "_blank"); },
    },
    {
      id: "action-email",
      label: "Kirim Email",
      sublabel: "aryattt45@gmail.com",
      icon: Mail,
      action: () => { window.location.href = "mailto:aryattt45@gmail.com"; },
    },
  ];

  const settingsItems: CommandItem[] = [
    {
      id: "settings-lang",
      label: `Ganti Bahasa → ${lang === "id" ? "English" : "Bahasa Indonesia"}`,
      sublabel: `Bahasa sekarang: ${lang === "id" ? "Indonesia" : "English"}`,
      icon: Globe,
      action: () => {
        setLang(lang === "id" ? "en" : "id");
        play("click");
        onClose();
      },
    },
    {
      id: "settings-theme",
      label: `Ganti Mode → ${isLightMode ? "Dark Mode" : "Light Mode"}`,
      sublabel: "Toggle tema tampilan",
      icon: isLightMode ? Moon : Sun,
      action: () => {
        toggleDarkMode();
        play("click");
        onClose();
      },
    },
  ];

  const allGroups: ItemGroup[] = [
    { label: "🗺️ Navigasi", items: navItems },
    { label: "🚀 Proyek", items: projectItems },
    { label: "⚡ Actions", items: actionItems },
    { label: "⚙️ Pengaturan", items: settingsItems },
  ];

  // Flatten all items for search + keyboard nav
  const filteredGroups: ItemGroup[] = query
    ? [
        {
          label: "Hasil Pencarian",
          items: allGroups
            .flatMap((g) => g.items)
            .filter((item) => {
              const q = query.toLowerCase();
              return (
                item.label.toLowerCase().includes(q) ||
                (item.sublabel && item.sublabel.toLowerCase().includes(q)) ||
                (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(q)))
              );
            }),
        },
      ]
    : allGroups;

  const allFilteredItems = filteredGroups.flatMap((g) => g.items);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      } else if (e.key === "ArrowDown" && isOpen) {
        e.preventDefault();
        setSelectedIdx((prev) => Math.min(prev + 1, allFilteredItems.length - 1));
        play("hover");
      } else if (e.key === "ArrowUp" && isOpen) {
        e.preventDefault();
        setSelectedIdx((prev) => Math.max(prev - 1, 0));
        play("hover");
      } else if (e.key === "Enter" && isOpen) {
        const item = allFilteredItems[selectedIdx];
        if (item) handleSelect(item);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose, selectedIdx, allFilteredItems]);

  const handleSelect = (item: CommandItem) => {
    play("click");
    if (item.action) {
      item.action();
    } else if (item.href) {
      onClose();
      if (item.href.startsWith("#")) {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = item.href;
      }
    }
  };

  // Highlight matching text
  const highlight = (text: string, query: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-cyan-neon/20 text-cyan-neon rounded px-0.5">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  let globalItemIdx = 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl glass-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search size={16} className="text-slate-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  play("type");
                }}
                placeholder="Ketik perintah atau cari... (CV, Java, VSAT, bahasa...)"
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
              />
              <kbd className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-400 border border-white/10 flex-shrink-0">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="p-2 max-h-80 overflow-y-auto">
              {allFilteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs font-mono text-slate-500">
                  <Search size={24} className="mx-auto mb-2 opacity-30" />
                  <p>Tidak ada hasil untuk &ldquo;{query}&rdquo;</p>
                </div>
              ) : (
                filteredGroups.map((group) => (
                  <div key={group.label} className="mb-2">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest px-3 py-1.5">
                      {group.label}
                    </p>
                    <div className="space-y-0.5">
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isSelected = globalItemIdx === selectedIdx;
                        const currentIdx = globalItemIdx++;

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => {
                              setSelectedIdx(currentIdx);
                              play("hover");
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono text-left transition-all ${
                              isSelected
                                ? "bg-cyan-soft border border-cyan-neon/20 text-slate-100"
                                : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <Icon
                                size={14}
                                className={isSelected ? "text-cyan-neon flex-shrink-0" : "text-slate-500 flex-shrink-0"}
                              />
                              <div className="min-w-0">
                                <p className={isSelected ? "text-slate-100" : "text-slate-300"}>
                                  {highlight(item.label, query)}
                                </p>
                                {item.sublabel && (
                                  <p className="text-[10px] text-slate-500 truncate">
                                    {highlight(item.sublabel, query)}
                                  </p>
                                )}
                              </div>
                            </div>
                            <ChevronRight
                              size={12}
                              className={`flex-shrink-0 transition-colors ${
                                isSelected ? "text-cyan-neon" : "text-slate-700"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-600">
              <span>↑↓ navigasi · Enter pilih · Esc tutup</span>
              <span className="text-slate-700">⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
