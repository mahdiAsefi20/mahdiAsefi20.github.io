import { BrainCircuit, ScanEye, WandSparkles } from "lucide-react";
import { domainCards } from "./content";
import { Reveal } from "./motion";
import { Section, SectionHeading, shell } from "./ui";

const icons = {
  llm: BrainCircuit,
  cv: ScanEye,
  genai: WandSparkles,
} as const;

export function Position() {
  return (
    <Section id="position">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="01"
            title="Position"
            kicker="One role, three domains — each one shipped"
            icon={BrainCircuit}
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="max-w-3xl text-xl leading-relaxed text-ink sm:text-2xl sm:leading-[1.45]">
            Every system below is either running in production or written from scratch. Nothing here is
            adapted from a tutorial, and every claim links to the code that backs it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {domainCards.map((card, index) => {
            const Icon = icons[card.key];
            return (
              <Reveal key={card.key} delay={index * 90}>
                <article className="group surface surface-hover flex h-full flex-col p-6 sm:p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/20 bg-accent/[0.08] transition-colors duration-300 group-hover:border-accent/45 group-hover:bg-accent/[0.14]">
                      <Icon size={19} strokeWidth={1.6} className="text-accent" aria-hidden="true" />
                    </div>
                    <span className="mono text-2xs tracking-[0.2em] text-ink-3">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">{card.body}</p>

                  <div className="mt-6 border-t border-line pt-4">
                    <span className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">
                      Evidence
                    </span>
                    <p className="mono mt-2 text-xs leading-relaxed text-accent/85">{card.proof}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
