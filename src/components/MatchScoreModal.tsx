import React from "react";
import { X, ShieldCheck, CheckCircle2, AlertCircle, Sparkles, TrendingUp, Cpu, Award } from "lucide-react";
import { ApplicationResult } from "../types";

interface MatchScoreModalProps {
  application: ApplicationResult;
  onClose: () => void;
}

export const MatchScoreModal: React.FC<MatchScoreModalProps> = ({ application, onClose }) => {
  const { matchScore, matchSummary, matchedKeywords, missingKeywords, tailoringAdvice, targetJob } = application;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Diagnostic ATS & Correspondance
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Analyse détaillée pour le poste de <span className="font-semibold text-slate-800">{targetJob.title}</span> chez <span className="font-semibold text-slate-800">{targetJob.company}</span>
            </p>
          </div>
        </div>

        {/* Big Score Gauge */}
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative w-18 h-18 flex-shrink-0 flex items-center justify-center bg-white rounded-full shadow-sm border-2 border-emerald-500">
              <span className="text-2xl font-black text-emerald-700">{matchScore}%</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-bold bg-emerald-600 text-white rounded-full">
                  Excellente Adéquation
                </span>
                <span className="text-xs text-slate-500">Top 5% des candidats</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 font-medium">
                {matchSummary}
              </p>
            </div>
          </div>
        </div>

        {/* Matched Keywords Section */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Mots-clés ATS intégrés et valorisés ({matchedKeywords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {matchedKeywords.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-lg border border-emerald-200/80 flex items-center gap-1"
              >
                <span>✓</span> {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing or Bonus Keywords */}
        {missingKeywords && missingKeywords.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Compétences complémentaires suggérées pour l'entretien
            </h4>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-amber-50 text-amber-800 text-xs font-medium rounded-lg border border-amber-200 flex items-center gap-1"
                >
                  <span>+</span> {kw}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tailoring Advice List */}
        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Adaptations stratégiques opérées par l'IA
          </h4>
          <div className="space-y-2">
            {tailoringAdvice.map((advice, i) => (
              <div
                key={i}
                className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-2.5"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="leading-relaxed">{advice}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
          >
            Fermer et continuer
          </button>
        </div>
      </div>
    </div>
  );
};
