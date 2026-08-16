interface SectionHeadingProps {
  tag: string;       // e.g. "01. About"
  title: string;     // Main heading
  subtitle?: string; // Optional subtitle description
}

/**
 * Consistent section heading used across all sections.
 * Includes a mono tag, gradient title, and optional subtitle.
 */
export default function SectionHeading({ tag, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center">
      <p className="section-tag mb-3">{tag}</p>
      <h2 className="section-heading gradient-text mb-4">{title}</h2>
      {subtitle && (
        <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="section-line mt-6" />
    </div>
  );
}
