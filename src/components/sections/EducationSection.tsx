import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Engineering (BE)',
    field: 'Computer Science & Engineering',
    institution: 'Sri Sairam Engineering College',
    period: '2022 - 2026',
    cgpa: '8.79 / 10.0',
    highlights: [
      'Specialization in AI & Machine Learning',
      'Multiple hackathon wins',
      'Published research paper',
    ],
  },
  {
    degree: 'Higher Secondary (Class XII)',
    field: 'Computer Science',
    institution: 'Velammal Matriculation School',
    period: '2020 - 2022',
    cgpa: '92%',
    highlights: [
      'Topped in Computer Science',
      'Active in technical clubs',
    ],
  },
];

const certifications = [
  'Google Cloud - Machine Learning',
  'AWS Cloud Practitioner',
  'NPTEL - Data Science',
  'Coursera - Deep Learning Specialization',
  'IBM Data Science Professional',
  'Microsoft Azure AI Fundamentals',
];

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      <div className="absolute inset-0 neural-bg opacity-30" />
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
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Academic background and professional certifications
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold flex items-center gap-3"
            >
              <GraduationCap className="w-6 h-6 text-primary" />
              Education
            </motion.h3>

            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 hover:border-primary/50 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-foreground">{edu.degree}</h4>
                <p className="text-primary mb-2">{edu.field}</p>
                <p className="text-muted-foreground mb-2">{edu.institution}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {edu.period}
                  </span>
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <Award className="w-4 h-4" />
                    CGPA: {edu.cgpa}
                  </span>
                </div>

                <ul className="space-y-1">
                  {edu.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold flex items-center gap-3"
            >
              <Award className="w-6 h-6 text-primary" />
              Certifications
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card p-6"
            >
              <div className="flex flex-wrap gap-3">
                {certifications.map((cert, index) => (
                  <motion.span
                    key={cert}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                    className="skill-badge"
                  >
                    {cert}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
