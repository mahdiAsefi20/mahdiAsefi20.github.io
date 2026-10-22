import { Beaker } from "lucide-react";
import { research, teaching } from "./content";
import { Reveal } from "./motion";
import { BulletList, Section, SectionHeading, shell } from "./ui";

export function Research() {
  return (
    <Section id="research">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="06"
            title="Research"
            kicker="Supervised research experience — currently in progress"
            icon={Beaker}
          />
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ── Research projects ── */}
          <div className="lg:col-span-2">
            <ul className="space-y-4">
              {research.map((item, index) => (
                <Reveal key={item.title} delay={index * 70} as="li">
                  <article className="surface surface-hover p-6 sm:p-7">
                    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                      <h3 className="text-base font-semibold tracking-tight text-ink">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {item.status && (
                          <span className="mono rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-2xs font-medium uppercase tracking-[0.14em] text-accent">
                            {item.status}
                          </span>
                        )}
                        <span className="mono text-2xs text-ink-3">{item.period}</span>
                      </div>
                    </div>
                    <p className="mono mt-3 text-xs text-accent/80">{item.supervisor}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink-2">{item.description}</p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* ── Teaching ── */}
          <div>
            <Reveal delay={120} className="h-full">
              <article className="surface flex h-full flex-col p-6 sm:p-7">
                <span className="mono text-2xs font-medium uppercase tracking-[0.16em] text-accent">
                  {teaching.role}
                </span>
                <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-ink">
                  {teaching.course}
                </h3>
                <p className="mt-2 text-xs text-ink-3">
                  {teaching.school} · {teaching.period}
                </p>
                <p className="mt-1 text-xs text-ink-3">{teaching.supervisor}</p>
                <div className="mt-5 border-t border-line pt-4">
                  <BulletList items={teaching.highlights} tone="quiet" />
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
