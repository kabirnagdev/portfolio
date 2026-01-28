'use client';

import { useRef, useEffect } from 'react';
import anime from 'animejs';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
  github: string | null;
  stats: ProjectStat[];
  features: string[];
  gradient: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Subtle floating animation for gradient orbs
    if (gradientRef.current) {
      anime({
        targets: gradientRef.current.querySelectorAll('.gradient-orb'),
        translateY: [-10, 10],
        translateX: [-5, 5],
        scale: [1, 1.1, 1],
        duration: 4000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        delay: anime.stagger(500),
      });
    }
  }, []);

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      scale: 1.02,
      duration: 300,
      easing: 'easeOutExpo',
    });
    anime({
      targets: cardRef.current?.querySelectorAll('.tech-tag'),
      translateY: [-5, 0],
      opacity: [0.7, 1],
      delay: anime.stagger(30),
      duration: 300,
      easing: 'easeOutExpo',
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      scale: 1,
      duration: 300,
      easing: 'easeOutExpo',
    });
  };

  return (
    <div className="pr-4">
      <div 
        ref={cardRef}
        className="glass-card-hover overflow-hidden rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cosmic/Cyber Gradient Background */}
        <div ref={gradientRef} className={`h-64 relative overflow-hidden ${project.gradient}`}>
          {/* Animated gradient orbs */}
          <div className="gradient-orb absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/30 blur-3xl" />
          <div className="gradient-orb absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-violet-500/20 blur-2xl" />
          
          {/* Mesh grid overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />

          {/* Starfield effect */}
          <div className="absolute inset-0">
            <div className="absolute top-[10%] left-[15%] w-1 h-1 bg-white/60 rounded-full animate-pulse" />
            <div className="absolute top-[30%] right-[20%] w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[25%] left-[30%] w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-[50%] right-[35%] w-0.5 h-0.5 bg-white/70 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            <div className="absolute bottom-[40%] right-[15%] w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[20%] left-[60%] w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-[15%] left-[45%] w-1 h-1 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.8s' }} />
          </div>

          {/* Central glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          {/* Project number watermark */}
          <div className="absolute bottom-4 right-6 text-7xl font-bold text-white/5 font-mono select-none">
            {String(project.id).padStart(2, '0')}
          </div>

          {/* Subtle border glow on edges */}
          <div className="absolute inset-0 border border-primary/10 rounded-t-lg" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        {/* Project Info */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-foreground font-mono mb-2">{project.title}</h3>
          <p className="text-sm text-primary font-mono mb-4">{project.subtitle}</p>

          <p className="text-muted-foreground mb-6">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="tech-tag px-3 py-1 text-xs font-mono border border-primary/30 text-primary rounded hover:border-primary/60 hover:bg-primary/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA */}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 bg-primary/20 border border-primary/30 text-primary hover:bg-primary/40 transition-all duration-300 font-semibold rounded hover:scale-105 transform flex items-center justify-center gap-2 group"
            >
              <Github className="w-5 h-5" />
              View on GitHub
              <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            <button className="w-full px-4 py-3 bg-secondary/30 border border-primary/10 text-muted-foreground cursor-not-allowed font-semibold rounded flex items-center justify-center gap-2">
              <Github className="w-5 h-5" />
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
