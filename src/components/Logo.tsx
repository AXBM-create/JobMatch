import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showBadge?: boolean;
  className?: string;
  variant?: "dark" | "light";
}

export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  showBadge = true,
  className = "",
  variant = "dark",
}) => {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
    xl: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Visual Emblem */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 group`}>
        {/* Glow ambient on hover */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl blur-xs opacity-25 group-hover:opacity-50 transition duration-300" />
        
        {/* Main Icon Container */}
        <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-[1px] shadow-md border border-slate-700/50 flex items-center justify-center overflow-hidden">
          {/* Internal subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-teal-400/20" />
          
          {/* Precision Match Hex Target SVG */}
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5/6 h-5/6 drop-shadow-xs"
          >
            <defs>
              <linearGradient id="logoEmeraldGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#34d399" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* Geometric Career Precision Hexagon */}
            <path
              d="M7 11.5L16 6.5L25 11.5V20.5L16 25.5L7 20.5V11.5Z"
              stroke="url(#logoEmeraldGrad)"
              strokeWidth="2"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Matching Intersection Structure (Target Core) */}
            <path
              d="M11 15L16 18.5L21 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 18.5V23"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            
            {/* Precision Center Node */}
            <circle cx="16" cy="11.5" r="2" fill="#34d399" />
          </svg>
        </div>
      </div>

      {/* Typography Brand Name: JobMatch */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight ${textSizes[size]} ${
                variant === "dark" ? "text-slate-900" : "text-white"
              }`}
            >
              JobMatch
            </span>
            {showBadge && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 uppercase tracking-wide">
                Pro
              </span>
            )}
          </div>
          <span className="text-[10px] text-slate-400 font-medium tracking-wide">
            Candidatures & CV ATS
          </span>
        </div>
      )}
    </div>
  );
};
