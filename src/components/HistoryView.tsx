import React from "react";
import { History, ArrowRight, ShieldCheck, Calendar, Building, FileText, Trash2, Eye } from "lucide-react";
import { ApplicationResult } from "../types";

interface HistoryViewProps {
  history: ApplicationResult[];
  onSelectApplication: (app: ApplicationResult) => void;
  onDeleteApplication: (id: string) => void;
  onNewApplication: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectApplication,
  onDeleteApplication,
  onNewApplication,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Historique des Candidatures</h1>
          <p className="text-slate-500 text-sm mt-1">
            Retrouvez et modifiez vos dossiers de candidature personnalisés.
          </p>
        </div>

        <button
          onClick={onNewApplication}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + Nouvelle candidature
        </button>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8">
          <History className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">Aucune candidature enregistrée</h3>
          <p className="text-xs text-slate-500 mb-6">Créez votre première candidature sur-mesure dès maintenant.</p>
          <button
            onClick={onNewApplication}
            className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg"
          >
            Commencer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {app.matchScore}% de match
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(app.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                {/* Job Title & Company */}
                <h3 className="font-bold text-base text-slate-900 line-clamp-1 mb-1">
                  {app.targetJob.title}
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1 mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span>{app.targetJob.company}</span>
                </p>

                {/* Candidate Name */}
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 mb-4">
                  <span className="font-medium text-slate-900">{app.resume.personalInfo.fullName}</span>
                  <p className="text-[11px] text-slate-500 truncate">{app.resume.personalInfo.title}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  onClick={() => onDeleteApplication(app.id)}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectApplication(app)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ouvrir l'éditeur</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
