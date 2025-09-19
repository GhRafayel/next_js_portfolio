// "use client";
// import { useRef } from "react";
// import Link from 'next/link';
// import data from '../data';

// export default function ProjectsSection() {
//   const projects = data.projects;
//   const containerRef = useRef(null);

//   const projectScrollLeft = () => {
//     containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const projectScrollRight = () => {
//     containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   return (
//     <section id="projects" className="projects">
//       <div className="container">
//         <h2>My Projects</h2>

//           <button className="project_scroll-btn left" onClick={projectScrollLeft}>
//             &lt;
//           </button>
//         <div className="projects-grid">

//             {projects.map((project, index) => (
//               <div key={index} className="project-card">

//                 <div className="project-image">
//                   <i className={project.icon}></i>
//                 </div>
                
//                 <div className="project-content">
//                   <h3>{project.name}</h3>
//                   <p>{project.tech}</p>
//                   <div className="project-links">
//                     <Link 
//                       href={project.demoLink}
//                       className="btn"
//                     >
//                       View Demo
//                     </Link>
//                     <a 
//                       href={project.codeLink} 
//                       className="btn" 
//                       style={{
//                         backgroundColor: 'transparent', 
//                         color: 'var(--primary)', 
//                         border: '2px solid var(--primary)'
//                       }}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       Code
//                     </a>
//                   </div>
//                 </div>
          
//               </div>
//             ))}

//         </div>

//           <button className="project_scroll-btn right" onClick={projectScrollRight}>
//             &gt;
//           </button>
//       </div>
//     </section>
//   );
// }


"use client";
import { useRef } from "react";
import Link from 'next/link';
import data from '../data';

export default function ProjectsSection() {
  const styleValue = 380;
  const projects = data.projects;
  const containerRef = useRef(null);

  const projectScrollLeft = () => {
    containerRef.current.scrollBy({ left: -styleValue, behavior: "smooth" });
  };

  const projectScrollRight = () => {
    containerRef.current.scrollBy({ left: styleValue, behavior: "smooth" });
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-wrapper">
        <h2>My Projects</h2>
        <div className="projects-controls">
          <button className="project-scroll-btn left" onClick={projectScrollLeft}>
            &lt;
          </button>

          <div className="projects-grid" ref={containerRef}>
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <i className={project.icon}></i>
                </div>
                <div className="project-content">
                  <h3>{project.name}</h3>
                  <p>{project.tech}</p>
                  <div className="project-links">
                    <Link href={project.demoLink} className="btn">
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

          <button className="project-scroll-btn right" onClick={projectScrollRight}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}

