'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/sections/Hero';
import Portfolio from '@/components/sections/Portfolio';
import Connect from '@/components/sections/Connect';
import Press from '@/components/sections/Press';
import LeetCodeStats from '@/components/sections/LeetCodeStats';
import Certifications from '@/components/sections/Certifications';
import Education from '@/components/sections/Education';
import Navigation from '@/components/Navigation';
import FloatingElements from '@/components/FloatingElements';

// Dynamically import 3D background to avoid SSR issues
const Background3D = dynamic(() => import('@/components/Background3D'), {
  ssr: false,
});

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <Background3D />
      <FloatingElements scrollY={scrollY} />
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Portfolio Section */}
      <Portfolio />

      {/* Press Section */}
      <Press />

      {/* LeetCode Stats Section */}
      <LeetCodeStats />

      {/* Education Section */}
      <Education />

      {/* Certifications Section */}
      <Certifications />

      {/* Connect Section - at the bottom */}
      <Connect />

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-4 text-center text-muted-foreground">
        <p className="text-sm">
          &lt;/&gt; Crafted with code and creativity • 2026
        </p>
      </footer>
    </div>
  );
}
