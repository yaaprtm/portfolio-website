"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { cn } from "@/lib/utils";

export default function SoundToggle({ className }: { className?: string }) {
  const { isMuted, toggleMute, initialized, play } = useSoundEffects();

  if (!initialized) return null;

  const handleToggle = () => {
    if (isMuted) {
      // Will unmute — play a test ping after toggle
      toggleMute();
      setTimeout(() => play("ping"), 50);
    } else {
      toggleMute();
    }
  };

  return (
    <button
      onClick={handleToggle}
      title={isMuted ? "Aktifkan Efek Suara" : "Matikan Efek Suara"}
      className={cn(
        "relative flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]",
        "text-slate-400 hover:text-slate-200 hover:border-white/30 transition-all duration-200",
        "min-h-[36px] min-w-[36px] p-2",
        className
      )}
    >
      {isMuted ? (
        <VolumeX size={14} className="text-slate-500" />
      ) : (
        <Volume2 size={14} className="text-cyan-neon" />
      )}
      {/* Active indicator */}
      {!isMuted && (
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-neon animate-pulse" />
      )}
    </button>
  );
}
