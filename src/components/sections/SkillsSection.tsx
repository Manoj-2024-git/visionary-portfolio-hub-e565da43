import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'Dart', 'SQL'],
  },
  {
    title: 'AI/ML',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'YOLO', 'LangChain', 'Transformers', 'Keras'],
  },
  {
    title: 'Web & Mobile',
    skills: ['React', 'Next.js', 'Node.js', 'Flutter', 'Flask', 'FastAPI', 'REST APIs', 'Tailwind'],
  },
  {
    title: 'Data & Cloud',
    skills: ['Pandas', 'NumPy', 'Power BI', 'Tableau', 'AWS', 'GCP', 'Docker', 'MongoDB'],
  },
  {
    title: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Jupyter', 'Prefect', 'MLflow', 'Postman', 'Firebase'],
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/95" />
      <div className="absolute inset-0 neural-bg opacity-30" />
      <div className="grid-pattern" />
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
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="section-subtitle mx-auto">
            My Technology Stack
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.3 + categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="skill-badge"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scrolling Skills Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 overflow-hidden"
        >
          <div className="flex animate-marquee whitespace-nowrap">
            {[...skillCategories.flatMap(c => c.skills), ...skillCategories.flatMap(c => c.skills)].map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="mx-4 text-2xl font-bold text-muted-foreground/20"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
