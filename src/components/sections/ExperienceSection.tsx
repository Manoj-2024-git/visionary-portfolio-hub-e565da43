import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'Data Science Intern',
    company: 'EPIC Groups',
    location: 'Chennai, India',
    period: 'Jun 2024 - Jul 2024',
    description: 'Developed machine learning models for predictive analytics and data visualization dashboards.',
    achievements: [
      'Built ML models achieving 90%+ accuracy for business predictions',
      'Created interactive Power BI dashboards for stakeholder reporting',
      'Automated data preprocessing pipelines reducing manual work by 60%',
    ],
  },
  {
    title: 'Web Development Intern',
    company: 'International Campus Masters',
    location: 'Remote',
    period: 'Jan 2024 - Mar 2024',
    description: 'Developed responsive web applications using modern frameworks and best practices.',
    achievements: [
      'Built full-stack web applications using React and Node.js',
      'Implemented RESTful APIs and database integrations',
      'Improved website performance by 40% through optimization',
    ],
  },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
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
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Professional journey and internship experiences
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="timeline-line" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className={`relative pl-12 md:pl-0 mb-12 ${
                index % 2 === 0 ? 'md:pr-[52%]' : 'md:pl-[52%]'
              }`}
            >
              {/* Timeline dot */}
              <div className="timeline-dot" style={{ top: '1.5rem' }} />

              <div className="glass-card p-6 hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-sm text-primary">{exp.company}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exp.location}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{exp.description}</p>

                <ul className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
