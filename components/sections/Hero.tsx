'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import anime from 'animejs';
import { AnimatedText, AnimatedCounter } from '@/components/AnimatedElements';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate stats
    anime({
      targets: statsRef.current?.querySelectorAll('.stat-item'),
      opacity: [0, 1],
      translateX: [-30, 0],
      easing: 'easeOutExpo',
      duration: 1000,
      delay: anime.stagger(150, { start: 800 }),
    });

    // Animate buttons
    anime({
      targets: buttonsRef.current?.querySelectorAll('a'),
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutExpo',
      duration: 800,
      delay: anime.stagger(100, { start: 1200 }),
    });

    // Animate image
    anime({
      targets: imageRef.current,
      opacity: [0, 1],
      scale: [0.8, 1],
      easing: 'easeOutElastic(1, .5)',
      duration: 1500,
      delay: 500,
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Text content */}
        <div>
          <div className="mb-6 text-sm font-mono text-primary overflow-hidden">
            <AnimatedText text="Developer & Entrepreneur" delay={200} />
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono leading-tight">
            <AnimatedText text="Kabir" className="block" delay={400} />
            <AnimatedText text="Nagdev" className="block" delay={600} />
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-md">
            I build web applications, mobile apps, and digital experiences. Passionate about technology, design, and entrepreneurship.
          </p>

          {/* Stats */}
          <div ref={statsRef} className="flex gap-8 mb-12">
            <div className="stat-item border-l-2 border-primary pl-4 opacity-0">
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter value={102} />
              </div>
              <div className="text-xs text-muted-foreground">LeetCode Problems</div>
            </div>
            <div className="stat-item border-l-2 border-primary pl-4 opacity-0">
              <div className="text-2xl font-bold text-primary">
                <AnimatedCounter value={5} />+
              </div>
              <div className="text-xs text-muted-foreground">Projects Built</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div ref={buttonsRef} className="flex gap-4">
            <a 
              href="/Resume.pdf" 
              download 
              className="inline-block px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-semibold rounded opacity-0 hover:scale-105 transform"
            >
              Download CV
            </a>
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold rounded opacity-0 hover:scale-105 transform"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Right side - Profile image */}
        <div className="relative flex items-center justify-center">
          <div 
            ref={imageRef}
            className="glass-card-hover relative w-72 h-96 overflow-hidden opacity-0" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
            <Image
              src="/profile.jpg"
              alt="Kabir Nagdev"
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              priority
            />
            {/* Animated border effect */}
            <div className="absolute inset-0 border-2 border-primary/30 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
