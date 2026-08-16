"use client";

/**
 * Liquid Morphing Shapes Background:
 * - 3 Organic fluid blobs with dynamic gradient colors that morph and float slowly (2 on mobile).
 * - High Gaussian blur filter (90px - 110px) for soft studio light diffusion.
 * - Dynamic theme color integration: Automatically adapts to active theme (Lime, Cyan, Violet, Mono).
 * - Light-weight performance: GPU accelerated transforms + prefers-reduced-motion fallback.
 */
export default function LiquidBackground({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Blob 1: Top-Left Corner Fluid Morphing Blob */}
      <div
        className="animate-liquid-1 absolute -top-24 -left-24 w-[380px] h-[380px] sm:w-[550px] sm:h-[550px] rounded-full opacity-25 sm:opacity-30 blur-[90px] sm:blur-[110px] transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-cyan) 0%, rgba(56, 189, 248, 0.25) 50%, transparent 80%)",
        }}
      />

      {/* Blob 2: Right-Middle Floating Fluid Morphing Blob */}
      <div
        className="animate-liquid-2 absolute top-[40%] -right-20 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] rounded-full opacity-20 sm:opacity-25 blur-[90px] sm:blur-[120px] transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-cyan) 0%, var(--color-surface-2) 70%, transparent 90%)",
        }}
      />

      {/* Blob 3: Bottom-Left Center Fluid Morphing Blob (Desktop & Tablet only) */}
      <div
        className="animate-liquid-3 hidden md:block absolute bottom-[-100px] left-[20%] w-[480px] h-[480px] opacity-20 blur-[110px] transition-colors duration-700"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-cyan) 0%, rgba(168, 85, 247, 0.2) 60%, transparent 85%)",
        }}
      />

      {/* Subtle Dot-Matrix Texture Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Soft Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 20%, var(--color-bg) 100%)",
        }}
      />
    </div>
  );
}
