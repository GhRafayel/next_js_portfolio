import Link from 'next/link';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
         
          <div className="about-image">
               <Image
                   src="/img/background2.jpg"
                   alt='Background image'
                   width={500}
                   height={350}
                   priority
                   className='hero-image'
               /> 
          </div>
           <div className="about-text">
            <h2>About Me</h2>
            <p>I'm a frontend developer specializing in React.js with over 3 years of professional experience. I enjoy creating intuitive and responsive user interfaces.</p>
            <p>When I'm not coding, you can find me hiking, reading tech blogs, or experimenting with new web technologies. I'm passionate about continuous learning and always looking for new challenges.</p>
            <Link href="img/Rafayle_Ghazaryan_Resume.pdf" className="btn" download>Download Resume</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
