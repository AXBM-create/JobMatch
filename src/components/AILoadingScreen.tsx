import React, { useEffect, useState } from "react";
import { Briefcase, Check, Loader2, FileText, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

interface AILoadingScreenProps {
  onComplete?: () => void;
  targetJobTitle?: string;
  companyName?: string;
}

export const AILoadingScreen: React.FC<AILoadingScreenProps> = ({
  targetJobTitle,
  companyName,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(1);

  // Smooth simulated progressive steps while backend processes
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setCurrentStepIndex(1); // Adaptation du profil
    }, 1200);

    const timer2 = setTimeout(() => {
      setCurrentStepIndex(2); // Rédaction en cours
    }, 2800);

    const timer3 = setTimeout(() => {
      setCurrentStepIndex(3); // Finalisation & calcul du score
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const steps = [
    {
      id: 0,
      label: "Analyse de l'offre...",
      sub: targetJobTitle && companyName ? `${targetJobTitle} @ ${companyName}` : "Extraction des mots-clés & compétences ATS",
    },
    {
      id: 1,
      label: "Adaptation de ton profil...",
      sub: "Valorisation des réalisations et expériences clés",
    },
    {
      id: 2,
      label: "Rédaction en cours...",
      sub: "Génération du CV et de la lettre de motivation sur-mesure",
    },
    {
      id: 3,
      label: "Calcul du score de correspondance...",
      sub: "Optimisation de l'alignement sémantique ATS",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-between p-6 sm:p-10 select-none">
      {/* Top Header Logo */}
      <div className="pt-6" id="loading-header-logo">
        <Logo size="md" />
      </div>

      {/* Main Center Content */}
      <div className="w-full max-w-xl flex flex-col items-center text-center my-auto py-8">
        {/* Animated Circular Glowing Icon */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer glowing pulsing ring */}
          <div className="absolute w-28 h-28 rounded-full bg-emerald-100/60 animate-ping opacity-30" />
          
          {/* Animated SVG Progress Ring */}
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#e2e8f0"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#10b981"
              strokeWidth="4"
              strokeDasharray="276"
              strokeDashoffset="70"
              strokeLinecap="round"
              fill="transparent"
              className="animate-spin duration-3000 origin-center"
            />
          </svg>

          {/* Center emerald circle with sparkle */}
          <div className="absolute w-16 h-16 rounded-full bg-emerald-100/90 flex items-center justify-center shadow-inner">
            <Sparkles className="w-7 h-7 text-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          L'IA prépare votre candidature idéale...
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed mb-8">
          Nous analysons les mots-clés et structurons votre expérience pour maximiser vos chances de réussite.
        </p>

        {/* Stepper Card */}
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-sm border border-slate-200/70 text-left transition-all">
          <div className="space-y-4">
            {steps.slice(0, 3).map((step, idx) => {
              const isCompleted = currentStepIndex > idx;
              const isActive = currentStepIndex === idx;
              const isPending = currentStepIndex < idx;

              return (
                <div
                  key={step.id}
                  className="flex items-center gap-3.5 transition-all duration-300"
                >
                  {/* Step Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-800 border border-slate-200">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    ) : isActive ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-200">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm tracking-tight ${
                        isCompleted
                          ? "text-slate-700 font-normal line-through opacity-70"
                          : isActive
                          ? "text-slate-900 font-bold"
                          : "text-slate-400 font-normal"
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="pb-4 text-center">
        <p className="text-xs text-slate-400">
          Cette opération peut prendre jusqu'à 30 secondes. Merci de patienter.
        </p>
      </div>
    </div>
  );
};
