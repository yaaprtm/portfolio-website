"use client";

/**
 * Ambient Spotlight & Subtle Noise Background.
 * Gives a clean, ultra-premium studio aesthetic without noisy template particles.
 */
export default function NetworkBackground({
  className = "",
}: {
  nodeCount?: number;
  maxDistance?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Top Center Ambient Spotlight Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(212, 255, 0, 0.25) 0%, rgba(56, 189, 248, 0.12) 50%, transparent 70%)",
        }}
      />

      {/* Subtle Noise / Ambient Grid */}
      <div className="absolute inset-0 bg-ambient-grid opacity-30" />
    </div>
  );
}
