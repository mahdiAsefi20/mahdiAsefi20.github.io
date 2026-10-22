import type { ReactNode } from "react";

export const shell = "mx-auto w-full max-w-6xl px-5 sm:px-8";

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function SectionHeading({
  index,
  title,
  kicker,
  icon: Icon,
}: {
  index: string;
  title: string;
  kicker: string;
  icon: React.ElementType;
}) {
  return (
    <header className="mb-10 sm:mb-14">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface/70">
          <Icon size={17} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
        </div>
        <span className="mono text-xs font-medium tracking-[0.22em] text-accent">{index}</span>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
      </div>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">{title}</h2>
        <p className="max-w-sm text-sm text-ink-3 sm:text-right">{kicker}</p>
      </div>
    </header>
  );
}

export function Tag({
  children,
  interactive = false,
  className = "",
}: {
  children: ReactNode;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <span className={`chip ${interactive ? "chip-interactive" : ""} ${className}`}>{children}</span>
  );
}

export function BulletList({
  items,
  tone = "default",
}: {
  items: readonly string[];
  tone?: "default" | "quiet";
}) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className={`relative pl-5 text-sm leading-relaxed ${
            tone === "quiet" ? "text-ink-3" : "text-ink-2"
          }`}
        >
          <span
            className="absolute left-0 top-[0.6em] h-1 w-1 rounded-full bg-accent/60"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <div className={`hairline ${className}`} aria-hidden="true" />;
}

/** Small mono label used above values and metadata. */
export function MicroLabel({ children }: { children: ReactNode }) {
  return <span className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">{children}</span>;
}
