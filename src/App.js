import './App.css';
import avatar from './assets/Avatar.jpg';
import footerImage from './assets/Techno-Individual-Landscape.png';
import WorkExperience from './components/workExperience';
import Projects from './components/projects';
import Links from './components/links';

function App() {
  return (
    <div className="App">
      <header className="bio">
        <img src={avatar} className="avatar" alt="AI Generated Brandon Delagdo"></img>
        <div className="name-tag">
          <h1>Brandon Delgado</h1>
          <h2>Software Engineer</h2>
          <h3>Techno-Optimist</h3>
        </div>
      </header>
      <div className="about">
        <h4 className="heading">About</h4>
        <p className="about-body">I'm certified in Front End Engineering with frameworks and tools like React, Redux, JavaScript and TypeScript. I'm currently working on becoming certified in Full Stack Engineering with frameworks like Express.js and Node.js so that I can independently build apps from start to finish. I freelance and work full-time. Always building.</p>
      </div>
      <div className="work-experience">
        <h4 className="heading">Work Experience</h4>
        <WorkExperience />
      </div>
      <div className="projects">
        <h4 className="heading">Projects</h4>
        <Projects />
      </div>
      <div className="links">
        <h4 className="heading">Links</h4>
        <Links />
      </div>
      <div className="image-container">
        <img src={footerImage} className="techno-individual" alt="AI Generated Rural Techno-Optimist Structure"></img>
      </div>
    </div>
  );
}

export default App;
