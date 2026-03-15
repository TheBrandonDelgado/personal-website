import "./App.css";
import avatar from "./assets/Avatar.jpg";
import WorkExperience from "./components/workExperience";
import Links from "./components/links";
import Portfolio from "./components/Portfolio";
import ScrollProgress from "./components/ScrollProgress";
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useScrollReveal } from "./hooks/useScrollReveal";

const MeshGradient = lazy(() => import("./components/MeshGradient"));

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [webglReady, setWebglReady] = useState(false);

  const aboutRef = useScrollReveal();
  const portfolioRef = useScrollReveal({ stagger: true });
  const experienceRef = useScrollReveal({ stagger: true });

  const handleWebGLReady = useCallback(() => {
    setWebglReady(true);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen font-inter transition-colors duration-300 bg-bg-primary text-text-primary ${isDarkMode ? "" : "light"}`}
      data-theme={isDarkMode ? "dark" : "light"}
    >
      <ScrollProgress />

      {/* Theme Toggle */}
      <button
        className="fixed top-8 right-8 z-50 cursor-pointer transition-transform hover:scale-110"
        onClick={toggleTheme}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        <div
          className={`w-10 h-10 rounded-lg-token border border-[rgba(255,255,255,0.08)] flex items-center justify-center transition-all duration-300 ${
            isDarkMode
              ? "bg-[rgba(255,255,255,0.04)] backdrop-blur-sm shadow-glow-golden"
              : "bg-gradient-golden shadow-glow-golden-lg"
          }`}
        >
          <span className="text-xl transition-all duration-300">
            {isDarkMode ? "🚀" : "☀️"}
          </span>
        </div>
      </button>

      {/* Hero Section */}
      <header className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
        {/* WebGL Mesh Gradient Background */}
        <Suspense fallback={null}>
          <MeshGradient lightMode={!isDarkMode} onReady={handleWebGLReady} />
        </Suspense>

        {/* CSS fallback gradient (hidden once WebGL is ready) */}
        {!webglReady && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: isDarkMode
                ? `radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.2) 0%, transparent 60%),
                   radial-gradient(circle at 70% 20%, rgba(253, 224, 71, 0.15) 0%, transparent 50%),
                   radial-gradient(circle at 50% 70%, rgba(254, 243, 199, 0.1) 0%, transparent 70%)`
                : `radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.08) 0%, transparent 50%),
                   radial-gradient(circle at 80% 20%, rgba(253, 224, 71, 0.06) 0%, transparent 40%)`,
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
              Building products that people love
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
            "linear-gradient(to bottom, rgba(251,191,36,0.06), transparent)",
        }}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-16">
        {/* About Section */}
        <section ref={aboutRef} className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4 tracking-[-0.02em]">
            <span className="section-number font-mono text-sm font-semibold text-space-primary px-4 py-2 rounded-md-token border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.1)]">
              01
            </span>
            About Me
          </h2>
          <div className="glass-panel p-8 lg:p-12">
            <div className="max-w-4xl space-y-6">
              <p className="text-lg leading-relaxed text-white">
                I'm a Senior Full Stack Software Engineer who thrives on
                creating products that users can fall in love with.
              </p>
              <p className="text-lg leading-relaxed text-text-secondary">
                At Sazmining, I pioneered the industry's first Bitcoin Mining
                as a Service platform integrated with the OCEAN decentralized
                mining pool, delivering real-time transparency and
                non-custodial payouts using TypeScript, Supabase, and React. I
                design scalable systems, automate financial workflows with
                Node.js microservices, and lead teams to elevate engineering
                standards while mentoring others. I'm driven by a vision to
                build products that not only solve problems but also spark joy
                and advance human potential.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section ref={portfolioRef} className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4 tracking-[-0.02em]">
            <span className="section-number font-mono text-sm font-semibold text-space-primary px-4 py-2 rounded-md-token border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.1)]">
              02
            </span>
            Portfolio
          </h2>
          <Portfolio />
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} className="mb-16 lg:mb-32">
          <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4 tracking-[-0.02em]">
            <span className="section-number font-mono text-sm font-semibold text-space-primary px-4 py-2 rounded-md-token border border-[rgba(251,191,36,0.2)] bg-[rgba(251,191,36,0.1)]">
              03
            </span>
            Experience
          </h2>
          <WorkExperience />
        </section>
      </main>
    </div>
  );
}

export default App;
