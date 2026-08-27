import React, { useState } from "react";

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  quality?: number;
  className?: string;
  sizes?: string;
  aspectRatio?: string;
}

/**
 * Standard Next/Image compatible component for Core Web Vitals optimization:
 * - Lazy loading with native `loading="lazy"` & `decoding="async"`
 * - Priority support with `fetchPriority="high"` for LCP optimization
 * - Explicit aspect ratio & dimensions to eliminate Cumulative Layout Shift (CLS)
 * - Automatic Unsplash / CDN optimization (auto-format WebP/AVIF, responsive width)
 * - Skeleton pulse effect during load
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 80,
  className = "",
  aspectRatio,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  style,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-optimize Unsplash URLs for WebP/AVIF and proper dimensions
  let optimizedSrc = src;
  if (src && src.includes("images.unsplash.com")) {
    try {
      const url = new URL(src);
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("q", quality.toString());
      if (width && typeof width === "number") {
        url.searchParams.set("w", (width * 2).toString());
      }
      optimizedSrc = url.toString();
    } catch {
      optimizedSrc = src;
    }
  }

  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(aspectRatio ? { aspectRatio } : {}),
  };

  return (
    <div
      className={`relative overflow-hidden inline-block ${className}`}
      style={combinedStyle}
    >
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        referrerPolicy="no-referrer"
        {...rest}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200/70 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
