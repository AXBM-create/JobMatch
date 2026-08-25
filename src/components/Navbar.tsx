import React from "react";
import { Sparkles, History as HistoryIcon, CreditCard, LayoutDashboard, PlusCircle, User as UserIcon, LogOut } from "lucide-react";
import { ViewState, UserProfile } from "../types";
import { User, signOut, auth } from "../firebase";
import { Logo } from "./Logo";
import { LanguageSelector } from "./LanguageSelector";
import { useLanguage } from "../i18n/LanguageContext";

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error("Sign out error", e);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate("dashboard")}
          className="cursor-pointer transition-transform duration-200 active:scale-98"
          id="nav-logo"
        >
          <Logo size="md" plan={userProfile?.plan || "starter"} />
        </div>

        {/* Center / Right Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          <button
            onClick={() => onNavigate("dashboard")}
            id="nav-tab-dashboard"
            className={`px-3.5 py-2 text-sm font-medium transition-all relative ${
              currentView === "dashboard" || currentView === "editor"
                ? "text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("nav_dashboard")}
            {(currentView === "dashboard" || currentView === "editor") && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-slate-900 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate("pricing")}
            id="nav-tab-pricing"
            className={`px-3.5 py-2 text-sm font-medium transition-all relative ${
              currentView === "pricing"
                ? "text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("nav_pricing")}
            {currentView === "pricing" && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-slate-900 rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate("history")}
            id="nav-tab-history"
            className={`px-3.5 py-2 text-sm font-medium transition-all relative ${
              currentView === "history"
                ? "text-slate-900 font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t("nav_history")}
            {currentView === "history" && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-slate-900 rounded-full" />
            )}
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Selector */}
          <LanguageSelector variant="nav" />

          <button
            onClick={onNewApplication}
            id="btn-new-application"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
            {t("nav_new_application")}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-800">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-5 h-5 rounded-full" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
                <span className="max-w-[110px] truncate hidden sm:inline">{user.displayName || user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                title={t("nav_logout")}
                className="text-slate-500 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              id="nav-btn-login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-2.5 sm:px-3 py-1.5 transition-colors"
            >
              {t("nav_login")}
            </button>
          )}

          <button
            onClick={() => onNavigate("dashboard")}
            id="nav-btn-try-free"
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium px-3.5 sm:px-4 py-2 rounded-full transition-all shadow-xs hover:shadow active:scale-95 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{t("nav_create_cv")}</span>
            <span className="sm:hidden">CV</span>
          </button>
        </div>
      </div>
    </header>
  );
};

