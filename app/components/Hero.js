import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home">
      <div className="container hero">
        <div className="hero-content">
          <h1>Hi, I'm <span className="highlight">Rafayle Ghazaryan</span></h1>
          <p>A passionate React.js developer with experience in building modern, responsive web applications. I love turning ideas into reality through code.</p>
          <Link href="#contact" className="btn">Get In Touch</Link>
        </div>
        <div className="hero-image-div">
           <Image
            src="/img/background.jpg"
            alt='Background image'
            width={500}
            height={350}
            priority
            className='hero-image'
          />
        </div>
      </div>
    </section>
  );
}