"use client";

import { motion } from "framer-motion";

/**
 * Dynamic Ambient Background:
 * - Floating Fluid Glow Blobs (tinted with active theme color)
 * - Dot-Matrix Tech Grid Texture
 * - Smooth Depth Vignette
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
      {/* Dynamic Animated Ambient Glow Blob 1 */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -30, 40, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[450px] opacity-25 rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-cyan) 0%, rgba(56, 189, 248, 0.2) 60%, transparent 80%)",
        }}
      />

      {/* Dynamic Ambient Glow Blob 2 (Right Side) */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] opacity-20 rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-cyan) 0%, transparent 70%)",
        }}
      />

      {/* Dot-Matrix Tech Texture Grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Dark Vignette Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(9, 10, 12, 0.85) 100%)",
        }}
      />
    </div>
  );
}
