"use client";

import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "./motion";

export function ScrollTop() {
  const progress = useScrollProgress();

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="no-print group fixed bottom-6 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-canvas-2/90 text-ink-3 backdrop-blur transition-[color,border-color,transform] duration-200 hover:border-accent/40 hover:text-accent sm:right-8"
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(148,163,184,0.14)" strokeWidth="1.5" />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 22}
          strokeDashoffset={2 * Math.PI * 22 * (1 - progress / 100)}
        />
      </svg>
      <ArrowUp size={17} strokeWidth={1.9} className="relative" aria-hidden="true" />
    </button>
  );
}
