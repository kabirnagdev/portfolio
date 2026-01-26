'use client';

import { useRef } from 'react';
import anime from 'animejs';
import { Github, Linkedin, Twitter, Code2 } from 'lucide-react';

interface SocialOrbProps {
  name: string;
  url: string;
  isHovered: boolean;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  LeetCode: Code2,
};

export default function SocialOrb({ name, url, isHovered }: SocialOrbProps) {
  const orbRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    anime({
      targets: orbRef.current,
      scale: 1.15,
      duration: 300,
      easing: 'easeOutElastic(1, .5)',
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: orbRef.current,
      scale: 1,
      duration: 300,
      easing: 'easeOutExpo',
    });
  };

  const Icon = iconMap[name] || Code2;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={orbRef}
        className={`w-24 h-24 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isHovered
            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
            : 'border-primary/50 hover:border-primary'
        }`}
      >
        <div className="text-center flex flex-col items-center gap-1">
          <Icon className={`w-5 h-5 ${isHovered ? 'text-primary' : 'text-primary/70'}`} />
          <div className="text-xs font-semibold text-primary whitespace-nowrap">{name}</div>
        </div>
      </div>
    </a>
  );
}
