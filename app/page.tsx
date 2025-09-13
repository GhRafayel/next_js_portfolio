import Header from '@/app/components/Header';
import HeroSection from '@/app/components/Hero';
import AboutSection from '@/app/components/About';
import SkillsSection from '@/app/components/Skills';
import ProjectsSection from '@/app/components/Projects';
import ContactSection from '@/app/components/Contact';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

