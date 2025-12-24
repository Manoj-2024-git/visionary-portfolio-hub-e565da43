import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Trophy, Cpu, Database, Cloud, Code } from 'lucide-react';

const stats = [
  { icon: GraduationCap, label: 'Education', value: 'BE in CS', subtext: 'CGPA 8.79/10.0' },
  { icon: Briefcase, label: 'Experience', value: '2 Internships', subtext: 'Data Science & Web Dev' },
  { icon: Trophy, label: 'Achievement', value: '₹20,000 Prize', subtext: '24hr Hackathon Winner' },
];

const focusAreas = [
  { icon: Cpu, label: 'Computer Vision', description: 'Image recognition, object detection, medical imaging' },
  { icon: Database, label: 'LLM Architectures', description: 'Multi-agent systems, prompt engineering, RAG' },
  { icon: Cloud, label: 'ML Ops', description: 'Model deployment, monitoring, scalable pipelines' },
  { icon: Code, label: 'Full-Stack AI', description: 'End-to-end AI application development' },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      <div className="absolute inset-0 neural-bg opacity-50" />
      <div className="noise" />

      <div className="container mx-auto px-4 md:px-6 relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Passionate About Transforming Data
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I'm a <span className="text-primary font-semibold">data-driven professional</span> with expertise in AI, machine learning, and data analytics. Currently pursuing my Bachelor's in Computer Science at Sri Sairam Engineering College with a CGPA of 8.79, I'm passionate about solving complex problems through technical innovation.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              My journey includes building cutting-edge projects like a Phonetic Health Assessment System with 98% accuracy, an AI Agent Management System, and a Football Match Analytics Engine. I've also gained hands-on experience through internships at EPIC Groups and International Campus Masters.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm constantly expanding my knowledge in cloud computing and emerging technologies, with certifications from NPTEL, Coursera, and leading tech companies. My goal is to leverage AI and data science to create meaningful impact in the tech industry.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="glass-card p-6 flex items-center gap-4"
              >
                <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-primary">{stat.subtext}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Focus Areas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">
            Focus <span className="text-gradient">Areas</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <area.icon className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{area.label}</h4>
                <p className="text-sm text-muted-foreground">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
