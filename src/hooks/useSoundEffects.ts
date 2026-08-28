// ============================================================
// HOOK: useSoundEffects — Web Audio API SFX (No External Files)
// Optimized version dengan memoization
// ============================================================
"use client";

import { useCallback, useEffect, useRef, useState, useMemo } from "react";

type SoundType = "click" | "hover" | "success" | "ping" | "open" | "close" | "type";

export function useSoundEffects() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Read mute preference from localStorage
    const stored = localStorage.getItem("sfx-muted");
    if (stored === "true") {
      setIsMuted(true);
    }
    setInitialized(true);
  }, []);

  const getCtx = useCallback((): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    // Resume if suspended (browsers suspend context by default)
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  const play = useCallback(
    (type: SoundType) => {
      if (isMuted) return;
      const ctx = getCtx();
      if (!ctx) return;

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);

      const playTone = (
        freq: number,
        startTime: number,
        duration: number,
        gainValue: number,
        type: OscillatorType = "sine",
        endFreq?: number
      ) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, startTime);
        if (endFreq !== undefined) {
          osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
        }

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(gainValue, startTime + 0.01);
        gain.gain.linearRampToValueAtTime(0, startTime + duration);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.01);
      };

      switch (type) {
        case "click":
          // Enhanced click sound — more audible and crisp
          masterGain.gain.setValueAtTime(0.5, now);
          playTone(1200, now, 0.04, 0.6, "square");
          playTone(600, now + 0.025, 0.05, 0.35, "square");
          break;

        case "hover":
          // More noticeable hover sound
          masterGain.gain.setValueAtTime(0.18, now);
          playTone(1600, now, 0.08, 0.28, "sine");
          break;

        case "success":
          // More pronounced success chime
          masterGain.gain.setValueAtTime(0.35, now);
          playTone(440, now, 0.15, 0.45, "sine");
          playTone(554, now + 0.1, 0.15, 0.45, "sine");
          playTone(659, now + 0.2, 0.25, 0.5, "sine");
          break;

        case "ping":
          // Louder network ping sound
          masterGain.gain.setValueAtTime(0.4, now);
          playTone(800, now, 0.18, 0.45, "sine", 1400);
          break;

        case "open":
          // Enhanced menu open sound
          masterGain.gain.setValueAtTime(0.3, now);
          playTone(300, now, 0.25, 0.4, "sine", 700);
          break;

        case "close":
          // Enhanced close sound
          masterGain.gain.setValueAtTime(0.28, now);
          playTone(700, now, 0.2, 0.38, "sine", 300);
          break;

        case "type":
          // More audible keyboard type sound
          masterGain.gain.setValueAtTime(0.12, now);
          playTone(2200 + Math.random() * 400, now, 0.035, 0.18, "square");
          break;
      }
    },
    [isMuted, getCtx]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem("sfx-muted", String(next));
      return next;
    });
  }, []);

  // Memoize return object to prevent re-renders
  return useMemo(
    () => ({ play, isMuted, toggleMute, initialized }),
    [play, isMuted, toggleMute, initialized]
  );
}
