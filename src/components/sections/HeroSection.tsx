import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Phone, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Globe3D from '@/components/Globe3D';

interface HeroSectionProps {
  isDark: boolean;
}

const HeroSection = ({ isDark }: HeroSectionProps) => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/gmanoj2005', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/manoj-ganesan-cse', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:manojindira2004@gmail.com', label: 'Email' },
    { icon: Phone, href: 'tel:+917305253038', label: 'Phone' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      <div className="neural-bg" />
      <div className="grid-pattern" />
      <div className="noise" />

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Welcome to my Portfolio
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4"
            >
              Hi, I'm{' '}
              <span className="text-gradient">G. Manoj</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-4"
            >
              Data Science & AI Engineer
            </motion.h2>

            {/* Specialization */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-base md:text-lg text-primary/80 font-medium mb-4"
            >
              Specializing in Computer Vision & LLM Architectures
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
            >
              Building intelligent solutions with machine learning, deep learning, and data analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                asChild
                size="lg"
                className="btn-glow rounded-full text-base px-8"
              >
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-outline-glow rounded-full text-base px-8"
              >
                <a href="#projects">
                  <Eye className="w-5 h-5 mr-2" />
                  View My Work
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-3 rounded-full bg-muted/50 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative h-[300px] md:h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            <div className="w-full h-full max-w-[500px] max-h-[500px]">
              <Globe3D />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - positioned near globe on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 lg:left-1/2 -translate-x-1/2 lg:-translate-x-0 lg:right-1/4"
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
