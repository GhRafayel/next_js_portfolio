"use client";
import { useRef } from "react";
import data from "../data";

export default function SkillsSection() {
  const styleValue = 260;
  const skills = data.skills;
  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -styleValue, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: styleValue, behavior: "smooth" });
  };

  return (
    <section id="skills">
      <div className="skills-wrapper">
        <h2>My Skills</h2>
        <div className="skills-controls">
          <button className="scroll-btn left" onClick={scrollLeft}>
            &lt;
          </button>

          <div className="skills-container" ref={containerRef}>
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">
                  <i className={skill.icon}></i>
                </div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
              </div>
            ))}
          </div>

          <button className="scroll-btn right" onClick={scrollRight}>
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
}

