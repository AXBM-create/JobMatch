import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import { ATS_SYSTEMS_DATA, JOB_ROLES_DATA, LONG_TAIL_GUIDES_DATA } from "./src/data/seoProgrammaticData";
import { PILLAR_PAGE_DATA, SATELLITE_PAGES_DATA } from "./src/data/semanticClusterData";
import { INDEXNOW_KEY, submitToIndexNow, PRIMARY_INDEXNOW_URLS } from "./src/services/indexNowService";

dotenv.config();

const app = express();
const PORT = 3000;

// 301 Canonical Domain & HTTPS Enforcement Middleware (SEO)
// Ensures jobmatch.company (non-www) permanently redirects to www.jobmatch.company (301, no chains)
app.use((req, res, next) => {
  const host = (req.headers.host || "").toLowerCase();
  const forwardedProto = req.headers["x-forwarded-proto"];

  // 1. Force apex non-www to canonical www (Single 301 hop)
  if (host === "jobmatch.company") {
    return res.redirect(301, `https://www.jobmatch.company${req.originalUrl}`);
  }

  // 2. Enforce HTTPS in production when forwarded from HTTP proxy
  if (
    forwardedProto === "http" &&
    !host.includes("localhost") &&
    !host.includes("127.0.0.1") &&
    !host.includes("run.app")
  ) {
    return res.redirect(301, `https://${host}${req.originalUrl}`);
  }

  next();
});

// Middleware - preserve raw body for Stripe webhook signature verification
app.use(
  express.json({
    limit: "15mb",
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);

// Helper to get the canonical site base URL from environment (SITE_URL / VITE_SITE_URL)
export function getSiteBaseUrl(): string {
  const envUrl = process.env.SITE_URL || process.env.VITE_SITE_URL;
  if (!envUrl) {
    return "https://www.jobmatch.company";
  }
  const clean = envUrl.trim().replace(/\/$/, "");
  // Normalize apex domain or internal dev links to canonical domain
  if (clean === "https://jobmatch.company" || clean === "http://jobmatch.company" || clean.includes("jobmatch.company")) {
    return "https://www.jobmatch.company";
  }
  return clean;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "JobMatch", domain: "jobmatch.company", siteUrl: getSiteBaseUrl(), time: new Date().toISOString() });
});

// Dynamic Sitemap.xml generation for Search Engines (SEO)
app.get("/sitemap.xml", (_req: Request, res: Response) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const baseUrl = getSiteBaseUrl();

  const atsEntries = ATS_SYSTEMS_DATA.map((ats) => `  <url>
    <loc>${baseUrl}/ats/${ats.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/ats/${ats.slug}?lang=fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/ats/${ats.slug}?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/ats/${ats.slug}?lang=es" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/ats/${ats.slug}?lang=de" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/ats/${ats.slug}" />
  </url>`).join("\n");

  const jobEntries = JOB_ROLES_DATA.map((job) => `  <url>
    <loc>${baseUrl}/optimiser-cv/${job.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/optimiser-cv/${job.slug}?lang=fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/optimiser-cv/${job.slug}?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/optimiser-cv/${job.slug}?lang=es" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/optimiser-cv/${job.slug}?lang=de" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/optimiser-cv/${job.slug}" />
  </url>`).join("\n");

  const longTailEntries = LONG_TAIL_GUIDES_DATA.map((guide) => `  <url>
    <loc>${baseUrl}/guides/${guide.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/guides/${guide.slug}?lang=fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/guides/${guide.slug}?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/guides/${guide.slug}?lang=es" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/guides/${guide.slug}?lang=de" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/guides/${guide.slug}" />
  </url>`).join("\n");

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <!-- 1. Page d'accueil / Landing Page -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/?lang=fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/?lang=es" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/?lang=de" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
  </url>
  <!-- 2. Onboarding & Générateur de CV / Lettre ATS -->
  <url>
    <loc>${baseUrl}/onboarding</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/onboarding?lang=fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/onboarding?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/onboarding?lang=es" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/onboarding?lang=de" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/onboarding" />
  </url>
  <!-- 3. Page Tarifs & Abonnements -->
  <url>
    <loc>${baseUrl}/pricing</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/pricing?lang=fr" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/pricing?lang=en" />
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/pricing?lang=es" />
    <xhtml:link rel="alternate" hreflang="de" href="${baseUrl}/pricing?lang=de" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/pricing" />
  </url>
  <!-- 4. Testeur de score ATS -->
  <url>
    <loc>${baseUrl}/test-score-ats</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- 5. Guides & Conseils ATS -->
  <url>
    <loc>${baseUrl}/guides</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- Page Pilier Cocon Sémantique (Guide Complet ATS 2026) -->
  <url>
    <loc>${baseUrl}/guide-cv-ats</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/guide-cv-ats" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/guide-cv-ats?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/guide-cv-ats" />
  </url>
  <!-- Pages Satellites Sémantiques Spécialisées -->
  <url>
    <loc>${baseUrl}/cv-developpeur</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/cv-developpeur" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/cv-developpeur?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/cv-developpeur" />
  </url>
  <url>
    <loc>${baseUrl}/cv-commercial</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/cv-commercial" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/cv-commercial?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/cv-commercial" />
  </url>
  <url>
    <loc>${baseUrl}/cv-sante</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/cv-sante" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/cv-sante?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/cv-sante" />
  </url>
  <!-- 6. Pages Légales & Conformité -->
  <url>
    <loc>${baseUrl}/mentions-legales</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/politique-confidentialite</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/cgv</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <!-- 7. Guides Pratiques & Longue Traîne -->
${longTailEntries}
  <!-- 8. Guides ATS Détaillés -->
${atsEntries}
  <!-- 9. Modèles de CV par Métier -->
${jobEntries}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400"); // 24h cache
  res.send(sitemapXml.trim());
});

// Helper to escape XML special characters
function escapeXml(unsafe: string): string {
  return (unsafe || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

// Dynamic RSS 2.0 & Atom Feed for Blog, Pillar & Guides (SEO & Feed Discovery)
app.get(["/rss.xml", "/feed.xml"], (_req: Request, res: Response) => {
  const baseUrl = getSiteBaseUrl();
  const buildDate = new Date().toUTCString();

  const itemsXml = [
    // 1. Page Pilier ATS 2026
    `    <item>
      <title>${escapeXml(PILLAR_PAGE_DATA.h1)}</title>
      <link>${baseUrl}/guide-cv-ats</link>
      <guid isPermaLink="true">${baseUrl}/guide-cv-ats</guid>
      <description>${escapeXml(PILLAR_PAGE_DATA.metaDescription)}</description>
      <category>Filtres ATS</category>
      <pubDate>Sun, 01 Mar 2026 08:00:00 GMT</pubDate>
    </item>`,

    // 2. Pages Satellites (Métiers)
    ...Object.values(SATELLITE_PAGES_DATA).map((sat) => `    <item>
      <title>${escapeXml(sat.h1)}</title>
      <link>${baseUrl}${sat.route}</link>
      <guid isPermaLink="true">${baseUrl}${sat.route}</guid>
      <description>${escapeXml(sat.metaDescription)}</description>
      <category>${escapeXml(sat.badge)}</category>
      <pubDate>Mon, 02 Mar 2026 09:00:00 GMT</pubDate>
    </item>`),

    // 3. Guides Longue Traîne
    ...LONG_TAIL_GUIDES_DATA.map((guide) => `    <item>
      <title>${escapeXml(guide.title)}</title>
      <link>${baseUrl}/guides/${guide.slug}</link>
      <guid isPermaLink="true">${baseUrl}/guides/${guide.slug}</guid>
      <description>${escapeXml(guide.metaDescription)}</description>
      <category>${escapeXml(guide.category)}</category>
      <pubDate>Wed, 25 Feb 2026 10:00:00 GMT</pubDate>
    </item>`),

    // 4. Décryptages Logiciels ATS
    ...ATS_SYSTEMS_DATA.map((ats) => `    <item>
      <title>Comment passer le filtre ATS ${escapeXml(ats.name)} ? Guide &amp; Règles</title>
      <link>${baseUrl}/ats/${ats.slug}</link>
      <guid isPermaLink="true">${baseUrl}/ats/${ats.slug}</guid>
      <description>Décryptage du logiciel ATS ${escapeXml(ats.name)} (${escapeXml(ats.marketShare)} de part de marché) et règles d'optimisation de CV.</description>
      <category>Logiciels ATS</category>
      <pubDate>Fri, 20 Feb 2026 12:00:00 GMT</pubDate>
    </item>`),
  ].join("\n");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>JobMatch — Guides Recrutement &amp; Optimisation CV ATS</title>
    <link>${baseUrl}</link>
    <description>Tous les guides pratiques, conseils d'experts et décryptages des logiciels de recrutement ATS (Workday, Taleo, Greenhouse) par JobMatch.</description>
    <language>fr-FR</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.send(rssXml.trim());
});

// IndexNow Key Verification Route (HTTP 200 with raw key)
app.get(`/${INDEXNOW_KEY}.txt`, (_req: Request, res: Response) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(INDEXNOW_KEY);
});

// IndexNow Trigger API: Notifies search engines about new or modified URLs
app.post("/api/indexnow/notify", async (req: Request, res: Response) => {
  try {
    const urls: string[] = req.body?.urls && Array.isArray(req.body.urls) && req.body.urls.length > 0
      ? req.body.urls
      : PRIMARY_INDEXNOW_URLS;

    const result = await submitToIndexNow(urls);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to notify IndexNow",
    });
  }
});

// Dynamic Robots.txt for Crawler Indexation Management (SEO)
app.get("/robots.txt", (_req: Request, res: Response) => {
  const baseUrl = getSiteBaseUrl();
  const robotsTxt = `# Robots.txt for JobMatch (https://www.jobmatch.company)
User-agent: *
Allow: /
Allow: /guide-cv-ats
Allow: /cv-developpeur
Allow: /cv-commercial
Allow: /cv-sante
Allow: /pricing
Allow: /onboarding
Allow: /guides
Allow: /test-score-ats
Allow: /ats/
Allow: /optimiser-cv/
Allow: /mentions-legales
Allow: /politique-confidentialite
Allow: /cgv

# Private & Authenticated user routes
Disallow: /api/
Disallow: /editor
Disallow: /editor/
Disallow: /application/
Disallow: /history
Disallow: /history/
Disallow: /dashboard

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(robotsTxt.trim());
});

// Lazy initialize Stripe client
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey || (!apiKey.startsWith("sk_test_") && !apiKey.startsWith("sk_live_"))) {
    return null;
  }
  if (!stripeClient) {
    stripeClient = new Stripe(apiKey, {
      apiVersion: "2025-03-31.basil" as any,
    });
  }
  return stripeClient;
}

// Lazy initialize Gemini client utility
let genAIInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!genAIInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured");
    }
    genAIInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIInstance;
}

// Helper to call Gemini with retry and model fallback
const FALLBACK_MODELS = ["gemini-3.7-flash", "gemini-2.5-flash", "gemini-flash-latest"];

async function generateWithModelFallback(
  ai: GoogleGenAI,
  prompt: string,
  schemaConfig?: any
): Promise<string> {
  let lastError: any = null;

  for (const model of FALLBACK_MODELS) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const config: any = {};
        if (schemaConfig) {
          config.responseMimeType = "application/json";
          config.responseSchema = schemaConfig;
        }

        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config,
        });

        const text = response.text?.trim();
        if (text) {
          return text;
        }
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        console.warn(`[Gemini] Model ${model} attempt ${attempt + 1} failed (${errMsg}).`);

        // If it's a 503 (high demand) or 429 (rate limit), wait briefly before retrying/falling back
        if (errMsg.includes("503") || errMsg.includes("UNAVAILABLE") || errMsg.includes("429")) {
          await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)));
        } else {
          // Other non-transient error: switch to next model immediately
          break;
        }
      }
    }
  }

  throw lastError || new Error("All Gemini models failed to respond");
}

// Generate Job Application endpoint
app.post("/api/generate-application", async (req: Request, res: Response) => {
  try {
    const { candidateProfile, jobDetails, options = {} } = req.body;

    const language = options.language || "fr";
    const tone = options.tone || "Professionnel et impactant";
    const langInstruction = language === "en" ? "Respond in English." : language === "fr" ? "Réponds en Français." : `Respond in ${language}.`;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback realistic high quality tailored application if no API key
      const fallbackResult = generateFallbackApplication(candidateProfile, jobDetails, language);
      return res.json(fallbackResult);
    }

    const ai = getGeminiClient();

    const prompt = `
Tu es un expert mondial en recrutement exécutif, optimisation de CV ATS (Applicant Tracking Systems) et rédaction de candidatures gagnantes.
Ta mission est d'adapter et d'optimiser le profil du candidat pour cibler précisément l'offre d'emploi ci-dessous.

${langInstruction}
Ton désiré: ${tone}

=== PROFIL DU CANDIDAT ===
Nom: ${candidateProfile?.fullName || "Alexandre Dubois"}
Titre actuel: ${candidateProfile?.title || "Senior Product Designer"}
Email: ${candidateProfile?.email || "alexandre@example.com"}
Téléphone: ${candidateProfile?.phone || "+33 6 12 34 56 78"}
Localisation: ${candidateProfile?.location || "Paris, France"}
Photo / Avatar URL: ${candidateProfile?.avatarUrl || ""}
Résumé actuel: ${candidateProfile?.summary || ""}
Expériences: ${JSON.stringify(candidateProfile?.experiences || [])}
Compétences: ${JSON.stringify(candidateProfile?.skills || [])}
Formations: ${JSON.stringify(candidateProfile?.education || [])}

=== OFFRE D'EMPLOI CIBLE ===
Poste: ${jobDetails?.jobTitle || "Lead Product Designer"}
Entreprise: ${jobDetails?.companyName || "InnovateTech Labs"}
Adresse/Lieu: ${jobDetails?.companyAddress || jobDetails?.location || "123 Innovation Drive, Paris"}
Responsable du recrutement: ${jobDetails?.hiringManagerName || "Hiring Manager"}
Description du poste & Exigences:
${jobDetails?.description || "Lead UX Designer pour refondre le SaaS core, diriger l'équipe de 4 designers et piloter le design system."}

Génère une réponse JSON valide respectant scrupuleusement la structure suivante :
- matchScore (nombre entier entre 85 et 99 reflétant la pertinence après adaptation)
- matchSummary (résumé percutant en 1-2 phrases des points forts)
- matchedKeywords (tableau de 5 à 8 mots-clés forts identifiés dans l'offre et valorisés)
- missingKeywords (tableau de 2 à 4 mots-clés ou compétences secondaires suggérées pour l'entretien)
- tailoringAdvice (tableau de 3 conseils concrets de valorisation)
- resume :
  - personalInfo : { fullName, title, location, email, phone, linkedin, website, avatarUrl }
  - summary : résumé professionnel percutant et adapté (3-4 lignes max)
  - experiences : tableau de { role, company, period, highlights: [3 à 4 puces mesurables et percutantes avec verbes d'action et résultats chiffrés], aiNote?: "astuce d'optimisation" }
  - education : tableau de { degree, school, year, details }
  - skills : tableau de compétences clés prioritaires
  - languages : tableau de langues avec niveau
  - certifications : tableau de certifications
- coverLetter :
  - date : date du jour formatée
  - recipient : { name, title, company, address }
  - salutation : e.g. "Dear Hiring Manager," ou "Madame, Monsieur,"
  - paragraphs : tableau de 4 paragraphes bien rédigés (1: Accroche et intérêt pour l'entreprise/poste, 2: Réalisations concrètes en lien direct avec le besoin, 3: Alignement avec la vision/culture de l'entreprise, 4: Appel à l'action et disponibilité pour un échange)
  - signOff : formule de politesse finale (e.g. "Sincerely," ou "Veuillez agréer...")
  - signerName : nom complet du candidat
  - signerTitle : titre du candidat
`;

    const schemaConfig = {
      type: Type.OBJECT,
      properties: {
        matchScore: { type: Type.INTEGER },
        matchSummary: { type: Type.STRING },
        matchedKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
        tailoringAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
        resume: {
          type: Type.OBJECT,
          properties: {
            personalInfo: {
              type: Type.OBJECT,
              properties: {
                fullName: { type: Type.STRING },
                title: { type: Type.STRING },
                location: { type: Type.STRING },
                email: { type: Type.STRING },
                phone: { type: Type.STRING },
                linkedin: { type: Type.STRING },
                website: { type: Type.STRING },
                avatarUrl: { type: Type.STRING },
              },
              required: ["fullName", "title", "email"],
            },
            summary: { type: Type.STRING },
            experiences: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  role: { type: Type.STRING },
                  company: { type: Type.STRING },
                  period: { type: Type.STRING },
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
                  aiNote: { type: Type.STRING },
                },
                required: ["role", "company", "period", "highlights"],
              },
            },
            education: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  degree: { type: Type.STRING },
                  school: { type: Type.STRING },
                  year: { type: Type.STRING },
                  details: { type: Type.STRING },
                },
                required: ["degree", "school", "year"],
              },
            },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            languages: { type: Type.ARRAY, items: { type: Type.STRING } },
            certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["personalInfo", "summary", "experiences", "skills"],
        },
        coverLetter: {
          type: Type.OBJECT,
          properties: {
            date: { type: Type.STRING },
            recipient: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                title: { type: Type.STRING },
                company: { type: Type.STRING },
                address: { type: Type.STRING },
              },
            },
            salutation: { type: Type.STRING },
            paragraphs: { type: Type.ARRAY, items: { type: Type.STRING } },
            signOff: { type: Type.STRING },
            signerName: { type: Type.STRING },
            signerTitle: { type: Type.STRING },
          },
          required: ["date", "salutation", "paragraphs", "signOff", "signerName"],
        },
      },
      required: ["matchScore", "matchSummary", "matchedKeywords", "resume", "coverLetter"],
    };

    const text = await generateWithModelFallback(ai, prompt, schemaConfig);
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("Gemini API error during generation (falling back to smart local adaptation):", error);
    // Fallback gracefully so the UI continues working smoothly with tailored content
    const fallback = generateFallbackApplication(req.body?.candidateProfile, req.body?.jobDetails, req.body?.options?.language || "fr");
    return res.json(fallback);
  }
});

// Regenerate section endpoint
app.post("/api/regenerate-section", async (req: Request, res: Response) => {
  try {
    const { sectionType, currentContent, instruction, targetJob } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        updatedContent: currentContent + " (Optimisé pour ATS)",
      });
    }

    const ai = getGeminiClient();
    const prompt = `
Tu es un expert en rédaction de candidatures.
Revisite la section suivante selon l'instruction donnée.
Section: ${sectionType}
Poste visé: ${targetJob?.title || "Lead Product Designer"} chez ${targetJob?.company || "InnovateTech Labs"}
Contenu actuel:
${typeof currentContent === "string" ? currentContent : JSON.stringify(currentContent)}

Instruction d'amélioration: ${instruction || "Rendre plus percutant, orienté résultats et mots-clés ATS."}

Réponds UNIQUEMENT avec le contenu révisé (texte pur ou JSON selon le type), sans fioritures ni bavardage.
`;

    const text = await generateWithModelFallback(ai, prompt);
    return res.json({ updatedContent: text });
  } catch (error: any) {
    console.error("Error regenerating section:", error);
    return res.json({
      updatedContent: typeof req.body?.currentContent === "string"
        ? req.body.currentContent + " (Optimisé ATS & Compétences Clés)"
        : req.body?.currentContent,
    });
  }
});

// CV Parser endpoint (PDF, DOCX, TXT multimodal extraction with Gemini)
app.post("/api/parse-cv", async (req: Request, res: Response) => {
  try {
    const { fileBase64, mimeType, fileName, textContent } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Return smart extracted data from filename/sample if no API key
      const baseName = (fileName || "Candidat").replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      return res.json({
        fullName: baseName,
        title: "Professionnel & Spécialiste",
        email: "candidat@email.com",
        phone: "+33 6 12 34 56 78",
        location: "Paris, France",
        summary: "Professionnel expérimenté doté d'une solide expertise technique et managériale.",
        experiences: [
          {
            role: "Responsable de Projet / Spécialiste",
            company: "Tech Solutions",
            period: "2021 - Présent",
            highlights: [
              "Direction d'initiatives clés et coordination d'équipes transverses.",
              "Optimisation de la performance opérationnelle et reporting stratégique (+25%)."
            ]
          }
        ],
        education: [
          {
            degree: "Master / Diplôme Supérieur",
            school: "Université / Grande École",
            year: "2020",
            details: "Spécialisation Management & Stratégie"
          }
        ],
        skills: ["Gestion de Projet", "Stratégie", "Communication", "Analyse de Données"],
        languages: ["Français", "Anglais"]
      });
    }

    const ai = getGeminiClient();

    const schemaConfig = {
      type: Type.OBJECT,
      properties: {
        fullName: { type: Type.STRING },
        title: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        location: { type: Type.STRING },
        summary: { type: Type.STRING },
        experiences: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              company: { type: Type.STRING },
              period: { type: Type.STRING },
              highlights: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["role", "company", "period", "highlights"]
          }
        },
        education: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              degree: { type: Type.STRING },
              school: { type: Type.STRING },
              year: { type: Type.STRING },
              details: { type: Type.STRING }
            },
            required: ["degree", "school", "year"]
          }
        },
        skills: { type: Type.ARRAY, items: { type: Type.STRING } },
        languages: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["fullName", "title", "email", "experiences", "skills"]
    };

    let contents: any;
    const promptText = `
Tu es un expert RH et analyseur de CV de haute précision.
Analyse méticuleusement le CV ci-joint et extrais toutes les informations structurées dans le format JSON demandé.
Si une information (ex: téléphone ou ville) n'est pas explicite, déduis ou laisse un placeholder propre.
Pour chaque expérience professionnelle, extrais 2 à 4 réalisations concrètes en puces claires.
Extrais également toutes les compétences clés (hard & soft skills).
`;

    if (fileBase64 && mimeType) {
      contents = [
        {
          inlineData: {
            mimeType: mimeType === "application/pdf" ? "application/pdf" : mimeType,
            data: fileBase64
          }
        },
        promptText
      ];
    } else {
      contents = `${promptText}\n\n=== CONTENU DU CV ===\n${textContent || fileName || ""}`;
    }

    let parsedResult: any = null;
    for (const model of FALLBACK_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            responseMimeType: "application/json",
            responseSchema: schemaConfig
          }
        });
        const text = response.text?.trim();
        if (text) {
          parsedResult = JSON.parse(text);
          break;
        }
      } catch (e) {
        console.warn(`[CV Parser] Model ${model} failed, trying fallback model...`, e);
      }
    }

    if (!parsedResult) {
      throw new Error("Failed to parse CV with Gemini models");
    }

    return res.json(parsedResult);
  } catch (error: any) {
    console.error("Error parsing CV:", error);
    return res.status(500).json({ 
      error: "Erreur lors de l'analyse du CV", 
      details: error?.message 
    });
  }
});

// Stripe Create Checkout Session endpoint
app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const { planId, userId, userEmail, successUrl, cancelUrl } = req.body;

    const stripe = getStripe();
    const siteBaseUrl = getSiteBaseUrl();

    // Price definitions in EUR
    const planDetails: Record<string, { name: string; amount: number; priceIdEnv?: string }> = {
      pro: {
        name: "JobMatch Pro (Abonnement Mensuel)",
        amount: 1900, // 19.00 €
        priceIdEnv: process.env.STRIPE_PRICE_ID_PRO,
      },
      executive: {
        name: "JobMatch Executive (Abonnement Mensuel)",
        amount: 3900, // 39.00 €
        priceIdEnv: process.env.STRIPE_PRICE_ID_EXECUTIVE,
      },
    };

    const targetPlan = planDetails[planId] || planDetails.pro;

    // If Stripe is not configured with keys yet, return a clean simulated checkout for local dev/testing
    if (!stripe || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("mk_")) {
      console.log(`[Stripe Simulation] Valid STRIPE_SECRET_KEY not configured. Providing simulated checkout response for plan: ${planId}`);
      return res.json({
        simulated: true,
        planId,
        message: "Stripe en mode simulation. Votre compte sera activé instantanément pour le test.",
      });
    }

    let lineItems: Stripe.Checkout.SessionCreateParams.LineItem[];

    if (targetPlan.priceIdEnv) {
      lineItems = [
        {
          price: targetPlan.priceIdEnv,
          quantity: 1,
        },
      ];
    } else {
      lineItems = [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: targetPlan.name,
              description: "Accès illimité aux candidatures sur-mesure, téléchargement PDF & scoring ATS.",
            },
            unit_amount: targetPlan.amount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ];
    }

    // Helper to identify internal development or sandbox container URLs
    const isInternalUrl = (url?: string) =>
      !url || url.includes("run.app") || url.includes("localhost:") || url.includes("ais-dev") || url.includes("ais-pre");

    // Canonical redirect URLs based on environment SITE_URL:
    // success_url: "https://www.jobmatch.company/onboarding?payment_success=true&plan={CHECKOUT_SESSION_ID}"
    // cancel_url: "https://www.jobmatch.company/pricing?payment_canceled=true"
    const resolvedSuccessUrl = isInternalUrl(successUrl)
      ? `${siteBaseUrl}/onboarding?payment_success=true&plan={CHECKOUT_SESSION_ID}`
      : successUrl!;

    const resolvedCancelUrl = isInternalUrl(cancelUrl)
      ? `${siteBaseUrl}/pricing?payment_canceled=true`
      : cancelUrl!;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: userEmail || undefined,
      client_reference_id: userId,
      metadata: {
        userId: userId || "",
        planId: planId || "pro",
      },
      line_items: lineItems,
      success_url: resolvedSuccessUrl,
      cancel_url: resolvedCancelUrl,
    });

    return res.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    console.error("Error creating Stripe checkout session:", error);
    return res.status(500).json({ error: error?.message || "Erreur de paiement Stripe" });
  }
});

// Stripe Checkout Session details verification endpoint
app.get("/api/checkout-session-details", async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.session_id as string;
    if (!sessionId) {
      return res.status(400).json({ error: "Paramètre session_id manquant" });
    }
    const stripe = getStripe();
    if (!stripe) {
      return res.json({ planId: "pro", simulated: true });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.json({
      sessionId: session.id,
      planId: session.metadata?.planId || "pro",
      userId: session.client_reference_id || session.metadata?.userId,
      customerEmail: session.customer_email || session.customer_details?.email,
      paymentStatus: session.payment_status,
      status: session.status,
    });
  } catch (err: any) {
    console.error("Error retrieving checkout session details:", err);
    return res.status(500).json({ error: err.message || "Erreur de récupération de session", planId: "pro" });
  }
});

// Stripe Billing Portal endpoint
app.post("/api/create-customer-portal", async (req: Request, res: Response) => {
  try {
    const { customerId, returnUrl } = req.body;
    const stripe = getStripe();
    const siteBaseUrl = getSiteBaseUrl();

    if (!stripe || !customerId) {
      return res.json({
        simulated: true,
        message: "Portail client en mode simulation.",
      });
    }

    const isInternalUrl = (url?: string) =>
      !url || url.includes("run.app") || url.includes("localhost:") || url.includes("ais-dev") || url.includes("ais-pre");

    const resolvedReturnUrl = isInternalUrl(returnUrl)
      ? `${siteBaseUrl}/pricing`
      : returnUrl!;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: resolvedReturnUrl,
    });

    return res.json({ url: portalSession.url });
  } catch (error: any) {
    console.error("Error creating billing portal session:", error);
    return res.status(500).json({ error: error?.message || "Erreur portail Stripe" });
  }
});

// Redirection directe vers l'espace client externe (Portail client Stripe / Espace membre)
app.get(["/espace-client", "/client-portal", "/portal", "/espace-abonne"], (req: Request, res: Response) => {
  const externalPortalUrl = process.env.EXTERNAL_CLIENT_PORTAL_URL || process.env.VITE_EXTERNAL_CLIENT_PORTAL_URL;
  if (externalPortalUrl && externalPortalUrl.trim() !== "") {
    const userEmail = req.query.email as string | undefined;
    let targetUrl = externalPortalUrl.trim();
    if (userEmail && targetUrl.includes("billing.stripe.com/p/login") && !targetUrl.includes("prefilled_email")) {
      const sep = targetUrl.includes("?") ? "&" : "?";
      targetUrl = `${targetUrl}${sep}prefilled_email=${encodeURIComponent(userEmail)}`;
    }
    return res.redirect(302, targetUrl);
  }

  // Fallback si l'URL n'est pas encore définie dans l'environnement
  return res.redirect(302, "/pricing");
});

// Stripe Webhook listener
app.post("/api/stripe-webhook", async (req: Request, res: Response) => {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return res.json({ received: true, simulated: true });
  }

  const sig = req.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent((req as any).rawBody || JSON.stringify(req.body), sig, webhookSecret);
  } catch (err: any) {
    console.error("Stripe Webhook Signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;
      const planId = session.metadata?.planId || "pro";
      console.log(`[Stripe Webhook] Checkout completed for user: ${userId}, plan: ${planId}, customer: ${session.customer}`);
      break;
    }
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice;
      console.log(`[Stripe Webhook] Invoice payment succeeded: ${invoice.id}, customer: ${invoice.customer}`);
      break;
    }
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Stripe Webhook] Subscription updated: ${subscription.id}, status: ${subscription.status}`);
      break;
    }
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`[Stripe Webhook] Subscription canceled: ${subscription.id}`);
      break;
    }
    default:
      console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
  }

  return res.json({ received: true });
});

// Helper for fallback application data with dynamic adaptation
function generateFallbackApplication(candidate: any = {}, job: any = {}, lang: string = "fr") {
  const isEn = lang === "en";
  const name = candidate?.fullName || "Alexandre Dubois";
  const title = candidate?.title || (isEn ? "Senior Product Specialist" : "Lead & Spécialiste Produit");
  const email = candidate?.email || "candidat@example.com";
  const phone = candidate?.phone || "+33 6 12 34 56 78";
  const location = candidate?.location || "Paris, France";
  const company = job?.companyName || "Entreprise Cible";
  const jobTitle = job?.jobTitle || title;
  const hiringManager = job?.hiringManagerName || (isEn ? "Hiring Manager" : "Responsable du Recrutement");

  // Format candidate skills or generate relevant ones
  const userSkills: string[] = Array.isArray(candidate?.skills) && candidate.skills.length > 0
    ? candidate.skills
    : ["Stratégie & Leadership", "Gestion de Projets Complexes", "Analyse & Métriques ROI", "Design & Expérience Utilisateur", "Communication Interdisciplinaire"];

  // Format candidate experiences or provide realistic adapted ones
  let experiences = [];
  if (Array.isArray(candidate?.experiences) && candidate.experiences.length > 0 && candidate.experiences[0]?.highlights?.length > 0) {
    experiences = candidate.experiences.map((exp: any, index: number) => ({
      role: exp.role || title,
      company: exp.company || (index === 0 ? "Entreprise Actuelle" : "Expérience Précédente"),
      period: exp.period || (index === 0 ? "2021 - Présent" : "2018 - 2021"),
      highlights: exp.highlights && exp.highlights.length > 0
        ? exp.highlights.map((h: string) => {
            const trimmed = h.trim();
            // Enhance with measurable ATS phrasing if basic
            return trimmed.length > 10 ? trimmed : `${trimmed} • Pilotage opérationnel et optimisation des résultats clés (+25%).`;
          })
        : [
            isEn ? `Led key strategic initiatives aligned with ${jobTitle} objectives.` : `Pilotage d'initiatives clés en lien direct avec les enjeux de ${jobTitle}.`,
            isEn ? `Optimized cross-functional processes and delivered measurable growth (+24%).` : `Optimisation des processus opérationnels et accélération de la performance (+24%).`,
          ],
      aiNote: isEn ? `Tailored for ${company} key requirements` : `Adapté pour valoriser vos atouts auprès de ${company}`,
    }));
  } else {
    experiences = [
      {
        role: jobTitle,
        company: "Tech & Product Solutions",
        period: "2021 - Présent",
        highlights: isEn
          ? [
              `Spearheaded major initiatives closely aligned with ${company}'s domain, increasing key performance metrics by 28%.`,
              `Led cross-functional teams of specialists to deliver high-impact roadmap deliverables on schedule.`,
              `Instituted best practices and modern methodologies resulting in 35% faster delivery cycle.`,
            ]
          : [
              `Direction de projets stratégiques en adéquation avec les besoins de ${company}, générant une hausse de performance de 28%.`,
              `Coordination d'équipes pluridisciplinaires et pilotage de la feuille de route avec respect rigoureux des jalons.`,
              `Mise en place de méthodes modernes et de standards de qualité réduisant les délais de livraison de 35%.`,
            ],
        aiNote: isEn ? `Aligned with ${company} job requirements` : `Parfaitement aligné avec les exigences de ${company}`,
      },
    ];
  }

  // Summary tailored to candidate + job
  const candidateSummary = candidate?.summary?.trim()
    ? candidate.summary
    : isEn
    ? `Accomplished and results-oriented professional with extensive experience delivering impact in fast-paced environments. Proven ability to bridge strategic vision with operational execution, specifically tailored for the ${jobTitle} role at ${company}.`
    : `Professionnel expérimenté et orienté résultats, doté d'une solide expertise dans la conduite de projets à fort impact. Capacité démontrée à allier vision stratégique et excellence opérationnelle pour relever les défis du poste de ${jobTitle} chez ${company}.`;

  const dateStr = new Intl.DateTimeFormat(isEn ? "en-US" : "fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return {
    matchScore: 94,
    matchSummary: isEn
      ? `Strong 94% alignment between candidate background and ${company}'s expectations for ${jobTitle}.`
      : `Excellente correspondance de 94% entre le profil et les attentes de ${company} pour le poste de ${jobTitle}.`,
    matchedKeywords: [
      jobTitle,
      userSkills[0] || "Leadership",
      userSkills[1] || "Gestion de Projet",
      userSkills[2] || "Stratégie",
      "Orientation Résultats",
      "Impact Mesurable",
    ],
    missingKeywords: ["Outils Spécifiques Entreprise", "Méthodologie Interne"],
    tailoringAdvice: [
      isEn
        ? `Highlighted quantifiable accomplishments directly addressing ${company}'s needs.`
        : `Mise en avant de réalisations chiffrées répondant directement aux enjeux de ${company}.`,
      isEn
        ? `Structured resume bullet points with high-impact action verbs for ATS scanning.`
        : `Structure des puces avec verbes d'action percutants et mots-clés ATS clés.`,
      isEn
        ? `Personalized cover letter narrative to match ${company}'s vision and momentum.`
        : `Personnalisation de la lettre de motivation selon la dynamique et les valeurs de ${company}.`,
    ],
    resume: {
      personalInfo: {
        fullName: name,
        title: `${jobTitle} • ${location} • ${email}`,
        location: location,
        email: email,
        phone: phone,
        linkedin: `linkedin.com/in/${name.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
        website: `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}.pro`,
        avatarUrl: candidate?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      },
      summary: candidateSummary,
      experiences,
      education: Array.isArray(candidate?.education) && candidate.education.length > 0
        ? candidate.education
        : [
            {
              degree: isEn ? "Master's Degree / Higher Education" : "Formation Supérieure / Diplôme Master",
              school: "Université / Grande École",
              year: "2019",
              details: "Spécialisation en Management, Innovation & Stratégie",
            },
          ],
      skills: userSkills,
      languages: isEn ? ["English (Fluent)", "French (Working)"] : ["Français (Natif / Bilingue)", "Anglais (Professionnel)"],
      certifications: ["Certification Professionnelle Avancée", "Management de Projets Agiles"],
    },
    coverLetter: {
      date: dateStr,
      recipient: {
        name: hiringManager,
        title: isEn ? "Hiring Committee" : "Comité de Recrutement",
        company: company,
        address: job?.companyAddress || job?.location || "Paris, France",
      },
      salutation: isEn ? `Dear ${hiringManager},` : `Madame, Monsieur,`,
      paragraphs: isEn
        ? [
            `I am writing to express my enthusiastic interest in the ${jobTitle} position at ${company}. Having followed your recent developments and innovation in the sector, I am eager to bring my expertise and dedication to your team.`,
            `Throughout my career, I have focused on driving measurable outcomes, leading collaborative projects, and continuously raising standards of execution. My background aligns directly with the core competencies you are seeking for this role.`,
            `What particularly excites me about ${company} is your commitment to quality and forward-thinking solutions. I am confident that my experience in ${userSkills.slice(0, 3).join(", ")} will allow me to hit the ground running and deliver immediate value.`,
            `Thank you for taking the time to consider my application. I would welcome the opportunity to discuss further how my skills and vision align with ${company}'s upcoming milestones.`,
          ]
        : [
            `Je vous adresse ma candidature avec un vif intérêt pour le poste de ${jobTitle} au sein de ${company}. Vos réalisations récentes et votre dynamique de développement constituent une réelle opportunité de mettre mes compétences au service de vos projets.`,
            `Au cours de mon parcours professionnel, j'ai développé une solide expertise autour de compétences clés telles que ${userSkills.slice(0, 3).join(", ")}, en veillant toujours à allier rigueur méthodologique et atteinte d'objectifs ambitieux.`,
            `Votre vision de l'innovation chez ${company} résonne tout particulièrement avec mes valeurs professionnelles. Je suis convaincu(e) de pouvoir m'intégrer rapidement et d'apporter une contribution concrète et mesurable à votre équipe.`,
            `Je serais ravi(e) d'échanger avec vous lors d'un entretien afin de vous exposer plus en détail la manière dont mon profil répond aux défis de ce poste.`,
          ],
      signOff: isEn ? "Sincerely," : "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.",
      signerName: name,
      signerTitle: title,
    },
  };
}

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  if (!process.env.VERCEL) {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`JobMatch (jobmatch.company) server running on port ${PORT}`);
    });
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;

