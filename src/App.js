import "./App.css";
import avatar from "./assets/Avatar.jpg";
import WorkExperience from "./components/workExperience";
import Links from "./components/links";
import Portfolio from "./components/Portfolio";
import ScrollProgress from "./components/ScrollProgress";
import { useState, useCallback, lazy, Suspense } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";

const Starfield = lazy(() => import("./components/Starfield"));

function App() {
  const [canvasReady, setCanvasReady] = useState(false);

  const aboutRef = useScrollReveal();
  const portfolioRef = useScrollReveal({ stagger: true });
  const experienceRef = useScrollReveal({ stagger: true });

  const handleCanvasReady = useCallback(() => {
    setCanvasReady(true);
  }, []);

  return (
    <div className="min-h-screen font-inter bg-bg-primary text-text-primary">
      <ScrollProgress />

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
        {/* Starfield Background */}
        <Suspense fallback={null}>
          <Starfield onReady={handleCanvasReady} />
        </Suspense>

        {/* CSS fallback gradient (hidden once canvas is ready) */}
        {!canvasReady && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.08) 0%, transparent 20%),
                   radial-gradient(circle at 60% 20%, rgba(253, 224, 71, 0.06) 0%, transparent 15%),
                   radial-gradient(circle at 80% 60%, rgba(251, 191, 36, 0.07) 0%, transparent 18%),
                   radial-gradient(circle at 40% 75%, rgba(254, 243, 199, 0.05) 0%, transparent 12%)`,
              zIndex: 0,
            }}
          />
        )}

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-center relative z-10">
          {/* Avatar */}
          <div className="flex justify-center items-center relative">
            <img
              src={avatar}
              className="w-48 h-48 lg:w-52 lg:h-52 rounded-full border border-[rgba(251,191,36,0.2)] object-cover transition-all duration-300 hover:scale-105 relative z-10"
              alt="Brandon Delgado - Senior Full Stack Software Engineer"
            />
            <div className="absolute inset-0 w-56 h-56 lg:w-60 lg:h-60 rounded-full bg-gradient-sunrise opacity-30 blur-3xl animate-pulse-glow -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
          </div>

          {/* Hero Text */}
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold leading-tight tracking-[-0.03em]">
              <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Brandon Delgado
              </span>
            </h1>
            <h2 className="text-xl lg:text-2xl font-medium text-text-secondary tracking-[-0.01em]">
              Senior Full Stack Software Engineer
            </h2>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
              Building software for a better future
            </p>
            <div className="mt-4">
              <Links />
            </div>
          </div>
        </div>
      </header>

      {/* Hero → Content Gradient Fade */}
      <div
        className="h-24 -mt-24 relative z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(251,191,36,0.06))",
        }}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        {/* About Section */}
        <section ref={aboutRef} className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4 tracking-[-0.02em]">
            <span className="w-10 h-px bg-gradient-to-r from-transparent via-[rgba(251,191,36,0.6)] to-transparent inline-block" />
            About Me
          </h2>
          <div className="glass-panel p-8 lg:p-12">
            <div className="max-w-4xl space-y-6">
              <p className="text-lg leading-relaxed text-white">
                Full-stack engineer with 6+ years building products from 0 to 1. I've worked across financial systems, crypto infrastructure, and consumer applications, including building the industry's first integration between a Bitcoin Mining-as-a-Service platform and the OCEAN decentralized mining pool. That kind of work shapes how I think about engineering: systems should be fast, transparent, and accessible to the people who depend on them.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                Deep expertise in TypeScript across the entire stack, from data model and API design to React on the frontend, with a track record of owning complex systems end-to-end at fast-scaling companies. I've shipped automated billing infrastructure, real-time financial data engines, distributed queue systems, and modular architecture migrations, all in environments where getting it wrong had real consequences. I've also completed certifications in Claude Code and LangChain, and use AI-assisted development tools as a core part of my daily engineering workflow.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                I believe we're living through one of the most consequential periods in human history. The companies building today, in energy, transportation, AI, space, financial infrastructure, and beyond, are laying the foundation for a genuinely better world. I want to spend my career writing the software that makes that future real.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4 tracking-[-0.02em]">
            <span className="w-10 h-px bg-gradient-to-r from-transparent via-[rgba(251,191,36,0.6)] to-transparent inline-block" />
            Portfolio
          </h2>
          <Portfolio />
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4 tracking-[-0.02em]">
            <span className="w-10 h-px bg-gradient-to-r from-transparent via-[rgba(251,191,36,0.6)] to-transparent inline-block" />
            Experience
          </h2>
          <WorkExperience />
        </section>
      </main>
    </div>
  );
}

export default App;
