import { useState, useEffect } from 'react';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import CatLamp from '@/components/CatLamp';
import ParticleNetwork from '@/components/ParticleNetwork';
import DiceScroll from '@/components/DiceScroll';
import SectionIndicator from '@/components/SectionIndicator';

const Index = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>G. Manoj | AI Engineer & Data Scientist</title>
        <meta name="description" content="Portfolio of G. Manoj, an AI developer specializing in Computer Vision, LLMs, and Full-Stack AI systems." />
        <meta name="keywords" content="AI Engineer, Data Scientist, Machine Learning, Computer Vision, LLM, Deep Learning, Python" />
      </Helmet>

      <ParticleNetwork />
      <CatLamp onToggleTheme={toggleTheme} isDark={isDark} />
      <DiceScroll position="right" />
      <SectionIndicator />
      <Navbar />

      <main>
        <HeroSection isDark={isDark} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default Index;
