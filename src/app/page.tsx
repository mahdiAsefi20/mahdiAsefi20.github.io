import { Contact } from "@/components/portfolio/contact";
import { Education } from "@/components/portfolio/education";
import { Experience } from "@/components/portfolio/experience";
import { Footer } from "@/components/portfolio/footer";
import { Hero } from "@/components/portfolio/hero";
import { Nav } from "@/components/portfolio/nav";
import { Position } from "@/components/portfolio/position";
import { Research } from "@/components/portfolio/research";
import { ScrollTop } from "@/components/portfolio/scroll-top";
import { Skills } from "@/components/portfolio/skills";
import { Work } from "@/components/portfolio/work";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-canvas font-sans text-ink-2">
      <div className="grain" aria-hidden="true" />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Position />
        <Experience />
        <Work />
        <Skills />
        <Education />
        <Research />
        <Contact />
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}
