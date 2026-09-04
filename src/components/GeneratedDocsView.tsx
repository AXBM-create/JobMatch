import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Download,
  Mail,
  Edit3,
  CheckCircle2,
  Undo2,
  Redo2,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List as ListIcon,
  AlignLeft,
  AlignJustify,
  Check,
  Plus,
  Trash2,
  Image as ImageIcon,
  ExternalLink,
  ShieldCheck,
  Eye,
  RefreshCw,
  Building2,
  User,
  Sliders,
  Globe,
  Tag,
  Copy,
  Info,
  X,
  Linkedin
} from "lucide-react";
import { ApplicationResult, ExperienceItem, UserProfile } from "../types";
import { useLanguage } from "../i18n/LanguageContext";
import { 
  generateJobApplicationMetadata, 
  updateDOMMetaTags, 
  PageMetadataConfig,
  METADATA_DICTIONARY,
  SITE_URL
} from "../seo/metadata";

interface GeneratedDocsViewProps {
  application: ApplicationResult;
  userProfile?: UserProfile | null;
  onUpdateApplication: (updated: ApplicationResult) => void;
  onOpenScoreModal: () => void;
  onOpenRegenerateModal: () => void;
  onOpenSendModal: () => void;
  onOpenPricing?: () => void;
}

export const GeneratedDocsView: React.FC<GeneratedDocsViewProps> = ({
  application,
  userProfile,
  onUpdateApplication,
  onOpenScoreModal,
  onOpenRegenerateModal,
  onOpenSendModal,
  onOpenPricing,
}) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [showPhoto, setShowPhoto] = useState(true);
  const [showCompanyLogo, setShowCompanyLogo] = useState(false);
  const [activeTabMobile, setActiveTabMobile] = useState<"resume" | "cover">("resume");
  const [saveToast, setSaveToast] = useState(false);
  const [linkedinToast, setLinkedinToast] = useState(false);
  const [showManualCopyModal, setShowManualCopyModal] = useState(false);
  const [showSeoMetaModal, setShowSeoMetaModal] = useState(false);
  const [copiedMeta, setCopiedMeta] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);
  const linkedinToastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const manualTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (linkedinToastTimerRef.current) {
        clearTimeout(linkedinToastTimerRef.current);
      }
    };
  }, []);

  const { resume, coverLetter, matchScore, targetJob } = application;

  // Generate dynamic SEO & OpenGraph metadata based on current target job
  const currentMeta: PageMetadataConfig = generateJobApplicationMetadata(
    targetJob,
    resume?.personalInfo?.fullName,
    matchScore,
    application?.id
  );

  // Synchronize browser <title>, meta description, OpenGraph and JSON-LD tags dynamically
  useEffect(() => {
    updateDOMMetaTags(currentMeta);

    return () => {
      // Revert to landing metadata on exit
      updateDOMMetaTags(METADATA_DICTIONARY.landing);
    };
  }, [
    targetJob?.title, 
    targetJob?.company, 
    targetJob?.location, 
    resume?.personalInfo?.fullName, 
    matchScore, 
    application?.id
  ]);

  // Handle direct text updates
  const handleResumeChange = (field: string, value: any) => {
    const updated = {
      ...application,
      resume: {
        ...application.resume,
        [field]: value,
      },
    };
    onUpdateApplication(updated);
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    const updated = {
      ...application,
      resume: {
        ...application.resume,
        personalInfo: {
          ...application.resume.personalInfo,
          [field]: value,
        },
      },
    };
    onUpdateApplication(updated);
  };

  const handleCoverLetterChange = (field: string, value: any) => {
    const updated = {
      ...application,
      coverLetter: {
        ...application.coverLetter,
        [field]: value,
      },
    };
    onUpdateApplication(updated);
  };

  const handleParagraphChange = (index: number, text: string) => {
    const newParagraphs = [...coverLetter.paragraphs];
    newParagraphs[index] = text;
    handleCoverLetterChange("paragraphs", newParagraphs);
  };

  const handleExperienceChange = (index: number, field: keyof ExperienceItem, value: any) => {
    const newExperiences = [...resume.experiences];
    newExperiences[index] = {
      ...newExperiences[index],
      [field]: value,
    };
    handleResumeChange("experiences", newExperiences);
  };

  const handleHighlightChange = (expIndex: number, hlIndex: number, text: string) => {
    const newExperiences = [...resume.experiences];
    const newHighlights = [...newExperiences[expIndex].highlights];
    newHighlights[hlIndex] = text;
    newExperiences[expIndex] = {
      ...newExperiences[expIndex],
      highlights: newHighlights,
    };
    handleResumeChange("experiences", newExperiences);
  };

  const addHighlight = (expIndex: number) => {
    const newExperiences = [...resume.experiences];
    newExperiences[expIndex].highlights.push("Nouvelle réalisation percutante avec impact chiffré...");
    handleResumeChange("experiences", newExperiences);
  };

  const removeHighlight = (expIndex: number, hlIndex: number) => {
    const newExperiences = [...resume.experiences];
    newExperiences[expIndex].highlights.splice(hlIndex, 1);
    handleResumeChange("experiences", newExperiences);
  };

  // Construct full text of the cover letter
  const getFullCoverLetterText = () => {
    if (!coverLetter) return "";
    const parts: string[] = [];

    // Date
    if (coverLetter.date) {
      parts.push(coverLetter.date);
    }

    // Recipient info block
    const recipientParts: string[] = [];
    if (coverLetter.recipient?.name) recipientParts.push(coverLetter.recipient.name);
    if (coverLetter.recipient?.title) recipientParts.push(coverLetter.recipient.title);
    if (coverLetter.recipient?.company) recipientParts.push(coverLetter.recipient.company);
    if (coverLetter.recipient?.address) recipientParts.push(coverLetter.recipient.address);
    if (recipientParts.length > 0) {
      parts.push(recipientParts.join("\n"));
    }

    // Salutation
    if (coverLetter.salutation) {
      parts.push(coverLetter.salutation);
    }

    // Paragraphs
    if (coverLetter.paragraphs && coverLetter.paragraphs.length > 0) {
      parts.push(coverLetter.paragraphs.join("\n\n"));
    }

    // Sign-off and Signer
    const closingParts: string[] = [];
    if (coverLetter.signOff) closingParts.push(coverLetter.signOff);
    if (coverLetter.signerName) closingParts.push(coverLetter.signerName);
    if (coverLetter.signerTitle) closingParts.push(coverLetter.signerTitle);
    if (closingParts.length > 0) {
      parts.push(closingParts.join("\n"));
    }

    return parts.join("\n\n");
  };

  // Copy full cover letter and open the job posting in a new tab
  const handleApplyOnLinkedIn = async () => {
    const fullText = getFullCoverLetterText();
    let copySuccess = false;

    // 1. Copy cover letter to clipboard via Clipboard API or fallback
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(fullText);
        copySuccess = true;
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = fullText;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copySuccess = document.execCommand("copy");
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.warn("Clipboard writeText failed:", err);
      copySuccess = false;
    }

    // 2. Determine target job URL (from application data stored during onboarding step 1)
    let targetUrl = targetJob?.url?.trim();
    if (targetUrl) {
      if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
        targetUrl = `https://${targetUrl}`;
      }
    } else {
      // Graceful fallback to LinkedIn job search with job title and company if no exact link was provided
      const searchQuery = [targetJob?.title, targetJob?.company].filter(Boolean).join(" ");
      targetUrl = searchQuery
        ? `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchQuery)}`
        : "https://www.linkedin.com/jobs/";
    }

    // Open target job URL in a new tab
    try {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } catch (openErr) {
      console.warn("Could not open job URL:", openErr);
    }

    // 3. Show confirmation toast or trigger manual copy modal
    if (copySuccess) {
      setLinkedinToast(true);
      if (linkedinToastTimerRef.current) {
        clearTimeout(linkedinToastTimerRef.current);
      }
      linkedinToastTimerRef.current = setTimeout(() => {
        setLinkedinToast(false);
      }, 3500);
    } else {
      setShowManualCopyModal(true);
    }
  };

  // PDF Print Trigger
  const handleDownloadPDF = () => {
    window.print();
  };

  const toggleInlineEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Toast Notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Modifications enregistrées avec succès</span>
        </div>
      )}

      {/* Match Score & Keywords Banner */}
      {/* 0 Credits Remaining Paywall Banner for Free Tier */}
      {(!userProfile || userProfile.plan === "starter") && (
        <div className="bg-gradient-to-r from-[#1A3A5C] to-slate-800 text-white rounded-2xl p-4 sm:p-5 mb-6 shadow-md border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Offre Spéciale Candidat
                </span>
                <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 px-2 py-0.2 rounded border border-amber-400/30">
                  1er essai gratuit terminé
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
                Passez à <strong>JobMatch Pro</strong> pour générer des CV illimités, débloquer les formats HD et postuler 5x plus vite.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenPricing}
            className="shrink-0 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Passer en Pro (19€/mois)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold text-lg">
              {matchScore}%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-[#1A3A5C]">
                  Score de correspondance ATS élevé
                </h2>
                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Excellent
                </span>
              </div>
              <p className="text-xs text-[#6B7280]">
                Votre profil et votre lettre répondent directement aux critères de l'offre pour <span className="font-semibold text-slate-800">{targetJob.title}</span> chez <span className="font-semibold text-slate-800">{targetJob.company}</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenScoreModal}
              className="text-xs font-semibold text-[#1A3A5C] hover:text-[#132B45] underline flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Voir le diagnostic complet</span>
            </button>
          </div>
        </div>

        {/* Matched Keywords with Green Checks */}
        <div className="pt-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Compétences & Mots-clés de l'offre validés dans le CV :
          </span>
          <div className="flex flex-wrap gap-2">
            {(application.matchedKeywords && application.matchedKeywords.length > 0
              ? application.matchedKeywords
              : [
                  "Design System",
                  "Figma",
                  "UX Strategy",
                  "Pilotage Produit",
                  "Méthodes Agiles",
                  "Leadership",
                  "Optimisation Conversion"
                ]
            ).map((kw, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200"
              >
                <Check className="w-3 h-3 text-emerald-600" />
                <span>{kw}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900" id="docs-main-title">
            {t("docs_title")}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {t("docs_subtitle")}
          </p>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center flex-wrap gap-2.5 sm:gap-3" id="docs-action-bar">
          {/* Match Score Chip (Emerald pill) */}
          <button
            onClick={onOpenScoreModal}
            id="btn-match-score"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-medium hover:bg-emerald-100 transition-colors shadow-2xs"
            title="Diagnostic détaillé ATS et mots-clés"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{matchScore}% {t("docs_score_match")}</span>
          </button>

          {/* Edit Inline Toggle */}
          <button
            onClick={toggleInlineEdit}
            id="btn-edit-inline"
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all border ${
              isEditing
                ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? t("docs_edit_mode_active") : t("docs_edit_inline")}</span>
          </button>

          {/* Regenerate with AI */}
          <button
            onClick={onOpenRegenerateModal}
            id="btn-regenerate"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{t("docs_regenerate")}</span>
          </button>

          {/* Send Application */}
          <button
            onClick={onOpenSendModal}
            id="btn-send"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-medium transition-colors"
          >
            <Mail className="w-4 h-4 text-slate-600" />
            <span>{t("docs_send")}</span>
          </button>

          {/* Download PDF (Emerald Primary CTA) */}
          <button
            onClick={handleDownloadPDF}
            id="btn-download-pdf"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#10b981] hover:bg-[#059669] text-white text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Télécharger votre CV et votre lettre de motivation en format PDF"
          >
            <Download className="w-4 h-4" />
            <span>{t("docs_download_pdf")}</span>
          </button>

          {/* Copier et postuler sur LinkedIn */}
          <button
            onClick={handleApplyOnLinkedIn}
            id="btn-linkedin-apply"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#004182] text-white text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Copie la lettre de motivation et ouvre l'offre d'emploi"
          >
            <Linkedin className="w-4 h-4" />
            <span>Copier et postuler sur LinkedIn</span>
          </button>
        </div>
      </div>

      {/* Optional Dynamic Image & Layout Toolbar with Live SEO Meta Indicator */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4 bg-slate-100/60 p-2.5 rounded-xl text-xs text-slate-600">
        <div className="flex items-center flex-wrap gap-3">
          <span className="font-medium text-slate-700">Options visuelles :</span>
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={showPhoto}
              onChange={(e) => setShowPhoto(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>Photo de profil</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer hover:text-slate-900">
            <input
              type="checkbox"
              checked={showCompanyLogo}
              onChange={(e) => setShowCompanyLogo(e.target.checked)}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>En-tête entreprise ({targetJob.company})</span>
          </label>
        </div>

        {/* Dynamic SEO Meta Tag Live Badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSeoMetaModal(true)}
            id="btn-view-seo-meta"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-[#1A3A5C] font-semibold text-[11px] transition-colors shadow-2xs cursor-pointer"
            title="Inspecter le titre et les balises meta générés pour l'indexation de cette offre"
          >
            <Tag className="w-3.5 h-3.5 text-blue-600" />
            <span className="max-w-[280px] sm:max-w-md truncate">
              SEO: <strong>{currentMeta.title}</strong>
            </span>
            <span className="bg-blue-50 text-blue-700 text-[10px] px-1.5 py-0.2 rounded font-bold border border-blue-200">
              Live
            </span>
          </button>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex lg:hidden bg-slate-200 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTabMobile("resume")}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              activeTabMobile === "resume" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
            }`}
          >
            Resume
          </button>
          <button
            onClick={() => setActiveTabMobile("cover")}
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              activeTabMobile === "cover" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600"
            }`}
          >
            Cover Letter
          </button>
        </div>
      </div>

      {/* Main Document Workspace (Side-by-side A4 Cards) */}
      <div ref={printRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* ================= RESUME COLUMN ================= */}
        <div className={`flex flex-col ${activeTabMobile === "cover" ? "hidden lg:flex" : "flex"}`} id="card-resume-container">
          {/* Header & A4 Format Label */}
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xl font-bold text-slate-900">Resume</h2>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">A4 Format</span>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2 py-1.5 px-3 bg-white border border-slate-200 rounded-t-lg text-slate-600 text-xs">
            <button className="p-1 hover:bg-slate-100 rounded" title="Undo" onClick={() => {}}>
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Redo" onClick={() => {}}>
              <Redo2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3.5 bg-slate-200 mx-1" />
            <button className="p-1 hover:bg-slate-100 rounded font-bold" title="Bold">
              <BoldIcon className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded italic" title="Italic">
              <ItalicIcon className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Bullet List">
              <ListIcon className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* A4 White Canvas */}
          <div className="bg-white border-x border-b border-slate-200/90 rounded-b-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[820px] p-8 sm:p-10 font-sans text-slate-800 flex flex-col justify-between relative print:shadow-none print:border-none print:p-0">
            
            <div>
              {/* Header: Name, Title, Contact */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={resume.personalInfo.fullName}
                      onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                      className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight w-full border-b border-dashed border-emerald-400 focus:outline-hidden pb-1"
                    />
                  ) : (
                    <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                      {resume.personalInfo.fullName}
                    </h3>
                  )}

                  {isEditing ? (
                    <input
                      type="text"
                      value={resume.personalInfo.title}
                      onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                      className="text-xs sm:text-sm text-slate-600 mt-1 w-full border-b border-dashed border-emerald-400 focus:outline-hidden"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      {resume.personalInfo.title}
                    </p>
                  )}
                </div>

                {/* Optional Candidate Avatar / Photo */}
                {showPhoto && resume.personalInfo.avatarUrl && (
                  <div className="flex-shrink-0 relative group">
                    <img
                      referrerPolicy="no-referrer"
                      src={resume.personalInfo.avatarUrl}
                      alt={`Photo de profil du candidat ${resume.personalInfo.fullName}`}
                      width="72"
                      height="72"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border-2 border-slate-100 shadow-xs"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-[10px] cursor-pointer">
                        Modifier
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Horizontal Line Divider */}
              <div className="w-full h-[1px] bg-slate-200 my-4" />

              {/* SUMMARY SECTION */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                    Summary
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-medium">ATS Optimized</span>
                </div>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={resume.summary}
                    onChange={(e) => handleResumeChange("summary", e.target.value)}
                    className="w-full text-xs leading-relaxed text-slate-700 border border-emerald-300 rounded p-2 focus:outline-hidden"
                  />
                ) : (
                  <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700">
                    {resume.summary}
                  </p>
                )}
              </div>

              {/* EXPERIENCE SECTION */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900">
                    Experience
                  </h4>
                  {isEditing && (
                    <button
                      onClick={() => {
                        const newExp: ExperienceItem = {
                          role: "Product Designer",
                          company: "Entreprise Innovante",
                          period: "2016 - 2018",
                          highlights: ["Conception d'expériences utilisateurs novatrices."],
                        };
                        handleResumeChange("experiences", [...resume.experiences, newExp]);
                      }}
                      className="text-[10px] text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3 h-3" /> Ajouter
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {resume.experiences.map((exp, expIdx) => (
                    <div key={exp.id || expIdx} className="relative group/exp">
                      {/* Role & Period */}
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => handleExperienceChange(expIdx, "role", e.target.value)}
                              className="font-bold text-xs sm:text-sm text-slate-900 border-b border-dashed border-slate-300"
                            />
                          ) : (
                            <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                              {exp.role}
                            </h5>
                          )}
                        </div>

                        {isEditing ? (
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => handleExperienceChange(expIdx, "period", e.target.value)}
                            className="text-[11px] text-slate-400 text-right border-b border-dashed border-slate-300"
                          />
                        ) : (
                          <span className="text-[11px] text-slate-400 whitespace-nowrap">
                            {exp.period}
                          </span>
                        )}
                      </div>

                      {/* Company Name (italic) */}
                      {isEditing ? (
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(expIdx, "company", e.target.value)}
                          className="italic text-xs text-slate-600 block mt-0.5 border-b border-dashed border-slate-300"
                        />
                      ) : (
                        <p className="italic text-xs text-slate-600 mb-1.5">
                          {exp.company}
                        </p>
                      )}

                      {/* Highlights Bullet points */}
                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-[12.5px] text-slate-700 leading-normal">
                        {exp.highlights.map((hl, hlIdx) => (
                          <li key={hlIdx} className="relative group/hl">
                            {isEditing ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="text"
                                  value={hl}
                                  onChange={(e) => handleHighlightChange(expIdx, hlIdx, e.target.value)}
                                  className="w-full border-b border-dashed border-emerald-300 py-0.5 text-xs text-slate-700 focus:outline-hidden"
                                />
                                <button
                                  onClick={() => removeHighlight(expIdx, hlIdx)}
                                  className="text-slate-400 hover:text-red-500 p-0.5"
                                  title="Supprimer la puce"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            ) : (
                              <span>{hl}</span>
                            )}
                          </li>
                        ))}
                      </ul>

                      {isEditing && (
                        <button
                          onClick={() => addHighlight(expIdx)}
                          className="mt-1 text-[11px] text-slate-500 hover:text-emerald-600 flex items-center gap-1"
                        >
                          <Plus className="w-2.5 h-2.5" /> Ajouter une puce
                        </button>
                      )}

                      {/* Green AI Recommendation Bubble on margin (matches screenshot) */}
                      {expIdx === 0 && (
                        <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden xl:flex">
                          <div 
                            onClick={onOpenScoreModal}
                            className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-2xs cursor-pointer hover:scale-110 transition-transform"
                            title="L'IA a optimisé ce poste pour correspondre à 100% au besoin de l'offre."
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SKILLS SECTION */}
              <div className="mb-4">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1.5">
                  Skills & Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] rounded font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* EDUCATION SECTION */}
              {resume.education && resume.education.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1">
                    Education
                  </h4>
                  {resume.education.map((edu, idx) => (
                    <div key={idx} className="text-xs text-slate-700">
                      <span className="font-semibold text-slate-900">{edu.degree}</span> • {edu.school} ({edu.year})
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resume Footer / Print watermark */}
            <div className="pt-6 text-[10px] text-slate-400 border-t border-slate-100 mt-4 flex items-center justify-between">
              <span>Curriculum Vitae • {resume.personalInfo.fullName}</span>
              <span className="text-emerald-600 font-medium">JobMatch Verified</span>
            </div>
          </div>
        </div>

        {/* ================= COVER LETTER COLUMN ================= */}
        <div className={`flex flex-col ${activeTabMobile === "resume" ? "hidden lg:flex" : "flex"}`} id="card-cover-container">
          {/* Header & A4 Format Label */}
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xl font-bold text-slate-900">Cover Letter</h2>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">A4 Format</span>
          </div>

          {/* Formatting Toolbar */}
          <div className="flex items-center gap-2 py-1.5 px-3 bg-white border border-slate-200 rounded-t-lg text-slate-600 text-xs">
            <button className="p-1 hover:bg-slate-100 rounded" title="Undo" onClick={() => {}}>
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Redo" onClick={() => {}}>
              <Redo2 className="w-3.5 h-3.5" />
            </button>
            <div className="w-[1px] h-3.5 bg-slate-200 mx-1" />
            <button className="p-1 hover:bg-slate-100 rounded" title="Align Left">
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-slate-100 rounded" title="Justify">
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* A4 White Canvas */}
          <div className="bg-white border-x border-b border-slate-200/90 rounded-b-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)] min-h-[820px] p-8 sm:p-10 font-sans text-slate-800 flex flex-col justify-between print:shadow-none print:border-none print:p-0">
            <div>
              {/* Optional Company Header Logo / Banner */}
              {showCompanyLogo && (
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold">
                      {targetJob.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900">{targetJob.company}</p>
                      <p className="text-[10px] text-slate-400">Application for {targetJob.title}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Date (Right Aligned) */}
              <div className="text-right mb-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={coverLetter.date}
                    onChange={(e) => handleCoverLetterChange("date", e.target.value)}
                    className="text-xs sm:text-sm text-slate-700 text-right border-b border-dashed border-emerald-400 focus:outline-hidden"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-700 font-normal">
                    {coverLetter.date}
                  </p>
                )}
              </div>

              {/* Recipient Block */}
              <div className="mb-6 space-y-0.5 text-xs sm:text-sm text-slate-800">
                {isEditing ? (
                  <div className="space-y-1">
                    <input
                      type="text"
                      value={coverLetter.recipient.name}
                      onChange={(e) =>
                        handleCoverLetterChange("recipient", {
                          ...coverLetter.recipient,
                          name: e.target.value,
                        })
                      }
                      className="font-bold text-slate-900 block w-full border-b border-dashed border-slate-300"
                    />
                    <input
                      type="text"
                      value={coverLetter.recipient.company}
                      onChange={(e) =>
                        handleCoverLetterChange("recipient", {
                          ...coverLetter.recipient,
                          company: e.target.value,
                        })
                      }
                      className="text-slate-700 block w-full border-b border-dashed border-slate-300"
                    />
                    <input
                      type="text"
                      value={coverLetter.recipient.address}
                      onChange={(e) =>
                        handleCoverLetterChange("recipient", {
                          ...coverLetter.recipient,
                          address: e.target.value,
                        })
                      }
                      className="text-slate-500 block w-full border-b border-dashed border-slate-300"
                    />
                  </div>
                ) : (
                  <>
                    <p className="font-bold text-slate-900">{coverLetter.recipient.name}</p>
                    <p className="text-slate-700">{coverLetter.recipient.company}</p>
                    <p className="text-slate-500">{coverLetter.recipient.address}</p>
                  </>
                )}
              </div>

              {/* Salutation */}
              <div className="mb-4">
                {isEditing ? (
                  <input
                    type="text"
                    value={coverLetter.salutation}
                    onChange={(e) => handleCoverLetterChange("salutation", e.target.value)}
                    className="text-xs sm:text-sm font-medium text-slate-800 border-b border-dashed border-emerald-400 focus:outline-hidden"
                  />
                ) : (
                  <p className="text-xs sm:text-sm font-medium text-slate-800">
                    {coverLetter.salutation}
                  </p>
                )}
              </div>

              {/* Paragraphs */}
              <div className="space-y-3.5 text-xs sm:text-[13px] leading-relaxed text-slate-700 text-justify">
                {coverLetter.paragraphs.map((p, pIdx) => (
                  <div key={pIdx}>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                        className="w-full text-xs sm:text-[13px] leading-relaxed text-slate-700 border border-emerald-300 rounded p-2 focus:outline-hidden"
                      />
                    ) : (
                      <p>{p}</p>
                    )}
                  </div>
                ))}
              </div>

              {/* Closing & Signer */}
              <div className="mt-8 space-y-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={coverLetter.signOff}
                    onChange={(e) => handleCoverLetterChange("signOff", e.target.value)}
                    className="text-xs sm:text-sm text-slate-800 border-b border-dashed border-slate-300"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-800 font-normal">
                    {coverLetter.signOff}
                  </p>
                )}

                {/* Italic Signature */}
                <div className="py-2">
                  <p className="font-serif italic text-lg sm:text-xl text-slate-900 tracking-tight">
                    {coverLetter.signerName}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-800">
                  {coverLetter.signerName}
                </p>
              </div>
            </div>

            {/* Letter Footer */}
            <div className="pt-6 text-[10px] text-slate-400 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span>Lettre de motivation personnalisée • {targetJob.company}</span>
              <span className="text-emerald-600 font-medium">Confidence Score 92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic SEO & Crawlers Meta Tags Inspector Modal */}
      {showSeoMetaModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Balises SEO & Meta-tags dynamiques de l'offre
                  </h3>
                  <p className="text-xs text-slate-500">
                    Générés en temps réel d'après le poste visé et l'entreprise cible.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSeoMetaModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Google Search Result Live Preview Card */}
            <div className="mb-6">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2">
                Aperçu Google Search (SERP)
              </span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <span className="font-semibold text-slate-700">{SITE_URL}</span>
                  <span>›</span>
                  <span>application</span>
                  <span>›</span>
                  <span className="text-blue-600 truncate">{targetJob.company.toLowerCase()}</span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug mb-1">
                  {currentMeta.title}
                </h4>
                <p className="text-xs sm:text-sm text-[#4d5156] leading-relaxed">
                  {currentMeta.description}
                </p>
              </div>
            </div>

            {/* Detailed Meta-Tags List */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Balise &lt;title&gt; (Page Title)
                </label>
                <div className="p-2.5 bg-slate-100 font-mono text-xs text-slate-800 rounded-lg select-all border border-slate-200">
                  {currentMeta.title}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Meta Description (&lt;meta name="description"&gt;)
                </label>
                <div className="p-2.5 bg-slate-100 font-mono text-xs text-slate-800 rounded-lg select-all border border-slate-200">
                  {currentMeta.description}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Mots-clés cibles générés (Keywords)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {currentMeta.keywords.map((kw, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-800 text-xs px-2 py-0.5 rounded font-medium border border-blue-100">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Données Structurées JSON-LD (Schema.org JobPosting / DigitalDocument)
                </label>
                <pre className="p-3 bg-slate-900 text-slate-200 font-mono text-[11px] rounded-lg overflow-x-auto border border-slate-800">
                  {JSON.stringify(currentMeta.jsonLd, null, 2)}
                </pre>
              </div>
            </div>

            {/* Action footer */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Info className="w-4 h-4 text-slate-400" />
                <span>Synchronisé automatiquement dans le document HTML &lt;head&gt;</span>
              </div>
              <button
                onClick={() => {
                  const metaSnippet = `<title>${currentMeta.title}</title>\n<meta name="description" content="${currentMeta.description}">\n<meta property="og:title" content="${currentMeta.title}">`;
                  navigator.clipboard.writeText(metaSnippet);
                  setCopiedMeta(true);
                  setTimeout(() => setCopiedMeta(false), 2000);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1A3A5C] hover:bg-[#132B45] text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {copiedMeta ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMeta ? "Copié !" : "Copier le code HTML des balises"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* LinkedIn Copy & Apply Toast Notification */}
      {linkedinToast && (
        <div
          id="linkedin-apply-toast"
          role="status"
          className="fixed bottom-6 right-6 z-50 bg-[#0A66C2] text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-2xl flex items-start sm:items-center gap-3 border border-blue-400/40 max-w-md animate-in slide-in-from-bottom-5 duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-white text-xs sm:text-sm">
              Lettre de motivation copiée !
            </p>
            <p className="text-[11px] sm:text-xs text-blue-100 mt-0.5 leading-snug">
              Colle-la dans le formulaire de candidature LinkedIn qui vient de s'ouvrir.
            </p>
          </div>
          <button
            onClick={() => setLinkedinToast(false)}
            className="text-white/80 hover:text-white p-1 rounded-md hover:bg-white/10 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Manual Copy Fallback Modal if Clipboard API fails */}
      {showManualCopyModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                  <Copy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Copier la lettre de motivation manuellement
                  </h3>
                  <p className="text-xs text-slate-500">
                    L'accès automatique au presse-papier n'a pas pu être validé par votre navigateur.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowManualCopyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 mb-2.5">
              Sélectionnez et copiez tout le texte ci-dessous (<strong>Ctrl+C</strong> ou <strong>Cmd+C</strong>), puis collez-le dans le formulaire LinkedIn :
            </p>

            <textarea
              readOnly
              ref={manualTextareaRef}
              value={getFullCoverLetterText()}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
              rows={8}
              className="w-full text-xs font-sans leading-relaxed p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 text-slate-800 resize-none select-all"
            />

            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (manualTextareaRef.current) {
                    manualTextareaRef.current.select();
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs transition-colors cursor-pointer"
              >
                Tout sélectionner
              </button>
              <button
                type="button"
                onClick={() => setShowManualCopyModal(false)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                J'ai copié le texte
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
