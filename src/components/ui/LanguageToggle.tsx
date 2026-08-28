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
      className="relative h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center
                 font-mono text-xs font-bold overflow-hidden transition-all hover:border-cyan-neon/30
                 px-1.5 gap-0.5"
      title={lang === "id" ? "Switch to English" : "Ganti ke Bahasa Indonesia"}
      aria-label="Toggle language"
    >
      <LangOption code="ID" active={lang === "id"} />
      <span className="text-white/20 text-[10px] mx-0.5">/</span>
      <LangOption code="EN" active={lang === "en"} />
    </button>
  );
}

function LangOption({ code, active }: { code: string; active: boolean }) {
  return (
    <span
      className={`px-1.5 py-1 rounded-lg transition-all duration-200 ${
        active
          ? "bg-cyan-soft text-cyan-neon"
          : "text-slate-500 hover:text-slate-300"
      }`}
    >
      {code}
    </span>
  );
}
