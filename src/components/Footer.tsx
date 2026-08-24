import React from "react";
import { Logo } from "./Logo";
import { ShieldCheck, Lock, FileText, Mail } from "lucide-react";

interface FooterProps {
  onOpenLegalModal?: (tab: "cgv" | "privacy" | "mentions") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200/80 py-8 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Logo size="sm" showBadge={false} />
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="text-slate-400">© 2026 JobMatch. Tous droits réservés.</span>
        </div>

        <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
          {onOpenLegalModal ? (
            <>
              <button
                type="button"
                onClick={() => onOpenLegalModal("cgv")}
                className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>CGV & CGU</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenLegalModal("privacy")}
                className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Confidentialité RGPD</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenLegalModal("mentions")}
                className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Mentions Légales</span>
              </button>
            </>
          ) : (
            <>
              <span>CGV & CGU</span>
              <span>Confidentialité RGPD</span>
              <span>Mentions Légales</span>
            </>
          )}

          <a
            href="mailto:support@jobmatch.pro"
            className="hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Support Client</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

