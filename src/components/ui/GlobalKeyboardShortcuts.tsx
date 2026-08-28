"use client";

import { useEffect } from "react";

/**
 * Global keyboard shortcuts listener
 * Dispatches custom events that components can listen to
 */
export default function GlobalKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open command palette
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        // Dispatch custom event that Navbar/CommandPalette can listen to
        window.dispatchEvent(new CustomEvent("openCommandPalette"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return null; // This component doesn't render anything
}
