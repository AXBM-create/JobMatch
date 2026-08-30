export interface PersonalInfo {
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin?: string;
  website?: string;
  avatarUrl?: string;
}

export interface ExperienceItem {
  id?: string;
  role: string;
  company: string;
  period: string;
  highlights: string[];
  aiNote?: string;
}

export interface EducationItem {
  id?: string;
  degree: string;
  school: string;
  year: string;
  details?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  languages?: string[];
  certifications?: string[];
}

export interface CoverLetterRecipient {
  name: string;
  title: string;
  company: string;
  address: string;
}

export interface CoverLetterData {
  date: string;
  recipient: CoverLetterRecipient;
  salutation: string;
  paragraphs: string[];
  signOff: string;
  signerName: string;
  signerTitle?: string;
  signatureImageUrl?: string;
}

export interface ApplicationResult {
  id: string;
  createdAt: string;
  targetJob: {
    title: string;
    company: string;
    location?: string;
    description?: string;
    url?: string;
  };
  matchScore: number;
  matchSummary: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  tailoringAdvice: string[];
  resume: ResumeData;
  coverLetter: CoverLetterData;
  language: "fr" | "en" | "es" | "de";
  tone: string;
}

export interface CandidateFormInput {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  avatarUrl: string;
  summary: string;
  experienceText: string;
  skillsText: string;
  educationText: string;
}

export interface JobFormInput {
  jobTitle: string;
  companyName: string;
  companyAddress: string;
  hiringManagerName: string;
  jobDescription: string;
  jobUrl: string;
}

export type SubscriptionPlan = "starter" | "pro" | "executive";
export type SubscriptionStatus = "active" | "free" | "trialing" | "canceled" | "past_due";

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  plan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  creditsRemaining: number;
  generationsCount: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  currentPeriodEnd?: string;
  createdAt: string;
}

export type ViewState = "landing" | "onboarding" | "dashboard" | "loading" | "editor" | "history" | "pricing" | "guides" | "ats-guide" | "long-tail-guide";
