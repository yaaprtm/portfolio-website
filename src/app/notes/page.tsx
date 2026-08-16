import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NetworkNavigation from "@/components/layout/NetworkNavigation";
import LiquidBackground from "@/components/ui/LiquidBackground";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/ui/AiAssistant";
import NotesListClient from "@/components/notes/NotesListClient";
import { getAllNotes } from "@/lib/notes";

export const metadata = {
  title: "Catatan Teknis & Artikel — Arya Putra Pratama",
  description: "Kumpulan rangkuman pembelajaran teknis, tutorial jaringan, dan catatan praktis seputar Networking, IT Support, dan Android Development.",
};

export default function NotesIndexPage() {
  // Executed on Node.js Server at build / request time
  const notes = getAllNotes();

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

        {/* Interactive Client Notes List Component */}
        <NotesListClient notes={notes} />
      </main>

      <Footer />
      <AiAssistant />
    </>
  );
}
