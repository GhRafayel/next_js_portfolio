'use client';

import { useState } from 'react';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setMenuActive(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <header>
      <div className="container">
        <nav>
          <div className="logo" onClick={(e) => handleNavClick(e, 'home')}>Portfolio</div>
          <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
            <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')}>Home</a></li>
            <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')}>About</a></li>
            <li><a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>Skills</a></li>
            <li><a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>Projects</a></li>
            <li><a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>Contact</a></li>
          </ul>
          <div className="menu-btn" onClick={toggleMenu}>
            <i className={menuActive ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </nav>
      </div>
    </header>
  );
}
