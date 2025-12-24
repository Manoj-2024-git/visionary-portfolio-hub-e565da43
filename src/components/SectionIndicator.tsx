import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
    >
      {/* Connecting line */}
      <div className="absolute top-0 bottom-0 right-1/2 translate-x-1/2 w-0.5 bg-border" />
      
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className={`relative group z-10 flex items-center gap-3 ${
            activeSection === section.id ? '' : ''
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Gear/Wheel indicator */}
          <motion.div
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                : 'bg-background border-muted-foreground/40 hover:border-primary'
            }`}
            animate={activeSection === section.id ? { rotate: 360 } : {}}
            transition={{ duration: 2, repeat: activeSection === section.id ? Infinity : 0, ease: 'linear' }}
          >
            {/* Inner gear teeth effect */}
            {activeSection === section.id && (
              <>
                <div className="absolute inset-0.5 border border-primary-foreground/30 rounded-full" />
              </>
            )}
          </motion.div>

          {/* Label on hover */}
          <span
            className={`absolute right-full mr-4 px-2 py-1 text-xs font-medium rounded bg-card border border-border shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
              activeSection === section.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {section.label}
          </span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default SectionIndicator;
