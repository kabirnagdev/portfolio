'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';

const projects = [
     {
    id: 1,
    title: 'Your Neighbourhood ',
    subtitle: 'A Local Social Discovery Mobile App',
    description: 'Create hangouts as easy as posting on social media. No event planner complexity',
    tech: ['Flutter','Firebase' ,'Node.js' ,'Mapbox'],
    color: 'from-primary to-secondary',
    links: [
      {
        label: 'View Online',
        url: 'https://play.google.com/store/apps/details?id=com.yanegi.app',
        type: 'external',
      },
    ],
    image: 'https://images.unsplash.com/photo-1592626480256-96462f728137?q=80&w=800', // Bustling city road for neighborhood app
  },
    {
    id: 2,
    title: 'HCC Diagnosis',
    subtitle: 'By CNN 2D Slicing MobileNet-V2 ',
    description: 'A computationally efficient framework utilising the MobileNet-V2 architecture for slice-level HCC classification.',
    tech: ['Python','PyTorch' ,'MobileNetV2' ,' CLAHE', 'NIfTI'],
    color: 'from-primary to-secondary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/HCC-Diagnosis-Deep-Segmentation-MobileNet-V2-classification.git',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1649073586428-e288125d930a?w=800&q=80', // Retro tech/gaming
  },

  {
    id: 3,
    title: 'Team Canvas',
    subtitle: 'Collaborative Infinite Whiteboard Platform',
    description: 'a premium, unified workspace that merges the freedom of an infinite canvas with the speed of real-time collaboration.',
    tech: ['Prisma ORM', 'Docker', 'Zustand', 'Axios','Socket.io','PostgreSQL', 'Socket.io' , ' React 18' , 'Node.js' ],
    color: 'from-secondary to-primary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/TeamCanvas.git',
        type: 'github',
      },
    ],
    image: 'https://i.pinimg.com/1200x/79/8d/6c/798d6cc030e2e07825773bdd08b8f4b6.jpg', // Dashboard/data management
  },
  {
    id: 4,
    title: 'Calorie & Nutrition AI',
    subtitle: 'AI-Powered Health Analysis',
    description: 'AI system analyzing nutritional data with visualization and health insights.',
    tech: ['Python', 'NumPy', 'MATLAB', 'Firebase'],
    color: 'from-primary via-secondary to-primary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/Consumption-Analysis',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', // Data visualization
  },
      {
    id: 5,
    title: 'SMS',
    subtitle: 'Student Management System',
    description: 'GUI-based system for managing student records with profiles, attendance, and performance tracking.',
    tech: ['Java', 'SQL', 'Swing', 'JSP'],
    color: 'from-secondary to-primary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/SMS',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', // Dashboard/data management
  },
  {
    id: 6,
    title: 'Personal Finance Dashboard',
    subtitle: 'Financial Management Tool',
    description: 'Desktop application for tracking personal finances with intuitive UI and data visualization.',
    tech: ['Python', 'Tkinter', 'SQLite'],
    color: 'from-secondary to-primary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/Personal-Finance-Dashboard',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&q=80', // Dark finance charts
  },
  {
    id: 7,
    title: 'Horoscope Checker',
    subtitle: 'Daily Horoscope App',
    description: 'Fun mini project to check your daily horoscope based on zodiac signs.',
    tech: ['Python', 'API'],
    color: 'from-primary to-secondary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/Mini-Horoscope-Checker',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80', // Night sky stars
  },
  {
    id: 8,
    title: 'Pomodoro Timer',
    subtitle: 'Productivity Tool',
    description: 'Time management application using the Pomodoro Technique for better focus and productivity.',
    tech: ['Python'],
    color: 'from-secondary to-primary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/Pomodoro',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&q=80', // Clock/time
  },
      {
    id: 9,
    title: 'WatChill',
    subtitle: 'Movies & Anime Streaming Platform',
    description: 'Responsive web platform with dynamic content loading, search filters, and intuitive UI.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    color: 'from-primary to-secondary',
    links: [
      {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/streaming-platform',
        type: 'github',
      },
    ],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80', // Retro tech/gaming
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
