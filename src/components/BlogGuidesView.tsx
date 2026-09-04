import React from 'react';
import { BookOpen, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Briefcase, Sparkles, Clock } from 'lucide-react';
import { ATS_SYSTEMS_DATA, JOB_ROLES_DATA, LONG_TAIL_GUIDES_DATA, AtsSystemData, LongTailGuideData } from '../data/seoProgrammaticData';
import { Breadcrumbs } from './Breadcrumbs';

interface BlogGuidesViewProps {
  onSelectAtsGuide: (guide: AtsSystemData) => void;
  onSelectJobRole: (roleId: string) => void;
  onSelectLongTailGuide: (guide: LongTailGuideData) => void;
  onStartGenerator: () => void;
  onNavigateHome?: () => void;
}

export const BlogGuidesView: React.FC<BlogGuidesViewProps> = ({
  onSelectAtsGuide,
  onSelectJobRole,
  onSelectLongTailGuide,
  onStartGenerator,
  onNavigateHome,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Breadcrumbs with Schema.org JSON-LD */}
      <Breadcrumbs
        items={[
          { name: "Accueil", url: "/", onClick: onNavigateHome },
          { name: "Guides & Ressources ATS", url: "/guides" },
        ]}
        className="mb-6 px-0 py-0"
      />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Centre de Ressources & Guides ATS
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A3A5C] tracking-tight mt-3 mb-3">
          Guides d'Optimisation CV & Décryptage des Logiciels ATS
        </h1>
        <p className="text-sm sm:text-base text-[#6B7280]">
          Découvrez les règles d'or pour déjouer les algorithmes de filtrage automatique des candidatures et maximiser votre taux de conversion en entretien.
        </p>
      </div>

      {/* Section 1 : Articles & Guides Longue Traîne (Nouveau) */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1A3A5C] flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            Guides Pratiques & Articles Essentiels
          </h2>
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">Articles de fond • 500-800+ mots</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LONG_TAIL_GUIDES_DATA.map((guide) => (
            <article
              key={guide.slug}
              onClick={() => onSelectLongTailGuide(guide)}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {guide.category}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {guide.readingTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1A3A5C] transition-colors mb-2.5 line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                  {guide.metaDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 group-hover:text-emerald-700 flex items-center gap-1">
                  Lire l'article
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] text-slate-400 font-medium">Par {guide.author.name}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Section 2 : Décryptage des Logiciels ATS */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-[#1A3A5C] mb-6 flex items-center gap-2.5">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
          Guides par Logiciel de Recrutement (ATS)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ATS_SYSTEMS_DATA.map((ats) => (
            <div
              key={ats.slug}
              onClick={() => onSelectAtsGuide(ats)}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#1A3A5C] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#1A3A5C] bg-slate-100 px-2.5 py-1 rounded-md">
                    {ats.category}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{ats.marketShare}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1A3A5C] transition-colors mb-2">
                  Comment passer le filtre ATS {ats.name} ?
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2">
                  Utilisé par {ats.typicalCompanies.join(", ")}. Découvrez les règles de mise en page et mots-clés requis.
                </p>
              </div>

              <div className="flex items-center text-xs font-bold text-emerald-600 group-hover:translate-x-1 transition-transform">
                <span>Lire le guide complet</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3 : Modèles & Mots-clés par Métier */}
      <div>
        <h2 className="text-2xl font-bold text-[#1A3A5C] mb-6 flex items-center gap-2.5">
          <Briefcase className="w-6 h-6 text-emerald-600" />
          Mots-Clés & Modèles ATS par Métier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {JOB_ROLES_DATA.map((job) => (
            <div
              key={job.slug}
              onClick={() => onSelectJobRole(job.slug)}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-semibold text-emerald-700 mb-2 block">{job.category}</span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-2">
                  CV {job.title}
                </h3>
                <p className="text-xs text-slate-600 mb-3">{job.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {job.topKeywords.slice(0, 3).map((kw, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center text-xs font-semibold text-[#1A3A5C]">
                <span>Générer un CV {job.title}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

