/**
 * @file PricingView.tsx
 * @description ÉCRAN 6 : Page Tarifs & Abonnements JobMatch
 * 
 * Choix Techniques & UX :
 * - Toggle Annuel/Mensuel : Calcul dynamique de la réduction (-25%) pour inciter à l'engagement.
 * - Hiérarchie Visuelle Forte : Plan Pro (milieu) mis en avant avec badge "Le plus populaire", bordure `#1A3A5C` et fond contrasté.
 * - Multilingue : Tous les libellés, fonctionnalités et FAQs traduits dynamiquement.
 */

import React, { useState, useEffect } from "react";
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  HelpCircle,
  ArrowRight,
  Loader2,
  CreditCard,
  Lock,
  Star,
  AlertCircle
} from "lucide-react";
import { User } from "../firebase";
import { UserProfile, SubscriptionPlan } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { SITE_URL } from "../seo/metadata";
import { Breadcrumbs } from "./Breadcrumbs";

interface PricingViewProps {
  onStartFree: () => void;
  user?: User | null;
  userProfile?: UserProfile | null;
  onUpgradePlan?: (plan: SubscriptionPlan) => void;
  onOpenAuth?: () => void;
  onOpenLegalModal?: (tab: "cgv" | "privacy" | "mentions") => void;
}

export const PricingView: React.FC<PricingViewProps> = ({
  onStartFree,
  user,
  userProfile,
  onUpgradePlan,
  onOpenAuth,
  onOpenLegalModal,
}) => {
  const { t } = useLanguage();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [showCanceledBanner, setShowCanceledBanner] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment_canceled") === "true") {
      setShowCanceledBanner(true);
      // Clean query parameter from browser bar without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Ensure Stripe Buy Button script is dynamically loaded
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/buy-button.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleSubscribe = async (plan: "pro" | "executive") => {
    if (!user) {
      if (onOpenAuth) onOpenAuth();
      return;
    }

    setLoadingPlan(plan);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan,
          userId: user.uid,
          userEmail: user.email,
          billingCycle,
          successUrl: `${SITE_URL}/onboarding?payment_success=true&plan={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${SITE_URL}/pricing?payment_canceled=true`,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        if (onUpgradePlan) onUpgradePlan(plan);
      }
    } catch (e) {
      console.error("Error initiating subscription:", e);
      if (onUpgradePlan) onUpgradePlan(plan);
    } finally {
      setLoadingPlan(null);
    }
  };

  const currentPlan = userProfile?.plan || "starter";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Breadcrumbs with Schema.org JSON-LD */}
      <Breadcrumbs
        items={[
          { name: "Accueil", url: "/" },
          { name: "Tarifs & Formules", url: "/pricing" },
        ]}
        className="mb-6 px-0 py-0"
      />

      {/* Canceled Payment Notice */}
      {showCanceledBanner && (
        <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm font-medium">
              Le paiement a été interrompu ou annulé. Aucun montant n'a été prélevé. Vous pouvez choisir une formule ci-dessous quand vous le souhaitez.
            </p>
          </div>
          <button
            onClick={() => setShowCanceledBanner(false)}
            className="text-amber-700 hover:text-amber-900 p-1 rounded-lg hover:bg-amber-100 transition-colors shrink-0"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Title & Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {t("pricing_badge")}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C] tracking-tight mt-3 mb-3">
          {t("pricing_title")}
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280]">
          {t("pricing_subtitle")}
        </p>

        {/* Toggle Mensuel / Annuel */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-xs sm:text-sm font-semibold ${billingCycle === "monthly" ? "text-[#1A3A5C]" : "text-slate-500"}`}>
            {t("pricing_monthly")}
          </span>

          <button
            type="button"
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-[#1A3A5C] transition-colors cursor-pointer"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                billingCycle === "yearly" ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>

          <span className={`text-xs sm:text-sm font-semibold flex items-center gap-1.5 ${billingCycle === "yearly" ? "text-[#1A3A5C]" : "text-slate-500"}`}>
            <span>{t("pricing_yearly")}</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              {t("pricing_discount")}
            </span>
          </span>
        </div>
      </div>

      {/* 3 Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-16">
        
        {/* ================= CARD 1 : GRATUIT (STARTER) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t("pricing_starter_title")}
              </span>
              {currentPlan === "starter" && (
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {t("pricing_current_plan")}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-[#1A3A5C] mb-1">{t("pricing_starter_title")}</h3>
            <p className="text-xs text-[#6B7280] mb-4">
              {t("pricing_starter_desc")}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C]">{t("pricing_starter_price")}</span>
              <span className="text-xs text-[#6B7280]">{t("pricing_starter_period")}</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-6 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_starter_f1")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_starter_f2")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_starter_f3")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{t("pricing_starter_f4_no")}</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>{t("pricing_starter_f5_no")}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStartFree}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#1A3A5C] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
          >
            {t("pricing_starter_btn")}
          </button>
        </div>

        {/* ================= CARD 2 : MENSUEL PRO (LE PLUS POPULAIRE) ================= */}
        <div className="bg-[#1A3A5C] text-white rounded-2xl border-2 border-emerald-400 p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(26,58,92,0.18)] relative scale-100 md:scale-105 z-10">
          {/* Badge Populaire */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>{t("pricing_pro_badge")}</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {t("pricing_pro_cat")}
              </span>
              {currentPlan === "pro" && (
                <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded">
                  {t("pricing_active_plan")}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{t("pricing_pro_title")}</h3>
            <p className="text-xs text-slate-300 mb-4">
              {t("pricing_pro_desc")}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {billingCycle === "yearly" ? t("pricing_pro_price_yearly") : t("pricing_pro_price_monthly")}
              </span>
              <span className="text-xs text-slate-300">{t("pricing_pro_period")}</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 border-t border-white/10 pt-6 mb-8">
              <li className="flex items-center gap-2.5 font-semibold text-white">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t("pricing_pro_f1")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t("pricing_pro_f2")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t("pricing_pro_f3")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t("pricing_pro_f4")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{t("pricing_pro_f5")}</span>
              </li>
            </ul>
          </div>

          {/* Bouton d'accès illimité Stripe Officiel */}
          <div className="w-full flex flex-col items-center justify-center min-h-[50px] rounded-lg overflow-hidden [&>stripe-buy-button]:w-full">
            {React.createElement("stripe-buy-button", {
              "buy-button-id": "buy_btn_1UCJzZIhxtlG92jqGtqjogl2",
              "publishable-key": "pk_live_51U0Ss4IhxtlG92jqDsVzKEMkW2O0LAyD96YEgx4ym30rSDA5DYji8t7XcPRvKuKxa2OyJQ0jmXJDhBDaDNAJUCO400sdB2qKD2",
              ...(user?.uid ? { "client-reference-id": user.uid } : {}),
              ...(user?.email ? { "customer-email": user.email } : {}),
            })}
          </div>
        </div>

        {/* ================= CARD 3 : PACK CRÉDITS (EXECUTIVE) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t("pricing_exec_cat")}
              </span>
              {currentPlan === "executive" && (
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {t("pricing_current_plan")}
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-[#1A3A5C] mb-1">{t("pricing_exec_title")}</h3>
            <p className="text-xs text-[#6B7280] mb-4">
              {t("pricing_exec_desc")}
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C]">{t("pricing_exec_price")}</span>
              <span className="text-xs text-[#6B7280]">{t("pricing_exec_period")}</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-6 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_exec_f1")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_exec_f2")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_exec_f3")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t("pricing_exec_f4")}</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe("executive")}
            disabled={loadingPlan === "executive"}
            className="w-full py-3 bg-white hover:bg-slate-50 text-[#1A3A5C] border border-[#1A3A5C] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            {loadingPlan === "executive" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span>{t("pricing_exec_btn")}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mini FAQ Pricing */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 max-w-3xl mx-auto">
        <h3 className="text-lg font-bold text-[#1A3A5C] mb-4 text-center">
          {t("pricing_faq_title")}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">{t("pricing_faq_q1")}</h4>
            <p className="text-slate-600 leading-relaxed">
              {t("pricing_faq_a1")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">{t("pricing_faq_q2")}</h4>
            <p className="text-slate-600 leading-relaxed">
              {t("pricing_faq_a2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
