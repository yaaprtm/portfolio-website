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
      play("click");
      toggleMute();
    }
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => !isMuted && play("hover")}
      title={isMuted ? "Aktifkan Efek Suara" : "Matikan Efek Suara"}
      className={cn(
        "relative flex items-center justify-center rounded-full border border-mono-border p-2",
        "text-mono-gray hover:text-mono-black hover:border-mono-black transition-all duration-200",
        "min-h-[36px] min-w-[36px]",
        className
      )}
    >
      {isMuted ? (
        <VolumeX size={16} className="text-mono-gray" />
      ) : (
        <Volume2 size={16} className="text-mono-black" />
      )}
      {/* Active indicator */}
      {!isMuted && (
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-mono-black animate-pulse" />
      )}
    </button>
  );
}
