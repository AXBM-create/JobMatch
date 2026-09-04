/**
 * @file PillarGuideView.tsx
 * @description Page Pilier du Cocon Sémantique SEO :
 * "Guide complet : optimiser son CV pour les ATS en 2026"
 * Contenu exhaustif (> 1500 mots), structuré H2/H3, tables, callouts,
 * double CTA (/onboarding) et maillage interne vers les 3 pages satellites.
 */

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Calendar,
  Share2,
  ChevronDown,
  ChevronUp,
  Bookmark,
  ArrowLeft,
  Check,
  Zap,
  Code2,
  Briefcase,
  HeartPulse,
  ExternalLink,
  ShieldCheck,
  Layers,
  Award
} from "lucide-react";
import { PILLAR_PAGE_DATA, SATELLITE_PAGES_DATA } from "../data/semanticClusterData";
import { SITE_URL } from "../seo/metadata";
import { Breadcrumbs } from "./Breadcrumbs";

interface PillarGuideViewProps {
  onNavigateHome: () => void;
  onStartOnboarding: () => void;
  onNavigateSatellite: (route: string) => void;
}

export const PillarGuideView: React.FC<PillarGuideViewProps> = ({
  onNavigateHome,
  onStartOnboarding,
  onNavigateSatellite,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${SITE_URL}/guide-cv-ats`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Schema.org Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": PILLAR_PAGE_DATA.h1,
            "name": PILLAR_PAGE_DATA.metaTitle,
            "description": PILLAR_PAGE_DATA.metaDescription,
            "datePublished": "2026-03-01T08:00:00+01:00",
            "dateModified": "2026-03-01T08:00:00+01:00",
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
              "@id": `${SITE_URL}/guide-cv-ats`
            },
            "wordCount": "1850",
            "inLanguage": "fr-FR"
          })
        }}
      />

      {/* Hero / Header Section */}
      <header className="w-full bg-white border-b border-slate-200/90 pt-8 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation with Schema.org JSON-LD */}
          <Breadcrumbs
            items={[
              { name: "Accueil", url: "/", onClick: onNavigateHome },
              { name: "Guides ATS", url: "/guides" },
              { name: "Guide complet CV ATS 2026", url: "/guide-cv-ats" },
            ]}
            className="mb-6 px-0 py-0"
          />

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Dossier Référence 2026
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              {PILLAR_PAGE_DATA.readingTime}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              Mise à jour : Mars 2026
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <FileText className="w-3.5 h-3.5" />
              {PILLAR_PAGE_DATA.wordCount}
            </span>
          </div>

          {/* Unique H1 */}
          <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {PILLAR_PAGE_DATA.h1}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
            Pourquoi plus de 75% des candidatures sont éliminées par les logiciels de recrutement avant toute lecture humaine ? Découvrez les critères algorithmiques précis, les pièges de mise en page à bannir et la méthode pas à pas pour propulser votre CV en tête de sélection.
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={PILLAR_PAGE_DATA.author.avatar}
                alt={`${PILLAR_PAGE_DATA.author.name}, ${PILLAR_PAGE_DATA.author.role} chez JobMatch`}
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <p className="text-sm font-bold text-slate-900">{PILLAR_PAGE_DATA.author.name}</p>
                <p className="text-xs text-slate-500">{PILLAR_PAGE_DATA.author.role}</p>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              title="Copier le lien du guide"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? "Lien copié !" : "Partager l'article"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-10">
        {/* Key Takeaways Box */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-emerald-950">
              Les 5 points clés à retenir en 2026
            </h2>
          </div>
          <ul className="space-y-2.5">
            {PILLAR_PAGE_DATA.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sommaire / Quick Jump */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            Sommaire du dossier
          </h2>
          <nav aria-label="Sommaire de l'article" className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {PILLAR_PAGE_DATA.sections.map((section, idx) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-slate-700 hover:text-emerald-700 hover:underline py-1 flex items-center gap-2 transition-colors"
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{section.title.replace(/^\d+\.\s*/, "")}</span>
              </a>
            ))}
            <a
              href="#faq-ats"
              className="text-slate-700 hover:text-emerald-700 hover:underline py-1 flex items-center gap-2 transition-colors sm:col-span-2"
            >
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center shrink-0">
                ?
              </span>
              <span>Foire aux questions (FAQ) sur les filtres ATS</span>
            </a>
          </nav>
        </div>

        {/* Article Body */}
        <article className="prose prose-slate max-w-none space-y-12">
          {/* Section 1 : Définition ATS */}
          <section id={PILLAR_PAGE_DATA.sections[0].id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {PILLAR_PAGE_DATA.sections[0].title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {PILLAR_PAGE_DATA.sections[0].content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {PILLAR_PAGE_DATA.sections[0].callout && (
              <aside className="my-6 p-5 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-amber-950 mb-1">
                    {PILLAR_PAGE_DATA.sections[0].callout.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                    {PILLAR_PAGE_DATA.sections[0].callout.text}
                  </p>
                </div>
              </aside>
            )}
          </section>

          {/* Section 2 : Fonctionnement du filtrage */}
          <section id={PILLAR_PAGE_DATA.sections[1].id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {PILLAR_PAGE_DATA.sections[1].title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {PILLAR_PAGE_DATA.sections[1].content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {PILLAR_PAGE_DATA.sections[1].subsections?.map((sub, sIdx) => (
              <div key={sIdx} className="mt-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="text-base font-bold text-slate-900 mb-2">{sub.title}</h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {sub.content.map((sp, pIdx) => (
                    <p key={pIdx}>{sp}</p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Section 3 : Les 7 erreurs éliminatoires */}
          <section id={PILLAR_PAGE_DATA.sections[2].id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {PILLAR_PAGE_DATA.sections[2].title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {PILLAR_PAGE_DATA.sections[2].content[0]}
            </p>

            {PILLAR_PAGE_DATA.sections[2].table && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-6">
                <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                  <thead className="bg-slate-100 text-slate-900 border-b border-slate-200">
                    <tr>
                      {PILLAR_PAGE_DATA.sections[2].table.headers.map((h, i) => (
                        <th key={i} className="p-3.5 font-bold">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PILLAR_PAGE_DATA.sections[2].table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                        <td className="p-3.5 font-semibold text-rose-700 align-top">{row[0]}</td>
                        <td className="p-3.5 text-slate-600 align-top">{row[1]}</td>
                        <td className="p-3.5 font-medium text-emerald-800 bg-emerald-50/40 align-top">{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* ======================================================== */}
          {/* CTA INTERMÉDIAIRE (Milieu de l'article vers /onboarding) */}
          {/* ======================================================== */}
          <div className="my-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1A3A5C] to-[#0E243A] text-white shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800">
                  <Zap className="w-3 h-3" /> Diagnostic Immédiat
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Votre CV actuel passe-t-il les filtres ATS ?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                  Ne laissez pas un robot rejeter vos candidatures. Importez votre offre d'emploi et votre CV dans JobMatch pour générer une version conforme à +90% en 30 secondes.
                </p>
              </div>
              <button
                onClick={onStartOnboarding}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 transition-all cursor-pointer shrink-0"
              >
                <span>Optimiser mon CV gratuitement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section 4 : Structure infaillible */}
          <section id={PILLAR_PAGE_DATA.sections[3].id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {PILLAR_PAGE_DATA.sections[3].title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {PILLAR_PAGE_DATA.sections[3].content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {PILLAR_PAGE_DATA.sections[3].subsections?.map((sub, sIdx) => (
                <div key={sIdx} className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">{sub.title}</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sub.content.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 : Le rôle de l'IA */}
          <section id={PILLAR_PAGE_DATA.sections[4].id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              {PILLAR_PAGE_DATA.sections[4].title}
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {PILLAR_PAGE_DATA.sections[4].content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {PILLAR_PAGE_DATA.sections[4].callout && (
              <aside className="my-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-4">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-emerald-950 mb-1">
                    {PILLAR_PAGE_DATA.sections[4].callout.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
                    {PILLAR_PAGE_DATA.sections[4].callout.text}
                  </p>
                </div>
              </aside>
            )}
          </section>

          {/* ======================================================== */}
          {/* Section 6 : Cocon Sémantique (Liens vers Satellites)     */}
          {/* ======================================================== */}
          <section id={PILLAR_PAGE_DATA.sections[5].id} className="scroll-mt-24 pt-6 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">
              {PILLAR_PAGE_DATA.sections[5].title}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {PILLAR_PAGE_DATA.sections[5].content[0]}
            </p>

            <div className="grid sm:grid-cols-3 gap-5">
              {/* Satellite 1: Développeur */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                    Tech & Dev
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">
                    CV Développeur & Tech par IA
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Formatage de stack technique, valorisation GitHub, gestion des frameworks et scoring ATS Greenhouse et Lever.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateSatellite(SATELLITE_PAGES_DATA.developpeur.route)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 cursor-pointer pt-3 border-t border-slate-100"
                >
                  <span>Lire le guide développeur</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Satellite 2: Commercial */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                    Vente & Business
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">
                    CV Commercial & Business Developer
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Quantification des quotas (ARR, MRR), intégration des CRM Salesforce et méthodologies de closing MEDDIC.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateSatellite(SATELLITE_PAGES_DATA.commercial.route)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer pt-3 border-t border-slate-100"
                >
                  <span>Lire le guide commercial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Satellite 3: Santé */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Santé & Médical
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">
                    CV Métiers de la Santé & Soins
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Diplômes d'État, numéros RPPS/ADELI, protocoles hospitaliers, outils DPI et conformité de recrutement CHU.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateSatellite(SATELLITE_PAGES_DATA.sante.route)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer pt-3 border-t border-slate-100"
                >
                  <span>Lire le guide santé</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* Section FAQ */}
          <section id="faq-ats" className="scroll-mt-24 pt-6 border-t border-slate-200">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              Foire aux questions : Tout comprendre sur les filtres ATS
            </h2>
            <div className="space-y-3">
              {PILLAR_PAGE_DATA.faq.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl bg-white overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-900 hover:text-emerald-700 cursor-pointer"
                  >
                    <span className="text-sm">{item.q}</span>
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
            </div>
          </section>
        </article>

        {/* ======================================================== */}
        {/* CTA FINAL (Fin de l'article vers /onboarding)           */}
        {/* ======================================================== */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-white border-2 border-emerald-500/30 shadow-xl text-center space-y-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Passez les filtres ATS dès votre prochaine candidature
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Rejoignez plus de 14 800 candidats qui ont débloqué 3x plus d'entretiens grâce à la personnalisation assistée par IA de JobMatch. Essai gratuit, sans carte bancaire requise.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg hover:shadow-emerald-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Créer mon CV ATS en 30s</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
            >
              Découvrir la page d'accueil
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Note de satisfaction : 4.9/5 basée sur plus de 14 800 avis vérifiés.
          </p>
        </div>
      </div>
    </div>
  );
};
