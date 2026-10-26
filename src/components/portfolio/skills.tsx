import { Layers } from "lucide-react";
import { domainSkills, languages, skillGroups } from "./content";
import { Reveal } from "./motion";
import { Section, SectionHeading, Tag, shell } from "./ui";

export function Skills() {
  const cells = [
    ...skillGroups.map((group) => ({
      category: group.category,
      note: group.note,
      items: group.items,
    })),
    {
      category: "Domain Expertise",
      note: "Problem areas, not just tools",
      items: domainSkills,
    },
  ];

  return (
    <Section id="skills">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="04"
            title="Skills & Stack"
            kicker="Technical skills"
            icon={Layers}
          />
        </Reveal>

        <div className="columns-1 gap-4 md:columns-2">
          {cells.map((group, index) => (
            <Reveal key={group.category} delay={index * 60} className="mb-4 break-inside-avoid">
              <div className="surface h-full p-6 transition-colors duration-200 hover:border-line-strong sm:p-7">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
                    {group.category}
                  </h3>
                  <span className="mono text-2xs text-ink-3">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-xs text-ink-3">{group.note}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <Tag key={item} interactive>
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Languages ── */}
        <Reveal delay={80}>
          <div className="mt-8 flex flex-col gap-5 rounded-2xl border border-line bg-canvas-2/50 px-6 py-5 sm:flex-row sm:items-center sm:gap-10 sm:px-7">
            <span className="mono text-2xs font-medium uppercase tracking-[0.16em] text-ink-3">
              Languages
            </span>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-10">
              {languages.map((language) => (
                <div key={language.name} className="flex items-baseline gap-2.5">
                  <span className="text-sm font-medium text-ink">{language.name}</span>
                  <span className="text-xs text-ink-3">{language.level}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
