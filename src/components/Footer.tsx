import React from "react";
import { Logo } from "./Logo";
import { ShieldCheck, Lock, FileText, Mail } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";

interface FooterProps {
  onOpenLegalModal?: (tab: "cgv" | "privacy" | "mentions") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegalModal }) => {
  const { t } = useLanguage();

  return (
    <footer id="main-footer" className="w-full bg-white border-t border-slate-200/80 py-8 mt-16 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-6">
        {/* Product Hunt Badge */}
        <div id="product-hunt-badge" className="flex items-center justify-center">
          <a
            href="https://www.producthunt.com/products/jobmatch-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-jobmatch-3"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <img
              alt="JobMatch - AI-tailored resumes & cover letters for every job, in 30s | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1236818&theme=neutral&t=1788117921533"
              className="h-[54px] w-[250px] object-contain"
            />
          </a>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Logo size="sm" showBadge={false} />
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="text-slate-400">© 2026 JobMatch. {t("footer_rights")}</span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-x-6 gap-y-3">
            {onOpenLegalModal ? (
              <>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal("cgv")}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t("footer_cgv")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal("privacy")}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t("footer_privacy")}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegalModal("mentions")}
                  className="hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{t("footer_legal")}</span>
                </button>
              </>
            ) : (
              <>
                <span>{t("footer_cgv")}</span>
                <span>{t("footer_privacy")}</span>
                <span>{t("footer_legal")}</span>
              </>
            )}

            <a
              href="mailto:support@jobmatch.pro"
              className="hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Support</span>
            </a>

            <div className="border-l border-slate-200 pl-4">
              <LanguageSelector variant="nav" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
