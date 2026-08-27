import React, { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Shield,
  Zap,
  Star,
  FileCheck,
  X,
  CreditCard,
  Check
} from "lucide-react";
import { UserProfile, SubscriptionPlan } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

interface FirstGenerationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: SubscriptionPlan) => void;
  onOpenPricing: () => void;
  matchScore: number;
  jobTitle: string;
  companyName: string;
}

export const FirstGenerationSuccessModal: React.FC<FirstGenerationSuccessModalProps> = ({
  isOpen,
  onClose,
  onUpgrade,
  onOpenPricing,
  matchScore,
  jobTitle,
  companyName,
}) => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "executive">("pro");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/20 mb-3 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Votre premier dossier est prêt !</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3A5C] tracking-tight">
            Score ATS : <span className="text-emerald-600">{matchScore}%</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-sm mx-auto">
            Votre CV et lettre ont été chirurgicalement optimisés pour{" "}
            <span className="font-semibold text-slate-800">{jobTitle}</span> chez{" "}
            <span className="font-semibold text-slate-800">{companyName}</span>.
          </p>
        </div>

        {/* Alert / Notice for Next Applications */}
        <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-xl shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-amber-700" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-amber-900">
                Vous avez utilisé votre 1er essai gratuit (0 crédit restant)
              </h3>
              <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
                Pour adapter votre CV à toutes vos autres offres en illimité et retirer les limites, débloquez dès maintenant le plan Pro.
              </p>
            </div>
          </div>
        </div>

        {/* Plan Selector */}
        <div className="space-y-3 mb-6">
          {/* Pro Candidate */}
          <div
            onClick={() => setSelectedPlan("pro")}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              selectedPlan === "pro"
                ? "border-[#1A3A5C] bg-slate-50 ring-2 ring-[#1A3A5C]/20 shadow-md"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "pro" ? "border-[#1A3A5C] bg-[#1A3A5C]" : "border-slate-300"}`}>
                {selectedPlan === "pro" && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1A3A5C]">JobMatch Pro</span>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Recommandé
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Candidatures illimitées + PDF HD sans filigrane</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-[#1A3A5C]">19€</span>
              <span className="text-[10px] text-slate-500">/mois</span>
            </div>
          </div>

          {/* Executive Pass */}
          <div
            onClick={() => setSelectedPlan("executive")}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
              selectedPlan === "executive"
                ? "border-[#1A3A5C] bg-slate-50 ring-2 ring-[#1A3A5C]/20 shadow-md"
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === "executive" ? "border-[#1A3A5C] bg-[#1A3A5C]" : "border-slate-300"}`}>
                {selectedPlan === "executive" && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1A3A5C]">Pack Exécutif</span>
                  <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                    Intégral
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Pro + Optimisation LinkedIn + Support direct</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-[#1A3A5C]">39€</span>
              <span className="text-[10px] text-slate-500">/mois</span>
            </div>
          </div>
        </div>

        {/* Benefits Checklist */}
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Offres & CV illimités</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Sans engagement (1 clic)</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Multi-langue 6 pays</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Garantie 14 jours</span>
          </div>
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => {
            onClose();
            onOpenPricing();
          }}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>Débloquer les candidatures illimitées</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Secondary dismiss */}
        <button
          onClick={onClose}
          className="w-full mt-3 py-2 text-center text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          Consulter ma candidature actuelle d'abord
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-3 text-[11px] text-slate-400 mt-4 pt-4 border-t border-slate-100">
          <span className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            Paiement 100% sécurisé SSL
          </span>
          <span>•</span>
          <span>Résiliation libre à tout moment</span>
        </div>
      </div>
    </div>
  );
};
