import { ArrowUpRight, Github } from "lucide-react";
import { profile, repositories } from "./content";
import { Reveal } from "./motion";
import { Section, SectionHeading, shell } from "./ui";

const languageColor: Record<string, string> = {
  Python: "#4b8bbe",
  Notebook: "#e0651b",
};

export function Work() {
  return (
    <Section id="work">
      <div className={shell}>
        <Reveal>
          <SectionHeading
            index="03"
            title="Open Source Work"
            kicker="Inspectable, not described — read the code yourself"
            icon={Github}
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="surface overflow-hidden">
            {/* Terminal-style header */}
            <div className="flex items-center gap-3 border-b border-line bg-canvas-2/60 px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
              </span>
              <span className="mono text-xs text-ink-3">
                <span className="text-accent/70">~</span>/mahdiAsefi20
              </span>
              <span className="mono ml-auto text-2xs uppercase tracking-[0.16em] text-ink-3">
                {repositories.length} repositories
              </span>
            </div>

            {/* Repository grid */}
            <div className="grid gap-px bg-line md:grid-cols-2">
              {repositories.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col bg-canvas-2/70 p-6 transition-colors duration-200 hover:bg-elevated/80 sm:p-7"
                >
                  {repo.featured && (
                    <span
                      className="absolute inset-y-0 left-0 w-px bg-accent/50 transition-colors group-hover:bg-accent"
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <Github
                        size={14}
                        strokeWidth={1.7}
                        className="text-ink-3 transition-colors group-hover:text-accent"
                        aria-hidden="true"
                      />
                      <h3 className="mono text-sm font-medium tracking-tight text-ink transition-colors group-hover:text-accent">
                        {repo.name}
                      </h3>
                    </div>
                    <span className="mono inline-flex shrink-0 items-center gap-1.5 text-2xs text-ink-3">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: languageColor[repo.language] ?? "#7e8fa7" }}
                        aria-hidden="true"
                      />
                      {repo.language}
                    </span>
                  </div>

                  <p className="mt-4 text-sm font-medium leading-relaxed text-ink">
                    {repo.summary}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-3">{repo.detail}</p>

                  {repo.files && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {repo.files.map((file) => (
                        <span
                          key={file}
                          className="mono rounded-md border border-line bg-canvas/60 px-2 py-1 text-2xs text-ink-3"
                        >
                          {file}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="mono mt-auto inline-flex items-center gap-1.5 pt-5 text-2xs uppercase tracking-[0.14em] text-ink-3 transition-colors group-hover:text-accent">
                    View repository
                    <ArrowUpRight
                      size={12}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 py-1.5 text-sm text-ink-2 transition-colors hover:text-accent"
          >
            <span className="mono text-xs uppercase tracking-[0.16em]">All repositories</span>
            <ArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
