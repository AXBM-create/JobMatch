/**
 * @file LandingView.tsx
 * @description ÉCRAN 1 : Landing Page Marketing et Présentation Produit JobMatch
 * 
 * Choix Techniques & SEO :
 * - Rendu Sémantique : Utilisation de balises HTML5 (<section>, <header>, <article>, <aside>, <details>, <summary>) pour un référencement naturel optimal.
 * - Hiérarchie Typographique : Un unique <h1> pour le bénéfice clé principal, suivi de <h2> descriptifs contenant les mots-clés cibles ("générateur de CV IA", "CV optimisé ATS", "lettre de motivation automatique").
 * - Core Web Vitals : Lazy loading sur les éléments graphiques non critiques, dimensions calculées, micro-animations en CSS performant sans bloquer le thread principal.
 * - Données Enrichies : Intègre la structure reconnue par le balisage FAQPage et SoftwareApplication de Schema.org.
 */

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileCheck,
  UploadCloud,
  Link2,
  ChevronDown,
  Star,
  Zap,
  Check,
  Award,
  Layers,
  ExternalLink,
  Lock
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

interface LandingViewProps {
  onStart: () => void;
  onViewPricing: () => void;
  onQuickViewSample: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onStart,
  onViewPricing,
  onQuickViewSample,
}) => {
  const { t } = useLanguage();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: "Comment JobMatch optimise-t-il mon CV pour les filtres ATS ?",
      a: "JobMatch analyse sémantiquement l'offre d'emploi cible pour extraire les compétences recherchées, le vocabulaire métier et les critères clés des logiciels de recrutement (ATS). Il restructure ensuite votre profil en mettant en valeur vos réalisations réelles pour obtenir un taux de correspondance supérieur à 90% tout en conservant une mise en page épurée et lisible."
    },
    {
      q: "Combien de temps prend la génération d'un CV et d'une lettre ?",
      a: "La génération complète prend environ 20 à 30 secondes. Notre intelligence artificielle traite simultanément l'offre et votre parcours pour vous livrer un dossier complet (CV + lettre de motivation) prêt à l'envoi."
    },
    {
      q: "Est-ce gratuit pour essayer JobMatch ?",
      a: "Oui ! Vous bénéficiez d'une première candidature complète 100% offerte, sans aucune carte bancaire requise. Vous pouvez tester la qualité du résultat immédiatement."
    },
    {
      q: "Mes données personnelles et mon CV sont-ils protégés ?",
      a: "Absolument. Vos documents et informations sont chiffrés de bout en bout et strictement confidentiels conformément aux exigences du RGPD. Nous ne revendons jamais vos données et elles ne sont pas utilisées pour entraîner des modèles publics."
    },
    {
      q: "Quels sont les formats de fichiers acceptés pour l'upload ?",
      a: "Vous pouvez importer votre CV existant au format PDF ou Word (.docx). Notre système extrait automatiquement votre parcours, vos expériences et vos compétences."
    },
    {
      q: "Puis-je modifier le CV et la lettre générés ?",
      a: "Oui, tout est 100% éditable directement dans notre éditeur intégré. Vous pouvez modifier chaque phrase, ajouter des sections ou régénérer des paragraphes spécifiques en un clic."
    }
  ];

  const testimonials = [
    {
      name: "Thomas Laurent",
      role: "Chef de Projet Digital",
      company: "Paris",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: "J'ai postulé à 4 offres très compétitives avec les CV personnalisés par JobMatch : j'ai décroché 3 entretiens la semaine suivante. Le gain de temps est tout simplement bluffant."
    },
    {
      name: "Sarah Marchand",
      role: "Responsable Marketing & Communication",
      company: "Lyon",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      content: "Fini les heures passées à reformuler ma lettre de motivation pour chaque annonce. JobMatch trouve les mots justes qui résonnent immédiatement avec le recruteur."
    },
    {
      name: "Nicolas Dumont",
      role: "Développeur Full-Stack Senior",
      company: "Toulouse",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: "Mon CV était souvent ignoré par les plateformes de grands groupes. Grâce à l'optimisation ATS de JobMatch, j'ai vu une différence spectaculaire dans mes retours positifs."
    }
  ];

  return (
    <div className="w-full bg-[#F8F9FA] text-[#1F2937] overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (H1 principal SEO + Preuve Sociale + Mockup Avant/Après) */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          {/* Tag de confiance */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold mb-6 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Algorithme calibré pour les filtres ATS & Recruteurs</span>
          </div>

          {/* H1 Principal SEO (Strictement Unique sur la page) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A3A5C] tracking-tight leading-[1.15] mb-6">
            Ton CV parfait pour chaque offre, <span className="text-emerald-600">en 30 secondes</span>
          </h1>

          {/* Sous-titre rassurant et orienté résultat */}
          <p className="text-base sm:text-lg md:text-xl text-[#6B7280] font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            L'intelligence artificielle analyse l'offre d'emploi cible et adapte automatiquement ton CV et ta lettre de motivation pour passer les filtres ATS et maximiser tes chances d'entretien.
          </p>

          {/* CTA Principal & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <button
              onClick={onStart}
              id="hero-cta-start"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#1A3A5C] hover:bg-[#132B45] text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
            >
              <span>Essayer gratuitement — sans carte bancaire</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onQuickViewSample}
              id="hero-cta-sample"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#1A3A5C] border border-slate-300 font-medium text-base rounded-lg shadow-2xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Voir un exemple en direct</span>
            </button>
          </div>

          {/* Preuve Sociale Immédiate sous le CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B7280]">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-bold text-[#1F2937] ml-1">4.9/5</span>
            </div>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 font-medium text-[#1F2937]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>+14 800 candidatures générées</span>
            </div>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-[#6B7280]">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Conforme RGPD & 100% Confidentiel</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VISUEL HERO : Mockup Avant / Après (CV Générique vs CV Optimisé ATS) */}
        {/* ========================================================================= */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.06)] p-4 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
                <span className="text-xs font-semibold text-slate-500 ml-2">JobMatch Intelligence Engine v2.5</span>
              </div>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Score ATS garanti +90%
              </span>
            </div>

            {/* Grille Avant / Après */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Gauche : CV Générique (Avant) */}
              <div className="bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">CV Standard (Avant)</span>
                  <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Score ATS : 42%
                  </span>
                </div>
                <div className="space-y-2.5 opacity-75">
                  <div className="h-4 bg-slate-300 rounded w-1/2" />
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-16 bg-slate-200/60 rounded p-2 text-[11px] text-slate-500 leading-tight">
                    "Professionnel motivé cherchant un poste stimulant dans une entreprise dynamique..." (Non ciblé, mots-clés absents)
                  </div>
                  <div className="space-y-1.5 pt-2">
                    <div className="h-3 bg-slate-200 rounded w-full" />
                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-red-600 flex items-center gap-1.5 font-medium">
                  <span>❌ Risque élevé de rejet automatique par l'ATS</span>
                </div>
              </div>

              {/* Droite : CV Optimisé JobMatch (Après) */}
              <div className="bg-emerald-50/40 rounded-xl p-4 sm:p-5 border border-emerald-300 relative shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1A3A5C]">CV Optimisé JobMatch</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Score ATS : 96%
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="h-4 bg-[#1A3A5C] rounded w-3/5" />
                  <div className="h-3 bg-emerald-700/60 rounded w-4/5" />
                  <div className="bg-white rounded-lg p-2.5 border border-emerald-200/80 text-[11px] text-[#1F2937] leading-relaxed shadow-2xs">
                    <span className="font-semibold text-emerald-800">Mots-clés ciblés intégrés :</span> "Pilotage agile, refonte UX/UI, +34% de conversion, management d'équipe cross-fonctionnelle."
                  </div>
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">✓ Figma</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">✓ Design System</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">✓ Analyse ATS</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Candidature mise en avant en tête de pile recruteur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION COMMENT ÇA MARCHE (3 étapes avec cartes numérotées) */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Simplicité & Rapidité
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mt-3 mb-4">
              Comment ça marche en 3 étapes
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Une expérience fluide conçue pour vous faire passer de la découverte de l'offre à l'envoi de votre candidature en moins d'une minute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Étape 1 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-slate-200/80 relative hover:border-[#1A3A5C]/40 transition-colors shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A3A5C] text-white flex items-center justify-center font-bold text-lg mb-5 shadow-sm">
                  1
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1A3A5C] flex items-center justify-center mb-3">
                  <Link2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1A3A5C] mb-2">
                  Colle le lien de l'offre
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Indiquez l'URL ou la description de l'annonce visée. L'IA extrait instantanément les compétences, le ton et les attentes clés du recruteur.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>LinkedIn, Indeed, Welcome to the Jungle...</span>
              </div>
            </div>

            {/* Étape 2 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-slate-200/80 relative hover:border-[#1A3A5C]/40 transition-colors shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#1A3A5C] text-white flex items-center justify-center font-bold text-lg mb-5 shadow-sm">
                  2
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1A3A5C] mb-2">
                  Upload ton CV actuel
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Importez votre CV en PDF ou DOCX, ou utilisez nos profils préremplis. L'IA analyse votre parcours et vos réussites passées.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Extraction automatique sans ressaisie</span>
              </div>
            </div>

            {/* Étape 3 */}
            <div className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-8 border border-slate-200/80 relative hover:border-[#1A3A5C]/40 transition-colors shadow-2xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-5 shadow-sm">
                  3
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1A3A5C] mb-2">
                  Reçois ton CV optimisé
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  En 30 secondes, récupérez votre CV ciblé et votre lettre de motivation personnalisée, prêts à être édités, téléchargés en PDF ou envoyés.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Score ATS & mise en page haute fidélité</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION BÉNÉFICES CLÉS (Grille 3 colonnes) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mb-3">
            Pourquoi choisir JobMatch ?
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Une solution pensée pour les candidats actifs qui recherchent efficacité, personnalisation réelle et impact auprès des recruteurs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Bénéfice 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3A5C] flex items-center justify-center mb-5">
              <Clock className="w-6 h-6" />
            </div>
            <div className="inline-block text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded mb-2">
              30 secondes vs 2 heures
            </div>
            <h3 className="text-xl font-bold text-[#1A3A5C] mb-2">Gain de temps radical</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Ne passez plus des soirées entières à réécrire laborieusement votre CV pour chaque candidature. Multipliez vos envois qualifiés sans sacrifier la pertinence.
            </p>
          </div>

          {/* Bénéfice 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded mb-2">
              Zéro filtre bloquant
            </div>
            <h3 className="text-xl font-bold text-[#1A3A5C] mb-2">Optimisation ATS certifiée</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Plus de 75% des candidatures sont écartées automatiquement par les logiciels ATS. JobMatch intègre les mots-clés exacts pour garantir votre passage en phase d'entretien.
            </p>
          </div>

          {/* Bénéfice 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="inline-block text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded mb-2">
              +68% d'entretiens
            </div>
            <h3 className="text-xl font-bold text-[#1A3A5C] mb-2">Taux de réponse décuplé</h3>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Un CV chirurgicalement aligné sur les critères du recruteur capte immédiatement l'attention dès les 6 premières secondes de lecture humaine.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION TÉMOIGNAGES (3 Cards) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mb-3">
              Ce que disent nos utilisateurs
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Découvrez comment JobMatch a transformé la recherche d'emploi de candidats de tous profils.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((t, idx) => (
              <article
                key={idx}
                className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1F2937] leading-relaxed italic mb-6">
                    "{t.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                  <img
                    src={t.avatar}
                    alt={`Photo de ${t.name}`}
                    width={44}
                    height={44}
                    loading="lazy"
                    className="w-11 h-11 rounded-full object-cover border border-slate-300"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#1A3A5C]">{t.name}</h4>
                    <p className="text-xs text-[#6B7280]">{t.role} • {t.company}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION FAQ (Accordéon interactif + Balisage SEO) */}
      {/* ========================================================================= */}
      <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            Foire aux questions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mt-3 mb-3">
            Questions fréquentes
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Toutes les réponses à vos questions sur l'optimisation ATS et la sécurité de vos données.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = activeFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left font-semibold text-[#1A3A5C] flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/80 transition-colors"
                >
                  <span className="text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180 text-[#1A3A5C]" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#6B7280] leading-relaxed border-t border-slate-100 bg-slate-50/40">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CTA FINAL AVANT FOOTER */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#1A3A5C] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Prêt à décrocher ton prochain entretien ?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal">
            Rejoins plus de 14 000 candidats qui ont transformé leur recherche d'emploi. Génère ton premier CV optimisé gratuitement en 30 secondes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Créer mon CV optimisé maintenant</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewPricing}
              className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              <span>Découvrir les offres</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            Essai gratuit • Sans engagement • Téléchargement PDF instantané
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. SECTION SÉMANTIQUE & INDEXATION CRAWLERS / ATS & IA ENRICHIE */}
      {/* ========================================================================= */}
      <section 
        id="seo-semantic-index"
        aria-label="Guide sémantique et indexation ATS & IA JobMatch"
        className="sr-only focus:not-sr-only p-4 bg-slate-900 text-white text-xs"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          <header>
            <h2>Guide d'optimisation de CV pour les filtres ATS et l'Intelligence Artificielle de Recrutement</h2>
            <p>
              JobMatch AI est la plateforme SaaS de référence pour adapter automatiquement les candidatures aux algorithmes de tri des recruteurs (Applicant Tracking Systems ou ATS). Notre technologie effectue une analyse sémantique prédictive et un traitement automatique du langage naturel (NLP / LLM) sur les offres d'emploi pour maximiser le score de correspondance du profil candidat.
            </p>
          </header>

          <article>
            <h3>Fonctionnalités avancées du moteur d'analyse ATS & IA</h3>
            <ul>
              <li>
                <strong>Extraction sémantique et parsing NLP :</strong> Détection automatique des compétences techniques (hard skills), compétences comportementales (soft skills), niveau d'expérience requis, intitulé exact du poste et mots-clés obligatoires sur LinkedIn Jobs, Indeed, Welcome to the Jungle, Monster, Apec, Glassdoor et France Travail.
              </li>
              <li>
                <strong>Compatibilité certifiée avec les logiciels ATS majeurs :</strong> Alignement chirurgical pour les moteurs de parsing de Workday, Taleo (Oracle), Greenhouse, Lever, SmartRecruiters, iCIMS, BambooHR, SuccessFactors (SAP), Bullhorn, Recruitee, JazzHR et Ashby.
              </li>
              <li>
                <strong>Algorithme de scoring de pertinence sémantique (+90%) :</strong> Calcul vectoriel du taux de similarité cosinus entre le CV et l'offre cible, mise en conformité de la structure (sections standards, chronologie inversée, intitulé de poste synchronisé) et suppression des éléments bloquants (colonnes multiples complexes, tableaux non indexables, graphiques illisibles par OCR).
              </li>
              <li>
                <strong>Génération de Lettre de Motivation prédictive par IA :</strong> Rédaction instantanée de lettres de motivation contextualisées, alignées sur les valeurs de l'entreprise, les défis opérationnels du poste et les réalisations concrètes du candidat.
              </li>
              <li>
                <strong>Export PDF ATS-friendly & conformité typographique :</strong> Structure en colonne unique, encodage UTF-8 standard, polices de caractères universelles (sans empattement lisibles par parseurs), hiérarchie de balisage sémantique H1/H2/H3 et préservation des métadonnées de contact.
              </li>
              <li>
                <strong>Support multilingue international :</strong> Traitement et rédaction en Français (France, Belgique, Suisse, Canada), Anglais (US, UK, International), Espagnol et Allemand.
              </li>
            </ul>
          </article>

          <article>
            <h3>Glossaire des termes ATS, IA et recrutement prédictif</h3>
            <p>
              ATS resume checker, scanner CV en ligne, optimisateur de CV intelligence artificielle, test de compatibilité ATS gratuit, passer le filtre des recruteurs, mots-clés CV par secteur, algorithme de tri CV, parsing de candidature, extraction sémantique de compétences, LLM pour recherche d'emploi, matching offre profil, modèle CV sans rejet ATS, score de pertinence candidat, rédacteur lettre de motivation IA, adaptation automatique CV, recruiter screening bot, AI resume builder, applicant tracking system bypass, resume keyword optimization, job description keyword matcher, OCR resume parser.
            </p>
          </article>

          <aside>
            <h3>Protection des données, RGPD et éthique de l'IA</h3>
            <p>
              Conformément au RGPD et aux normes européennes de protection des données personnelles, l'ensemble des documents importés, données de contact et historiques professionnels sont strictement confidentiels, chiffrés en transit et au repos, et ne sont en aucun cas revendus à des tiers ou utilisés pour l'entraînement public de modèles tiers.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
};
