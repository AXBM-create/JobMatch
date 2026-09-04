#!/usr/bin/env node

/**
 * CLI Tool to notify IndexNow (Bing, Yandex, Seznam, etc.) of URL updates
 * Usage:
 *   node scripts/notify-indexnow.mjs
 *   node scripts/notify-indexnow.mjs https://www.jobmatch.company/guide-cv-ats
 *   node scripts/notify-indexnow.mjs /cv-developpeur /cv-commercial
 */

const INDEXNOW_KEY = "f28a93e1b7c4495cb2e1398d5a71df89";
const INDEXNOW_HOST = "www.jobmatch.company";
const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

const defaultUrls = [
  "https://www.jobmatch.company/",
  "https://www.jobmatch.company/guide-cv-ats",
  "https://www.jobmatch.company/cv-developpeur",
  "https://www.jobmatch.company/cv-commercial",
  "https://www.jobmatch.company/cv-sante",
  "https://www.jobmatch.company/guides",
  "https://www.jobmatch.company/pricing",
  "https://www.jobmatch.company/test-score-ats",
  "https://www.jobmatch.company/onboarding"
];

const cliArgs = process.argv.slice(2);
const urls = cliArgs.length > 0
  ? cliArgs.map(u => u.startsWith("http") ? u : `https://${INDEXNOW_HOST}${u.startsWith("/") ? "" : "/"}${u}`)
  : defaultUrls;

const payload = {
  host: INDEXNOW_HOST,
  key: INDEXNOW_KEY,
  keyLocation: INDEXNOW_KEY_LOCATION,
  urlList: Array.from(new Set(urls))
};

console.log(`[IndexNow] Submitting ${payload.urlList.length} URLs for instant crawler dispatch...`);
console.log(`[IndexNow] Key Location: ${INDEXNOW_KEY_LOCATION}`);

fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "User-Agent": "JobMatch-IndexNow-Notifier/1.0"
  },
  body: JSON.stringify(payload)
})
  .then(async (res) => {
    const text = await res.text();
    if (res.status >= 200 && res.status < 300) {
      console.log(`✅ [IndexNow SUCCESS HTTP ${res.status}] IndexNow successfully registered URLs:`);
      payload.urlList.forEach(u => console.log(`   - ${u}`));
    } else {
      console.error(`❌ [IndexNow ERROR HTTP ${res.status}] ${text || "Submission failed"}`);
    }
  })
  .catch((err) => {
    console.error(`❌ [IndexNow ERROR] Network exception:`, err.message);
  });
