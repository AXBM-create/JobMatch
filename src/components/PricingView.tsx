/**
 * @file PricingView.tsx
 * @description ÉCRAN 6 : Page Tarifs & Abonnements JobMatch
 * 
 * Choix Techniques & UX :
 * - Toggle Annuel/Mensuel : Calcul dynamique de la réduction (-25%) pour inciter à l'engagement.
 * - Hiérarchie Visuelle Forte : Plan Pro (milieu) mis en avant avec badge "Le plus populaire", bordure `#1A3A5C` et fond contrasté.
 * - Tableau Comparatif Détaillé : Liste explicite des fonctionnalités avec icônes de validation (Check) et indisponibilité (X).
 * - Mini FAQ Intégrée : Traite les objections courantes (résiliation en 1 clic, remboursement, sécurité Stripe).
 */

import React, { useState } from "react";
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
  Star
} from "lucide-react";
import { User } from "../firebase";
import { UserProfile, SubscriptionPlan } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

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
          successUrl: window.location.origin + "?payment_success=true&plan=" + plan,
          cancelUrl: window.location.origin + "?payment_canceled=true",
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title & Subtitle */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Investis dans ta carrière
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C] tracking-tight mt-3 mb-3">
          Un tarif adapté à ta recherche
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280]">
          Multiplie tes entretiens d'embauche grâce à nos algorithmes de ciblage calibrés pour les ATS modernes.
        </p>

        {/* Toggle Mensuel / Annuel */}
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className={`text-xs sm:text-sm font-semibold ${billingCycle === "monthly" ? "text-[#1A3A5C]" : "text-slate-500"}`}>
            Mensuel
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
            <span>Annuel</span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
              -25% d'économie
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
                Découverte
              </span>
              {currentPlan === "starter" && (
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Plan actuel
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-[#1A3A5C] mb-1">Gratuit</h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Idéal pour tester la puissance de JobMatch sur une première offre.
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C]">0€</span>
              <span className="text-xs text-[#6B7280]">/ sans CB</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-6 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1 candidature complète offerte (CV + Lettre)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Score de correspondance ATS standard</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Édition du texte de base</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Générations illimitées</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-300 shrink-0" />
                <span>Export PDF HD sans filigrane</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStartFree}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#1A3A5C] font-semibold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer"
          >
            Commencer gratuitement
          </button>
        </div>

        {/* ================= CARD 2 : MENSUEL PRO (LE PLUS POPULAIRE) ================= */}
        <div className="bg-[#1A3A5C] text-white rounded-2xl border-2 border-emerald-400 p-6 sm:p-8 flex flex-col justify-between shadow-[0_8px_30px_rgba(26,58,92,0.18)] relative scale-100 md:scale-105 z-10">
          {/* Badge Populaire */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            <span>LE PLUS POPULAIRE</span>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Recherche Active
              </span>
              {currentPlan === "pro" && (
                <span className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded">
                  Actif
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">Pro Illimité</h3>
            <p className="text-xs text-slate-300 mb-4">
              La solution complète pour postuler rapidement à toutes les opportunités.
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {billingCycle === "yearly" ? "14,90€" : "19,90€"}
              </span>
              <span className="text-xs text-slate-300">/ mois</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-200 border-t border-white/10 pt-6 mb-8">
              <li className="flex items-center gap-2.5 font-semibold text-white">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Candidatures & CVs 100% illimités</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Optimisation ATS maximale (+90% score)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Édition inline + régénération par section</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Téléchargement PDF HD sans filigrane</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Support prioritaire par email 7j/7</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSubscribe("pro")}
            disabled={loadingPlan === "pro"}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            {loadingPlan === "pro" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Activer l'accès illimité</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* ================= CARD 3 : PACK CRÉDITS (EXECUTIVE) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-[0_2px_8px_rgba(0,0,0,0.04)] relative">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Usage Ponctuel
              </span>
              {currentPlan === "executive" && (
                <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Plan actuel
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold text-[#1A3A5C] mb-1">Pack 15 Candidatures</h3>
            <p className="text-xs text-[#6B7280] mb-4">
              Sans abonnement ni engagement, pour cibler des offres très spécifiques.
            </p>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C]">29€</span>
              <span className="text-xs text-[#6B7280]">/ paiement unique</span>
            </div>

            {/* Features List */}
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-6 mb-8">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Pack de 15 candidatures sur-mesure</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Crédits valables à vie sans expiration</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tous les exports PDF HD inclus</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Édition complète et sauvegarde cloud</span>
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
              <span>Acheter le pack 15 crédits</span>
            )}
          </button>
        </div>
      </div>

      {/* Mini FAQ Pricing */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 max-w-3xl mx-auto">
        <h3 className="text-lg font-bold text-[#1A3A5C] mb-4 text-center">
          Questions sur nos abonnements
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">Puis-je annuler à tout moment ?</h4>
            <p className="text-slate-600 leading-relaxed">
              Oui, sans aucun frais. Vous pouvez résilier en un clic depuis votre espace personnel ou via le portail Stripe.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-1">Le paiement est-il sécurisé ?</h4>
            <p className="text-slate-600 leading-relaxed">
              Nous utilisons Stripe avec chiffrement SSL 256-bit. Aucune coordonnée bancaire ne transite par nos serveurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
