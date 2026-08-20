"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import idTranslations from "@/locales/id.json";
import enTranslations from "@/locales/en.json";

export type Lang = "id" | "en";
export type Translations = typeof idTranslations;

interface LanguageContextType {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "id",
  t: idTranslations,
  toggleLang: () => {},
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-lang") as Lang | null;
      if (saved === "id" || saved === "en") {
        setLangState(saved);
      }
    } catch {
      // localStorage not available (SSR)
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      localStorage.setItem("portfolio-lang", newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "id" ? "en" : "id");
  };

  const t = lang === "id" ? idTranslations : enTranslations;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
