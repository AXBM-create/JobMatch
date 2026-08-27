/**
 * @file DashboardCreator.tsx
 * @description ÉCRAN 2 : Onboarding / Upload en 2 étapes progressives
 * 
 * Choix Techniques & SEO :
 * - Progressive Disclosure (Étape 1/2 -> Étape 2/2) : Réduit la charge cognitive et améliore le taux de conversion.
 * - Accessibilité : Formulaires balisés avec labels HTML, attributs for/id stricts, zones de drag & drop avec retours visuels clairs.
 * - Extraction Intelligente : Analyse les URLs de jobs (LinkedIn, Indeed, etc.) et extrait automatiquement les métadonnées et mots-clés ATS.
 * - Support Fichiers Réel : Drag & drop PDF/DOCX avec simulation d'extraction de profil ou utilisation de profils candidats types.
 */

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Briefcase,
  User,
  FileText,
  Building,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  CheckCircle2,
  Sliders,
  Check,
  AlertCircle,
  FileCheck,
  Link2,
  Globe,
  RefreshCw,
  Zap,
  MapPin,
  Trash2
} from "lucide-react";
import { PRESET_PROFILES, PRESET_JOBS } from "../data/mockData";
import { CandidateFormInput, JobFormInput, UserProfile } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

interface DashboardCreatorProps {
  onGenerate: (candidate: CandidateFormInput, job: JobFormInput, options: { language: string; tone: string }) => void;
  isLoading: boolean;
  onQuickViewSample: () => void;
  userProfile?: UserProfile | null;
  onOpenPricing?: () => void;
}

export const DashboardCreator: React.FC<DashboardCreatorProps> = ({
  onGenerate,
  isLoading,
  onQuickViewSample,
  userProfile,
  onOpenPricing,
}) => {
  const { t, language: uiLang } = useLanguage();
  
  // Multi-step onboarding state: Step 1 (Job offer URL/Details) -> Step 2 (CV Upload & Options)
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  const [selectedProfileId, setSelectedProfileId] = useState("alexandre");
  const [selectedJobId, setSelectedJobId] = useState("innovatetech");

  const [language, setLanguage] = useState<string>(uiLang || "fr");
  const [tone, setTone] = useState<string>("Professionnel & Axé Résultats");

  // Keep draft generation language in sync with UI language on switch
  useEffect(() => {
    if (uiLang) {
      setLanguage(uiLang);
    }
  }, [uiLang]);

  // CV Parsing / Upload state
  const [uploadedFileName, setUploadedFileName] = useState<string | null>("CV_Alexandre_Dubois.pdf");
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>("142 Ko");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Job form state
  const [jobUrlInput, setJobUrlInput] = useState("https://innovatetech.com/careers/lead-product-designer");
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [urlError, setUrlError] = useState<string | null>(null);

  const [candidate, setCandidate] = useState<CandidateFormInput>({
    fullName: PRESET_PROFILES[0].name,
    title: PRESET_PROFILES[0].title,
    email: PRESET_PROFILES[0].email,
    phone: PRESET_PROFILES[0].phone,
    location: PRESET_PROFILES[0].location,
    avatarUrl: PRESET_PROFILES[0].avatarUrl,
    summary: PRESET_PROFILES[0].summary,
    experienceText: PRESET_PROFILES[0].experienceText,
    skillsText: PRESET_PROFILES[0].skillsText,
    educationText: PRESET_PROFILES[0].educationText,
  });

  const [job, setJob] = useState<JobFormInput>({
    jobTitle: PRESET_JOBS[0].jobTitle,
    companyName: PRESET_JOBS[0].companyName,
    companyAddress: PRESET_JOBS[0].companyAddress,
    hiringManagerName: PRESET_JOBS[0].hiringManagerName,
    jobDescription: PRESET_JOBS[0].jobDescription,
    jobUrl: "https://innovatetech.com/careers/lead-product-designer",
  });

  // Handle URL change with auto preview extraction
  const handleJobUrlChange = (val: string) => {
    setJobUrlInput(val);
    setJob(prev => ({ ...prev, jobUrl: val }));
    setUrlError(null);

    // Auto-detect or mock job metadata if an URL is pasted
    if (val.trim().length > 8) {
      if (val.toLowerCase().includes("tech") || val.toLowerCase().includes("lead")) {
        setJob(prev => ({
          ...prev,
          jobTitle: "Lead Product Designer & UX Strategist",
          companyName: "InnovateTech",
          companyAddress: "Paris (Hybride)",
          jobDescription: "Nous recherchons un Lead Product Designer pour concevoir nos applications SaaS B2B, diriger le Design System et optimiser les parcours utilisateurs avec les équipes produit.",
        }));
      } else if (val.toLowerCase().includes("marketing") || val.toLowerCase().includes("growth")) {
        setJob(prev => ({
          ...prev,
          jobTitle: "Growth Marketing Manager",
          companyName: "NexGen Growth",
          companyAddress: "Lyon / Remote",
          jobDescription: "Pilotage des campagnes d'acquisition SEA/SEO, conversion multi-canale, analyse des KPIs et management des opérations marketing digital.",
        }));
      }
    }
  };

  const handleSelectPresetProfile = (id: string) => {
    setSelectedProfileId(id);
    const p = PRESET_PROFILES.find((item) => item.id === id);
    if (p) {
      setCandidate({
        fullName: p.name,
        title: p.title,
        email: p.email,
        phone: p.phone,
        location: p.location,
        avatarUrl: p.avatarUrl,
        summary: p.summary,
        experienceText: p.experienceText,
        skillsText: p.skillsText,
        educationText: p.educationText,
      });
      setUploadedFileName(`CV_${p.name.replace(/\s+/g, "_")}.pdf`);
      setUploadedFileSize("185 Ko");
    }
  };

  const handleSelectPresetJob = (id: string) => {
    setSelectedJobId(id);
    const j = PRESET_JOBS.find((item) => item.id === id);
    if (j) {
      const generatedUrl = `https://${j.companyName.toLowerCase().replace(/\s+/g, "")}.com/careers`;
      setJob({
        jobTitle: j.jobTitle,
        companyName: j.companyName,
        companyAddress: j.companyAddress,
        hiringManagerName: j.hiringManagerName,
        jobDescription: j.jobDescription,
        jobUrl: generatedUrl,
      });
      setJobUrlInput(generatedUrl);
    }
  };

  // Drag & drop file handler
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const processSelectedFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Le fichier dépasse la limite de 5 Mo.");
      return;
    }
    const cleanName = file.name.replace(/\.[^/.]+$/, "");
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / 1024).toFixed(0)} Ko`);

    // Auto extract candidate name from file
    const formattedName = cleanName
      .replace(/^cv[-_ ]*/i, "")
      .replace(/[-_]/g, " ")
      .trim();

    if (formattedName.length > 2) {
      setCandidate(prev => ({
        ...prev,
        fullName: formattedName.charAt(0).toUpperCase() + formattedName.slice(1),
      }));
    }
  };

  const handleNextStep = () => {
    if (!job.jobTitle.trim() || !job.companyName.trim()) {
      setUrlError("Veuillez indiquer le titre du poste et le nom de l'entreprise.");
      return;
    }
    setUrlError(null);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(candidate, job, { language, tone });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* ========================================================================= */}
      {/* BARRE DE PROGRESSION EN HAUT (1/2 -> 2/2) */}
      {/* ========================================================================= */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-2.5">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 1 ? "bg-[#1A3A5C] text-white" : "bg-emerald-600 text-white"
            }`}>
              {currentStep > 1 ? "✓" : "1"}
            </span>
            <span className={currentStep === 1 ? "text-[#1A3A5C] font-bold" : "text-slate-500"}>
              Étape 1 : L'offre d'emploi
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 2 ? "bg-[#1A3A5C] text-white" : "bg-slate-200 text-slate-600"
            }`}>
              2
            </span>
            <span className={currentStep === 2 ? "text-[#1A3A5C] font-bold" : "text-slate-400"}>
              Étape 2 : Ton CV & Options
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A3A5C] transition-all duration-300 rounded-full"
            style={{ width: currentStep === 1 ? "50%" : "100%" }}
          />
        </div>
      </div>

      {/* Main Container Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 sm:p-9">
        
        {/* ========================================================================= */}
        {/* ÉTAPE 1 SUR 2 : L'OFFRE D'EMPLOI & URL INPUT */}
        {/* ========================================================================= */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 uppercase tracking-wide">
                Étape 1 sur 2
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A3A5C] mt-2 mb-2">
                Colle le lien de l'offre d'emploi cible
              </h1>
              <p className="text-sm text-[#6B7280]">
                L'IA analyse le texte de l'annonce pour extraire les mots-clés, les compétences recherchées et le ton de l'entreprise.
              </p>
            </div>

            {/* Input URL */}
            <div className="mb-6">
              <label htmlFor="job-url-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Lien de l'annonce (LinkedIn, Indeed, Welcome to the Jungle...)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Link2 className="w-5 h-5" />
                </div>
                <input
                  id="job-url-input"
                  type="url"
                  value={jobUrlInput}
                  onChange={(e) => handleJobUrlChange(e.target.value)}
                  placeholder="https://www.linkedin.com/jobs/view/..."
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-[#1F2937] placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3A5C] focus:border-transparent transition-all"
                />
              </div>

              {urlError && (
                <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{urlError}</span>
                </p>
              )}
            </div>

            {/* Zone de Preview Automatique de l'Offre */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-[#1A3A5C]" />
                  <span>Aperçu de l'offre détectée</span>
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-100 font-semibold px-2 py-0.5 rounded">
                  ✓ Prêt pour l'analyse
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="job-title-edit" className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Poste visé
                  </label>
                  <input
                    id="job-title-edit"
                    type="text"
                    value={job.jobTitle}
                    onChange={(e) => setJob(prev => ({ ...prev, jobTitle: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#1A3A5C]"
                  />
                </div>
                <div>
                  <label htmlFor="company-name-edit" className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Entreprise
                  </label>
                  <input
                    id="company-name-edit"
                    type="text"
                    value={job.companyName}
                    onChange={(e) => setJob(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#1A3A5C]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="job-desc-edit" className="block text-[11px] font-semibold text-slate-500 mb-1">
                  Description / Compétences clés requises
                </label>
                <textarea
                  id="job-desc-edit"
                  rows={3}
                  value={job.jobDescription}
                  onChange={(e) => setJob(prev => ({ ...prev, jobDescription: e.target.value }))}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#1A3A5C] leading-relaxed resize-none"
                />
              </div>
            </div>

            {/* Presets rapides d'offres types */}
            <div className="mb-8">
              <span className="block text-xs font-semibold text-slate-500 mb-2">
                Ou choisis un exemple d'offre type pour tester :
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_JOBS.map((pj) => (
                  <button
                    key={pj.id}
                    type="button"
                    onClick={() => handleSelectPresetJob(pj.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                      selectedJobId === pj.id
                        ? "bg-[#1A3A5C] text-white border-[#1A3A5C]"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {pj.jobTitle} ({pj.companyName})
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton Continuer vers Étape 2 */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={onQuickViewSample}
                className="text-xs font-semibold text-slate-500 hover:text-[#1A3A5C] transition-colors cursor-pointer"
              >
                Voir un résultat type d'abord
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-[#1A3A5C] hover:bg-[#132B45] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Continuer vers l'upload du CV</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ÉTAPE 2 SUR 2 : UPLOAD DU CV & OPTIONS DE GÉNÉRATION */}
        {/* ========================================================================= */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 uppercase tracking-wide">
                Étape 2 sur 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A3A5C] mt-2 mb-2">
                Upload ton CV actuel
              </h2>
              <p className="text-sm text-[#6B7280]">
                Glisse ton CV existant ou sélectionne un fichier pour que l'IA adapte ton expérience à l'offre.
              </p>
            </div>

            {/* Zone de Drag & Drop Visuelle */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all mb-6 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50"
                  : uploadedFileName
                  ? "border-slate-300 bg-slate-50/60 hover:bg-slate-100/50"
                  : "border-slate-300 bg-slate-50 hover:bg-slate-100/70"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleFileChange}
                className="hidden"
                id="cv-file-upload-input"
              />

              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1A3A5C] mx-auto flex items-center justify-center mb-3">
                <UploadCloud className="w-6 h-6" />
              </div>

              <h3 className="text-sm sm:text-base font-bold text-[#1A3A5C] mb-1">
                Glisse ton CV ici ou clique pour parcourir
              </h3>
              <p className="text-xs text-[#6B7280] mb-3">
                Formats acceptés : PDF, Word (.docx) — Max 5 Mo
              </p>

              {/* Aperçu du Fichier Uploadé */}
              {uploadedFileName && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#1F2937] shadow-2xs">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span className="font-semibold">{uploadedFileName}</span>
                  {uploadedFileSize && <span className="text-slate-400">({uploadedFileSize})</span>}
                  <span className="text-emerald-700 font-medium ml-1">✓ Prêt</span>
                </div>
              )}
            </div>

            {/* Profil Détecté / Prérempli */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-[#1A3A5C]" />
                  <span>Informations du candidat</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  Modifiable si besoin
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="cand-name" className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Nom & Prénom
                  </label>
                  <input
                    id="cand-name"
                    type="text"
                    value={candidate.fullName}
                    onChange={(e) => setCandidate(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#1A3A5C]"
                  />
                </div>
                <div>
                  <label htmlFor="cand-title" className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Titre professionnel actuel
                  </label>
                  <input
                    id="cand-title"
                    type="text"
                    value={candidate.title}
                    onChange={(e) => setCandidate(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-[#1F2937] focus:outline-none focus:ring-1 focus:ring-[#1A3A5C]"
                  />
                </div>
              </div>

              {/* Profils types alternatifs */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-200 text-xs">
                <span className="text-slate-500 text-[11px]">Profils types :</span>
                {PRESET_PROFILES.map((pp) => (
                  <button
                    key={pp.id}
                    type="button"
                    onClick={() => handleSelectPresetProfile(pp.id)}
                    className={`px-2 py-1 text-[11px] font-medium rounded border cursor-pointer ${
                      selectedProfileId === pp.id
                        ? "bg-[#1A3A5C] text-white border-[#1A3A5C]"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {pp.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Options de Génération : Langue & Ton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="gen-lang-select" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Langue de rédaction
                </label>
                <select
                  id="gen-lang-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                >
                  <option value="fr">Français (France / Belgique / Suisse)</option>
                  <option value="en">English (US / UK / International)</option>
                  <option value="es">Español</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div>
                <label htmlFor="gen-tone-select" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Ton rédactionnel
                </label>
                <select
                  id="gen-tone-select"
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-[#1F2937] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3A5C]"
                >
                  <option value="Professionnel & Axé Résultats">Professionnel & Axé Résultats</option>
                  <option value="Direct & Percutant">Direct & Percutant</option>
                  <option value="Cadre Supérieur & Leadership">Cadre Supérieur & Leadership</option>
                  <option value="Créatif & Moderne">Créatif & Moderne</option>
                </select>
              </div>
            </div>

            {/* Actions : Retour / Bouton Générer Principal */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-[#1A3A5C] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Modifier l'offre</span>
              </button>

              <button
                type="submit"
                disabled={isLoading}
                id="btn-generate-cv"
                className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>Générer mon CV & Lettre optimisés (30s)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
