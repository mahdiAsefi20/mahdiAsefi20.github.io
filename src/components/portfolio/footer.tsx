import { ArrowUp, ArrowUpRight, Download, Github, Linkedin, Mail, Send } from "lucide-react";
import { navLinks, profile, repositories } from "./content";
import { shell } from "./ui";

const socials = [
  { icon: Github, href: profile.github, label: "GitHub" },
  { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
  { icon: Send, href: profile.telegram, label: "Telegram" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="no-print relative border-t border-line">
      <div className={`${shell} py-14`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* ── Brand ── */}
          <div className="lg:col-span-4">
            <a href="#hero" className="inline-flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent/10">
                <span className="mono text-xs font-semibold text-accent">MA</span>
              </span>
              <span className="text-sm font-semibold tracking-tight text-ink">{profile.name}</span>
            </a>
            <p className="mono mt-4 max-w-xs text-xs leading-relaxed text-ink-3">
              {profile.positionLine}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-2">
              Building AI systems that survive contact with production.
            </p>
          </div>

          {/* ── Sections ── */}
          <div className="lg:col-span-2">
            <h2 className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">Sections</h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="inline-block py-1 text-sm text-ink-2 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Repositories ── */}
          <div className="lg:col-span-3">
            <h2 className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">
              Repositories
            </h2>
            <ul className="mt-4 space-y-2.5">
              {repositories.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 py-1 text-sm text-ink-2 transition-colors hover:text-accent"
                  >
                    <span className="mono">{repo.name}</span>
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Connect ── */}
          <div className="lg:col-span-3">
            <h2 className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">
              Connect
            </h2>
            <div className="mt-4 flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink-3 transition-[color,border-color,background-color] duration-200 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent"
                >
                  <Icon size={16} strokeWidth={1.7} />
                </a>
              ))}
            </div>
            <a
              href={profile.cvPath}
              download
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-line-strong px-4 py-2.5 text-sm font-medium text-ink transition-[border-color,color,background-color] duration-200 hover:border-accent/40 hover:bg-accent/[0.06] hover:text-accent"
            >
              <Download size={14} strokeWidth={2} />
              Download CV
            </a>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-3">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="mono text-2xs text-ink-3">
            Last updated: October 2026 · Built with Next.js &amp; Tailwind CSS
          </p>
          <a
            href="#hero"
            className="group mono inline-flex items-center gap-1.5 py-1.5 text-2xs uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-accent"
          >
            <ArrowUp
              size={12}
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
