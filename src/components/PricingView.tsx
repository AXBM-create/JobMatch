import React, { useState } from "react";
import { Check, Sparkles, Zap, Shield, HelpCircle, ArrowRight, Loader2, CreditCard } from "lucide-react";
import { User } from "../firebase";
import { UserProfile, SubscriptionPlan } from "../types";

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
  onOpenLegalModal
}) => {
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
          successUrl: window.location.origin + "?payment_success=true&plan=" + plan,
          cancelUrl: window.location.origin + "?payment_canceled=true",
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Simulation or direct upgrade
        if (onUpgradePlan) onUpgradePlan(plan);
      }
    } catch (e) {
      console.error("Error initiating subscription:", e);
      if (onUpgradePlan) onUpgradePlan(plan);
    } finally {
      setLoadingPlan(null);
    }
  };

  const handleOpenCustomerPortal = async () => {
    if (!userProfile?.stripeCustomerId) {
      alert("Votre abonnement est actif. Contactez le support ou gérez votre compte depuis votre espace.");
      return;
    }

    try {
      const res = await fetch("/api/create-customer-portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId: userProfile.stripeCustomerId,
          returnUrl: window.location.origin,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error("Portal error:", e);
    }
  };

  const currentPlan = userProfile?.plan || "starter";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Tarification Simple et Transparente
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Multipliez vos entretiens d'embauche grâce à nos algorithmes de ciblage calibrés pour les ATS modernes.
        </p>

        {userProfile && (
          <div className="inline-flex items-center gap-2 mt-4 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
            <span>Votre formule actuelle :</span>
            <span className="font-bold text-slate-900 capitalize">{currentPlan}</span>
            {userProfile.subscriptionStatus === "active" && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                Actif
              </span>
            )}
          </div>
        )}
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Starter Plan */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Starter Gratuit</h3>
            <p className="text-xs text-slate-500 mb-4">Pour tester l'efficacité de la plateforme sur une offre.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">0€</span>
              <span className="text-xs text-slate-500"> / pour toujours</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>1 candidature complète (CV + Lettre)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Score de correspondance & diagnostic ATS</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Export PDF standard</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onStartFree}
            className={`w-full py-2.5 px-4 rounded-xl border font-semibold text-xs transition-colors ${
              currentPlan === "starter"
                ? "bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200"
                : "border-slate-200 text-slate-800 hover:bg-slate-50"
            }`}
          >
            {currentPlan === "starter" ? "Commencer à rédiger" : "Formule de base"}
          </button>
        </div>

        {/* Pro Plan (Highlighted) */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative ring-2 ring-emerald-500">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide">
            Le Plus Populaire
          </div>

          <div>
            <h3 className="font-bold text-lg mb-1 flex items-center gap-1.5">
              <span>Pro Candidate</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </h3>
            <p className="text-xs text-slate-400 mb-4">Pour les candidats en recherche active ciblée.</p>
            <div className="mb-6">
              <span className="text-4xl font-black">19€</span>
              <span className="text-xs text-slate-400"> / mois</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Candidatures illimitées haute fidélité</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Éditeur de document en direct A4 haute fidélité</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Régénération et consignes de style sur-mesure</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Support multilingue (FR, EN, ES, DE)</span>
              </li>
            </ul>
          </div>

          {currentPlan === "pro" ? (
            <button
              onClick={handleOpenCustomerPortal}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Gérer mon abonnement Pro</span>
            </button>
          ) : (
            <button
              onClick={() => handleSubscribe("pro")}
              disabled={loadingPlan === "pro"}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md active:scale-98 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loadingPlan === "pro" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Activer l'accès Pro</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Executive Plan */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all">
          <div>
            <h3 className="font-bold text-lg text-slate-900 mb-1">Executive Pass</h3>
            <p className="text-xs text-slate-500 mb-4">Pour les profils C-Level, Managers et Freelances.</p>
            <div className="mb-6">
              <span className="text-4xl font-black text-slate-900">39€</span>
              <span className="text-xs text-slate-500"> / mois</span>
            </div>

            <ul className="space-y-3 text-xs text-slate-700 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Tout ce qui est inclus dans Pro</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Optimisation de profil LinkedIn et bio</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Simulateur interactif d'entretien d'embauche</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Accompagnement prioritaire 7j/7</span>
              </li>
            </ul>
          </div>

          {currentPlan === "executive" ? (
            <button
              onClick={handleOpenCustomerPortal}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-900 bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Gérer mon abonnement Executive</span>
            </button>
          ) : (
            <button
              onClick={() => handleSubscribe("executive")}
              disabled={loadingPlan === "executive"}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-900 bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loadingPlan === "executive" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <span>Choisir Executive</span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Trust & Guarantee */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <Shield className="w-8 h-8 text-emerald-600 flex-shrink-0" />
        <div className="text-left">
          <h4 className="font-bold text-sm text-slate-900">Garantie 100% Satisfait ou Remboursé</h4>
          <p className="text-xs text-slate-500">
            Testez sereinement pendant 14 jours. Annulation en 1 clic sans condition.{" "}
            {onOpenLegalModal && (
              <button
                type="button"
                onClick={() => onOpenLegalModal("cgv")}
                className="text-emerald-700 underline font-medium hover:text-emerald-800 ml-1"
              >
                Voir nos CGV
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

