import React, { useState } from "react";
import { X, Sparkles, Loader2, ArrowRight, Check } from "lucide-react";
import { ApplicationResult } from "../types";

interface RegenerateModalProps {
  application: ApplicationResult;
  onClose: () => void;
  onRegenerateComplete: (newApp: ApplicationResult) => void;
}

export const RegenerateModal: React.FC<RegenerateModalProps> = ({
  application,
  onClose,
  onRegenerateComplete,
}) => {
  const [instruction, setInstruction] = useState("");
  const [targetScope, setTargetScope] = useState<"all" | "cover" | "resume">("all");
  const [tone, setTone] = useState(application.tone || "Professionnel & Axé Résultats");
  const [language, setLanguage] = useState<"fr" | "en" | "es" | "de">(application.language || "fr");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    "Rendre les réalisations plus percutantes avec des métriques chiffrées",
    "Mettre l'accent sur le leadership et la gestion d'équipe",
    "Traduire et adapter l'ensemble en Anglais (US/UK)",
    "Raccourcir la lettre de motivation pour un format ultra-direct (3 paragraphes)",
    "Adopter un ton plus chaleureux et orienté culture d'entreprise",
  ];

  const handleRunRegeneration = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateProfile: {
            fullName: application.resume.personalInfo.fullName,
            title: application.resume.personalInfo.title,
            email: application.resume.personalInfo.email,
            phone: application.resume.personalInfo.phone,
            location: application.resume.personalInfo.location,
            avatarUrl: application.resume.personalInfo.avatarUrl,
            summary: application.resume.summary,
            experiences: application.resume.experiences,
            skills: application.resume.skills,
            education: application.resume.education,
          },
          jobDetails: {
            jobTitle: application.targetJob.title,
            companyName: application.targetJob.company,
            location: application.targetJob.location,
            description: application.targetJob.description + (instruction ? `\nInstructions spécifiques de refonte: ${instruction}` : ""),
          },
          options: {
            language,
            tone,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la régénération");
      }

      const data = await response.json();
      const updatedApp: ApplicationResult = {
        ...application,
        ...data,
        id: "app-" + Date.now(),
        createdAt: new Date().toISOString(),
        language,
        tone,
      };

      onRegenerateComplete(updatedApp);
      onClose();
    } catch (err: any) {
      console.error(err);
      setError("Impossible de contacter le service IA. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Régénérer avec l'IA</h3>
            <p className="text-xs text-slate-500">Ajustez le ton, la langue ou donnez des consignes précises à Gemini.</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs">
            {error}
          </div>
        )}

        {/* Tone & Language Selectors */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Langue cible</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:border-slate-900"
            >
              <option value="fr">Français (France)</option>
              <option value="en">English (US/UK)</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Tonalité rédactionnelle</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:border-slate-900"
            >
              <option value="Professionnel & Axé Résultats">Professionnel & Axé Résultats</option>
              <option value="Dynamique & Moderne">Dynamique & Moderne</option>
              <option value="Exécutif & Leadership">Exécutif & Leadership</option>
              <option value="Concis & Direct">Concis & Direct</option>
              <option value="Créatif & Engageant">Créatif & Engageant</option>
            </select>
          </div>
        </div>

        {/* Quick Prompt Presets */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Suggestions rapides :</label>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setInstruction(preset)}
                className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors text-left"
              >
                + {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Instruction Input */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Instruction personnalisée pour Gemini AI :
          </label>
          <textarea
            rows={3}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Ex : Mets en avant mon expérience sur les Design Systems et les outils d'IA..."
            className="w-full text-xs text-slate-800 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-slate-900 focus:bg-white"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleRunRegeneration}
            className="flex items-center gap-2 px-5 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all shadow-sm disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Génération en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Régénérer la candidature</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
