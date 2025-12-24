import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, FileText, Brain, Camera, Users, Microscope } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  title: string;
  subtitle: string;
  badge?: { text: string; variant: 'default' | 'secondary' | 'destructive' };
  description: string;
  highlights: string[];
  technologies: string[];
  icon: React.ElementType;
  github?: string;
  demo?: string;
  featured?: boolean;
  caseStudy: {
    overview: string;
    challenges: string[];
    solution: string;
    results: string[];
    techDetails: string;
  };
}

const projects: Project[] = [
  {
    title: 'SkinScan AI',
    subtitle: 'Skin Cancer Detection',
    badge: { text: '🏆 1st Place Hackathon Winner', variant: 'default' },
    description: 'Deep learning-based skin cancer prediction model using CNN and HAM10000 dataset with end-to-end mobile application for offline diagnosis.',
    highlights: [
      '97.7% accuracy achieved',
      '24hr hackathon winner',
      '5s diagnosis latency',
      'Offline medical image processing',
    ],
    technologies: ['TensorFlow', 'Flask', 'Flutter', 'Deep Learning', 'CNN'],
    icon: Microscope,
    github: 'https://github.com/gmanoj2005',
    featured: true,
    caseStudy: {
      overview: 'SkinScan AI is a revolutionary mobile application designed to detect skin cancer at early stages using advanced deep learning techniques. The project was developed during a 24-hour hackathon and won first place.',
      challenges: [
        'Limited training data for rare skin conditions',
        'Need for offline functionality in remote areas',
        'Achieving medical-grade accuracy within hackathon timeframe',
        'Optimizing model size for mobile deployment',
      ],
      solution: 'Implemented transfer learning using EfficientNet architecture, combined with data augmentation techniques. The model was optimized using TensorFlow Lite for mobile deployment, enabling offline predictions.',
      results: [
        '97.7% accuracy on test dataset',
        '₹20,000 prize money won',
        '5-second average diagnosis time',
        'Successfully deployed on Android devices',
      ],
      techDetails: 'Built using TensorFlow for model training, Flask for backend API, and Flutter for cross-platform mobile development. The CNN architecture uses EfficientNet-B3 as the backbone with custom classification layers.',
    },
  },
  {
    title: 'AI Agent Management System',
    subtitle: 'Multi-Agent Task Orchestrator',
    description: 'Intelligent task orchestration platform using LLMs with MCP-based architecture coordinating task delegation across five specialized AI agents for parallel processing.',
    highlights: [
      '40% reduction in task completion time',
      'Parallel request processing',
      'Modular agent architecture',
      'MCP protocol integration',
    ],
    technologies: ['Python', 'AI Agents', 'MCP Tooling', 'LLMs', 'LangChain'],
    icon: Users,
    github: 'https://github.com/gmanoj2005',
    featured: true,
    caseStudy: {
      overview: 'An intelligent multi-agent system designed to orchestrate complex tasks by delegating work to specialized AI agents. Each agent has specific capabilities and can work in parallel to complete tasks efficiently.',
      challenges: [
        'Coordinating multiple AI agents with different capabilities',
        'Handling task dependencies and parallel execution',
        'Ensuring consistent communication between agents',
        'Optimizing resource utilization across agents',
      ],
      solution: 'Developed a central orchestrator using LangChain that manages task distribution based on agent capabilities. Implemented MCP protocol for standardized inter-agent communication and task handoffs.',
      results: [
        '40% reduction in overall task completion time',
        'Scalable to handle 100+ concurrent requests',
        'Modular design allowing easy agent additions',
        'Robust error handling and recovery mechanisms',
      ],
      techDetails: 'Built with Python, utilizing LangChain for LLM orchestration, custom MCP tooling for agent communication, and Redis for task queue management. Each specialized agent runs as an independent service.',
    },
  },
  {
    title: 'Phonetic Health Assessment System',
    subtitle: "Parkinson's Detection",
    badge: { text: '📄 Research Paper Accepted', variant: 'secondary' },
    description: "Non-invasive ML diagnostic tool for Parkinson's disease using vocal features, achieving groundbreaking accuracy in early detection.",
    highlights: [
      '98% prediction accuracy',
      '40% enhancement in early detection',
      'Research paper accepted at IconDeepCom 2025',
      '15 vocal feature sets analyzed',
    ],
    technologies: ['Python', 'TensorFlow', 'Flutter', 'Scikit-learn', 'Prefect'],
    icon: Brain,
    github: 'https://github.com/gmanoj2005',
    featured: true,
    caseStudy: {
      overview: "A non-invasive diagnostic tool that analyzes vocal patterns to detect early signs of Parkinson's disease. The research has been accepted for publication at IconDeepCom 2025.",
      challenges: [
        'Extracting meaningful features from voice recordings',
        'Achieving high accuracy with limited medical data',
        'Creating a user-friendly interface for patients',
        'Validating results with medical professionals',
      ],
      solution: 'Implemented advanced signal processing techniques to extract 15 different vocal features. Used ensemble machine learning methods combining Random Forest, SVM, and Neural Networks for robust predictions.',
      results: [
        '98% accuracy in Parkinson\'s detection',
        '40% improvement over existing methods',
        'Research paper accepted at international conference',
        'Positive feedback from medical professionals',
      ],
      techDetails: 'Vocal feature extraction using librosa and parselmouth libraries. ML pipeline built with Scikit-learn and TensorFlow. Workflow orchestration using Prefect. Mobile app developed in Flutter.',
    },
  },
  {
    title: 'Football Match Analytics Engine',
    subtitle: 'Computer Vision Sports Analytics',
    description: 'Computer vision-driven sports analytics system for tactical insights, tracking players, ball, and referees in real-time with comprehensive dashboards.',
    highlights: [
      '92% detection accuracy',
      '40% faster issue resolution',
      'Power BI tactical dashboards',
      'Real-time video analysis',
    ],
    technologies: ['Python', 'Computer Vision', 'Power BI', 'YOLO', 'Video Analytics'],
    icon: Camera,
    github: 'https://github.com/gmanoj2005',
    caseStudy: {
      overview: 'A comprehensive sports analytics system that uses computer vision to track players, ball, and referees during football matches. Provides real-time tactical insights through interactive dashboards.',
      challenges: [
        'Real-time processing of high-resolution video',
        'Accurate tracking of fast-moving objects',
        'Distinguishing between similar-looking players',
        'Generating meaningful tactical insights',
      ],
      solution: 'Utilized YOLOv8 for object detection with custom training on football-specific data. Implemented ByteTrack for multi-object tracking and developed custom algorithms for tactical analysis.',
      results: [
        '92% detection accuracy for all tracked objects',
        'Real-time processing at 30 FPS',
        'Comprehensive Power BI dashboards',
        '40% faster tactical analysis for coaches',
      ],
      techDetails: 'Built using Python with YOLOv8 for detection, OpenCV for video processing, and Power BI for visualization. Custom tracking algorithms handle occlusions and rapid movements.',
    },
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
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
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Powered by AI and data science to solve real-world problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`glass-card p-6 md:p-8 group relative ${
                project.featured ? 'lg:col-span-1' : ''
              }`}
            >
              {/* Badge */}
              {project.badge && (
                <div className="absolute -top-3 left-6">
                  <Badge
                    variant={project.badge.variant}
                    className={`px-3 py-1 text-xs ${
                      project.badge.variant === 'default'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {project.badge.text}
                  </Badge>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <project.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-primary/80">{project.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {project.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-secondary-foreground border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {project.github && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="btn-outline-glow flex-1"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                <Button
                  size="sm"
                  className="btn-glow flex-1"
                  onClick={() => setSelectedProject(project)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Case Study
                </Button>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/gmanoj2005"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-glow transition-colors"
          >
            <span>View All Projects on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Case Study Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedProject && <selectedProject.icon className="w-8 h-8 text-primary" />}
              {selectedProject?.title}
            </DialogTitle>
            <DialogDescription className="text-primary">
              {selectedProject?.subtitle}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProject && (
            <div className="space-y-6 mt-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Overview</h4>
                <p className="text-muted-foreground">{selectedProject.caseStudy.overview}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Challenges</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProject.caseStudy.challenges.map((challenge, i) => (
                    <li key={i} className="text-muted-foreground">{challenge}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Solution</h4>
                <p className="text-muted-foreground">{selectedProject.caseStudy.solution}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Results</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedProject.caseStudy.results.map((result, i) => (
                    <li key={i} className="text-muted-foreground">{result}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Technical Details</h4>
                <p className="text-muted-foreground">{selectedProject.caseStudy.techDetails}</p>
              </div>

              <div className="flex gap-3 pt-4">
                {selectedProject.github && (
                  <Button asChild variant="outline" className="btn-outline-glow">
                    <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View on GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ProjectsSection;
