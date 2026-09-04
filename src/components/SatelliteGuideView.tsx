/**
 * @file SatelliteGuideView.tsx
 * @description Page Satellite du Cocon Sémantique SEO (600-800 mots) :
 * - CV Développeur (/cv-developpeur)
 * - CV Commercial (/cv-commercial)
 * - CV Santé (/cv-sante)
 * Avec maillage réciproque vers la page pilier (/guide-cv-ats), l'accueil (/),
 * appel à l'action vers (/onboarding), et Schema.org TechArticle.
 */

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Calendar,
  Share2,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Check,
  Zap,
  BookOpen,
  Code2,
  Briefcase,
  HeartPulse,
  Award,
  Layers
} from "lucide-react";
import { SatellitePageData } from "../data/semanticClusterData";
import { SITE_URL } from "../seo/metadata";
import { Breadcrumbs } from "./Breadcrumbs";

interface SatelliteGuideViewProps {
  data: SatellitePageData;
  onNavigateHome: () => void;
  onNavigatePillar: () => void;
  onStartOnboarding: () => void;
}

export const SatelliteGuideView: React.FC<SatelliteGuideViewProps> = ({
  data,
  onNavigateHome,
  onNavigatePillar,
  onStartOnboarding,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${SITE_URL}${data.route}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const renderIcon = () => {
    if (data.slug.includes("developpeur")) return <Code2 className="w-5 h-5" />;
    if (data.slug.includes("commercial")) return <Briefcase className="w-5 h-5" />;
    return <HeartPulse className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Schema.org TechArticle JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": data.h1,
            "name": data.metaTitle,
            "description": data.metaDescription,
            "datePublished": "2026-03-02T09:00:00+01:00",
            "dateModified": "2026-03-02T09:00:00+01:00",
            "author": {
              "@type": "Organization",
              "name": "JobMatch",
              "url": SITE_URL
            },
            "publisher": {
              "@type": "Organization",
              "name": "JobMatch",
              "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/logo.png`
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${SITE_URL}${data.route}`
            },
            "inLanguage": "fr-FR"
          })
        }}
      />

      {/* Hero Header */}
      <header className="w-full bg-white border-b border-slate-200/90 pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs with Schema.org JSON-LD */}
          <Breadcrumbs
            items={[
              { name: "Accueil", url: "/", onClick: onNavigateHome },
              { name: "Guide CV ATS", url: "/guide-cv-ats", onClick: onNavigatePillar },
              { name: data.roleTitle, url: data.route },
            ]}
            className="mb-6 px-0 py-0"
          />

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {renderIcon()}
              {data.badge}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {data.readingTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              Édition 2026
            </span>
          </div>

          {/* Single H1 */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            {data.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            {data.heroSubtitle}
          </p>

          {/* Top Key Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            {data.topStats.map((st, i) => (
              <div key={i} className="text-center">
                <div className="text-lg sm:text-2xl font-black text-emerald-700">{st.value}</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-medium">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        <article className="prose prose-slate max-w-none space-y-10">
          {/* Intro Section */}
          <section className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {data.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>

          {/* Sector Challenges */}
          <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              {data.sectorChallenges.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-4">
              {data.sectorChallenges.description}
            </p>
            <ul className="space-y-2.5">
              {data.sectorChallenges.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Must-have keywords Box */}
          <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">
                Mots-clés et compétences prioritaires scannés par les ATS
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Hard Skills clés</h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.mustHaveKeywords.hardSkills.map((k, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Méthodologies</h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.mustHaveKeywords.methodologies.map((k, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Métriques de preuve</h3>
                <div className="flex flex-wrap gap-1.5">
                  {data.mustHaveKeywords.metrics.map((k, i) => (
                    <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                      {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* JobMatch Solution */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {data.jobmatchSolution.title}
            </h2>
            <p className="text-sm text-slate-600">
              {data.jobmatchSolution.description}
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {data.jobmatchSolution.features.map((f, i) => (
                <div key={i} className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-1.5">
                  <h3 className="text-sm font-bold text-emerald-950">{f.title}</h3>
                  <p className="text-xs text-emerald-900 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Checklist */}
          <section className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              Checklist actionnable pour votre CV en 2026
            </h2>
            <div className="space-y-2.5">
              {data.actionableChecklist.map((it, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                  <span>{it}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section Maillage Interne / Semantic Linking */}
          <section className="p-6 rounded-2xl bg-gradient-to-r from-slate-100 to-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#1A3A5C]" />
              <h2 className="text-base font-bold text-slate-900">
                Poursuivez votre préparation au recrutement
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pour maîtriser l'ensemble des règles de mise en page et les critères algorithmiques communs à tous les logiciels de recrutement, découvrez notre dossier de référence :
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onNavigatePillar}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1A3A5C] hover:bg-[#142e4a] text-white font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Consulter le Guide complet ATS 2026</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors cursor-pointer"
              >
                <span>Retourner à l'accueil JobMatch</span>
              </button>
            </div>
          </section>

          {/* Sector FAQ */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-3">
              Questions fréquentes : CV {data.roleTitle} & ATS
            </h2>
            {data.faq.map((item, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl bg-white overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm">{item.q}</span>
                  {activeFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0 ml-2" />
                  )}
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </section>
        </article>

        {/* CTA Card to /onboarding */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1A3A5C] to-[#0E243A] text-white shadow-xl text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Générez votre CV de {data.roleTitle} optimisé ATS en 30s
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Importez l'offre d'emploi visée : notre IA calibre vos compétences, intègre la nomenclature exacte et maximise vos chances d'entretien.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartOnboarding}
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Commencer maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
