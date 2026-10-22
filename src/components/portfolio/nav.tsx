"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navLinks, profile } from "./content";
import { useActiveSection, useScrollProgress } from "./motion";
import { shell } from "./ui";

const sectionIds = navLinks.map((link) => link.id);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`no-print fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-line bg-canvas/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className={`${shell} flex h-16 items-center justify-between gap-6`}>
          <a href="#hero" className="group flex items-center gap-2.5" aria-label="Back to top">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 transition-colors group-hover:border-accent/60 group-hover:bg-accent/20">
              <span className="mono text-xs font-semibold text-accent">MA</span>
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-ink sm:inline">
              {profile.name}
            </span>
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    isActive ? "text-accent" : "text-ink-3 hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.cvPath}
              download
              className="hidden items-center gap-2 rounded-lg border border-line-strong px-3.5 py-2 text-[13px] font-medium text-ink transition-[border-color,color,background-color] duration-200 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent sm:inline-flex"
            >
              <Download size={13} strokeWidth={2} />
              CV
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-2 transition-colors hover:text-accent lg:hidden"
            >
              {open ? <X size={18} strokeWidth={1.7} /> : <Menu size={18} strokeWidth={1.7} />}
            </button>
          </div>
        </div>

        {/* Scroll progress hairline */}
        <div className="h-px w-full bg-transparent" aria-hidden="true">
          <div
            className="h-px bg-gradient-to-r from-accent-2 via-accent to-accent-3 transition-[width] duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        className={`no-print fixed inset-0 z-40 lg:hidden ${open ? "" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-canvas/90 backdrop-blur-md transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />
        <nav
          aria-label="Mobile"
          className={`absolute inset-x-0 top-16 border-b border-line bg-canvas px-5 py-6 transition-all duration-300 ${
            open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-3 text-sm transition-colors ${
                    active === link.id
                      ? "bg-accent/10 text-accent"
                      : "text-ink-2 hover:bg-white/[0.03] hover:text-ink"
                  }`}
                >
                  {link.label}
                  <span className="mono text-2xs text-ink-3">
                    {String(navLinks.indexOf(link) + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.cvPath}
            download
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-accent-2 px-5 py-3 text-sm font-semibold text-accent-ink"
          >
            <Download size={15} strokeWidth={2} />
            Download CV
          </a>
        </nav>
      </div>
    </>
  );
}
