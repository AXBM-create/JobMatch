import React, { useState } from "react";
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  Share2, 
  Check,
  TrendingUp,
  FileText
} from "lucide-react";
import { LongTailGuideData } from "../data/seoProgrammaticData";
import { Breadcrumbs } from "./Breadcrumbs";

interface LongTailGuideDetailViewProps {
  guide: LongTailGuideData;
  onBack: () => void;
  onStartOnboarding: () => void;
  onNavigateHome: () => void;
  onSelectOtherGuide: (slug: string) => void;
}

export const LongTailGuideDetailView: React.FC<LongTailGuideDetailViewProps> = ({
  guide,
  onBack,
  onStartOnboarding,
  onNavigateHome,
  onSelectOtherGuide,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case "stat":
        return <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />;
      case "example":
        return <Sparkles className="w-5 h-5 text-blue-600 shrink-0" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
    }
  };

  const getCalloutStyle = (type: string) => {
    switch (type) {
      case "stat":
        return "bg-emerald-50/70 border-emerald-200 text-emerald-950";
      case "warning":
        return "bg-amber-50/70 border-amber-200 text-amber-950";
      case "example":
        return "bg-blue-50/70 border-blue-200 text-blue-950";
      default:
        return "bg-slate-50 border-slate-200 text-slate-900";
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10" itemScope itemType="https://schema.org/Article">
      {/* Breadcrumb Navigation with Schema.org JSON-LD */}
      <Breadcrumbs
        items={[
          { name: "Accueil", url: "/", onClick: onNavigateHome },
          { name: "Guides ATS & CV", url: "/guides", onClick: onBack },
          { name: guide.title, url: `/guides/${guide.slug}` },
        ]}
        className="mb-6 px-0 py-0"
      />

      {/* Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-[#1A3A5C] mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Retour aux guides & ressources</span>
      </button>

      {/* Main Article Container */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 md:p-12 shadow-2xs">
        {/* Article Metadata Header */}
        <header className="mb-8 border-b border-slate-100 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
              {guide.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {guide.readingTime}
              </span>
              <button
                type="button"
                onClick={handleShare}
                className="flex items-center gap-1.5 hover:text-slate-800 transition-colors cursor-pointer"
                title="Copier le lien de l'article"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? "Lien copié !" : "Partager"}</span>
              </button>
            </div>
          </div>

          {/* H1 SEO Longue Traîne Principal */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A5C] tracking-tight leading-tight mb-5" itemProp="headline">
            {guide.title}
          </h1>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-2">
            <img
              src={guide.author.avatar}
              alt={`${guide.author.name}, ${guide.author.role} - Auteur JobMatch`}
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
              referrerPolicy="no-referrer"
              itemProp="image"
            />
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900" itemProp="author">
                {guide.author.name}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">{guide.author.role} • Publié le {guide.publishedDate}</div>
            </div>
          </div>
        </header>

        {/* Introduction */}
        <div className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed mb-8 bg-slate-50/60 p-5 sm:p-6 rounded-2xl border border-slate-100 italic" itemProp="description">
          "{guide.intro}"
        </div>

        {/* Key Takeaways Box */}
        <div className="mb-10 p-6 rounded-2xl bg-emerald-50/50 border border-emerald-200/80">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-2 mb-3.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Points clés à retenir
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-950">
            {guide.keyTakeaways.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Interactive Mid-Article High-CTR CTA Banner */}
        <div className="mb-12 p-6 bg-linear-to-br from-[#1A3A5C] to-[#0E243A] text-white rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Outil Gratuit</span>
            <h3 className="text-base sm:text-lg font-bold">Vérifiez et optimisez votre CV pour l'ATS en 30 secondes</h3>
            <p className="text-xs text-slate-300">Testez le score de correspondance de votre CV avec votre offre d'emploi cible.</p>
          </div>
          <button
            type="button"
            onClick={onStartOnboarding}
            className="w-full sm:w-auto px-5 py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <span>Tester mon CV gratuitement</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Article Core Sections */}
        <div className="space-y-10 text-slate-800 leading-relaxed" itemProp="articleBody">
          {guide.sections.map((section, sIndex) => (
            <section key={sIndex} className="scroll-mt-16">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1A3A5C] mb-4 pb-2 border-b border-slate-100">
                {section.title}
              </h2>
              
              <div className="space-y-3.5 text-sm sm:text-base text-slate-700">
                {section.content.map((p, pIndex) => (
                  <p key={pIndex}>{p}</p>
                ))}
              </div>

              {/* Callout Box if present */}
              {section.callout && (
                <div className={`my-5 p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${getCalloutStyle(section.callout.type)}`}>
                  {getCalloutIcon(section.callout.type)}
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold mb-1">{section.callout.title}</h4>
                    <p className="text-xs sm:text-sm whitespace-pre-line leading-relaxed opacity-90">{section.callout.text}</p>
                  </div>
                </div>
              )}

              {/* Data / Comparison Table if present */}
              {section.table && (
                <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 text-[#1A3A5C] font-bold border-b border-slate-200">
                      <tr>
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 sm:p-3.5 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className={`p-3 sm:p-3.5 ${cIdx === 0 ? "font-semibold text-slate-900" : "text-slate-700"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Section FAQ Interactive & Microdonnées */}
        {guide.faq && guide.faq.length > 0 && (
          <section className="mt-14 pt-10 border-t border-slate-200" itemScope itemType="https://schema.org/FAQPage">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-[#1A3A5C]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#1A3A5C]">Questions fréquentes sur ce sujet</h3>
            </div>
            
            <div className="space-y-3">
              {guide.faq.map((item, fIdx) => {
                const isOpen = openFaqIndex === fIdx;
                return (
                  <div
                    key={fIdx}
                    className="bg-slate-50/80 rounded-xl border border-slate-200 overflow-hidden"
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                      className="w-full px-5 py-4 text-left font-semibold text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/80 transition-colors"
                    >
                      <span className="text-sm sm:text-base" itemProp="name">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? "transform rotate-180 text-[#1A3A5C]" : ""}`} />
                    </button>
                    {isOpen && (
                      <div
                        className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white"
                        itemScope
                        itemProp="acceptedAnswer"
                        itemType="https://schema.org/Answer"
                      >
                        <p itemProp="text">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Internal Link & Conversion Footer Banner */}
        <div className="mt-12 p-8 bg-slate-900 text-white rounded-2xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700/60 text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Score ATS Garanti +90%</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Prêt à décrocher 3x plus d'entretiens ?</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Ne laissez plus les logiciels de recrutement bloquer votre carrière. Générez votre CV et votre lettre de motivation sur-mesure pour votre prochaine offre dès maintenant.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onStartOnboarding}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Créer mon dossier gratuit (en 30s)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onNavigateHome}
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm rounded-xl transition-all cursor-pointer"
            >
              En savoir plus sur JobMatch
            </button>
          </div>
        </div>

        {/* Other Recommended Guides */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Autres guides recommandés</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guide.slug !== "comment-passer-les-filtres-ats" && (
              <button
                type="button"
                onClick={() => onSelectOtherGuide("comment-passer-les-filtres-ats")}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-left transition-all group cursor-pointer"
              >
                <span className="text-xs font-semibold text-emerald-700 block mb-1">Guide Pratique</span>
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#1A3A5C] transition-colors block">
                  Comment passer les filtres ATS en 2026 →
                </span>
              </button>
            )}
            {guide.slug !== "exemple-de-cv-optimise-ia" && (
              <button
                type="button"
                onClick={() => onSelectOtherGuide("exemple-de-cv-optimise-ia")}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-left transition-all group cursor-pointer"
              >
                <span className="text-xs font-semibold text-emerald-700 block mb-1">Étude de Cas</span>
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#1A3A5C] transition-colors block">
                  Exemple de CV optimisé par l'IA : Avant / Après →
                </span>
              </button>
            )}
            {guide.slug !== "lettre-de-motivation-automatique-gratuite" && (
              <button
                type="button"
                onClick={() => onSelectOtherGuide("lettre-de-motivation-automatique-gratuite")}
                className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-left transition-all group cursor-pointer"
              >
                <span className="text-xs font-semibold text-emerald-700 block mb-1">Générateur & Modèles</span>
                <span className="text-sm font-bold text-slate-900 group-hover:text-[#1A3A5C] transition-colors block">
                  Lettre de motivation automatique gratuite en 30s →
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
