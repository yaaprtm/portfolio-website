"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Tag, ArrowLeft } from "lucide-react";
import NetworkNavigation from "@/components/layout/NetworkNavigation";
import LiquidBackground from "@/components/ui/LiquidBackground";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/ui/AiAssistant";
import Badge from "@/components/ui/Badge";
import { getAllNotes, Note } from "@/lib/notes";

const categories = ["Semua", "Networking", "Android", "IT Support"];

function getCategoryBadge(cat: Note["category"]) {
  if (cat === "Networking") return "cyan";
  if (cat === "Android") return "green";
  return "blue";
}

export default function NotesIndexPage() {
  // In Next.js App Router client component, we can call getAllNotes() statically or via state
  const notes = getAllNotes();
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredNotes =
    selectedCategory === "Semua"
      ? notes
      : notes.filter((n) => n.category === selectedCategory);

  return (
    <>
      <LiquidBackground />
      <NetworkNavigation />

      <main className="min-h-screen pt-28 sm:pt-36 pb-20 relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/40 transition-all"
          >
            <ArrowLeft size={14} className="text-cyan-neon" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono text-cyan-neon tracking-widest uppercase mb-2 block">
            // TECHNICAL KNOWLEDGE BASE
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight mb-4">
            Catatan Teknis & Artikel
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Kumpulan rangkuman pembelajaran teknis, tutorial jaringan, dan catatan praktis seputar Networking, IT Support, dan Android Development.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? "bg-cyan-neon text-white font-bold shadow-lg"
                  : "bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredNotes.map((note, idx) => (
              <motion.article
                key={note.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="glass-card p-6 flex flex-col justify-between group hover:border-cyan-neon/40 transition-all border border-white/10"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant={getCategoryBadge(note.category)}>{note.category}</Badge>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Calendar size={12} className="text-cyan-neon" />
                      {note.date}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-cyan-neon transition-colors mb-3">
                    <Link href={`/notes/${note.slug}`}>{note.title}</Link>
                  </h2>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                    {note.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Link
                    href={`/notes/${note.slug}`}
                    className="text-xs font-mono font-bold text-cyan-neon hover:underline flex items-center gap-1.5"
                  >
                    Baca Artikel Lengkap <ArrowRight size={13} />
                  </Link>
                  <span className="text-[10px] font-mono text-slate-500">Markdown Document</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {filteredNotes.length === 0 && (
          <div className="text-center py-16 glass-card p-8">
            <BookOpen size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm font-mono">
              Belum ada catatan untuk kategori ini.
            </p>
          </div>
        )}
      </main>

      <Footer />
      <AiAssistant />
    </>
  );
}
