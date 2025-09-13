import Link from 'next/link';
import data from '../data';

export default function ProjectsSection() {
  const projects = data.projects;

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>My Projects</h2>

        <div className="projects-grid">

            {projects.map((project, index) => (
              <div key={index} className="project-card">

                <div className="project-image">
                  <i className={project.icon}></i>
                </div>
                
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.tech}</p>
                  <div className="project-links">
                    <Link 
                      href={project.demoLink}
                      className="btn"
                    >
                      View Demo
                    </Link>
                    <a 
                      href={project.codeLink} 
                      className="btn" 
                      style={{
                        backgroundColor: 'transparent', 
                        color: 'var(--primary)', 
                        border: '2px solid var(--primary)'
                      }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Code
                    </a>
                  </div>
                </div>
          
              </div>
            ))}

        </div>

      </div>
    </section>
  );
}
