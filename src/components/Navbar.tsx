/**
 * @file Navbar.tsx
 * @description Header de navigation principal pour JobMatch
 */

import React from "react";
import { Sparkles, PlusCircle, LogOut, Menu, X, ExternalLink, UserCheck } from "lucide-react";
import { ViewState, UserProfile } from "../types";
import { User, signOut, auth } from "../firebase";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";
import { getExternalClientPortalUrl } from "../services/portalService";

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onNewApplication: () => void;
  user: User | null;
  userProfile?: UserProfile | null;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentView, 
  onNavigate, 
  onNewApplication,
  user,
  userProfile,
  onOpenAuth
}) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign out error", e);
    }
  };

  const handleNavClick = (view: ViewState, anchor?: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    if (anchor) {
      // Delay to ensure the target view is rendered in the DOM before scrolling
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          onClick={() => handleNavClick("landing")}
          className="cursor-pointer transition-transform duration-200 active:scale-98"
          id="nav-logo"
        >
          <Logo size="md" showBadge={false} />
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => handleNavClick("landing")}
            id="nav-tab-landing"
            className={`px-3 py-2 text-sm font-medium transition-all rounded-lg cursor-pointer ${
              currentView === "landing"
                ? "text-[#1A3A5C] font-bold bg-slate-100/80"
                : "text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50"
            }`}
          >
            {t("nav_home")}
          </button>

          <button
            onClick={() => handleNavClick("dashboard")}
            id="nav-tab-dashboard"
            className={`px-3 py-2 text-sm font-medium transition-all rounded-lg cursor-pointer ${
              currentView === "dashboard" || currentView === "onboarding" || currentView === "editor"
                ? "text-[#1A3A5C] font-bold bg-slate-100/80"
                : "text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50"
            }`}
          >
            {t("nav_dashboard")}
          </button>

          <button
            onClick={() => handleNavClick("landing", "how-it-works")}
            id="nav-tab-how-it-works"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
          >
            {t("nav_how_it_works")}
          </button>

          <button
            onClick={() => handleNavClick("pricing")}
            id="nav-tab-pricing"
            className={`px-3 py-2 text-sm font-medium transition-all rounded-lg cursor-pointer ${
              currentView === "pricing"
                ? "text-[#1A3A5C] font-bold bg-slate-100/80"
                : "text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50"
            }`}
          >
            {t("nav_pricing")}
          </button>

          <button
            onClick={() => handleNavClick("guides")}
            id="nav-tab-guides"
            className={`px-3 py-2 text-sm font-medium transition-all rounded-lg cursor-pointer ${
              currentView === "guides" || currentView === "ats-guide" || currentView === "long-tail-guide"
                ? "text-[#1A3A5C] font-bold bg-slate-100/80"
                : "text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50"
            }`}
          >
            Guides & Conseils ATS
          </button>

          <button
            onClick={() => handleNavClick("landing", "faq")}
            id="nav-tab-faq"
            className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
          >
            {t("nav_faq")}
          </button>

          {user && (
            <button
              onClick={() => handleNavClick("history")}
              id="nav-tab-history"
              className={`px-3 py-2 text-sm font-medium transition-all rounded-lg cursor-pointer ${
                currentView === "history"
                  ? "text-[#1A3A5C] font-bold bg-slate-100/80"
                  : "text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50"
              }`}
            >
              {t("nav_history")}
            </button>
          )}

          {/* Lien vers l'espace client externe */}
          <a
            href={getExternalClientPortalUrl(user?.email || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            id="nav-link-espace-client"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 hover:text-[#1A3A5C] hover:bg-slate-50 rounded-lg transition-all"
            title="Accéder à votre espace client (factures, gestion de l'abonnement)"
          >
            <span>Espace Client</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSelector variant="nav" />

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-800">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Photo de profil du compte utilisateur"
                    width="20"
                    height="20"
                    loading="lazy"
                    decoding="async"
                    className="w-5 h-5 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-[#1A3A5C] text-white flex items-center justify-center text-[10px] font-bold">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="max-w-[110px] truncate hidden sm:inline font-medium">{user.displayName || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                title={t("nav_logout")}
                className="text-slate-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              id="nav-btn-login"
              className="text-sm font-semibold text-slate-700 hover:text-[#1A3A5C] px-3 py-2 transition-colors cursor-pointer"
            >
              {t("nav_login")}
            </button>
          )}

          {/* CTA Principal */}
          <button
            onClick={() => handleNavClick("dashboard")}
            id="nav-btn-try-free"
            className="bg-[#1A3A5C] hover:bg-[#132B45] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow-2xs hover:shadow active:scale-98 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t("nav_try_free")}</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          <button
            onClick={() => handleNavClick("landing")}
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {t("nav_home")}
          </button>
          <button
            onClick={() => handleNavClick("dashboard")}
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {t("nav_dashboard")}
          </button>
          <button
            onClick={() => handleNavClick("landing", "how-it-works")}
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {t("nav_how_it_works")}
          </button>
          <button
            onClick={() => handleNavClick("pricing")}
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {t("nav_pricing")}
          </button>
          <button
            onClick={() => handleNavClick("landing", "faq")}
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            {t("nav_faq")}
          </button>
          {user && (
            <button
              onClick={() => handleNavClick("history")}
              className="block w-full text-left px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              {t("nav_history")}
            </button>
          )}
          <a
            href={getExternalClientPortalUrl(user?.email || undefined)}
            target="_blank"
            rel="noopener noreferrer"
            id="mobile-nav-link-espace-client"
            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-slate-800 rounded-lg hover:bg-slate-100"
          >
            <span className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-[#1A3A5C]" />
              <span>Espace Client</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      )}
    </header>
  );
};
