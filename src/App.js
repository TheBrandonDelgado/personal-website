import './App.css';
import avatar from './assets/Avatar.jpg';
import WorkExperience from './components/workExperience';
import Links from './components/links';
import Portfolio from './components/Portfolio';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
      <div className={`min-h-screen font-inter transition-all duration-300 bg-bg-primary text-text-primary ${isDarkMode ? '' : 'light'}`} data-theme={isDarkMode ? 'dark' : 'light'}>
        {/* Theme Toggle */}
        <div className="fixed top-8 right-8 z-50 cursor-pointer transition-transform hover:scale-110" onClick={toggleTheme}>
          <div className={`w-10 h-10 rounded-full border-2 border-border flex items-center justify-center transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-slate-700 to-slate-600 shadow-glow-golden' 
              : 'bg-gradient-golden shadow-glow-golden-lg'
          }`}>
            <span className="text-xl transition-all duration-300">{isDarkMode ? '🚀' : '☀️'}</span>
          </div>
        </div>
        
        {/* Hero Section */}
        <header className={`min-h-screen flex items-center justify-center px-8 relative overflow-hidden ${
          isDarkMode 
            ? 'bg-hero-bg' 
            : 'bg-gradient-to-br from-white via-gray-50 to-gray-100'
        }`}>
          {/* Background Glow Effects - Only in dark mode */}
          {isDarkMode && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 30% 40%, rgba(251, 191, 36, 0.2) 0%, transparent 60%),
                  radial-gradient(circle at 70% 20%, rgba(253, 224, 71, 0.15) 0%, transparent 50%),
                  radial-gradient(circle at 50% 70%, rgba(254, 243, 199, 0.1) 0%, transparent 70%)
                `
              }}
            ></div>
          )}
          
          {/* Twinkling Stars - Only in dark mode */}
          {isDarkMode && (
            <div className="absolute inset-0 opacity-30 animate-twinkle pointer-events-none"
                 style={{
                   backgroundImage: `
                     radial-gradient(2px 2px at 20px 30px, rgba(251, 191, 36, 0.4), transparent),
                     radial-gradient(2px 2px at 40px 70px, rgba(253, 224, 71, 0.3), transparent),
                     radial-gradient(1px 1px at 90px 40px, rgba(254, 243, 199, 0.5), transparent),
                     radial-gradient(1px 1px at 130px 80px, rgba(251, 191, 36, 0.4), transparent),
                     radial-gradient(2px 2px at 160px 30px, rgba(253, 224, 71, 0.3), transparent),
                     radial-gradient(1px 1px at 180px 60px, rgba(254, 243, 199, 0.6), transparent)
                   `,
                   backgroundRepeat: 'repeat',
                   backgroundSize: '200px 100px'
                 }}>
            </div>
          )}
          
          {/* Light mode background effects */}
          {!isDarkMode && (
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 20% 30%, rgba(251, 191, 36, 0.08) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(253, 224, 71, 0.06) 0%, transparent 40%),
                  radial-gradient(circle at 60% 80%, rgba(254, 243, 199, 0.04) 0%, transparent 60%)
                `
              }}
            ></div>
          )}
          
          <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-12 items-center relative z-10">
            {/* Avatar */}
            <div className="flex justify-center items-center relative">
              <img 
                src={avatar} 
                className="w-48 h-48 lg:w-52 lg:h-52 rounded-full border-4 border-border object-cover transition-all duration-300 hover:scale-105 hover:border-space-primary relative z-10" 
                alt="Brandon Delgado - Senior Full Stack Software Engineer"
              />
              <div className="absolute inset-0 w-56 h-56 lg:w-60 lg:h-60 rounded-full bg-gradient-sunrise opacity-40 blur-3xl animate-pulse-glow -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"></div>
            </div>
            
            {/* Hero Text */}
            <div className="flex flex-col gap-4 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                  Brandon Delgado
                </span>
              </h1>
              <h2 className="text-xl lg:text-2xl font-medium text-text-secondary">
                Senior Full Stack Software Engineer
              </h2>
              <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
                Passionate about building innovative solutions that solve real-world problems. 
                Crafting elegant, high-performance applications with modern web technologies.
              </p>
              <div className="mt-4">
                <Links />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-8 py-16">
          {/* About Section */}
          <section className="mb-24 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4">
              <span className={`text-sm font-semibold text-space-primary px-4 py-2 rounded-full border-2 border-space-primary shadow-glow-golden relative overflow-hidden group hover:before:left-0 before:absolute before:inset-0 before:bg-gradient-primary before:opacity-10 before:-left-full before:transition-all before:duration-500 ${
                isDarkMode ? 'bg-gradient-space' : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}>
                01
              </span>
              About Me
            </h2>
            <div className="bg-bg-secondary p-8 lg:p-12 rounded-3xl border border-border relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-primary">
              <div className="max-w-4xl space-y-6">
                <p className="text-lg leading-relaxed text-white">
                  I'm a Senior Full Stack Software Engineer with a passion for building elegant, high-performance applications with modern web technologies.
                </p>
                <p className="text-lg leading-relaxed text-text-secondary">
                  My expertise spans React ecosystems, TypeScript, Node.js backends, and cloud infrastructure 
                  with Supabase. I've led technical projects that optimize data operations and deliver scalable 
                  solutions across e-commerce, fintech, and marketing sectors—always with a focus on clean code, 
                  and continuous learning.
                </p>
                {/* <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-space-primary/10 to-space-secondary/10 p-6 rounded-2xl border border-space-primary/20">
                    <p className="text-lg font-medium text-space-primary italic">
                      "The question isn't who is going to let me; it's who is going to stop me." 
                      <span className="text-text-secondary text-base not-italic ml-2">— Ayn Rand</span>
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-space-tertiary/10 to-space-quaternary/10 p-6 rounded-2xl border border-space-tertiary/20">
                    <p className="text-lg font-medium text-space-tertiary italic">
                      "Technology is the application of reason to the problem of survival." 
                      <span className="text-text-secondary text-base not-italic ml-2">— Ayn Rand</span>
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </section>

          {/* Philosophy Section */}
          <section className="mb-24 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4">
              <span className={`text-sm font-semibold text-space-primary px-4 py-2 rounded-full border-2 border-space-primary shadow-glow-golden relative overflow-hidden group hover:before:left-0 before:absolute before:inset-0 before:bg-gradient-primary before:opacity-10 before:-left-full before:transition-all before:duration-500 ${
                isDarkMode ? 'bg-gradient-space' : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}>
                02
              </span>
              Philosophy
            </h2>
            <div className="bg-bg-secondary p-8 lg:p-12 rounded-3xl border border-border relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-primary">
              <div className="max-w-5xl space-y-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl lg:text-3xl font-bold text-space-primary mb-4">
                    Growth Through Technology
                  </h3>
                  <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                    I believe in the power of technology to solve complex problems and create meaningful impact. 
                    Every line of code is an opportunity to build something that matters, every system a chance to make a difference.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-b from-space-primary/5 to-transparent rounded-2xl border border-space-primary/20">
                    <div className="text-4xl mb-4">🧠</div>
                    <h4 className="text-xl font-bold text-space-primary mb-3">Problem Solving</h4>
                    <p className="text-text-secondary">
                      Technology is the application of reason to solve problems and advance human flourishing.
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-b from-space-secondary/5 to-transparent rounded-2xl border border-space-secondary/20">
                    <div className="text-4xl mb-4">🚀</div>
                    <h4 className="text-xl font-bold text-space-secondary mb-3">Continuous Growth</h4>
                    <p className="text-text-secondary">
                      Every breakthrough in technology represents an opportunity to learn, improve, and deliver better results.
                    </p>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-b from-space-tertiary/5 to-transparent rounded-2xl border border-space-tertiary/20">
                    <div className="text-4xl mb-4">⚡</div>
                    <h4 className="text-xl font-bold text-space-tertiary mb-3">Innovation</h4>
                    <p className="text-text-secondary">
                      The future belongs to those who embrace new technologies and build solutions that make a real impact.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section className="mb-24 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4">
              <span className={`text-sm font-semibold text-space-primary px-4 py-2 rounded-full border-2 border-space-primary shadow-glow-golden relative overflow-hidden group hover:before:left-0 before:absolute before:inset-0 before:bg-gradient-primary before:opacity-10 before:-left-full before:transition-all before:duration-500 ${
                isDarkMode ? 'bg-gradient-space' : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}>
                03
              </span>
              Portfolio
            </h2>
            <Portfolio />
          </section>

          {/* Experience Section */}
          <section className="mb-24 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4">
              <span className={`text-sm font-semibold text-space-primary px-4 py-2 rounded-full border-2 border-space-primary shadow-glow-golden relative overflow-hidden group hover:before:left-0 before:absolute before:inset-0 before:bg-gradient-primary before:opacity-10 before:-left-full before:transition-all before:duration-500 ${
                isDarkMode ? 'bg-gradient-space' : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}>
                04
              </span>
              Experience
            </h2>
            <WorkExperience />
          </section>

          {/* Contact Section */}
          <section className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl lg:text-5xl font-bold mb-12 flex items-center gap-4">
              <span className={`text-sm font-semibold text-space-primary px-4 py-2 rounded-full border-2 border-space-primary shadow-glow-golden relative overflow-hidden group hover:before:left-0 before:absolute before:inset-0 before:bg-gradient-primary before:opacity-10 before:-left-full before:transition-all before:duration-500 ${
                isDarkMode ? 'bg-gradient-space' : 'bg-gradient-to-r from-gray-100 to-gray-200'
              }`}>
                05
              </span>
              Let's Connect
            </h2>
            <div className="bg-bg-secondary p-8 lg:p-12 rounded-3xl border border-border relative overflow-hidden text-center before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-primary">
              <div>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                  Let's Build the Future
                </h3>
                <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-2xl mx-auto">
                  I'm passionate about collaborating on innovative projects and solving complex technical challenges. 
                  Whether you're building the next breakthrough application or need expertise in modern web technologies, 
                  let's create something amazing together.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <a 
                    href="mailto:thebrandondelgado@gmail.com" 
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-golden-lg"
                  >
                    <FontAwesomeIcon icon={faEnvelope} />
                    Send Email
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/thebrandondelgado/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-3 px-8 py-4 rounded-full bg-transparent text-text-primary font-semibold text-lg border-2 border-border transition-all duration-300 hover:bg-bg-tertiary hover:border-space-primary hover:-translate-y-1 hover:shadow-glow-golden"
                  >
                    <FontAwesomeIcon icon={faLinkedin} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
}

export default App;
