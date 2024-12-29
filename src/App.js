import './App.css';
import avatar from './assets/Avatar.jpg';
import WorkExperience from './components/workExperience';
import Links from './components/links';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="App gap-4">
      <header className="bio gap-2 flex flex-col sm:flex-row">
        <img src={avatar} className="avatar" alt="AI Generated Brandon Delagdo"></img>
        <div className="name-tag text-center sm:text-left flex flex-col gap-0">
          <h1>Brandon Delgado</h1>
          <h2>Senior Full Stack Software Engineer</h2>
        </div>
        <div className="links mt-2">
          <Links />
        </div>
      </header>
      <div className="about">
        <h4 className="heading">About</h4>
        <p className="about-body">I'm a Full Stack Engineer with expertise and certifications in frameworks and tools like React, Next.js, Redux, Node.js, Express, MedusaJS, Supabase, Chart.js, HTML, Tailwind CSS, JavaScript, and TypeScript. Always building.</p>
      </div>
      <div className="portfolio">
        <h4 className="heading">Proof of Work</h4>
        <Portfolio />
      </div>
      <div className="work-experience max-w-[500px] lg:max-w-[650px] xl:max-w-[800px] flex flex-col justify-center items-center">
        <h4 className="heading">Work Experience</h4>
        <WorkExperience />
      </div>
    </div>
  );
}

export default App;
