'use client';

import { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import ProjectCard from '@/components/ProjectCard';

const projects = [
     {
    id: 1,
    title: 'Atlas LM ',
    subtitle: 'Unified Rag Pipeline ',
    description: 'This project is designed for document Q&A workflows, research assistants, and knowledge retrieval from PDF-based sources.',
    tech: ['Langchain','Pymupdf','Chromadb' ],
    color: 'from-primary to-secondary',
    links: [
      {
        label: 'View Online',
        url: 'https://atlas-rag.streamlit.app/',
        type: 'external',
      },
             {
        label: 'View on GitHub',
        url: 'https://github.com/kabirnagdev/atlas',
        type: 'github',
      },
    ],
    image: 'https://private-user-images.githubusercontent.com/174309715/639967762-fa3a3286-7827-4322-9f7b-c4df9e55b677.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODc0NzMyMDksIm5iZiI6MTc4NzQ3MjkwOSwicGF0aCI6Ii8xNzQzMDk3MTUvNjM5OTY3NzYyLWZhM2EzMjg2LTc4MjctNDMyMi05ZjdiLWM0ZGY5ZTU1YjY3Ny5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwODIzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDgyM1QwODE1MDlaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01YTIzNDE1MTkwZmNlZmMwODA0YTgxYzRhMzQ2ZDk4NGFiMThjYTIzOGJkNWJlZGJmNTk3M2Y2YmJkMTE4YTM4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZwbmcifQ.lfCsPaRTRU3WTIonOrsZC4GcAPC_x8SPULdSJLskYCU', // Bustling city road for neighborhood app
  },
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
               {
        label: 'View Online',
        url: 'https://hcc-diagnosis-deep-segmentation-mobilenet-v2-kabir.streamlit.app/',
        type: 'external',
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
