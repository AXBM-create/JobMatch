import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { GeneratedDocsView } from "./components/GeneratedDocsView";
import { AILoadingScreen } from "./components/AILoadingScreen";
import { LandingView } from "./components/LandingView";
import { DashboardCreator } from "./components/DashboardCreator";
import { HistoryView } from "./components/HistoryView";
import { PricingView } from "./components/PricingView";
import { MatchScoreModal } from "./components/MatchScoreModal";
import { RegenerateModal } from "./components/RegenerateModal";
import { SendApplicationModal } from "./components/SendApplicationModal";
import { AuthModal } from "./components/AuthModal";
import { LegalModal } from "./components/LegalModal";
import { UpgradeModal } from "./components/UpgradeModal";
import { DEFAULT_ALEXANDRE_DUBOIS } from "./data/mockData";
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

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>("landing");
  const [currentApplication, setCurrentApplication] = useState<ApplicationResult>(DEFAULT_ALEXANDRE_DUBOIS);
  const [history, setHistory] = useState<ApplicationResult[]>([DEFAULT_ALEXANDRE_DUBOIS]);
  const [isLoading, setIsLoading] = useState(false);

  // User auth state & profile
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Modals
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showRegenerateModal, setShowRegenerateModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<"cgv" | "privacy" | "mentions" | null>(null);

  // Loading state tracking
  const [loadingJobTitle, setLoadingJobTitle] = useState("");
  const [loadingCompany, setLoadingCompany] = useState("");

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

  // Listen for Stripe redirect parameters (e.g. ?payment_success=true&plan=pro)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("payment_success") === "true") {
      const plan = (urlParams.get("plan") as SubscriptionPlan) || "pro";
      if (user) {
        upgradeUserPlan(user.uid, plan).then(() => {
          getUserProfile(user.uid).then((p) => {
            if (p) setUserProfile(p);
          });
        });
      } else {
        setUserProfile((prev) => prev ? { ...prev, plan, subscriptionStatus: "active", creditsRemaining: 999 } : null);
      }
      // Clean query string
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user]);

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
            onNavigate={(view) => setCurrentView(view)}
            onNewApplication={() => setCurrentView("dashboard")}
            user={user}
            userProfile={userProfile}
            onOpenAuth={() => setShowAuthModal(true)}
          />

          {/* Main Body */}
          <main className="flex-1 w-full">
            {currentView === "landing" && (
              <LandingView
                onStart={() => setCurrentView("dashboard")}
                onViewPricing={() => setCurrentView("pricing")}
                onQuickViewSample={() => {
                  setCurrentApplication(DEFAULT_ALEXANDRE_DUBOIS);
                  setCurrentView("editor");
                }}
              />
            )}

            {currentView === "editor" && (
              <GeneratedDocsView
                application={currentApplication}
                onUpdateApplication={handleUpdateCurrentApplication}
                onOpenScoreModal={() => setShowScoreModal(true)}
                onOpenRegenerateModal={() => setShowRegenerateModal(true)}
                onOpenSendModal={() => setShowSendModal(true)}
              />
            )}

            {(currentView === "dashboard" || currentView === "onboarding") && (
              <DashboardCreator
                onGenerate={handleGenerate}
                isLoading={isLoading}
                userProfile={userProfile}
                onOpenPricing={() => setCurrentView("pricing")}
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
                onNewApplication={() => setCurrentView("dashboard")}
              />
            )}

            {currentView === "pricing" && (
              <PricingView
                onStartFree={() => setCurrentView("dashboard")}
                user={user}
                userProfile={userProfile}
                onUpgradePlan={handleUpgradePlan}
                onOpenAuth={() => setShowAuthModal(true)}
                onOpenLegalModal={(tab) => setLegalModalTab(tab)}
              />
            )}
          </main>

          {/* Footer */}
          <Footer onOpenLegalModal={(tab) => setLegalModalTab(tab)} />

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
