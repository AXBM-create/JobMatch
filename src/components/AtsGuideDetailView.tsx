import React from 'react';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Building, BookOpen } from 'lucide-react';
import { AtsSystemData } from '../data/seoProgrammaticData';
import { Breadcrumbs } from './Breadcrumbs';

interface AtsGuideDetailViewProps {
  guide: AtsSystemData;
  onBack: () => void;
  onStartForAts: () => void;
  onNavigateHome?: () => void;
}

export const AtsGuideDetailView: React.FC<AtsGuideDetailViewProps> = ({
  guide,
  onBack,
  onStartForAts,
  onNavigateHome,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Breadcrumb Navigation with Schema.org JSON-LD */}
      <Breadcrumbs
        items={[
          { name: "Accueil", url: "/", onClick: onNavigateHome },
          { name: "Guides ATS & CV", url: "/guides", onClick: onBack },
          { name: `Filtre ATS ${guide.name}`, url: `/ats/${guide.slug}` },
        ]}
        className="mb-6 px-0 py-0"
      />

      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#1A3A5C] mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux guides</span>
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-10">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>Décryptage Algorithmique {guide.name}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C] tracking-tight mb-4">
          Comment passer le filtre ATS {guide.name} ?
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
          {guide.name} est l'un des logiciels de recrutement les plus utilisés au monde ({guide.marketShare}). 
          Il filtre automatiquement les candidatures avant même qu'un recruteur humain ne consulte le profil chez des entreprises comme {guide.typicalCompanies.join(", ")}.
        </p>

        {/* Règles de filtrage */}
        <div className="my-8">
          <h2 className="text-xl font-bold text-[#1A3A5C] mb-4">
            1. Comment {guide.name} analyse votre CV
          </h2>
          <div className="space-y-3">
            {guide.mainFilters.map((filter, index) => (
              <div key={index} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{filter}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations */}
        <div className="my-8">
          <h2 className="text-xl font-bold text-[#1A3A5C] mb-4">
            2. Recommandations clés pour maximiser votre score
          </h2>
          <div className="space-y-3">
            {guide.keyRecommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80 text-xs sm:text-sm text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mots clés recommandés */}
        <div className="my-8">
          <h2 className="text-xl font-bold text-[#1A3A5C] mb-4">
            3. Mots-clés fréquemment indexés par {guide.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {guide.atsKeywordsToInclude.map((kw, index) => (
              <span key={index} className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-800 rounded-lg border border-slate-200">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 p-6 bg-[#1A3A5C] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Créez un CV certifié compatible {guide.name}</h3>
            <p className="text-xs text-slate-300 mt-1">Générez votre CV adapté à l'offre en 30 secondes avec JobMatch.</p>
          </div>
          <button
            onClick={onStartForAts}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer shrink-0 shadow-md"
          >
            <span>Créer mon CV optimisé</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
