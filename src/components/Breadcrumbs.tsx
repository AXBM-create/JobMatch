import React, { useEffect } from "react";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "../seo/metadata";

export interface BreadcrumbItem {
  name: string;
  url?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  // Always prepend "Accueil" if not present
  const allItems: BreadcrumbItem[] = [
    {
      name: "Accueil",
      url: `${SITE_URL}/`,
      onClick: items[0]?.name === "Accueil" ? items[0].onClick : undefined,
    },
    ...items.filter((item) => item.name.toLowerCase() !== "accueil"),
  ];

  // Generate & inject Schema.org BreadcrumbList JSON-LD
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": allItems.map((item, index) => {
        const fullUrl = item.url
          ? item.url.startsWith("http")
            ? item.url
            : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`
          : `${SITE_URL}/`;

        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": fullUrl,
        };
      }),
    };

    let script = document.getElementById("schema-breadcrumbs") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "schema-breadcrumbs";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);

    return () => {
      // Cleanup if unmounting
      const tag = document.getElementById("schema-breadcrumbs");
      if (tag) {
        tag.remove();
      }
    };
  }, [items]);

  return (
    <nav
      id="site-breadcrumbs"
      aria-label="Fil d'Ariane"
      className={`py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-xs text-slate-500 font-medium ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;

          return (
            <li key={`breadcrumb-${index}`} className="inline-flex items-center gap-1.5 sm:gap-2">
              {index > 0 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
              )}
              {isLast ? (
                <span
                  className="text-slate-800 font-semibold truncate max-w-[200px] sm:max-w-xs md:max-w-md"
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-[#1A3A5C] transition-colors cursor-pointer"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 text-slate-500 mr-0.5" aria-hidden="true" />}
                  <span>{item.name}</span>
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
