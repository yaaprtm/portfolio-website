import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, BookOpen, Share2 } from "lucide-react";
import NetworkNavigation from "@/components/layout/NetworkNavigation";
import LiquidBackground from "@/components/ui/LiquidBackground";
import Footer from "@/components/layout/Footer";
import AiAssistant from "@/components/ui/AiAssistant";
import Badge from "@/components/ui/Badge";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { getNoteBySlug, getAllNotes, Note } from "@/lib/notes";

interface PageProps {
  params: {
    slug: string;
  };
}

/**
 * Dynamic SEO Metadata Generation for Google Indexing
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const note = getNoteBySlug(params.slug);
  if (!note) {
    return {
      title: "Catatan Tidak Ditemukan — Arya Putra Pratama",
    };
  }

  return {
    title: `${note.title} | Catatan Teknis Arya Putra Pratama`,
    description: note.summary,
    openGraph: {
      title: note.title,
      description: note.summary,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({
    slug: note.slug,
  }));
}

function getCategoryBadge(cat: Note["category"]) {
  if (cat === "Networking") return "cyan";
  if (cat === "Android") return "green";
  return "blue";
}

export default function NoteDetailPage({ params }: PageProps) {
  const note = getNoteBySlug(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <>
      <LiquidBackground />
      <NetworkNavigation />

      <main className="min-h-screen pt-28 sm:pt-36 pb-20 relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Back Link */}
        <div className="mb-8">
          <Link
            href="/notes"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-slate-300 hover:text-cyan-neon hover:border-cyan-neon/40 transition-all shadow-md"
          >
            <ArrowLeft size={14} className="text-cyan-neon" />
            <span>Kembali ke Catatan Teknis</span>
          </Link>
        </div>

        {/* Article Container */}
        <article className="glass-card p-6 sm:p-10 border border-white/10 shadow-2xl">
          {/* Article Header */}
          <header className="mb-8 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={getCategoryBadge(note.category)}>{note.category}</Badge>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Calendar size={13} className="text-cyan-neon" />
                {note.date}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight mb-4">
              {note.title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed italic bg-white/[0.02] p-4 rounded-xl border border-white/5">
              {note.summary}
            </p>
          </header>

          {/* Article Markdown Body */}
          <div className="prose prose-invert max-w-none">
            <MarkdownRenderer content={note.content} />
          </div>
        </article>

        {/* Bottom Navigation CTA */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/notes"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono font-bold"
          >
            <ArrowLeft size={14} /> Kembali ke Catatan Teknis
          </Link>

          <Link
            href="/#contact"
            className="text-xs font-mono text-slate-400 hover:text-cyan-neon transition-colors"
          >
            Punya Pertanyaan? Diskusi →
          </Link>
        </div>
      </main>

      <Footer />
      <AiAssistant />
    </>
  );
}
