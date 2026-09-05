/**
 * @file portalService.ts
 * @description Gestion de la redirection vers l'espace client externe (Portail client Stripe / Espace membre)
 */

/**
 * Récupère l'URL de l'espace client externe configurée dans les variables d'environnement.
 * Si l'URL n'est pas encore renseignée, redirige vers la route serveur /espace-client qui gère le fallback.
 */
export const getExternalClientPortalUrl = (userEmail?: string): string => {
  const configuredUrl = import.meta.env.VITE_EXTERNAL_CLIENT_PORTAL_URL;

  if (configuredUrl && typeof configuredUrl === "string" && configuredUrl.trim() !== "") {
    let finalUrl = configuredUrl.trim();
    // Support pré-remplissage email pour Stripe Customer Portal link
    if (userEmail && finalUrl.includes("billing.stripe.com/p/login") && !finalUrl.includes("prefilled_email")) {
      const sep = finalUrl.includes("?") ? "&" : "?";
      finalUrl = `${finalUrl}${sep}prefilled_email=${encodeURIComponent(userEmail)}`;
    }
    return finalUrl;
  }

  // Route serveur interne qui redirige automatiquement (HTTP 302) vers EXTERNAL_CLIENT_PORTAL_URL
  if (userEmail) {
    return `/espace-client?email=${encodeURIComponent(userEmail)}`;
  }
  return "/espace-client";
};

/**
 * Déclenche la redirection vers l'espace client externe.
 * Ouvre dans un nouvel onglet par défaut pour préserver la session de travail de l'utilisateur sur JobMatch.
 */
export const redirectToExternalClientPortal = (userEmail?: string, openInNewTab = true): void => {
  const url = getExternalClientPortalUrl(userEmail);
  if (openInNewTab && (url.startsWith("http://") || url.startsWith("https://"))) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = url;
  }
};
