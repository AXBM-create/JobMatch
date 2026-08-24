import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { Language } from "../i18n/translations";

interface LanguageSelectorProps {
  variant?: "nav" | "compact" | "footer";
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ variant = "nav" }) => {
  const { language, setLanguage, supportedLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = supportedLanguages.find((l) => l.code === language) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === "footer") {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
          id="footer-lang-selector"
        >
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentLang.flag} {currentLang.label}</span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 left-0 w-44 bg-slate-900 border border-slate-700 rounded-xl shadow-xl py-1 z-50 overflow-hidden">
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  lang.code === language
                    ? "bg-emerald-500/10 text-emerald-400 font-medium"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {lang.code === language && <Check className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/80 rounded-lg transition-all active:scale-95"
        id="nav-lang-selector"
        title="Changer de langue / Change language"
      >
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="font-semibold uppercase tracking-wider text-[11px]">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
            Langue / Language
          </div>
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                lang.code === language
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
              {lang.code === language && <Check className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
