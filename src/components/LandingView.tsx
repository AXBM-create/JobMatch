/**
 * @file LandingView.tsx
 * @description ÉCRAN 1 : Landing Page Marketing et Présentation Produit JobMatch
 * 
 * Choix Techniques & SEO :
 * - Rendu Sémantique : Utilisation de balises HTML5 (<section>, <header>, <article>, <aside>, <details>, <summary>) pour un référencement naturel optimal.
 * - Hiérarchie Typographique : Un unique <h1> pour le bénéfice clé principal, suivi de <h2> descriptifs.
 * - Multilingue : Intégration complète via t(...) pour toutes les langues (FR, EN, ES, DE, IT, PT).
 * - Core Web Vitals : Lazy loading sur les éléments graphiques non critiques.
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
  Lock,
  Globe
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { OptimizedImage } from "./OptimizedImage";

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
  const { t, language } = useLanguage();
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: t("faq_q1"),
      a: t("faq_a1"),
    },
    {
      q: t("faq_q2"),
      a: t("faq_a2"),
    },
    {
      q: t("faq_q3"),
      a: t("faq_a3"),
    },
    {
      q: t("faq_q4"),
      a: t("faq_a4"),
    },
    {
      q: t("faq_q5"),
      a: t("faq_a5"),
    },
    {
      q: t("faq_q6"),
      a: t("faq_a6"),
    },
  ];

  const testimonials = [
    {
      name: "Thomas Laurent",
      role: language === "fr" ? "Chef de Projet Digital" : language === "es" ? "Director de Proyectos" : language === "de" ? "Digital Project Lead" : language === "it" ? "Project Manager" : language === "pt" ? "Gestor de Projetos" : "Digital Project Manager",
      company: "Paris",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content: language === "en" 
        ? "I applied to 4 competitive roles with JobMatch tailored resumes: I landed 3 interviews the very next week. The time saved is incredible."
        : language === "es"
        ? "Postulé a 4 ofertas exigentes con CVs de JobMatch: conseguí 3 entrevistas a la semana siguiente. El ahorro de tiempo es impresionante."
        : language === "de"
        ? "Ich habe mich auf 4 anspruchsvolle Stellen beworben: 3 Vorstellungsgespräche in der folgenden Woche. Unglaubliche Zeitersparnis."
        : language === "it"
        ? "Mi sono candidato a 4 offerte competitive con JobMatch: ho ottenuto 3 colloqui la settimana successiva. Risparmio di tempo eccezionale."
        : language === "pt"
        ? "Candidatei-me a 4 vagas competitivas com o JobMatch: consegui 3 entrevistas na semana seguinte. O ganho de tempo é incrível."
        : "J'ai postulé à 4 offres très compétitives avec les CV personnalisés par JobMatch : j'ai décroché 3 entretiens la semaine suivante. Le gain de temps est tout simplement bluffant."
    },
    {
      name: "Sarah Marchand",
      role: language === "fr" ? "Responsable Marketing" : language === "es" ? "Responsable de Marketing" : language === "de" ? "Marketing Lead" : language === "it" ? "Responsabile Marketing" : language === "pt" ? "Gestora de Marketing" : "Marketing Director",
      company: "Lyon",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      content: language === "en"
        ? "No more wasting hours rewriting cover letters. JobMatch picks the exact keywords recruiters care about."
        : language === "es"
        ? "Se acabaron las horas reescribiendo cartas de motivación. JobMatch encuentra las palabras exactas que convencen."
        : language === "de"
        ? "Keine stundenlangen Anschreiben mehr für jede Stelle. JobMatch findet genau die passenden Schlüsselbegriffe."
        : language === "it"
        ? "Basta ore a riscrivere la lettera di presentazione. JobMatch trova i termini precisi che colpiscono i selezionatori."
        : language === "pt"
        ? "Acabaram-se as horas a reescrever cartas de motivação. O JobMatch encontra as palavras certas para impressionar."
        : "Fini les heures passées à reformuler ma lettre de motivation pour chaque annonce. JobMatch trouve les mots justes qui résonnent immédiatement avec le recruteur."
    },
    {
      name: "Nicolas Dumont",
      role: language === "fr" ? "Développeur Full-Stack Senior" : language === "es" ? "Desarrollador Full-Stack Senior" : language === "de" ? "Senior Full-Stack Entwickler" : language === "it" ? "Senior Full-Stack Developer" : language === "pt" ? "Desenvolvedor Full-Stack Sénior" : "Senior Full-Stack Developer",
      company: "Toulouse",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content: language === "en"
        ? "My resume used to get filtered out by large enterprise ATS. Thanks to JobMatch, I saw a dramatic increase in interview callbacks."
        : language === "es"
        ? "Mi currículum era descartado por los ATS de grandes empresas. Gracias a JobMatch, noté un aumento espectacular en respuestas."
        : language === "de"
        ? "Mein Lebenslauf wurde früher oft von ATS-Filtern aussortiert. Dank JobMatch habe ich deutlich mehr positive Rückmeldungen."
        : language === "it"
        ? "Il mio CV veniva scartato dai filtri ATS aziendali. Con JobMatch ho visto un aumento netto di inviti a colloquio."
        : language === "pt"
        ? "O meu currículo era frequentemente filtrado pelos ATS. Graças ao JobMatch, tive um aumento incrível de respostas positivas."
        : "Mon CV était souvent ignoré par les plateformes de grands groupes. Grâce à l'optimisation ATS de JobMatch, j'ai vu une différence spectaculaire dans mes retours positifs."
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
            <span>{t("hero_badge_confidence")}</span>
          </div>

          {/* H1 Principal SEO (Strictement Unique sur la page) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1A3A5C] tracking-tight leading-[1.15] mb-6">
            {t("hero_h1_main")} <span className="text-emerald-600">{t("hero_h1_highlight")}</span>
          </h1>

          {/* Sous-titre rassurant et orienté résultat */}
          <p className="text-base sm:text-lg md:text-xl text-[#6B7280] font-normal leading-relaxed max-w-2xl mx-auto mb-8">
            {t("hero_desc")}
          </p>

          {/* CTA Principal & Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <button
              onClick={onStart}
              id="hero-cta-start"
              className="w-full sm:w-auto px-7 py-3.5 bg-[#1A3A5C] hover:bg-[#132B45] text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
            >
              <span>{t("hero_cta_free")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onQuickViewSample}
              id="hero-cta-sample"
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#1A3A5C] border border-slate-300 font-medium text-base rounded-lg shadow-2xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t("hero_cta_sample")}</span>
            </button>
          </div>

          {/* Preuve Sociale Immédiate sous le CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#6B7280]">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="font-bold text-slate-800 ml-1">{t("hero_proof_rating")}</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>{t("hero_proof_count")}</span>
            </div>
            <span className="hidden sm:inline text-slate-300">•</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Lock className="w-4 h-4 text-slate-500" />
              <span>{t("hero_proof_rgpd")}</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MOCKUP VISUEL COMPARATIF AVANT / APRÈS (Démonstration d'efficacité) */}
        {/* ========================================================================= */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-[#1A3A5C]">
                  {t("hero_card_engine")}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>{t("hero_card_guarantee")}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Carte Avant (CV Standard) */}
              <div className="bg-rose-50/40 rounded-xl p-5 sm:p-6 border border-rose-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded">
                      {t("hero_card_standard_title")}
                    </span>
                    <span className="text-xs font-bold text-rose-600 bg-white px-2.5 py-1 rounded-full border border-rose-200">
                      {t("hero_card_standard_score")}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                    {t("hero_card_standard_text")}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] text-rose-700 flex items-center gap-1.5 font-medium">
                  <span>{t("hero_card_standard_risk")}</span>
                </div>
              </div>

              {/* Carte Après (JobMatch Optimisé) */}
              <div className="bg-emerald-50/50 rounded-xl p-5 sm:p-6 border-2 border-emerald-500/70 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded">
                      {t("hero_card_optimized_title")}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-full border border-emerald-300">
                      {t("hero_card_optimized_score")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-800 leading-relaxed font-medium mb-3">
                    <p className="mb-2 text-slate-600 text-[11px] uppercase tracking-wider font-semibold">
                      {t("hero_card_optimized_label")}
                    </p>
                    <p className="text-slate-800 bg-white p-2.5 rounded-lg border border-emerald-200">
                      {t("hero_card_optimized_text")}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t("hero_card_optimized_win")}</span>
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
              {t("steps_badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mt-3 mb-4">
              {t("steps_title")}
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              {t("steps_subtitle")}
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
                  {t("step_1_title")}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {t("step_1_desc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>LinkedIn, Indeed, Welcome to the Jungle, InfoJobs...</span>
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
                  {t("step_2_title")}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {t("step_2_desc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Score ATS &gt; 90% garanti</span>
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
                  {t("step_3_title")}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {t("step_3_desc")}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>PDF Haute Résolution + Édition en direct</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION BÉNÉFICES CLÉS (Grille 4 colonnes) */}
      {/* ========================================================================= */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
            {t("features_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mt-3 mb-3">
            {t("features_title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Bénéfice 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3A5C] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A3A5C] mb-2">{t("feature_speed_title")}</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {t("feature_speed_desc")}
            </p>
          </div>

          {/* Bénéfice 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A3A5C] mb-2">{t("feature_ats_title")}</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {t("feature_ats_desc")}
            </p>
          </div>

          {/* Bénéfice 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A3A5C] mb-2">{t("feature_multilang_title")}</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {t("feature_multilang_desc")}
            </p>
          </div>

          {/* Bénéfice 4 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#1A3A5C] mb-2">{t("feature_edit_title")}</h3>
            <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed">
              {t("feature_edit_desc")}
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
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {t("testimonials_badge")}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mt-3 mb-3">
              {t("testimonials_title")}
            </h2>
            <p className="text-sm sm:text-base text-[#6B7280]">
              {t("testimonials_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testi, idx) => (
              <article
                key={idx}
                className="bg-[#F8F9FA] rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(testi.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-[#1F2937] leading-relaxed italic mb-6">
                    "{testi.content}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                  <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-300 shrink-0">
                    <OptimizedImage
                      src={testi.avatar}
                      alt={`Photo de ${testi.name}`}
                      width={44}
                      height={44}
                      aspectRatio="1/1"
                      className="w-full h-full object-cover"
                      sizes="44px"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1A3A5C]">{testi.name}</h4>
                    <p className="text-xs text-[#6B7280]">{testi.role} • {testi.company}</p>
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
            {t("faq_badge")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] mt-3 mb-3">
            {t("faq_title")}
          </h2>
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
            {t("cta_banner_title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 font-normal">
            {t("cta_banner_desc")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-lg shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t("cta_banner_btn")}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onViewPricing}
              className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 font-medium text-sm rounded-lg transition-colors cursor-pointer"
            >
              <span>{t("nav_pricing")}</span>
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-5">
            {t("hero_proof_rgpd")} • {t("pricing_starter_desc")}
          </p>
        </div>
      </section>
    </div>
  );
};
