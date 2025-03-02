import './App.css';
import avatar from './assets/Avatar.jpg';
import WorkExperience from './components/workExperience';
import Links from './components/links';
import Portfolio from './components/Portfolio';

function App() {

  return (
      <div className={`App gap-4 bg-black text-stone-100`}>
        <header className="bio gap-2 flex flex-col sm:flex-row">
          <img src={avatar} className="avatar sm:mr-5" alt="AI Generated Brandon Delagdo"></img>
          <div className="name-tag text-center sm:text-left flex flex-col gap-0">
            <h1>Brandon Delgado</h1>
            <h2 className="text-stone-400">Senior Full Stack Software Engineer</h2>
          </div>
          <div className="links mt-2">
            <Links />
          </div>
        </header>
        <div className="about">
          <h4 className="heading font-bold">About</h4>
          <p className="about-body text-stone-400">Senior Full Stack Engineer with expertise in modern web architecture and a passion for creating elegant, high-performance applications. Specializing in React/Redux ecosystems, TypeScript, Node.js backends, and cloud infrastructure with Supabase. Experienced in leading technical projects, optimizing data operations, and delivering scalable solutions across e-commerce, fintech, and marketing sectors. Committed to clean code and continuous learning.</p>
        </div>
        <div className="portfolio">
          <h4 className="heading font-bold">Proof of Work</h4>
          <Portfolio />
        </div>
        <div className="work-experience max-w-[500px] lg:max-w-[650px] xl:max-w-[800px] flex flex-col justify-center items-center">
          <h4 className="heading font-bold">Work Experience</h4>
          <WorkExperience />
        </div>
      </div>
  );
}

export default App;
