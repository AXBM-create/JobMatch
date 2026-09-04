import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { GeneratedDocsView } from "./components/GeneratedDocsView";
import { AILoadingScreen } from "./components/AILoadingScreen";
import { LandingView } from "./components/LandingView";
import { DashboardCreator } from "./components/DashboardCreator";
import { HistoryView } from "./components/HistoryView";
import { PricingView } from "./components/PricingView";
import { BlogGuidesView } from "./components/BlogGuidesView";
import { AtsGuideDetailView } from "./components/AtsGuideDetailView";
import { LongTailGuideDetailView } from "./components/LongTailGuideDetailView";
import { PillarGuideView } from "./components/PillarGuideView";
import { SatelliteGuideView } from "./components/SatelliteGuideView";
import { MatchScoreModal } from "./components/MatchScoreModal";
import { RegenerateModal } from "./components/RegenerateModal";
import { SendApplicationModal } from "./components/SendApplicationModal";
import { AuthModal } from "./components/AuthModal";
import { LegalModal } from "./components/LegalModal";
import { UpgradeModal } from "./components/UpgradeModal";
import { FirstGenerationSuccessModal } from "./components/FirstGenerationSuccessModal";
import { NotFoundView } from "./components/NotFoundView";
import { DEFAULT_ALEXANDRE_DUBOIS } from "./data/mockData";
import { ATS_SYSTEMS_DATA, LONG_TAIL_GUIDES_DATA, AtsSystemData, LongTailGuideData } from "./data/seoProgrammaticData";
import { SATELLITE_PAGES_DATA } from "./data/semanticClusterData";
import { ApplicationResult, CandidateFormInput, JobFormInput, ViewState, UserProfile, SubscriptionPlan } from "./types";
import { auth, onAuthStateChanged, User } from "./firebase";
import { 
  saveApplicationToFirestore, 
  loadUserApplicationsFromFirestore, 
  deleteApplicationFromFirestore,
  getUserProfile,
  consumeUserCredit,
  upgradeUserPlan
} from "./services/firestoreService";
import { 
  updateDOMMetaTags, 
  METADATA_DICTIONARY, 
  generateJobApplicationMetadata,
  SITE_URL
} from "./seo/metadata";
import { trackPageView, trackEvent } from "./utils/analytics";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [currentApplication, setCurrentApplication] = useState<ApplicationResult>(DEFAULT_ALEXANDRE_DUBOIS);
  const [history, setHistory] = useState<ApplicationResult[]>([DEFAULT_ALEXANDRE_DUBOIS]);
  const [isLoading, setIsLoading] = useState(false);

  // Selected guide states for deep-linking and SEO
  const [selectedAtsGuide, setSelectedAtsGuide] = useState<AtsSystemData | null>(null);
  const [selectedLongTailGuide, setSelectedLongTailGuide] = useState<LongTailGuideData | null>(null);
  const [selectedSatelliteRoute, setSelectedSatelliteRoute] = useState<string | null>(null);

  // User auth state & profile
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Modals
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showFirstGenSuccessModal, setShowFirstGenSuccessModal] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<"cgv" | "privacy" | "mentions" | null>(null);

  // Loading state tracking
  const [loadingJobTitle, setLoadingJobTitle] = useState("");
  const [loadingCompany, setLoadingCompany] = useState("");

  // Handle URL Routing on Initial Load and PopState (Browser Back/Forward)
  useEffect(() => {
    const handleUrlRouting = () => {
      const pathname = window.location.pathname.toLowerCase();
      
      if (pathname === "" || pathname === "/") {
        setCurrentView("landing");
        return;
      } else if (pathname === "/guide-cv-ats" || pathname === "/guide-cv-ats/") {
        setCurrentView("pillar-guide");
        return;
      } else if (pathname === "/cv-developpeur" || pathname === "/cv-developpeur/") {
        setSelectedSatelliteRoute("/cv-developpeur");
        setCurrentView("satellite-guide");
        return;
      } else if (pathname === "/cv-commercial" || pathname === "/cv-commercial/") {
        setSelectedSatelliteRoute("/cv-commercial");
        setCurrentView("satellite-guide");
        return;
      } else if (pathname === "/cv-sante" || pathname === "/cv-sante/") {
        setSelectedSatelliteRoute("/cv-sante");
        setCurrentView("satellite-guide");
        return;
      } else if (pathname.startsWith("/guides/")) {
        const slug = pathname.replace("/guides/", "").replace(/\/$/, "");
        const guide = LONG_TAIL_GUIDES_DATA.find((g) => g.slug === slug);
        if (guide) {
          setSelectedLongTailGuide(guide);
          setCurrentView("long-tail-guide");
          return;
        } else {
          setCurrentView("not-found");
          return;
        }
      } else if (pathname === "/guides" || pathname === "/guides/") {
        setCurrentView("guides");
        return;
      } else if (pathname.startsWith("/ats/")) {
        const slug = pathname.replace("/ats/", "").replace(/\/$/, "");
        const ats = ATS_SYSTEMS_DATA.find((a) => a.slug === slug);
        if (ats) {
          setSelectedAtsGuide(ats);
          setCurrentView("ats-guide");
          return;
        } else {
          setCurrentView("not-found");
          return;
        }
      } else if (pathname === "/pricing" || pathname === "/pricing/") {
        setCurrentView("pricing");
        return;
      } else if (pathname === "/onboarding" || pathname === "/onboarding/" || pathname === "/generator") {
        setCurrentView("dashboard");
        return;
      } else if (pathname === "/history" || pathname === "/history/") {
        setCurrentView("history");
        return;
      } else if (pathname === "/404" || pathname === "/404/") {
        setCurrentView("not-found");
        return;
      } else if (!window.location.hash) {
        // Unknown route -> 404 page
        setCurrentView("not-found");
        return;
      }
    };

    handleUrlRouting();
    window.addEventListener("popstate", handleUrlRouting);
    return () => window.removeEventListener("popstate", handleUrlRouting);
  }, []);

  // Listen to Firebase Auth state & fetch user profile
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load user profile & credits
        const profile = await getUserProfile(currentUser.uid, currentUser.email || undefined, currentUser.displayName || undefined);
        setUserProfile(profile);

        // Load user's cloud applications
        const cloudHistory = await loadUserApplicationsFromFirestore(currentUser.uid);
        if (cloudHistory.length > 0) {
          setHistory(cloudHistory);
          setCurrentApplication(cloudHistory[0]);
        }
      } else {
        // Unauthenticated local profile fallback
        setUserProfile({
          uid: "guest",
          plan: "starter",
          creditsRemaining: 1,
          subscriptionStatus: "free",
          createdAt: new Date().toISOString(),
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Listen for Stripe redirect parameters (e.g. ?payment_success=true&plan={CHECKOUT_SESSION_ID})
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment_success") === "true") {
      const planParam = urlParams.get("plan");
      const sessionId = urlParams.get("session_id") || (planParam && planParam.startsWith("cs_") ? planParam : null);

      const applyUpgrade = (targetPlan: SubscriptionPlan) => {
        if (user) {
          upgradeUserPlan(user.uid, targetPlan).then(() => {
            getUserProfile(user.uid).then((p) => {
              if (p) setUserProfile(p);
            });
          });
        } else {
          setUserProfile((prev) => prev ? { ...prev, plan: targetPlan, subscriptionStatus: "active", creditsRemaining: 999 } : null);
        }
      };

      if (sessionId) {
        // Query Stripe session details to get exact planId ("pro" | "executive")
        fetch(`/api/checkout-session-details?session_id=${sessionId}`)
          .then((res) => res.json())
          .then((data) => {
            const detectedPlan: SubscriptionPlan = data?.planId === "executive" ? "executive" : "pro";
            applyUpgrade(detectedPlan);
          })
          .catch(() => {
            applyUpgrade("pro");
          });
      } else {
        const directPlan: SubscriptionPlan = planParam === "executive" ? "executive" : "pro";
        applyUpgrade(directPlan);
      }

      // Clean query string from URL bar without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user]);

  // Sync Browser Title, SEO Meta Tags & Google Analytics on View / Application changes
  useEffect(() => {
    let path = "/";
    let title = METADATA_DICTIONARY.landing.title;

    if (currentView === "editor" && currentApplication?.targetJob) {
      const meta = generateJobApplicationMetadata(
        currentApplication.targetJob,
        currentApplication.resume?.personalInfo?.fullName,
        currentApplication.matchScore,
        currentApplication.id
      );
      updateDOMMetaTags(meta);
      path = `/editor/${currentApplication.id || "latest"}`;
      title = meta.title;
    } else if (currentView === "pricing") {
      updateDOMMetaTags(METADATA_DICTIONARY.pricing);
      path = "/pricing";
      title = METADATA_DICTIONARY.pricing.title;
    } else if (currentView === "dashboard" || currentView === "onboarding") {
      updateDOMMetaTags(METADATA_DICTIONARY.onboarding);
      path = "/generator";
      title = METADATA_DICTIONARY.onboarding.title;
    } else if (currentView === "history") {
      updateDOMMetaTags(METADATA_DICTIONARY.history);
      path = "/history";
      title = METADATA_DICTIONARY.history.title;
    } else if (currentView === "guides") {
      updateDOMMetaTags(METADATA_DICTIONARY.guides);
      path = "/guides";
      title = METADATA_DICTIONARY.guides.title;
    } else if (currentView === "long-tail-guide" && selectedLongTailGuide) {
      const metaKey = `guide-${selectedLongTailGuide.slug}` as keyof typeof METADATA_DICTIONARY;
      const meta = METADATA_DICTIONARY[metaKey] || {
        title: `${selectedLongTailGuide.title} | JobMatch`,
        description: selectedLongTailGuide.metaDescription,
        keywords: [selectedLongTailGuide.targetKeyword, "JobMatch", "score ATS", "optimisation CV", "jobmatch.company"],
        canonicalUrl: `${SITE_URL}/guides/${selectedLongTailGuide.slug}`,
        ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
        robots: "index, follow",
      };
      updateDOMMetaTags(meta);
      path = `/guides/${selectedLongTailGuide.slug}`;
      title = meta.title;
    } else if (currentView === "ats-guide" && selectedAtsGuide) {
      const titleStr = `Comment passer le filtre ATS ${selectedAtsGuide.name} ? — Guide & Conseils | JobMatch`;
      const meta = {
        title: titleStr,
        description: `Guide complet pour optimiser votre CV pour l'ATS ${selectedAtsGuide.name} (${selectedAtsGuide.marketShare}). Conseils, règles et mots-clés essentiels.`,
        keywords: ["passer filtre ATS", selectedAtsGuide.name, "optimiser CV", ...selectedAtsGuide.atsKeywordsToInclude],
        canonicalUrl: `${SITE_URL}/ats/${selectedAtsGuide.slug}`,
        ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80",
        robots: "index, follow",
      };
      updateDOMMetaTags(meta);
      path = `/ats/${selectedAtsGuide.slug}`;
      title = meta.title;
    } else if (currentView === "pillar-guide") {
      updateDOMMetaTags(METADATA_DICTIONARY["guide-cv-ats"]);
      path = "/guide-cv-ats";
      title = METADATA_DICTIONARY["guide-cv-ats"].title;
    } else if (currentView === "satellite-guide") {
      if (selectedSatelliteRoute === "/cv-commercial") {
        updateDOMMetaTags(METADATA_DICTIONARY["cv-commercial"]);
        path = "/cv-commercial";
        title = METADATA_DICTIONARY["cv-commercial"].title;
      } else if (selectedSatelliteRoute === "/cv-sante") {
        updateDOMMetaTags(METADATA_DICTIONARY["cv-sante"]);
        path = "/cv-sante";
        title = METADATA_DICTIONARY["cv-sante"].title;
      } else {
        updateDOMMetaTags(METADATA_DICTIONARY["cv-developpeur"]);
        path = "/cv-developpeur";
        title = METADATA_DICTIONARY["cv-developpeur"].title;
      }
    } else {
      updateDOMMetaTags(METADATA_DICTIONARY.landing);
      path = "/";
      title = METADATA_DICTIONARY.landing.title;
    }

    // Google Analytics (gtag.js) SPA page view tracking
    trackPageView(path, title);
  }, [currentView, currentApplication, selectedLongTailGuide, selectedAtsGuide, selectedSatelliteRoute]);

  // Load persistence from local storage as offline/initial fallback
  useEffect(() => {
    if (!user) {
      try {
        const saved = localStorage.getItem("jobmatch_history");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setHistory(parsed);
            setCurrentApplication(parsed[0]);
          }
        }
      } catch (e) {
        console.warn("Could not load history from local storage", e);
      }
    }
  }, [user]);

  // Save history to local storage & Firestore if logged in
  const saveHistory = async (newHistory: ApplicationResult[], appToSave?: ApplicationResult) => {
    setHistory(newHistory);
    try {
      localStorage.setItem("jobmatch_history", JSON.stringify(newHistory));
    } catch (e) {
      console.warn("Could not persist history locally", e);
    }

    if (user && appToSave) {
      await saveApplicationToFirestore(user.uid, appToSave);
    }
  };

  const handleUpgradePlan = async (plan: SubscriptionPlan) => {
    trackEvent("upgrade_plan", {
      plan_name: plan,
      currency: "EUR",
      value: plan === "executive" ? 39 : 19,
    });
    if (user) {
      await upgradeUserPlan(user.uid, plan);
      const updated = await getUserProfile(user.uid);
      if (updated) setUserProfile(updated);
    } else {
      setUserProfile((prev) => prev ? { ...prev, plan, subscriptionStatus: "active", creditsRemaining: 999 } : null);
    }
  };

  // Generate new application via Gemini API
  const handleGenerate = async (
    candidateInput: CandidateFormInput,
    jobInput: JobFormInput,
    options: { language: string; tone: string }
  ) => {
    // Check credits/plan
    if (userProfile && userProfile.plan === "starter" && userProfile.creditsRemaining <= 0) {
      setShowUpgradeModal(true);
      return;
    }

    setIsLoading(true);
    setLoadingJobTitle(jobInput.jobTitle);
    setLoadingCompany(jobInput.companyName);
    setCurrentView("loading");

    const startTime = Date.now();

    try {
      const response = await fetch("/api/generate-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          candidateProfile: {
            fullName: candidateInput.fullName,
            title: candidateInput.title,
            email: candidateInput.email,
            phone: candidateInput.phone,
            location: candidateInput.location,
            avatarUrl: candidateInput.avatarUrl,
            summary: candidateInput.summary,
            experiences: [
              {
                role: candidateInput.title,
                company: "Expérience Principale",
                period: "2021 - Présent",
                highlights: candidateInput.experienceText.split("\n").filter((l) => l.trim().length > 0),
              },
            ],
            skills: candidateInput.skillsText.split(",").map((s) => s.trim()).filter(Boolean),
            education: [
              {
                degree: "Formation Supérieure",
                school: candidateInput.educationText || "Université / École",
                year: "2020",
              },
            ],
          },
          targetJob: {
            jobTitle: jobInput.jobTitle,
            companyName: jobInput.companyName,
            companyAddress: jobInput.companyAddress,
            hiringManagerName: jobInput.hiringManagerName,
            jobDescription: jobInput.jobDescription,
            jobUrl: jobInput.jobUrl,
          },
          options,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const generatedData: ApplicationResult = await response.json();

      // Track conversion event in Google Analytics
      trackEvent("generate_application", {
        job_title: jobInput.jobTitle,
        company_name: jobInput.companyName,
        match_score: generatedData.matchScore,
        language: options.language,
      });

      // Deduct credit
      if (user) {
        await consumeUserCredit(user.uid);
        const updated = await getUserProfile(user.uid);
        if (updated) setUserProfile(updated);
      } else {
        setUserProfile((prev) => prev ? { ...prev, creditsRemaining: Math.max(0, prev.creditsRemaining - 1) } : null);
      }

      // Minimum animation experience
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, 2200 - elapsed);

      setTimeout(() => {
        setCurrentApplication(generatedData);
        const updatedHistory = [generatedData, ...history];
        saveHistory(updatedHistory, generatedData);
        setIsLoading(false);
        setCurrentView("editor");

        // Automatically prompt to upgrade right after the first free trial generation
        if (!userProfile || userProfile.plan === "starter") {
          setTimeout(() => {
            setShowFirstGenSuccessModal(true);
          }, 800);
        }
      }, remainingTime);
    } catch (error) {
      console.error("Error generating application:", error);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentView("editor");
      }, 2000);
    }
  };

  const handleUpdateCurrentApplication = (updated: ApplicationResult) => {
    setCurrentApplication(updated);
    const updatedHistory = history.map((h) => (h.id === updated.id ? updated : h));
    saveHistory(updatedHistory, updated);
  };

  const handleDeleteHistory = async (id: string) => {
    const updated = history.filter((h) => h.id !== id);
    saveHistory(updated);
    if (user) {
      await deleteApplicationFromFirestore(id);
    }
    if (currentApplication.id === id && updated.length > 0) {
      setCurrentApplication(updated[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col justify-between text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Dynamic View Rendering */}
      {currentView === "loading" ? (
        <AILoadingScreen
          targetJobTitle={loadingJobTitle}
          companyName={loadingCompany}
        />
      ) : (
        <>
          {/* Top Navbar */}
          <Navbar
            currentView={currentView}
            onNavigate={(view) => {
              setCurrentView(view);
              if (view === "landing") window.history.pushState({}, "JobMatch", "/");
              else if (view === "pricing") window.history.pushState({}, "Tarifs JobMatch", "/pricing");
              else if (view === "dashboard" || view === "onboarding") window.history.pushState({}, "Générateur JobMatch", "/onboarding");
              else if (view === "guides") window.history.pushState({}, "Guides & Ressources ATS", "/guides");
            }}
            onNewApplication={() => {
              setCurrentView("dashboard");
              window.history.pushState({}, "Générateur JobMatch", "/onboarding");
            }}
            user={user}
            userProfile={userProfile}
            onOpenAuth={() => setShowAuthModal(true)}
          />

          {/* Main Body */}
          <main className="flex-1 w-full">
            {currentView === "landing" && (
              <LandingView
                onStart={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
                onViewPricing={() => {
                  setCurrentView("pricing");
                  window.history.pushState({}, "Tarifs JobMatch", "/pricing");
                }}
                onQuickViewSample={() => {
                  setCurrentApplication(DEFAULT_ALEXANDRE_DUBOIS);
                  setCurrentView("editor");
                }}
              />
            )}

            {currentView === "editor" && (
              <GeneratedDocsView
                application={currentApplication}
                userProfile={userProfile}
                onUpdateApplication={handleUpdateCurrentApplication}
                onOpenScoreModal={() => setShowScoreModal(true)}
                onOpenRegenerateModal={() => setShowRegenerateModal(true)}
                onOpenSendModal={() => setShowSendModal(true)}
                onOpenPricing={() => {
                  setCurrentView("pricing");
                  window.history.pushState({}, "Tarifs JobMatch", "/pricing");
                }}
              />
            )}

            {(currentView === "dashboard" || currentView === "onboarding") && (
              <DashboardCreator
                onGenerate={handleGenerate}
                isLoading={isLoading}
                userProfile={userProfile}
                onOpenPricing={() => {
                  setCurrentView("pricing");
                  window.history.pushState({}, "Tarifs JobMatch", "/pricing");
                }}
                onQuickViewSample={() => {
                  setCurrentApplication(DEFAULT_ALEXANDRE_DUBOIS);
                  setCurrentView("editor");
                }}
              />
            )}

            {currentView === "history" && (
              <HistoryView
                history={history}
                onSelectApplication={(app) => {
                  setCurrentApplication(app);
                  setCurrentView("editor");
                }}
                onDeleteApplication={handleDeleteHistory}
                onNewApplication={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
              />
            )}

            {currentView === "pricing" && (
              <PricingView
                onStartFree={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
                user={user}
                userProfile={userProfile}
                onUpgradePlan={handleUpgradePlan}
                onOpenAuth={() => setShowAuthModal(true)}
                onOpenLegalModal={(tab) => setLegalModalTab(tab)}
              />
            )}

            {currentView === "guides" && (
              <BlogGuidesView
                onSelectAtsGuide={(ats) => {
                  setSelectedAtsGuide(ats);
                  setCurrentView("ats-guide");
                  window.history.pushState({}, `Guide ATS ${ats.name}`, `/ats/${ats.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onSelectJobRole={(_roleId) => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
                onSelectLongTailGuide={(guide) => {
                  setSelectedLongTailGuide(guide);
                  setCurrentView("long-tail-guide");
                  window.history.pushState({}, guide.title, `/guides/${guide.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onStartGenerator={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
              />
            )}

            {currentView === "long-tail-guide" && selectedLongTailGuide && (
              <LongTailGuideDetailView
                guide={selectedLongTailGuide}
                onBack={() => {
                  setCurrentView("guides");
                  window.history.pushState({}, "Guides & Ressources ATS", "/guides");
                }}
                onStartOnboarding={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
                onNavigateHome={() => {
                  setCurrentView("landing");
                  window.history.pushState({}, "JobMatch", "/");
                }}
                onSelectOtherGuide={(slug) => {
                  const target = LONG_TAIL_GUIDES_DATA.find((g) => g.slug === slug);
                  if (target) {
                    setSelectedLongTailGuide(target);
                    setCurrentView("long-tail-guide");
                    window.history.pushState({}, target.title, `/guides/${target.slug}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              />
            )}

            {currentView === "ats-guide" && selectedAtsGuide && (
              <AtsGuideDetailView
                guide={selectedAtsGuide}
                onBack={() => {
                  setCurrentView("guides");
                  window.history.pushState({}, "Guides & Ressources ATS", "/guides");
                }}
                onStartForAts={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                }}
              />
            )}

            {currentView === "pillar-guide" && (
              <PillarGuideView
                onNavigateHome={() => {
                  setCurrentView("landing");
                  window.history.pushState({}, "JobMatch", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onStartOnboarding={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigateSatellite={(route) => {
                  setSelectedSatelliteRoute(route);
                  setCurrentView("satellite-guide");
                  window.history.pushState({}, "Guide Spécialisé JobMatch", route);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {currentView === "satellite-guide" && (
              <SatelliteGuideView
                data={
                  selectedSatelliteRoute === "/cv-commercial"
                    ? SATELLITE_PAGES_DATA.commercial
                    : selectedSatelliteRoute === "/cv-sante"
                    ? SATELLITE_PAGES_DATA.sante
                    : SATELLITE_PAGES_DATA.developpeur
                }
                onNavigateHome={() => {
                  setCurrentView("landing");
                  window.history.pushState({}, "JobMatch", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigatePillar={() => {
                  setCurrentView("pillar-guide");
                  window.history.pushState({}, "Guide complet ATS 2026", "/guide-cv-ats");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onStartOnboarding={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {currentView === "not-found" && (
              <NotFoundView
                onNavigateHome={() => {
                  setCurrentView("landing");
                  window.history.pushState({}, "JobMatch", "/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigatePillar={() => {
                  setCurrentView("pillar-guide");
                  window.history.pushState({}, "Guide complet ATS 2026", "/guide-cv-ats");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigatePricing={() => {
                  setCurrentView("pricing");
                  window.history.pushState({}, "Tarifs JobMatch", "/pricing");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigateOnboarding={() => {
                  setCurrentView("dashboard");
                  window.history.pushState({}, "Générateur JobMatch", "/onboarding");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onNavigateSatellite={(route) => {
                  setSelectedSatelliteRoute(route);
                  setCurrentView("satellite-guide");
                  window.history.pushState({}, "Guide Spécialisé JobMatch", route);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </main>

          {/* Footer */}
          <Footer 
            onOpenLegalModal={(tab) => setLegalModalTab(tab)}
            onNavigatePillar={() => {
              setCurrentView("pillar-guide");
              window.history.pushState({}, "Guide complet ATS 2026", "/guide-cv-ats");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateGuides={(slug) => {
              if (slug === "guide-cv-ats") {
                setCurrentView("pillar-guide");
                window.history.pushState({}, "Guide complet ATS 2026", "/guide-cv-ats");
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
              }
              if (slug) {
                const target = LONG_TAIL_GUIDES_DATA.find((g) => g.slug === slug);
                if (target) {
                  setSelectedLongTailGuide(target);
                  setCurrentView("long-tail-guide");
                  window.history.pushState({}, target.title, `/guides/${target.slug}`);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              } else {
                setCurrentView("guides");
                window.history.pushState({}, "Guides & Ressources ATS", "/guides");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          />

          {/* Modals */}
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onSuccess={() => setShowAuthModal(false)}
          />

          <UpgradeModal
            isOpen={showUpgradeModal}
            onClose={() => setShowUpgradeModal(false)}
            user={user}
            userProfile={userProfile}
            onSuccessUpgrade={handleUpgradePlan}
            onOpenAuth={() => setShowAuthModal(true)}
          />

          <FirstGenerationSuccessModal
            isOpen={showFirstGenSuccessModal}
            onClose={() => setShowFirstGenSuccessModal(false)}
            onUpgrade={handleUpgradePlan}
            onOpenPricing={() => setCurrentView("pricing")}
            matchScore={currentApplication.matchScore}
            jobTitle={currentApplication.targetJob.title}
            companyName={currentApplication.targetJob.company}
          />

          <LegalModal
            isOpen={legalModalTab !== null}
            initialTab={legalModalTab || "cgv"}
            onClose={() => setLegalModalTab(null)}
          />

          {showScoreModal && (
            <MatchScoreModal
              application={currentApplication}
              onClose={() => setShowScoreModal(false)}
            />
          )}

          {showRegenerateModal && (
            <RegenerateModal
              application={currentApplication}
              onClose={() => setShowRegenerateModal(false)}
              onRegenerateComplete={(newApp) => {
                handleUpdateCurrentApplication(newApp);
              }}
            />
          )}

          {showSendModal && (
            <SendApplicationModal
              application={currentApplication}
              onClose={() => setShowSendModal(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
