"use client";

import React, { Suspense, Component, useEffect, useReducer, useRef } from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import type { AvatarSceneProps } from "@/components/three/AvatarScene";

// ─── Lazy-load the scene (Three.js needs browser APIs — no SSR) ───────────────

const AvatarScene = dynamic(
  () => import("@/components/three/AvatarScene"),
  { ssr: false }
);

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function AvatarSkeleton() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-end pb-6 gap-2"
      aria-label="Avatar 3D sedang dimuat…"
      role="status"
    >
      {/* Humanoid silhouette */}
      <div className="flex flex-col items-center gap-1.5 animate-pulse opacity-50">
        {/* Head */}
        <div
          className="w-16 h-16 rounded-full border border-white/10"
          style={{ background: "rgba(59,130,246,0.1)" }}
        />
        {/* Neck */}
        <div className="w-4 h-5 rounded" style={{ background: "rgba(59,130,246,0.07)" }} />
        {/* Torso */}
        <div className="w-28 h-32 rounded-2xl" style={{ background: "rgba(59,130,246,0.07)" }} />
      </div>

      {/* Ground glow */}
      <div
        className="w-32 h-3 rounded-full blur-xl"
        style={{ background: "rgba(59,130,246,0.18)" }}
      />
      <span className="font-mono text-[10px] text-slate-600 tracking-widest">
        loading avatar…
      </span>
    </div>
  );
}

// ─── Fallback (if model fails to load entirely) ───────────────────────────────

function AvatarFallback() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      aria-label="Inisial avatar Arya Putra Pratama"
      role="img"
    >
      <div
        className="w-24 h-24 rounded-full border-2 flex items-center justify-center select-none"
        style={{
          borderColor: "rgba(59,130,246,0.5)",
          background: "rgba(59,130,246,0.1)",
          boxShadow: "0 0 30px rgba(59,130,246,0.2)",
          fontSize: "2rem",
          fontWeight: 700,
          color: "rgba(59,130,246,0.8)",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        AP
      </div>
    </div>
  );
}

// ─── Error Boundary ───────────────────────────────────────────────────────────

interface EBState { hasError: boolean }

class AvatarErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  EBState
> {
  state: EBState = { hasError: false };

  static getDerivedStateFromError(): EBState {
    return { hasError: true };
  }

  componentDidCatch(err: Error, info: React.ErrorInfo) {
    console.warn("[AvatarCanvas] Three.js render error — falling back to static placeholder.", err, info);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── Main Canvas Wrapper ──────────────────────────────────────────────────────

interface AvatarCanvasProps {
  isHoveringCTA?: boolean;
  className?: string;
}

export default function AvatarCanvas({
  isHoveringCTA = false,
  className = "",
}: AvatarCanvasProps) {
  // ── prefers-reduced-motion ─────────────────────────────────────────────
  const [reducedMotion, setReducedMotion] = useReducer(
    (_: boolean, v: boolean) => v,
    false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Scroll-linked progress (computed outside Canvas, passed as plain num) ─
  const { scrollY } = useScroll();
  const scrollProgress = useTransform(scrollY, [0, 700], [0, 1]);
  const scrollRef = useRef(0);

  const [scrollVal, setScrollVal] = useReducer((_: number, v: number) => v, 0);

  useMotionValueEvent(scrollProgress, "change", (v) => {
    scrollRef.current = v;
    setScrollVal(Math.min(1, Math.max(0, v)));
  });

  return (
    <div
      className={`relative w-full h-full ${className}`}
      role="img"
      aria-label="Avatar 3D interaktif — Arya Putra Pratama"
    >
      <AvatarErrorBoundary fallback={<AvatarFallback />}>
        <Suspense fallback={<AvatarSkeleton />}>
          <Canvas
            frameloop="always"
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            camera={{
              fov: 42,
              near: 0.1,
              far: 20,
              position: [0, 0.12, 2.8],
            }}
            style={{ background: "transparent" }}
            aria-hidden="true"
          >
            <AvatarScene
              isHoveringCTA={isHoveringCTA}
              reducedMotion={reducedMotion}
              scrollProgress={scrollVal}
            />
          </Canvas>
        </Suspense>
      </AvatarErrorBoundary>
    </div>
  );
}
