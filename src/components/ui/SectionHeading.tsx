import { memo } from "react";

interface SectionHeadingProps {
  tag: string;       // e.g. "01 / ABOUT"
  title: string;     // Main heading
  subtitle?: string; // Optional subtitle description
}

/**
 * Editorial Section Heading — Clean, human-designed layout.
 */
const SectionHeading = memo(function SectionHeading({ tag, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-14 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-300">
          {tag}
        </span>
      </div>
      <h2 className="section-heading text-slate-100 mb-3.5 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
});

export default SectionHeading;
