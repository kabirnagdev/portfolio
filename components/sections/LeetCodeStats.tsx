'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { AnimatedCounter } from '@/components/AnimatedElements';

export default function LeetCodeStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRefs = useRef<HTMLDivElement[]>([]);

  const stats = [
    { language: 'Python3', solved: 62, color: '#3b82f6' },
    { language: 'C++', solved: 30, color: '#10b981' },
    { language: 'Pandas', solved: 15, color: '#f59e0b' },
    { language: 'Java', solved: 1, color: '#ef4444' },
  ];

  const totalSolved = 102;
  const acceptance = 67.7;
  const submissions = 266;
  const beatsPercentage = 80.5;
  const easyProblems = 69;
  const mediumProblems = 31;
  const hardProblems = 2;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate section title
            anime({
              targets: sectionRef.current?.querySelector('.section-title'),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutExpo',
              duration: 800,
            });

            // Animate cards
            anime({
              targets: sectionRef.current?.querySelectorAll('.stat-card'),
              opacity: [0, 1],
              translateY: [50, 0],
              easing: 'easeOutExpo',
              duration: 1000,
              delay: anime.stagger(200, { start: 300 }),
            });

            // Animate progress bars
            anime({
              targets: '.progress-bar-fill',
              width: (el: Element) => el.getAttribute('data-width'),
              easing: 'easeOutExpo',
              duration: 1500,
              delay: anime.stagger(100, { start: 800 }),
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

  return (
    <section id="leetcode" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 section-title opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            LeetCode Performance
          </h2>
          <div className="w-16 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats Card */}
          <div className="lg:col-span-2">
            <div className="stat-card glass-card-hover p-8 opacity-0">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Total Solved */}
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    <AnimatedCounter value={totalSolved} />
                  </div>
                  <p className="text-muted-foreground text-sm">Total Problems Solved</p>
                  <p className="text-primary/70 text-sm mt-1">Beats {beatsPercentage}%</p>
                </div>

                {/* Submissions */}
                <div>
                  <div className="text-4xl font-bold text-muted mb-2">
                    <AnimatedCounter value={submissions} />
                  </div>
                  <p className="text-muted-foreground text-sm">Total Submissions</p>
                </div>

                {/* Acceptance */}
                <div>
                  <div className="text-3xl font-bold text-primary/80 mb-2">
                    {acceptance}%
                  </div>
                  <p className="text-muted-foreground text-sm">Acceptance Rate</p>
                </div>

                {/* Difficulty Breakdown */}
                <div>
                  <p className="text-muted-foreground text-sm mb-3">Difficulty</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-400">Easy</span>
                      <span className="text-sm font-semibold">{easyProblems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-yellow-400">Medium</span>
                      <span className="text-sm font-semibold">{mediumProblems}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-red-400">Hard</span>
                      <span className="text-sm font-semibold">{hardProblems}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Easy Progress</span>
                  <span className="text-foreground">{((easyProblems / totalSolved) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="progress-bar-fill bg-green-500 h-2 rounded-full w-0"
                    data-width={`${(easyProblems / totalSolved) * 100}%`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs mt-4">
                  <span className="text-muted-foreground">Medium Progress</span>
                  <span className="text-foreground">{((mediumProblems / totalSolved) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="progress-bar-fill bg-yellow-500 h-2 rounded-full w-0"
                    data-width={`${(mediumProblems / totalSolved) * 100}%`}
                  />
                </div>

                <div className="flex items-center justify-between text-xs mt-4">
                  <span className="text-muted-foreground">Hard Progress</span>
                  <span className="text-foreground">{((hardProblems / totalSolved) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className="progress-bar-fill bg-red-500 h-2 rounded-full w-0"
                    data-width={`${(hardProblems / totalSolved) * 100}%`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Language Breakdown */}
          <div className="stat-card glass-card-hover p-8 opacity-0">
            <h3 className="text-lg font-bold mb-6">Language Breakdown</h3>
            <div className="space-y-4">
              {stats.map((stat) => (
                <div key={stat.language}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{stat.language}</span>
                    <span className="text-sm font-bold">{stat.solved}</span>
                  </div>
                  <div className="w-full bg-border/50 rounded-full h-2">
                    <div
                      className="progress-bar-fill h-2 rounded-full w-0"
                      data-width={`${(stat.solved / totalSolved) * 100}%`}
                      style={{ backgroundColor: stat.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {((stat.solved / totalSolved) * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>

            {/* Visit LeetCode Link */}
            <a
              href="https://leetcode.com/u/vQ3P7qButX/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full py-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all duration-300 rounded-lg text-sm font-semibold text-center block hover:scale-105 transform"
            >
              View LeetCode Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
