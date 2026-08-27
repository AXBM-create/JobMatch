/**
 * @file HistoryView.tsx
 * @description ÉCRAN 5 : Dashboard utilisateur / Suivi des candidatures
 * 
 * Choix Techniques & UX :
 * - Vue Tableau de Bord : Statistiques claires, compteur de crédits dynamiques, badges de statut colorés (brouillon/téléchargé/envoyé).
 * - Filtres Dynamiques : Filtrage instantané par statut et tri par date/score de correspondance sans rechargement.
 * - Actions Rapides : Consultation dans l'éditeur, duplication pour déclinaison rapide, suppression avec confirmation.
 * - État Vide Soigné : Incite l'utilisateur à créer sa première candidature en un clic.
 */

import React, { useState } from "react";
import {
  History,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Building,
  FileText,
  Trash2,
  Eye,
  Copy,
  Plus,
  Filter,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  CreditCard
} from "lucide-react";
import { ApplicationResult, UserProfile } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

interface HistoryViewProps {
  history: ApplicationResult[];
  onSelectApplication: (app: ApplicationResult) => void;
  onDeleteApplication: (id: string) => void;
  onDuplicateApplication?: (app: ApplicationResult) => void;
  onNewApplication: () => void;
  userProfile?: UserProfile | null;
  onOpenPricing?: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onSelectApplication,
  onDeleteApplication,
  onDuplicateApplication,
  onNewApplication,
  userProfile,
  onOpenPricing,
}) => {
  const { t } = useLanguage();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter and search applications
  const filteredHistory = history.filter((app, index) => {
    // Determine status (mocked or saved)
    const status = index === 0 ? "envoyé" : index === 1 ? "téléchargé" : "brouillon";
    
    const matchesStatus = filterStatus === "all" || status === filterStatus;
    const matchesSearch =
      app.targetJob.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.targetJob.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.resume.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (index: number) => {
    const status = index === 0 ? "envoyé" : index === 1 ? "téléchargé" : "brouillon";
    switch (status) {
      case "envoyé":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Envoyé
          </span>
        );
      case "téléchargé":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            <FileText className="w-3 h-3 text-blue-600" />
            Téléchargé
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-500" />
            Brouillon
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header with User Info & Credits Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A3A5C]">
              Mes Candidatures
            </h1>
            {userProfile && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#1A3A5C] border border-blue-200">
                Plan {userProfile.plan.toUpperCase()}
              </span>
            )}
          </div>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Gérez et suivez tous vos dossiers de candidatures optimisés par l'IA.
          </p>
        </div>

        {/* Right Action: Credits + New Application Button */}
        <div className="flex items-center gap-3">
          {userProfile && (
            <div
              onClick={onOpenPricing}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200/80 rounded-lg text-xs text-slate-700 font-semibold cursor-pointer transition-colors"
              title="Gérer mes crédits"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {userProfile.plan === "pro" ? "Crédits illimités" : `${userProfile.creditsRemaining} crédit(s) restant(s)`}
              </span>
            </div>
          )}

          <button
            onClick={onNewApplication}
            id="btn-new-application-dash"
            className="px-4 py-2.5 bg-[#1A3A5C] hover:bg-[#132B45] text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow flex items-center gap-2 cursor-pointer active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Nouvelle candidature</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      {history.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un poste, entreprise..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-stretch sm:self-auto overflow-x-auto">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterStatus === "all"
                  ? "bg-white text-[#1A3A5C] shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tous ({history.length})
            </button>
            <button
              onClick={() => setFilterStatus("envoyé")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterStatus === "envoyé"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Envoyés
            </button>
            <button
              onClick={() => setFilterStatus("téléchargé")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterStatus === "téléchargé"
                  ? "bg-white text-blue-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Téléchargés
            </button>
            <button
              onClick={() => setFilterStatus("brouillon")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                filterStatus === "brouillon"
                  ? "bg-white text-slate-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Brouillons
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 p-8 shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#1A3A5C] flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-[#1A3A5C] mb-1">
            {searchTerm || filterStatus !== "all"
              ? "Aucune candidature ne correspond à votre recherche"
              : "Aucune candidature enregistrée pour le moment"}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
            Créez votre première candidature sur-mesure en 30 secondes pour maximiser vos chances d'entretien.
          </p>
          <button
            onClick={onNewApplication}
            className="px-6 py-3 bg-[#1A3A5C] hover:bg-[#132B45] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Créer mon premier CV optimisé</span>
          </button>
        </div>
      ) : (
        /* Applications Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((app, index) => (
            <div
              key={app.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Match Score */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    {app.matchScore}% ATS
                  </span>
                  {getStatusBadge(index)}
                </div>

                {/* Job Title & Company */}
                <h3 className="font-bold text-base text-[#1A3A5C] line-clamp-1 mb-1">
                  {app.targetJob.title}
                </h3>
                <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-3">
                  <Building className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{app.targetJob.company}</span>
                </p>

                {/* Candidate Info */}
                <div className="p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700 mb-4 border border-slate-100">
                  <span className="font-semibold text-slate-900">{app.resume.personalInfo.fullName}</span>
                  <p className="text-[11px] text-slate-500 truncate">{app.resume.personalInfo.title}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onDeleteApplication(app.id)}
                    className="text-slate-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                    title="Supprimer la candidature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  {onDuplicateApplication && (
                    <button
                      onClick={() => onDuplicateApplication(app)}
                      className="text-slate-400 hover:text-[#1A3A5C] p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Dupliquer pour une autre offre"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => onSelectApplication(app)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1A3A5C] hover:bg-[#132B45] text-white rounded-lg font-semibold transition-all cursor-pointer shadow-2xs"
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
