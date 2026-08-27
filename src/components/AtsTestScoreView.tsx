import React, { useState } from 'react';
import { ShieldCheck, UploadCloud, ArrowRight, CheckCircle2, AlertTriangle, FileText, Sparkles, RefreshCw } from 'lucide-react';

interface AtsTestScoreViewProps {
  onStartFullOptimization: () => void;
}

export const AtsTestScoreView: React.FC<AtsTestScoreViewProps> = ({ onStartFullOptimization }) => {
  const [jobDescription, setJobDescription] = useState(
    "Nous recherchons un Chef de Projet Digital Senior pour piloter la refonte de nos parcours web en méthodologie Agile Scrum avec Jira et animer les cérémonies d'équipe."
  );
  const [cvText, setCvText] = useState(
    "Chef de projet web avec 5 ans d'expérience dans la gestion de projets internet et coordination d'équipes."
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scoreResult, setScoreResult] = useState<{
    score: number;
    detectedKeywords: string[];
    missingKeywords: string[];
    formattingIssues: string[];
  } | null>({
    score: 64,
    detectedKeywords: ["Chef de projet", "Gestion de projets", "Coordination d'équipes"],
    missingKeywords: ["Agile", "Scrum", "Jira", "Sprint Planning", "KPIs"],
    formattingIssues: ["Absence de métriques chiffrées", "Manque de mots-clés techniques de l'annonce"],
  });

  const handleRunTest = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setScoreResult({
        score: Math.floor(Math.random() * 20) + 68,
        detectedKeywords: ["Gestion de projet", "Parcours web", "Équipe"],
        missingKeywords: ["Agile Scrum", "Jira", "Cérémonies", "Backlog"],
        formattingIssues: ["Dates non standardisées", "Score de répétition des compétences insuffisant"],
      });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Outil Gratuit & Instantané
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C] tracking-tight mt-3 mb-3">
          Testeur de Score ATS Gratuit : Votre CV passe-t-il le filtre ?
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280]">
          Comparez votre CV avec une offre d'emploi en quelques secondes pour détecter les mots-clés manquants et maximiser vos chances d'entretien.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <label className="block text-xs font-bold uppercase text-[#1A3A5C] mb-2">
            1. Collez le texte de l'offre d'emploi cible
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1A3A5C] focus:outline-none"
            placeholder="Collez ici l'annonce de recrutement..."
          />

          <label className="block text-xs font-bold uppercase text-[#1A3A5C] mt-4 mb-2">
            2. Collez le contenu de votre CV actuel
          </label>
          <textarea
            value={cvText}
            onChange={(e) => setCvText(e.target.value)}
            rows={6}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-[#1A3A5C] focus:outline-none"
            placeholder="Collez ici le texte de votre CV..."
          />

          <button
            onClick={handleRunTest}
            disabled={isAnalyzing}
            className="w-full mt-5 py-3.5 bg-[#1A3A5C] hover:bg-[#132B45] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Analyse ATS en cours...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Calculer mon score ATS</span>
              </>
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#1A3A5C] mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Résultats du Diagnostic ATS
            </h2>

            {scoreResult && (
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="w-20 h-20 rounded-2xl bg-white border-2 border-[#1A3A5C] flex flex-col items-center justify-center font-black text-2xl text-[#1A3A5C] shadow-inner">
                    {scoreResult.score}%
                    <span className="text-[10px] font-normal text-slate-500">Score ATS</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">
                      {scoreResult.score >= 80 ? "Excellent niveau de matching" : "Risque de rejet automatique"}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {scoreResult.score >= 80
                        ? "Votre CV contient les termes clés indispensables pour être lu par un recruteur."
                        : "Les logiciels de tri (Workday, Taleo, Greenhouse) risquent de filtrer votre candidature."}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                    ✓ Mots-clés détectés
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {scoreResult.detectedKeywords.map((kw, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                    ⚠ Mots-clés manquants critiques
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {scoreResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-5 border-t border-slate-100">
            <button
              onClick={onStartFullOptimization}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <span>Optimiser automatiquement à +90% avec l'IA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
