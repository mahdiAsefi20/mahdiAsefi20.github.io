import { GraduationCap } from "lucide-react";
import { education } from "./content";
import { Reveal } from "./motion";
import { Section, SectionHeading, shell } from "./ui";

export function Education() {
  return (
    <Section id="education">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="05"
            title="Education"
            kicker="M.Sc. in progress · B.Sc. completed"
            icon={GraduationCap}
          />
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={item.degree} delay={index * 80}>
              <article className="surface surface-hover flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="mono text-xs tracking-wide text-ink-3">{item.period}</span>
                  <span className="mono rounded-md border border-accent/25 bg-accent/[0.08] px-2.5 py-1 text-2xs font-medium text-accent">
                    {item.gpa}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">{item.degree}</h3>
                <p className="mt-1.5 text-sm font-medium text-accent/90">
                  {item.school}
                  <span
                    className="mx-2 inline-block h-1 w-1 rounded-full bg-line-strong align-middle"
                    aria-hidden="true"
                  />
                  <span className="font-normal text-ink-3">{item.location}</span>
                </p>

                {item.highlight && (
                  <p className="mt-4 rounded-lg border border-line bg-canvas/60 px-3.5 py-2.5 text-sm text-ink-2">
                    <span className="mono mr-2 text-2xs uppercase tracking-[0.14em] text-accent/80">
                      Thesis
                    </span>
                    {item.highlight}
                  </p>
                )}

                {item.note && <p className="mt-4 text-sm leading-relaxed text-ink-2">{item.note}</p>}

                <p className="mt-auto pt-5 text-xs leading-relaxed text-ink-3">{item.supervisors}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
