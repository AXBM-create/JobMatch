/**
 * IndexNow Protocol Service for JobMatch (https://www.jobmatch.company)
 * Instant indexing notification for Bing, Yandex, Seznam, Naver and participating search engines.
 */

export const INDEXNOW_KEY = "f28a93e1b7c4495cb2e1398d5a71df89";
export const INDEXNOW_HOST = "www.jobmatch.company";
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

export interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

export interface IndexNowResult {
  success: boolean;
  status: number;
  message: string;
  submittedUrls: string[];
  timestamp: string;
}

/**
 * List of primary canonical URLs to notify IndexNow on new content deployment
 */
export const PRIMARY_INDEXNOW_URLS: string[] = [
  "https://www.jobmatch.company/",
  "https://www.jobmatch.company/guide-cv-ats",
  "https://www.jobmatch.company/cv-developpeur",
  "https://www.jobmatch.company/cv-commercial",
  "https://www.jobmatch.company/cv-sante",
  "https://www.jobmatch.company/guides",
  "https://www.jobmatch.company/pricing",
  "https://www.jobmatch.company/test-score-ats",
  "https://www.jobmatch.company/onboarding",
  "https://www.jobmatch.company/guides/comment-passer-les-filtres-ats",
  "https://www.jobmatch.company/guides/exemple-de-cv-optimise-ia",
  "https://www.jobmatch.company/guides/lettre-de-motivation-automatique-gratuite",
];

/**
 * Submit URLs to the IndexNow API
 */
export async function submitToIndexNow(
  urlsToSubmit: string[] = PRIMARY_INDEXNOW_URLS
): Promise<IndexNowResult> {
  const cleanUrls = Array.from(
    new Set(
      urlsToSubmit.map((u) => {
        if (!u.startsWith("http")) {
          return `https://${INDEXNOW_HOST}${u.startsWith("/") ? "" : "/"}${u}`;
        }
        return u;
      })
    )
  );

  const payload: IndexNowPayload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: cleanUrls,
  };

  try {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "User-Agent": "JobMatch-IndexNow-Client/1.0",
      },
      body: JSON.stringify(payload),
    });

    const success = response.status >= 200 && response.status < 300;
    let text = "";
    try {
      text = await response.text();
    } catch {
      text = "";
    }

    return {
      success,
      status: response.status,
      message: success
        ? `IndexNow accepted ${cleanUrls.length} URLs for immediate crawl dispatch.`
        : `IndexNow returned HTTP ${response.status}: ${text || "No response body"}`,
      submittedUrls: cleanUrls,
      timestamp: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error("Failed to ping IndexNow API:", error);
    return {
      success: false,
      status: 500,
      message: error?.message || "Network error while notifying IndexNow",
      submittedUrls: cleanUrls,
      timestamp: new Date().toISOString(),
    };
  }
}
