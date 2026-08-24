import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, SUPPORTED_LANGUAGES, LanguageOption, translations, TranslationKey } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  supportedLanguages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("jobmatch_lang") as Language;
      if (saved && ["fr", "en", "es", "de", "it", "pt"].includes(saved)) {
        return saved;
      }
      // Check navigator language
      if (typeof navigator !== "undefined" && navigator.language) {
        const navLang = navigator.language.slice(0, 2).toLowerCase() as Language;
        if (["fr", "en", "es", "de", "it", "pt"].includes(navLang)) {
          return navLang;
        }
      }
    } catch {
      // Fallback
    }
    return "fr";
  });

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem("jobmatch_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.fr;
    return (langDict as any)[key] || (translations.fr as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, supportedLanguages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
