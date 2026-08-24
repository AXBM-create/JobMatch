import React, { useState, useRef } from "react";
import {
  Sparkles,
  Briefcase,
  User,
  FileText,
  Building,
  ArrowRight,
  Upload,
  CheckCircle2,
  Sliders,
  Image as ImageIcon,
  Zap,
  Globe,
  Award,
  Layers,
  Loader2,
  AlertCircle,
  FileCheck
} from "lucide-react";
import { PRESET_PROFILES, PRESET_JOBS } from "../data/mockData";
import { CandidateFormInput, JobFormInput, UserProfile } from "../types";

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
  const [selectedProfileId, setSelectedProfileId] = useState("alexandre");
  const [selectedJobId, setSelectedJobId] = useState("innovatetech");

  const [language, setLanguage] = useState<string>("fr");
  const [tone, setTone] = useState<string>("Professionnel & Axé Résultats");

  // CV Parsing state
  const [isParsingCV, setIsParsingCV] = useState(false);
  const [cvParseSuccessMessage, setCvParseSuccessMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    jobUrl: "https://innovatetech.com/careers/lead-designer",
  });

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
    }
  };

  const handleSelectPresetJob = (id: string) => {
    setSelectedJobId(id);
    const j = PRESET_JOBS.find((item) => item.id === id);
    if (j) {
      setJob({
        jobTitle: j.jobTitle,
        companyName: j.companyName,
        companyAddress: j.companyAddress,
        hiringManagerName: j.hiringManagerName,
        jobDescription: j.jobDescription,
        jobUrl: "https://example.com/careers/" + id,
      });
    }
  };

  // Process CV file extraction via Gemini multimodal API
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    setIsParsingCV(true);
    setCvParseSuccessMessage(null);

    try {
      let fileBase64 = "";
      let textContent = "";

      if (file.type === "application/pdf" || file.type.startsWith("image/")) {
        const arrayBuffer = await file.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        fileBase64 = btoa(binary);
      } else {
        textContent = await file.text();
      }

      const response = await fetch("/api/parse-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          mimeType: file.type || "application/pdf",
          fileBase64: fileBase64 || undefined,
          textContent: textContent || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur de parsing");
      }

      const data = await response.json();

      // Format extracted experiences
      let formattedExp = "";
      if (Array.isArray(data.experiences)) {
        formattedExp = data.experiences
          .map((exp: any) => {
            const h = Array.isArray(exp.highlights) ? exp.highlights.map((item: string) => `• ${item}`).join("\n") : "";
            return `${exp.role || "Poste"} chez ${exp.company || "Entreprise"} (${exp.period || ""})\n${h}`;
          })
          .join("\n\n");
      }

      // Format education
      let formattedEdu = "";
      if (Array.isArray(data.education)) {
        formattedEdu = data.education
          .map((edu: any) => `${edu.degree} - ${edu.school} (${edu.year})${edu.details ? `\n• ${edu.details}` : ""}`)
          .join("\n\n");
      }

      // Format skills
      let formattedSkills = "";
      if (Array.isArray(data.skills)) {
        formattedSkills = data.skills.join(", ");
      }

      setCandidate((prev) => ({
        ...prev,
        fullName: data.fullName || prev.fullName,
        title: data.title || prev.title,
        email: data.email || prev.email,
        phone: data.phone || prev.phone,
        location: data.location || prev.location,
        summary: data.summary || prev.summary,
        experienceText: formattedExp || prev.experienceText,
        educationText: formattedEdu || prev.educationText,
        skillsText: formattedSkills || prev.skillsText,
      }));

      setCvParseSuccessMessage(`CV « ${file.name} » analysé avec succès ! Données et compétences importées.`);
    } catch (err) {
      console.error("Error parsing file:", err);
      const baseName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setCandidate((prev) => ({
        ...prev,
        fullName: prev.fullName || baseName,
      }));
      setCvParseSuccessMessage(`Document « ${file.name} » importé.`);
    } finally {
      setIsParsingCV(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(candidate, job, { language, tone });
  };

  const remainingCredits = userProfile?.creditsRemaining ?? 1;
  const plan = userProfile?.plan || "starter";
  const isUnlimited = plan === "pro" || plan === "executive";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Welcome Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Générateur de candidatures sur-mesure de nouvelle génération</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
          Générez un CV & une Lettre de motivation taillés pour l'offre cible
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
          Notre moteur analyse les mots-clés ATS, restructure vos réussites et maximise instantanément votre taux de réponse.
        </p>

        {/* Quota & Credits Pill */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Formule :</span>
            <span className="font-bold text-slate-900 capitalize">{plan}</span>
            <span className="text-slate-300">|</span>
            <span>Crédits :</span>
            <span className="font-bold text-emerald-700">
              {isUnlimited ? "Illimités" : `${remainingCredits} restante`}
            </span>
          </div>

          {!isUnlimited && onOpenPricing && (
            <button
              onClick={onOpenPricing}
              className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl transition-colors shadow-2xs"
            >
              Passer à Pro (Illimité) →
            </button>
          )}
        </div>

        {/* Quick Sample CTA */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onQuickViewSample}
            id="btn-quick-sample"
            className="text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Voir un exemple complet (Product Designer @ InnovateTech)</span>
          </button>
        </div>
      </div>

      {/* Preset Selector Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Candidate presets */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            1. Profil candidat prédéfini ou personnalisé
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_PROFILES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPresetProfile(p.id)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedProfileId === p.id
                    ? "border-emerald-500 bg-emerald-50/50 text-slate-900 ring-1 ring-emerald-500"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <p className="font-semibold text-xs truncate">{p.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{p.title}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Target job presets */}
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-2xs">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            2. Offre d'emploi cible
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_JOBS.map((j) => (
              <button
                key={j.id}
                type="button"
                onClick={() => handleSelectPresetJob(j.id)}
                className={`p-2.5 rounded-lg border text-left transition-all ${
                  selectedJobId === j.id
                    ? "border-emerald-500 bg-emerald-50/50 text-slate-900 ring-1 ring-emerald-500"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <p className="font-semibold text-xs truncate">{j.jobTitle}</p>
                <p className="text-[10px] text-slate-500 truncate">{j.companyName}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CANDIDATE INFO SECTION */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <User className="w-5 h-5 text-slate-700" />
              <h2 className="text-lg font-bold text-slate-900">Vos Informations & Parcours</h2>
            </div>

            {/* Quick Upload CV Drag & Drop banner */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`p-4 border-2 border-dashed rounded-xl transition-all flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/70"
                  : "border-slate-300 bg-slate-50/80 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                  {isParsingCV ? (
                    <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {isParsingCV ? "Analyse du CV en cours..." : "Glissez-déposez votre CV (PDF, DOCX, TXT)"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {isParsingCV
                      ? "Extraction automatique du profil, expériences et compétences..."
                      : "Extraction multimodale instantanée sans saisie manuelle"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isParsingCV}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg transition-colors shadow-2xs flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Parcourir</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
              </div>
            </div>

            {/* Success feedback after CV parsing */}
            {cvParseSuccessMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{cvParseSuccessMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={candidate.fullName}
                  onChange={(e) => setCandidate({ ...candidate, fullName: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Titre professionnel</label>
                <input
                  type="text"
                  required
                  value={candidate.title}
                  onChange={(e) => setCandidate({ ...candidate, title: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={candidate.email}
                  onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Téléphone</label>
                <input
                  type="text"
                  value={candidate.phone}
                  onChange={(e) => setCandidate({ ...candidate, phone: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Localisation</label>
                <input
                  type="text"
                  value={candidate.location}
                  onChange={(e) => setCandidate({ ...candidate, location: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Résumé ou accroche professionnelle
              </label>
              <textarea
                rows={2}
                value={candidate.summary}
                onChange={(e) => setCandidate({ ...candidate, summary: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Expériences clés (Postes, entreprises, réalisations)
              </label>
              <textarea
                rows={4}
                required
                value={candidate.experienceText}
                onChange={(e) => setCandidate({ ...candidate, experienceText: e.target.value })}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Compétences (séparées par des virgules)
                </label>
                <textarea
                  rows={2}
                  required
                  value={candidate.skillsText}
                  onChange={(e) => setCandidate({ ...candidate, skillsText: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Formations & Diplômes
                </label>
                <textarea
                  rows={2}
                  value={candidate.educationText}
                  onChange={(e) => setCandidate({ ...candidate, educationText: e.target.value })}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900 font-sans"
                />
              </div>
            </div>
          </div>

          {/* TARGET JOB SECTION */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <Briefcase className="w-5 h-5 text-slate-700" />
                <h2 className="text-lg font-bold text-slate-900">Détails de l'Offre Visée</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé du poste ciblé</label>
                  <input
                    type="text"
                    required
                    value={job.jobTitle}
                    onChange={(e) => setJob({ ...job, jobTitle: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nom de l'entreprise</label>
                  <input
                    type="text"
                    required
                    value={job.companyName}
                    onChange={(e) => setJob({ ...job, companyName: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Lieu / Adresse</label>
                  <input
                    type="text"
                    value={job.companyAddress}
                    onChange={(e) => setJob({ ...job, companyAddress: e.target.value })}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Responsable du recrutement</label>
                  <input
                    type="text"
                    value={job.hiringManagerName}
                    onChange={(e) => setJob({ ...job, hiringManagerName: e.target.value })}
                    placeholder="ex: Marie Laurent, Responsable RH"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Description & Exigences de l'offre d'emploi
                  </label>
                  <span className="text-[11px] text-emerald-700 font-medium">Recommandé pour scoring ATS</span>
                </div>
                <textarea
                  rows={8}
                  required
                  value={job.jobDescription}
                  onChange={(e) => setJob({ ...job, jobDescription: e.target.value })}
                  placeholder="Collez ici le texte complet de l'offre d'emploi..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:bg-white focus:outline-hidden focus:border-slate-900 font-sans leading-relaxed"
                />
              </div>

              {/* Customization parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Langue de rédaction</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:border-slate-900"
                  >
                    <option value="fr">Français</option>
                    <option value="en">English (US/UK)</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Tonalité souhaitée</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:border-slate-900"
                  >
                    <option value="Professionnel & Axé Résultats">Professionnel & Axé Résultats</option>
                    <option value="Dynamique & Moderne">Dynamique & Moderne</option>
                    <option value="Exécutif & Leadership">Exécutif & Leadership</option>
                    <option value="Concis & Direct">Concis & Direct</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Big CTA */}
        <div className="text-center pt-4">
          <button
            type="submit"
            disabled={isLoading || isParsingCV}
            id="btn-generate-ai"
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-98 flex items-center justify-center gap-3 mx-auto disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span>Générer ma candidature personnalisée (CV + Lettre)</span>
            <ArrowRight className="w-5 h-5 text-slate-400" />
          </button>
          <p className="text-xs text-slate-400 mt-2">
            Optimisé pour les filtres ATS & recruteurs de {job.companyName || "votre entreprise cible"}.
          </p>
        </div>
      </form>
    </div>
  );
};
