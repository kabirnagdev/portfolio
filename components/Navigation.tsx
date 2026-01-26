'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef<HTMLElement>(null);

  const links = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'portfolio', label: 'Portfolio', href: '#portfolio' },
    { id: 'press', label: 'Skills', href: '#press' },
    { id: 'leetcode', label: 'LeetCode', href: '#leetcode' },
    { id: 'education', label: 'Education', href: '#education' },
    { id: 'certifications', label: 'Certifications', href: '#certifications' },
    { id: 'contact', label: 'Connect', href: '#contact' },
  ];

  useEffect(() => {
    // Initial animation
    anime({
      targets: navRef.current,
      translateY: [-100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
    });

    // Animate nav links
    anime({
      targets: navRef.current?.querySelectorAll('.nav-link'),
      opacity: [0, 1],
      translateY: [-10, 0],
      easing: 'easeOutExpo',
      duration: 600,
      delay: anime.stagger(50, { start: 500 }),
    });

    // Animate logo
    anime({
      targets: navRef.current?.querySelector('.logo'),
      scale: [0.5, 1],
      opacity: [0, 1],
      easing: 'easeOutElastic(1, .5)',
      duration: 1000,
      delay: 200,
    });
  }, []);

  const handleLinkHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1.1,
      duration: 200,
      easing: 'easeOutExpo',
    });
  };

  const handleLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    anime({
      targets: e.currentTarget,
      scale: 1,
      duration: 200,
      easing: 'easeOutExpo',
    });
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border opacity-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="logo flex items-center gap-3 opacity-0 hover:opacity-80 transition-opacity">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-lg font-medium tracking-wide">kabir<span className="text-primary">.</span>dev</span>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="nav-link text-sm font-mono text-muted-foreground hover:text-primary transition-colors duration-300 opacity-0"
              onMouseEnter={handleLinkHover}
              onMouseLeave={handleLinkLeave}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a
          href="/Resume.pdf"
          download
          className="px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 text-sm rounded hover:scale-105 transform"
        >
          Download CV
        </a>
      </div>
    </nav>
  );
}
