/**
 * @file AILoadingScreen.tsx
 * @description ÉCRAN 3 : Génération / Loading Screen sans distraction
 * 
 * Choix Techniques & UX :
 * - Focus Total : Plein écran sans navbar pour éviter l'abandon prématuré.
 * - Séquençage Narratif : 4 étapes textuelles s'enchaînant chronologiquement pour rassurer l'utilisateur sur le travail approfondi de l'IA.
 * - Performance & Animation : Spinner SVG fluide animé par CSS natif (sans freeze JS) aux couleurs de la marque (#1A3A5C et #10B981).
 * - Micro-copie Rassurante : Indication claire du délai moyen (20-30s) et bouton d'annulation discret.
 */

import React, { useEffect, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { Logo } from "./Logo";

interface AILoadingScreenProps {
  onCancel?: () => void;
  targetJobTitle?: string;
  companyName?: string;
}

export const AILoadingScreen: React.FC<AILoadingScreenProps> = ({
  onCancel,
  targetJobTitle,
  companyName,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(15);

  const steps = [
    {
      id: 0,
      label: "Analyse de l'offre d'emploi...",
      detail: targetJobTitle && companyName ? `${targetJobTitle} chez ${companyName}` : "Extraction des critères clés et du contexte de l'entreprise",
    },
    {
      id: 1,
      label: "Identification des mots-clés ATS...",
      detail: "Détection des compétences techniques, soft skills et termes obligatoires",
    },
    {
      id: 2,
      label: "Adaptation de ton profil...",
      detail: "Restructuration des expériences pour maximiser la pertinence",
    },
    {
      id: 3,
      label: "Rédaction en cours...",
      detail: "Génération du CV percutant et de la lettre de motivation sur-mesure",
    },
  ];

  useEffect(() => {
    // Progressive timed steps to guide user during 20-30s generation
    const t1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setProgressPercent(40);
    }, 2200);

    const t2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setProgressPercent(70);
    }, 6500);

    const t3 = setTimeout(() => {
      setCurrentStepIndex(3);
      setProgressPercent(92);
    }, 12000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#F8F9FA] flex flex-col items-center justify-between p-6 sm:p-10 select-none overflow-y-auto">
      {/* Top Header Logo */}
      <div className="pt-4 sm:pt-6">
        <Logo size="md" />
      </div>

      {/* Main Center Box */}
      <div className="w-full max-w-lg flex flex-col items-center text-center my-auto py-6">
        
        {/* Animated Visual Progress Gauge */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Subtle Outer Pulsing Ring */}
          <div className="absolute w-32 h-32 rounded-full bg-emerald-100/60 animate-ping opacity-25" />

          {/* SVG Progress Circle */}
          <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#E5E7EB"
              strokeWidth="5"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              stroke="#10B981"
              strokeWidth="5"
              strokeDasharray="264"
              strokeDashoffset={264 - (264 * progressPercent) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Center Emblem with Sparkle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-[#1A3A5C] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dynamic Step Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3A5C] mb-2 transition-all duration-300">
          {steps[currentStepIndex].label}
        </h2>
        <p className="text-sm text-[#6B7280] max-w-md mx-auto mb-8 transition-all duration-300">
          {steps[currentStepIndex].detail}
        </p>

        {/* Step Indicator Cards */}
        <div className="w-full space-y-2.5 mb-8">
          {steps.map((step, idx) => {
            const isCompleted = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all duration-300 ${
                  isCurrent
                    ? "bg-white border-emerald-400 shadow-sm"
                    : isCompleted
                    ? "bg-emerald-50/50 border-emerald-200 text-emerald-900"
                    : "bg-slate-100/60 border-slate-200 opacity-40 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isCurrent
                        ? "bg-[#1A3A5C] text-white"
                        : "bg-slate-300 text-slate-600"
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span className={`text-xs sm:text-sm font-semibold ${isCurrent ? "text-[#1A3A5C]" : ""}`}>
                    {step.label.replace("...", "")}
                  </span>
                </div>

                {isCurrent && (
                  <span className="text-[11px] font-bold text-emerald-600 animate-pulse">
                    En cours...
                  </span>
                )}
                {isCompleted && (
                  <span className="text-[11px] font-bold text-emerald-700">
                    Terminé ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Micro-Text Rassurant */}
        <p className="text-xs text-slate-400 font-medium">
          ⚡ Cela prend généralement 20 à 30 secondes
        </p>
      </div>

      {/* Option d'Annulation Discrète en Bas */}
      <div className="pb-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-200/60 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Annuler la génération</span>
          </button>
        )}
      </div>
    </div>
  );
};
