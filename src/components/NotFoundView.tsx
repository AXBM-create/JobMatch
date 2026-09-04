import React, { useEffect } from "react";
import { ArrowLeft, BookOpen, Compass, FileText, Home, Sparkles, AlertCircle } from "lucide-react";
import { Breadcrumbs } from "./Breadcrumbs";
import { updateDOMMetaTags, SITE_URL } from "../seo/metadata";

interface NotFoundViewProps {
  onNavigateHome: () => void;
  onNavigatePillar: () => void;
  onNavigatePricing: () => void;
  onNavigateOnboarding: () => void;
  onNavigateSatellite?: (route: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({
  onNavigateHome,
  onNavigatePillar,
  onNavigatePricing,
  onNavigateOnboarding,
  onNavigateSatellite,
}) => {
  useEffect(() => {
    // Set noindex on 404 page to prevent soft-404 penalties
    updateDOMMetaTags({
      title: "Page introuvable (404) — JobMatch",
      description: "La page demandée n'existe pas ou a été déplacée. Retrouvez nos outils et guides d'optimisation de CV ATS sur JobMatch.",
      keywords: ["404", "page introuvable", "jobmatch"],
      canonicalUrl: `${SITE_URL}/404`,
      ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=630&fit=crop&q=80",
      robots: "noindex, follow",
    });
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center">
      <Breadcrumbs
        items={[
          { name: "Accueil", url: "/", onClick: onNavigateHome },
          { name: "Page introuvable (404)", url: "/404" },
        ]}
        className="mb-8 px-0 py-0"
      />

      <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 mx-auto mb-6 shadow-xs">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 w-fit mx-auto mb-3">
        Erreur 404 • Destination introuvable
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1A3A5C] tracking-tight mb-4">
        Oups, cette page semble introuvable
      </h1>

      <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
        L'adresse saisie est peut-être incorrecte ou la page a été déplacée. Rassurez-vous, nos outils d'optimisation de CV et nos guides ATS sont toujours accessibles ci-dessous.
      </p>

      {/* Primary Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1A3A5C] hover:bg-[#132c46] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
        >
          <Home className="w-4 h-4" />
          <span>Retour à l'accueil</span>
        </button>

        <button
          onClick={onNavigatePillar}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
        >
          <BookOpen className="w-4 h-4" />
          <span>Consulter le Guide complet CV ATS</span>
        </button>

        <button
          onClick={onNavigateOnboarding}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Créer mon CV par IA</span>
        </button>
      </div>

      {/* Suggested Helpful Sections */}
      <div className="pt-10 border-t border-slate-200 text-left">
        <h2 className="text-sm font-bold text-slate-900 mb-4 text-center">
          Pages populaires et ressources recommandées :
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={onNavigatePillar}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="font-bold text-sm text-[#1A3A5C] group-hover:text-emerald-700 mb-1 flex items-center justify-between">
              <span>Guide Pilier ATS 2026</span>
              <BookOpen className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">
              Règles d'or pour passer tous les logiciels de recrutement (Workday, Taleo, etc.).
            </p>
          </div>

          <div
            onClick={() => onNavigateSatellite && onNavigateSatellite("/cv-developpeur")}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="font-bold text-sm text-[#1A3A5C] group-hover:text-emerald-700 mb-1 flex items-center justify-between">
              <span>Modèles CV par Métier</span>
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">
              Conseils ciblés pour Développeurs, Commerciaux et Métiers de la Santé.
            </p>
          </div>

          <div
            onClick={onNavigatePricing}
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="font-bold text-sm text-[#1A3A5C] group-hover:text-emerald-700 mb-1 flex items-center justify-between">
              <span>Formules & Tarifs</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500">
              Génération illimitée, score de matching et export Word/PDF instantané.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
