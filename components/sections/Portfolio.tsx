'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';

const projects = [
  {
    id: 1,
    title: 'WatChill',
    subtitle: 'Movies & Anime Streaming Platform',
    description: 'Responsive web platform with dynamic content loading, search filters, and intuitive UI.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    color: 'from-primary to-secondary',
    github: 'https://github.com/kabirnagdev/streaming-platform',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', // Retro tech/gaming
  },
  {
    id: 2,
    title: 'SMS',
    subtitle: 'Student Management System',
    description: 'GUI-based system for managing student records with profiles, attendance, and performance tracking.',
    tech: ['Java', 'SQL', 'Swing', 'JSP'],
    color: 'from-secondary to-primary',
    github: 'https://github.com/kabirnagdev/SMS',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80', // Circuit board
  },
  {
    id: 3,
    title: 'Calorie & Nutrition AI',
    subtitle: 'AI-Powered Health Analysis',
    description: 'AI system analyzing nutritional data with visualization and health insights.',
    tech: ['Python', 'NumPy', 'MATLAB', 'Firebase'],
    color: 'from-primary via-secondary to-primary',
    github: 'https://github.com/kabirnagdev/Consumption-Analysis',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Data visualization
  },
  {
    id: 4,
    title: 'Personal Finance Dashboard',
    subtitle: 'Financial Management Tool',
    description: 'Desktop application for tracking personal finances with intuitive UI and data visualization.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    color: 'from-secondary to-primary',
    github: 'https://github.com/kabirnagdev/Personal-Finance-Dashboard',
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80', // Dark finance charts
  },
  {
    id: 5,
    title: 'Horoscope Checker',
    subtitle: 'Daily Horoscope App',
    description: 'Fun mini project to check your daily horoscope based on zodiac signs.',
    tech: ['Python', 'API'],
    color: 'from-primary to-secondary',
    github: 'https://github.com/kabirnagdev/Mini-Horoscope-Checker',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80', // Night sky stars
  },
  {
    id: 6,
    title: 'Pomodoro Timer',
    subtitle: 'Productivity Tool',
    description: 'Time management application using the Pomodoro Technique for better focus and productivity.',
    tech: ['Python'],
    color: 'from-secondary to-primary',
    github: 'https://github.com/kabirnagdev/Pomodoro',
    image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&q=80', // Clock/time
  },
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: sectionRef.current?.querySelector('.section-title'),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutExpo',
              duration: 800,
            });

            anime({
              targets: carouselRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: 300,
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNext = () => {
    anime({
      targets: carouselRef.current,
      translateX: [-20, 0],
      easing: 'easeOutExpo',
      duration: 400,
    });
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    anime({
      targets: carouselRef.current,
      translateX: [20, 0],
      easing: 'easeOutExpo',
      duration: 400,
    });
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="portfolio" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 section-title opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            My Portfolio
          </h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        {/* Project Carousel */}
        <div ref={carouselRef} className="relative opacity-0">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${activeIndex * 100}%)`,
              }}
            >
              {projects.map((project) => (
                <div key={project.id} className="min-w-full">
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 w-12 h-12 border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 rounded-full flex items-center justify-center font-bold text-lg hover:scale-110 transform"
          >
            &lt;
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 w-12 h-12 border-2 border-primary text-primary hover:bg-primary hover:text-background transition-all duration-300 rounded-full flex items-center justify-center font-bold text-lg hover:scale-110 transform"
          >
            &gt;
          </button>

          {/* Progress indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1 transition-all duration-300 ${
                  index === activeIndex ? 'w-8 bg-primary' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured text */}
        <div className="mt-20 p-8 border-l-4 border-primary bg-card">
          <p className="text-sm text-primary mb-2">Featured Achievement</p>
          <p className="text-lg text-foreground">
            Solved <span className="font-bold">102 LeetCode problems</span> demonstrating
            strong problem-solving skills and algorithmic knowledge
          </p>
        </div>
      </div>
    </section>
  );
}
