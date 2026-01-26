'use client';

import { useRef } from 'react';
import anime from 'animejs';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
  github: string | null;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

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
        {/* Project Image Placeholder */}
        <div className={`h-64 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold text-background/20 font-mono">{project.id}</div>
              <p className="text-sm text-background/40 font-mono mt-2">Project Preview</p>
            </div>
          </div>

          {/* Animated scanning line */}
          <div className="absolute inset-0 animate-scan opacity-30 bg-gradient-to-r from-transparent via-white to-transparent" />
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
