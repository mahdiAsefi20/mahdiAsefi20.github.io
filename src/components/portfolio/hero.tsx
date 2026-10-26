"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { heroRoles, heroStats, profile } from "./content";
import { useReducedMotion } from "./motion";
import { shell } from "./ui";

const TYPE_MS = 45; // one character per tick
const HOLD_MS = 1700; // pause once a word is fully typed
const GAP_MS = 320; // pause between erasing and the next word

type Phase = "type" | "hold" | "erase" | "gap";

/**
 * Types each word, holds it, erases it, then moves to the next — forever.
 *
 * Driven by ONE interval that advances a state machine held in a ref. The
 * previous version chained setTimeout calls off an effect keyed on the typed
 * text, which meant the effect had to re-run to keep the loop alive; any
 * missed re-run left the line permanently blank.
 */
function useTypewriter(words: string[], reduced: boolean) {
  const [text, setText] = useState("");
  const state = useRef({ word: 0, char: 0, phase: "type" as Phase, nextAt: 0 });

  useEffect(() => {
    // With reduced motion every role is rendered statically instead.
    if (reduced) return;

    const s = state.current;
    s.word = 0;
    s.char = 0;
    s.phase = "type";
    s.nextAt = performance.now();

    const id = setInterval(() => {
      const now = performance.now();
      if (now < s.nextAt) return;

      const word = words[s.word];

      if (s.phase === "type") {
        if (s.char < word.length) {
          s.char += 1;
          setText(word.slice(0, s.char));
        } else {
          s.phase = "hold";
          s.nextAt = now + HOLD_MS;
        }
        return;
      }

      if (s.phase === "hold") {
        s.phase = "erase";
        return;
      }

      if (s.phase === "erase") {
        if (s.char > 0) {
          s.char -= 1;
          setText(word.slice(0, s.char));
        } else {
          s.phase = "gap";
          s.nextAt = now + GAP_MS;
        }
        return;
      }

      // gap -> next word
      s.word = (s.word + 1) % words.length;
      s.char = 0;
      s.phase = "type";
    }, TYPE_MS);

    return () => clearInterval(id);
  }, [words, reduced]);

  return reduced ? words.join(" · ") : text;
}

export function Hero() {
  const reduced = useReducedMotion();
  const typed = useTypewriter(heroRoles, reduced);

  return (
    <header id="hero" className="relative isolate overflow-hidden">
      {/* Ambient layers — static, one slow animation */}
      <div className="aurora" aria-hidden="true" />
      <div className="grid-backdrop" aria-hidden="true" />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-base"
        aria-hidden="true"
      />

      <div className={`${shell} relative pt-32 pb-16 sm:pt-40 sm:pb-24`}>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* ── Copy ── */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-accent" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span className="mono text-2xs font-medium uppercase tracking-[0.18em] text-accent">
                Open to new roles
              </span>
            </div>

            <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.035em] text-gradient sm:text-6xl lg:text-[4.25rem]">
              {profile.name}
            </h1>

            <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="mono text-sm font-medium uppercase tracking-[0.14em] text-accent">
                {profile.position}
              </span>
              <span className="h-4 w-px bg-line-strong" aria-hidden="true" />
              <span className="mono text-sm text-ink-2">
                {typed}
                {!reduced && <span className="caret" aria-hidden="true" />}
              </span>
            </div>

            <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">
              {profile.summary}
            </p>

            {/* ── CTAs ── */}
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={profile.cvPath}
                download
                className="group inline-flex items-center gap-2.5 rounded-xl bg-accent-2 px-6 py-3 text-sm font-semibold text-accent-ink shadow-[0_10px_36px_-16px_rgba(45,212,191,0.85)] transition-[background-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_14px_44px_-14px_rgba(45,212,191,0.95)]"
              >
                <Download size={15} strokeWidth={2} />
                Download CV
              </a>
              <a
                href="#work"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-line-strong px-6 py-3 text-sm font-medium text-ink transition-[border-color,background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent"
              >
                See the work
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* ── Verified metrics ── */}
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="bg-canvas-2/80 px-4 py-4">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="mono block text-2xl font-semibold tracking-tight text-ink">
                      {stat.value}
                    </span>
                    <span className="mt-1.5 block text-xs leading-snug text-ink-3">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-2 text-xs text-ink-3">
              <MapPin size={13} strokeWidth={1.6} className="text-accent/70" />
              {profile.location}
              <span
                className="inline-block h-1 w-1 rounded-full bg-line-strong align-middle"
                aria-hidden="true"
              />
              <span>Open to remote roles</span>
            </div>
          </div>

          {/* ── Portrait ── */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <div className="relative mx-auto max-w-[15rem] sm:max-w-xs lg:max-w-none">
              <div
                className="absolute -inset-5 rounded-[2.25rem] bg-accent/12 blur-3xl"
                aria-hidden="true"
              />
              <div className="relative rounded-[1.75rem] border border-line bg-surface/70 p-1.5 backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.4rem] bg-canvas-2">
                  <img
                    src="/profile.png"
                    alt={`Portrait of ${profile.name}`}
                    width={520}
                    height={650}
                    loading="eager"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-top"
                  />
                </div>
              </div>

              {/* Floating credential card */}
              <div className="absolute -bottom-6 -left-4 rounded-xl border border-line bg-canvas-2/95 px-4 py-3 shadow-lift backdrop-blur sm:-left-8">
                <div className="flex items-center gap-2">
                  <Sparkles size={13} className="text-accent" />
                  <span className="mono text-2xs uppercase tracking-[0.16em] text-ink-3">
                    M.Sc. AI · 2026
                  </span>
                </div>
                <p className="mt-1.5 text-xs leading-snug text-ink-2">
                  Thesis on deepfake detection
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
