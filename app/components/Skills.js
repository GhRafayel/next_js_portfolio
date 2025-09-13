// "use client";
// import data from "../data";

// export default function SkillsSection() {
//   const skills = data.skills;
//   return (
//     <section id="skills">
//       <div className="container">
//         <h2>My Skills</h2>
//         <div className="skills-container">
//           {skills.map((skill, index) => (
//             <div key={index} className="skill-card">
//               <div className="skill-icon">
//                 <i className={skill.icon}></i>
//               </div>
//               <h3>{skill.name}</h3>
//               <p>{skill.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import { useEffect } from "react";
import data from "../data";
import Head from "next/head";
import styles from "./sss.css"; // CSS module

export default function SkillsSection() {
  useEffect(() => {
    const container = document.querySelector(`.${styles.skillsContainer}`);
    const cards = document.querySelectorAll(`.${styles.skillCard}`);
    const prevBtn = document.querySelector(`.${styles.prev}`);
    const nextBtn = document.querySelector(`.${styles.next}`);
    const indicators = document.querySelectorAll(`.${styles.indicator}`);

    let currentPosition = 0;
    let cardsPerView = Math.floor(
      container.offsetWidth / (cards[0].offsetWidth + 25)
    );

    function updateCarousel() {
      const cardWidth = cards[0].offsetWidth + 25;
      container.scrollTo({
        left: currentPosition * cardWidth,
        behavior: "smooth",
      });

      indicators.forEach((indicator, index) => {
        indicator.classList.toggle(styles.active, index === currentPosition);
      });

      prevBtn.style.opacity = currentPosition === 0 ? 0.5 : 1;
      nextBtn.style.opacity =
        currentPosition >= cards.length - cardsPerView ? 0.5 : 1;
    }

    function handleResize() {
      cardsPerView = Math.floor(
        container.offsetWidth / (cards[0].offsetWidth + 25)
      );
      updateCarousel();
    }

    nextBtn.addEventListener("click", () => {
      if (currentPosition < cards.length - cardsPerView) {
        currentPosition++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        updateCarousel();
      }
    });

    window.addEventListener("resize", handleResize);
    updateCarousel();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </Head>

      <section className={styles.container}>
        <header>
          <h1>My Skills & Expertise</h1>
          <p className={styles.subtitle}>
            A showcase of my technical abilities and experience across various
            technologies and domains
          </p>
        </header>

        <div className={styles.skillsCarousel}>
          <button className={`${styles.navBtn} ${styles.prev}`}>
            <i className="fas fa-chevron-left"></i>
          </button>

          <div className={styles.skillsContainer}>
            {data.skills.map((skill, index) => (
              <div key={index} className={styles.skillCard}>
                <div
                  className={styles.iconWrapper}
                  style={{
                    backgroundColor: skill.bgColor,
                    color: skill.color,
                  }}
                >
                  <i className={skill.icon}></i>
                </div>
                <h3>{skill.name}</h3>
                <p>{skill.description}</p>
                <div className={styles.skillLevel}>
                  <div
                    className={styles.skillProgress}
                    style={{
                      backgroundColor: skill.color,
                      width: skill.level,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <button className={`${styles.navBtn} ${styles.next}`}>
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className={styles.indicators}>
            <div className={`${styles.indicator} ${styles.active}`}></div>
            <div className={styles.indicator}></div>
            <div className={styles.indicator}></div>
          </div>
        </div>
      </section>
    </>
  );
}
