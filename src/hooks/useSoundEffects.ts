// ============================================================
// HOOK: useSoundEffects — Web Audio API SFX (No External Files)
// ============================================================
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
          // Short crisp click — like a keyboard mechanical switch
          masterGain.gain.setValueAtTime(0.3, now);
          playTone(1200, now, 0.03, 0.4, "square");
          playTone(600, now + 0.02, 0.04, 0.2, "square");
          break;

        case "hover":
          // Subtle high ping
          masterGain.gain.setValueAtTime(0.08, now);
          playTone(1800, now, 0.06, 0.15, "sine");
          break;

        case "success":
          // Ascending chime — modal open success
          masterGain.gain.setValueAtTime(0.2, now);
          playTone(440, now, 0.12, 0.3, "sine");
          playTone(554, now + 0.1, 0.12, 0.3, "sine");
          playTone(659, now + 0.2, 0.2, 0.35, "sine");
          break;

        case "ping":
          // Network packet ping sound — short rising beep
          masterGain.gain.setValueAtTime(0.25, now);
          playTone(800, now, 0.15, 0.3, "sine", 1400);
          break;

        case "open":
          // Menu / panel open — sweeping tone
          masterGain.gain.setValueAtTime(0.18, now);
          playTone(300, now, 0.2, 0.3, "sine", 600);
          break;

        case "close":
          // Reverse sweep
          masterGain.gain.setValueAtTime(0.15, now);
          playTone(600, now, 0.15, 0.25, "sine", 300);
          break;

        case "type":
          // Soft keyboard type SFX
          masterGain.gain.setValueAtTime(0.06, now);
          playTone(2200 + Math.random() * 400, now, 0.025, 0.1, "square");
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

  return { play, isMuted, toggleMute, initialized };
}
