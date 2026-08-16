"use client";

import LiquidBackground from "./LiquidBackground";

/**
 * Re-exporting LiquidBackground as the main background component
 * so all existing sections automatically get the Liquid Morphing Shapes.
 */
export default function NetworkBackground({
  className = "",
}: {
  nodeCount?: number;
  maxDistance?: number;
  className?: string;
}) {
  return <LiquidBackground className={className} />;
}
