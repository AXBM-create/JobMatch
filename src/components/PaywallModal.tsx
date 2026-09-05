import React, { useEffect } from "react";
import { X, Sparkles, Check, ArrowRight, ShieldCheck, ExternalLink } from "lucide-react";
import { getExternalClientPortalUrl } from "../services/portalService";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPricing: () => void;
  userEmail?: string;
}

export const PaywallModal: React.FC<PaywallModalProps> = ({
  isOpen,
  onClose,
  onViewPricing,
  userEmail,
}) => {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="paywall-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Click outside backdrop */}
      <div
        className="fixed inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button Top Right */}
        <button
          id="btn-close-paywall-x"
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header Icon & Badge */}
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4 shadow-2xs">
              <span className="text-2xl" role="img" aria-label="cadenas">🔒</span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
              Limite gratuite atteinte
            </span>

            {/* Titre & Sous-titre demandés */}
            <h2
              id="paywall-title"
              className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
            >
              Vous avez utilisé votre génération gratuite !
            </h2>

            <p className="text-sm text-slate-600 mt-2 max-w-md leading-relaxed">
              Passez à la version Premium pour générer des CV illimités et adaptés à chaque offre.
            </p>
          </div>

          {/* Value Proposition Box */}
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#1A3A5C] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Avantages inclus dans la version Premium :</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span><strong>Générations 100% illimitées</strong> de CV & lettres pour toutes vos candidatures</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span><strong>Optimisation ATS maximale</strong> (+90% de score de matching recruteur)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span><strong>Export PDF HD sans filigrane</strong> prêt à être envoyé aux recruteurs</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-0.5 shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span><strong>Édition live & reformulation IA</strong> par section sans limitation</span>
              </li>
            </ul>
          </div>

          {/* Boutons d'action demandés */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
            <button
              id="btn-view-premium-offers"
              type="button"
              onClick={onViewPricing}
              className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Voir les offres Premium</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="btn-close-paywall"
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              Fermer
            </button>
          </div>

          {/* Reassurance Footer */}
          <div className="mt-4 flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Sans engagement
            </span>
            <span>•</span>
            <span>Activation instantanée</span>
            <span>•</span>
            <span>À partir de 14,90€/mois</span>
          </div>

          <div className="mt-4 pt-3 text-center border-t border-slate-100">
            <a
              href={getExternalClientPortalUrl(userEmail)}
              target="_blank"
              rel="noopener noreferrer"
              id="link-paywall-espace-client"
              className="text-xs font-medium text-slate-500 hover:text-[#1A3A5C] inline-flex items-center gap-1 transition-colors"
            >
              <span>Déjà abonné ? Accéder à mon espace client</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
