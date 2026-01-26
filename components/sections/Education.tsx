'use client';

import { useRef, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { GraduationCap, Award, Calendar, MapPin, Users, Palette, Sparkles } from 'lucide-react';

interface EducationItem {
  degree: string;
  institute: string;
  score: string;
  scoreLabel: string;
  year: string;
  icon: typeof GraduationCap;
}

const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Technology",
    institute: "Bennett University, Greater Noida",
    score: "7.77",
    scoreLabel: "CGPA (1st Year)",
    year: "2024 - 2028",
    icon: GraduationCap,
  },
  {
    degree: "Senior Secondary (Class XII)",
    institute: "Deep Memorial Public School (CBSE)",
    score: "75.04%",
    scoreLabel: "Percentage",
    year: "2024",
    icon: GraduationCap,
  },
  {
    degree: "Secondary (Class X)",
    institute: "Deep Memorial Public School (CBSE)",
    score: "88.63%",
    scoreLabel: "Percentage",
    year: "2022",
    icon: GraduationCap,
  },
];

const responsibility = {
  title: "Creative Head",
  organization: "Student Council, Deep Memorial Public School",
  duration: "2023 - 2024",
  highlights: [
    "Led the design and branding for school events, posters, and digital content",
    "Coordinated with multiple departments to organize cultural and academic programs",
    "Introduced new creative formats for student engagement and event promotion",
  ],
};

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate education cards
            anime({
              targets: '.edu-card',
              opacity: [0, 1],
              translateY: [30, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: 'easeOutQuad',
            });

            // Animate responsibility card
            anime({
              targets: '.responsibility-card',
              opacity: [0, 1],
              translateX: [-30, 0],
              duration: 600,
              delay: 400,
              easing: 'easeOutQuad',
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative py-24 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Education & Leadership</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Academic Journey
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My educational background and leadership experiences that shaped my skills.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Education Cards */}
          <div className="lg:col-span-2 space-y-4" ref={cardsRef}>
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="edu-card opacity-0 group relative overflow-hidden rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 bg-secondary/20 backdrop-blur-sm"
              >
                <div className="p-5 flex items-start gap-4">
                  {/* Icon */}
                  <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors shrink-0">
                    <edu.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {edu.degree}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full whitespace-nowrap">
                        {edu.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.institute}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{edu.score}</span>
                      <span className="text-xs text-muted-foreground">({edu.scoreLabel})</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Position of Responsibility */}
          <div className="lg:col-span-1">
            <div className="responsibility-card opacity-0 h-full rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 bg-gradient-to-br from-primary/5 to-secondary/20 backdrop-blur-sm overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-primary/10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-medium">Position of Responsibility</p>
                    <h3 className="font-semibold text-foreground">{responsibility.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{responsibility.organization}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{responsibility.duration}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Key Contributions</span>
                </div>
                <ul className="space-y-3">
                  {responsibility.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Badge */}
              <div className="px-5 pb-5">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                  <Palette className="w-4 h-4 text-primary" />
                  <span className="text-xs text-primary font-medium">Creative Leadership</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
