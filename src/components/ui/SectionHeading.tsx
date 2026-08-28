import { memo } from "react";

interface SectionHeadingProps {
  tag: string;       // e.g. "01 / ABOUT"
  title: string;     // Main heading
  subtitle?: string; // Optional subtitle description
}

/**
 * Pure Monochrome Editorial Section Heading
 */
const SectionHeading = memo(function SectionHeading({ tag, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-14 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 mb-3.5 px-4 py-1.5 rounded-full bg-mono-card border border-mono-border">
        <span className="w-2 h-2 rounded-full bg-mono-black" />
        <span className="section-tag">
          {tag}
        </span>
      </div>
      <h2 className="section-heading mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-mono-gray text-base sm:text-lg leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
});

export default SectionHeading;
