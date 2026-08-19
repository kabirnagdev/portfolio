'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

const experiences = [
  {
    role: 'Founder & Product Lead',
    company: 'Yanegi',
    period: '2025 — Present',
    points: [
      'Built and led a map-based social platform for discovering events and places to hang out.',
      'Directed product, engineering, UI/UX, growth, and cross-functional execution from idea to working product.',
    ],
  },
  {
    role: 'Developer & AI/ML Project Lead',
    company: 'Independent / Research Projects',
    period: '2025 — Present',
    points: [
      'Developed computer vision and AI systems including an HCC diagnosis pipeline using MobileNet-V2.',
      'Built production-oriented web, mobile, RAG, and ML workflows with an emphasis on deployment and evaluation.',
    ],
  },
  {
    role: 'Team Lead — Design, Content & Marketing',
    company: 'Student / Startup Initiatives',
    period: '2025 — Present',
    points: [
      'Managed designers, content creators, and marketing interns to keep delivery aligned with product goals.',
      'Streamlined content and approval workflows to improve team coordination and turnaround time.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const items = sectionRef.current?.querySelectorAll('.experience-item');
    if (!items) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateX: [-18, 0],
          duration: 650,
          easing: 'easeOutExpo',
        });
        anime({
          targets: (entry.target as HTMLElement).querySelectorAll('.experience-bullet'),
          opacity: [0, 1],
          translateX: [-10, 0],
          duration: 450,
          delay: anime.stagger(90),
          easing: 'easeOutExpo',
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative z-10 py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-sm font-mono text-primary mb-3">02 / EXPERIENCE</p>
          <h2 className="text-4xl md:text-5xl font-bold font-mono">Experience</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">A concise record of product building, engineering, AI/ML work, and team leadership.</p>
        </div>

        <div className="relative border-l border-border ml-2 md:ml-4 pl-7 md:pl-10 space-y-12">
          {experiences.map((experience) => (
            <article key={`${experience.role}-${experience.company}`} className="experience-item relative opacity-0">
              <span className="absolute -left-[36px] md:-left-[49px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-3">
                <div>
                  <h3 className="text-lg md:text-xl font-semibold">{experience.role}</h3>
                  <p className="text-sm font-mono text-primary">{experience.company}</p>
                </div>
                <span className="text-xs font-mono text-muted-foreground">{experience.period}</span>
              </div>
              <ul className="space-y-2.5 max-w-3xl">
                {experience.points.map((point) => (
                  <li key={point} className="experience-bullet flex items-start gap-2.5 text-sm leading-6 text-muted-foreground opacity-0">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
