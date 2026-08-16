interface SectionHeadingProps {
  tag: string;       // e.g. "01 / ABOUT"
  title: string;     // Main heading
  subtitle?: string; // Optional subtitle description
}

/**
 * Editorial Section Heading — Clean, human-designed layout.
 */
export default function SectionHeading({ tag, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-neon" />
        <span className="section-tag text-[11px] font-mono tracking-widest">{tag}</span>
      </div>
      <h2 className="section-heading text-slate-100 mb-4">{title}</h2>
      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
