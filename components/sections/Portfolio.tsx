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
    stats: [
      { label: 'Lines of Code', value: '2.5K+' },
      { label: 'API Integrations', value: '3' },
      { label: 'Features', value: '12+' },
    ],
    features: ['Dynamic Search', 'Responsive UI', 'Content Filters'],
  },
  {
    id: 2,
    title: 'SMS',
    subtitle: 'Student Management System',
    description: 'GUI-based system for managing student records with profiles, attendance, and performance tracking.',
    tech: ['Java', 'SQL', 'Swing', 'JSP'],
    color: 'from-secondary to-primary',
    github: 'https://github.com/kabirnagdev/SMS',
    stats: [
      { label: 'Lines of Code', value: '3K+' },
      { label: 'Database Tables', value: '8' },
      { label: 'Features', value: '15+' },
    ],
    features: ['Student Profiles', 'Attendance Tracking', 'Data Export'],
  },
  {
    id: 3,
    title: 'Calorie & Nutrition AI',
    subtitle: 'AI-Powered Health Analysis',
    description: 'AI system analyzing nutritional data with visualization and health insights.',
    tech: ['Python', 'NumPy', 'MATLAB', 'Firebase'],
    color: 'from-primary via-secondary to-primary',
    github: 'https://github.com/kabirnagdev/Consumption-Analysis',
    stats: [
      { label: 'Data Points', value: '1K+' },
      { label: 'Visualizations', value: '6' },
      { label: 'Accuracy', value: '94%' },
    ],
    features: ['AI Analysis', 'Health Insights', 'Data Visualization'],
  },
  {
    id: 4,
    title: 'Personal Finance Dashboard',
    subtitle: 'Financial Management Tool',
    description: 'Desktop application for tracking personal finances with intuitive UI and data visualization.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    color: 'from-secondary to-primary',
    github: 'https://github.com/kabirnagdev/Personal-Finance-Dashboard',
    stats: [
      { label: 'Lines of Code', value: '1.8K+' },
      { label: 'Charts', value: '5' },
      { label: 'Features', value: '10+' },
    ],
    features: ['Expense Tracking', 'Visual Reports', 'Budget Planning'],
  },
  {
    id: 5,
    title: 'Horoscope Checker',
    subtitle: 'Daily Horoscope App',
    description: 'Fun mini project to check your daily horoscope based on zodiac signs.',
    tech: ['Python', 'API'],
    color: 'from-primary to-secondary',
    github: 'https://github.com/kabirnagdev/Mini-Horoscope-Checker',
    stats: [
      { label: 'Zodiac Signs', value: '12' },
      { label: 'API Calls', value: '1' },
      { label: 'Daily Updates', value: '∞' },
    ],
    features: ['Daily Horoscope', 'All Zodiacs', 'Clean UI'],
  },
  {
    id: 6,
    title: 'Pomodoro Timer',
    subtitle: 'Productivity Tool',
    description: 'Time management application using the Pomodoro Technique for better focus and productivity.',
    tech: ['Python'],
    color: 'from-secondary to-primary',
    github: 'https://github.com/kabirnagdev/Pomodoro',
    stats: [
      { label: 'Focus Sessions', value: '25m' },
      { label: 'Break Time', value: '5m' },
      { label: 'Cycles', value: '4' },
    ],
    features: ['Timer Controls', 'Session Tracking', 'Notifications'],
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
