import { Briefcase } from "lucide-react";
import { experiences } from "./content";
import { Reveal } from "./motion";
import { BulletList, Section, SectionHeading, Tag, shell } from "./ui";

export function Experience() {
  return (
    <Section id="experience">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="02"
            title="Experience"
            kicker="Five roles across four years, shipping and scaling"
            icon={Briefcase}
          />
        </Reveal>

        <div className="relative">
          {experiences.map((exp, index) => (
            <Reveal key={`${exp.company}-${exp.period}`} delay={index * 70}>
              <article className="grid gap-3 pb-10 last:pb-0 sm:grid-cols-[8.5rem_1fr] sm:gap-10">
                {/* Period */}
                <div className="sm:pt-1">
                  <span className="mono text-xs tracking-wide text-ink-3">{exp.period}</span>
                </div>

                {/* Body */}
                <div className="relative">
                  <div
                    className="absolute -left-10 top-0 hidden h-full w-px bg-line sm:block"
                    aria-hidden="true"
                  />
                  <div
                    className={`absolute -left-11 top-6 hidden h-2 w-2 rounded-full sm:block ${
                      exp.current
                        ? "bg-accent shadow-[0_0_0_4px_rgba(45,212,191,0.14)]"
                        : "border border-line-strong bg-canvas"
                    }`}
                    aria-hidden="true"
                  />

                  <div
                    className={`surface p-5 sm:p-6 ${exp.current ? "surface-accent" : "surface-hover"}`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold tracking-tight text-ink">{exp.role}</h3>
                      {exp.current && (
                        <span className="mono inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-2xs font-medium uppercase tracking-[0.14em] text-accent">
                          <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="mt-1.5 text-sm font-medium text-accent/90">
                      {exp.company}
                      <span
                        className="mx-2 inline-block h-1 w-1 rounded-full bg-line-strong align-middle"
                        aria-hidden="true"
                      />
                      <span className="font-normal text-ink-3">{exp.location}</span>
                    </p>

                    <div className="mt-4">
                      <BulletList items={exp.highlights} />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
                      {exp.tech.map((tech) => (
                        <Tag key={tech}>{tech}</Tag>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
