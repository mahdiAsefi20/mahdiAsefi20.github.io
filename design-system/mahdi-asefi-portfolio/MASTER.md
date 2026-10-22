# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/mahdi-asefi-portfolio/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Mahdi Asefi Portfolio
**Stack:** Next.js 16 (static export) · React 19 · Tailwind v4 · Lucide React
**Source of truth for tokens:** `src/app/globals.css` (`@theme` block)
**Source of truth for content:** `src/components/portfolio/content.ts` (mirrors `facts.md`)

---

## Direction

**Calm & Precise** — a dark, editorial, recruiter-facing portfolio.

- Dark-first, single accent (teal) used decisively rather than decoratively.
- Hairline structure over heavy shadows. One accent surface per view at most.
- **One motion per view.** No particle systems, no cursor glow, no layered parallax.
- Every claim links to inspectable evidence.
- Typography carries the hierarchy; colour only marks emphasis.

---

## Color Palette

| Role | Hex | CSS Variable | Tailwind class |
|------|-----|--------------|----------------|
| Canvas | `#060911` | `--color-canvas` | `bg-canvas` |
| Canvas raised | `#080d18` | `--color-canvas-2` | `bg-canvas-2` |
| Surface | `#0B1120` | `--color-surface` | `bg-surface` |
| Elevated | `#101827` | `--color-elevated` | `bg-elevated` |
| Hairline | `rgba(148,163,184,0.12)` | `--color-line` | `border-line` |
| Hairline strong | `rgba(148,163,184,0.24)` | `--color-line-strong` | `border-line-strong` |
| Ink (primary) | `#E8EEF8` | `--color-ink` | `text-ink` |
| Ink secondary | `#A6B4C9` | `--color-ink-2` | `text-ink-2` |
| Ink tertiary | `#7E8FA7` | `--color-ink-3` | `text-ink-3` |
| Accent | `#2DD4BF` | `--color-accent` | `text-accent` |
| Accent deep | `#14B8A6` | `--color-accent-2` | `bg-accent-2` |
| Accent light | `#34D399` | `--color-accent-3` | `text-accent-3` |
| On accent | `#042F2E` | `--color-accent-ink` | `text-accent-ink` |

### ⚠ Token naming hazard

Tailwind v4 resolves `text-<name>` as a **colour** when `--color-<name>` exists.
Defining a colour named `base` silently turned every `text-base` (font-size) into a
colour declaration. **Never name a theme colour after a Tailwind font-size scale step**
(`base`, `sm`, `lg`, `xl`…). Use a distinct prefix (`ink`, `canvas`, `accent`).

---

## Typography

- **Display & body:** Inter — `--font-sans`, weight 400–700.
- **Labels, metadata, code:** JetBrains Mono — `--font-mono`, weight 400–600.

Modular scale (do not introduce sizes outside it):

| Token | Size | Use |
|-------|------|-----|
| `text-2xs` | 11px | Mono micro-labels only |
| `text-xs` | 12px | Mono metadata, eyebrows |
| `text-sm` | 14px | Body, bullets, chips |
| `text-base` | 16px | Lead paragraphs |
| `text-lg` | 18px | Card titles |
| `text-xl` | 24px | Sub-headings |
| `text-2xl` | 32px | Section titles (mobile) |
| `text-3xl` | 44px | Section titles (desktop) |
| `text-4xl` | 60px | Hero name (desktop) |

Tracking: `-0.02em` on headings, `0.14–0.22em` on mono eyebrows.
Line height: 1.5 body, 1.02–1.1 hero.

> **Font variable hazard:** `next/font` variables must be applied to `<html>`, not
> `<body>`. `--font-sans` references `var(--font-inter)` from `:root`; if
> `--font-inter` is only defined on `<body>` the substitution fails at `:root` and the
> whole font stack silently degrades to the system UI font.

---

## Section Anatomy

Every section uses the same shell, so the page reads as one document:

```
[icon in 40px hairline square]  [01]  ————————— hairline —————————
Title (text-3xl/4xl)                          kicker (text-sm, right-aligned)
```

- `shell` = `mx-auto w-full max-w-6xl px-5 sm:px-8`
- Section rhythm: `py-16 sm:py-24`; heading block `mb-10 sm:mb-14`.
- Section order: Position → Experience → Open Source Work → Skills & Stack → Education → Research → Contact.

Each section gets a **distinct surface treatment** so the page never reads as one
repeated card grid:

| Section | Treatment |
|---------|-----------|
| Hero | Asymmetric split, aurora + grid backdrop, metric strip |
| Position | 3 domain cards with an "Evidence" footnote |
| Experience | Vertical rail, period in a left mono column, "Current" badge |
| Open Source Work | Terminal frame (`~/mahdiAsefi20`) containing a 2-column repo grid |
| Skills | Masonry columns of category cards, mono category labels |
| Education | 2-up cards, GPA as a chip (never a bar) |
| Research | Stacked cards + a sticky teaching card |
| Contact | Split — channel list left, message composer right |

---

## Components

```css
/* Card */
.surface { background: linear-gradient(180deg, rgba(23,33,51,.72), rgba(11,17,32,.72));
           border: 1px solid var(--border); border-radius: 1rem; backdrop-filter: blur(14px); }
.surface-hover:hover { border-color: var(--border-hover); transform: translateY(-2px);
                       box-shadow: var(--shadow-lift); }
.surface-accent { border-color: rgba(45,212,191,.24);
                  background: linear-gradient(180deg, rgba(20,184,166,.10), rgba(11,17,32,.85) 65%); }

/* Tag / chip */
.chip { font-family: var(--font-mono); font-size: 12px; padding: 7px 10px;
        border-radius: 8px; border: 1px solid var(--border);
        background: rgba(16,24,39,.6); color: var(--color-ink-2); }

/* Hairline rule — fades at both ends */
.hairline { height: 1px; background: linear-gradient(90deg, transparent, rgba(45,212,191,.35), transparent); }

/* Field */
.field { border-radius: 12px; padding: 12px 14px; font-size: 14px;
         background: rgba(16,24,39,.55); border: 1px solid rgba(148,163,184,.16); }
.field:focus { border-color: rgba(45,212,191,.6); box-shadow: 0 0 0 3px rgba(45,212,191,.10); }
```

**Buttons:** primary = `bg-accent-2` + `text-accent-ink`; secondary = transparent +
`border-line-strong` + `text-ink`. Hover lifts `-translate-y-0.5` and shifts the
border to the accent. All transitions 200–300ms.

**Focus:** `outline: 2px solid rgba(45,212,191,.85); outline-offset: 2px` on
`:focus-visible` for links, buttons, inputs, and anything with `tabindex`.

---

## Motion

| Token | Value |
|-------|-------|
| Duration | 200–300ms for state changes, 700ms for reveals |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` for entrances, `cubic-bezier(0.4,0,0.2,1)` for state |
| Reveal | `opacity 0 → 1` + `translateY(18px → 0)`, fired once by IntersectionObserver |
| Delay | 60–90ms stagger between siblings |

- Animate **transform and opacity only** — never `width`, `height`, `top` or `left`.
- `prefers-reduced-motion: reduce` kills all animation and the typewriter; the
  typewriter renders all three roles as static text.
- Scroll-reveal content is gated behind an `html.js` class set by an inline script in
  `layout.tsx`. Without JavaScript the content must remain visible.

---

## Content Rules

Content lives in `src/components/portfolio/content.ts` and mirrors `facts.md`.

- **No vanity metrics.** No proficiency bars, no skill percentages, no GPA bars.
  A number is shown only if `facts.md` confirms it.
- **No unverified quotes.** Testimonials were removed entirely — the Open Source
  Work section carries the proof instead.
- Retracted or contradicted claims must not appear. Period labels, dates and titles
  come from `facts.md`, not from the previous site copy.
- Every repository entry links to the real repository, not the profile.

---

## Anti-Patterns (Do NOT Use)

- ❌ Light mode default
- ❌ Slow performance
- ❌ Emojis as icons — use Lucide React
- ❌ Mixing icon families or mixing filled and outline at one hierarchy level
- ❌ Layout-shifting hovers
- ❌ Low contrast text — 4.5:1 minimum for body text, 3:1 for large text
- ❌ Instant state changes — always 150–300ms
- ❌ Invisible focus states
- ❌ Multiple simultaneous animations in one viewport
- ❌ Decorative separators rendered as text (use a shape, so they are exempt from contrast rules)
- ❌ Pointer targets under 24×24px

---

## Pre-Delivery Checklist

- [ ] No emojis used as icons
- [ ] All icons from Lucide React, consistent stroke width
- [ ] Hover states with smooth transitions (150–300ms)
- [ ] Text contrast ≥ 4.5:1 (3:1 for large text) in every state
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Pointer targets ≥ 24×24px
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind the fixed navbar
- [ ] No horizontal scroll on mobile
- [ ] Every claim traces back to `facts.md`
