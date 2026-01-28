'use client';

import { useRef, useEffect, useState } from 'react';
import anime from 'animejs';
import { Github, ExternalLink, Code, Zap, CheckCircle } from 'lucide-react';

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
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate stats when visible
            anime({
              targets: statsRef.current?.querySelectorAll('.stat-value'),
              scale: [0.5, 1],
              opacity: [0, 1],
              delay: anime.stagger(100),
              duration: 600,
              easing: 'easeOutElastic(1, .5)',
            });
            anime({
              targets: statsRef.current?.querySelectorAll('.feature-item'),
              translateX: [-20, 0],
              opacity: [0, 1],
              delay: anime.stagger(80, { start: 300 }),
              duration: 500,
              easing: 'easeOutQuad',
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
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
        {/* Project Stats & Features Panel */}
        <div ref={statsRef} className={`h-64 bg-gradient-to-br ${project.color} relative overflow-hidden p-6`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border border-background/30 rounded-full" />
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-background/30 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-background/20 rounded-full" />
          </div>

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-3 mb-4">
            {project.stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-value bg-background/20 backdrop-blur-sm rounded-lg p-3 text-center border border-background/10"
              >
                <div className="text-2xl font-bold text-background font-mono">{stat.value}</div>
                <div className="text-xs text-background/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features List */}
          <div className="relative z-10 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-background/80" />
              <span className="text-xs font-semibold text-background/80 uppercase tracking-wider">Key Features</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.features.map((feature, index) => (
                <div 
                  key={index}
                  className="feature-item flex items-center gap-1.5 bg-background/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-background/10"
                >
                  <CheckCircle className="w-3 h-3 text-background/80" />
                  <span className="text-xs text-background font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Animated pulse effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-background/10 rounded-full animate-ping opacity-20" />
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
