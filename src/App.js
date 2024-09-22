import './App.css';
import avatar from './assets/Avatar.jpg';
import WorkExperience from './components/workExperience';
import Links from './components/links';
import Portfolio from './components/Portfolio';

function App() {
  return (
    <div className="App">
      <header className="bio">
        <img src={avatar} className="avatar" alt="AI Generated Brandon Delagdo"></img>
        <div className="name-tag">
          <h1>Brandon Delgado</h1>
          <h2>Full-Stack Software Engineer</h2>
          <h3>Techno-Objectivist</h3>
        </div>
        <div className="links">
          <Links />
        </div>
      </header>
      <div className="about">
        <h4 className="heading">About</h4>
        <p className="about-body">I'm a Full Stack Engineer with expertise and certifications in frameworks and tools like React, Redux, Node.js, Express, MedusaJS, Supabase, Chart.js, HTML, Tailwind CSS, JavaScript, and TypeScript. Always building.</p>
      </div>
      <div className="portfolio">
        <h4 className="heading">Proof of Work</h4>
        <Portfolio />
      </div>
      <div className="work-experience">
        <h4 className="heading">Work Experience</h4>
        <WorkExperience />
      </div>
    </div>
  );
}

export default App;
