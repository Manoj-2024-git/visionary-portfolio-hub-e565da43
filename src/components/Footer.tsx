import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 border-t border-border bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <a href="#home" className="text-xl font-bold">
              <span className="text-primary">G.</span>
              <span className="text-foreground">Manoj</span>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              AI Engineer & Data Scientist
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/gmanoj2005" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/in/manoj-ganesan-cse" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:manojindira2004@gmail.com" className="p-2 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> by G. Manoj © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
