"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/context/LanguageContext";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const { play } = useSoundEffects();

  const handleToggle = () => {
    play("click");
    setLang(lang === "id" ? "en" : "id");
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={() => play("hover")}
      className="relative h-9 rounded-full border border-mono-border bg-white/[0.02] flex items-center
                 font-mono text-xs font-bold overflow-hidden transition-all hover:border-mono-black
                 px-1.5 gap-0.5"
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      aria-label="Toggle language"
    >
      <LangOption code="ID" active={lang === "id"} />
      <span className="text-mono-muted text-[10px] mx-0.5">/</span>
      <LangOption code="EN" active={lang === "en"} />
    </button>
  );
}

function LangOption({ code, active }: { code: string; active: boolean }) {
  return (
    <span
      className={`px-1.5 py-1 rounded-lg transition-all duration-200 ${
        active
          ? "bg-mono-black text-white"
          : "text-mono-gray hover:text-mono-black"
      }`}
    >
      {code}
    </span>
  );
}
