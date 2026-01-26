'use client';

import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';
import { Cloud, Bot, Sparkles, Briefcase, Rocket, Award, Trophy, Code, X, ExternalLink, GraduationCap } from 'lucide-react';

// Certificate data with all your certifications
const certifications = [
  {
    id: 1,
    title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
    issuer: 'Oracle University',
    issuedDate: 'Oct 2025',
    validUntil: 'Oct 2027',
    description: 'Certified AI Foundations Associate recognized by Oracle Corporation for cloud infrastructure and AI fundamentals.',
    Icon: Cloud,
    category: 'cloud',
  },
  {
    id: 2,
    title: 'Introduction to Generative AI - Art of the Possible',
    issuer: 'AWS Training & Certification',
    issuedDate: 'Jul 2025',
    description: 'Comprehensive training on generative AI concepts, applications, and possibilities in modern technology.',
    Icon: Sparkles,
    category: 'ai',
  },
  {
    id: 3,
    title: 'AWS Educate Cloud Computing 101',
    issuer: 'Amazon Web Services',
    issuedDate: 'Jul 2025',
    description: 'Foundational knowledge in cloud computing concepts, AWS services, and cloud architecture.',
    Icon: Cloud,
    category: 'cloud',
  },
  {
    id: 4,
    title: 'AWS Educate Machine Learning Foundations',
    issuer: 'Amazon Web Services',
    issuedDate: 'Jul 2025',
    description: 'Badge earned for completing machine learning foundations training covering ML concepts and AWS ML services.',
    Icon: Bot,
    category: 'ai',
  },
  {
    id: 5,
    title: 'GenAI Buildathon - Generative AI Mastery Workshop',
    issuer: 'NxtWave (OpenAI Academy)',
    issuedDate: 'Aug 2025',
    description: "Participated in India's Biggest GenAI Buildathon as part of the OpenAI Academy Learning Community.",
    Icon: Sparkles,
    category: 'ai',
  },
  {
    id: 6,
    title: 'LeetCode 100 Days Badge 2025',
    issuer: 'LeetCode',
    issuedDate: '2025',
    description: 'Achieved 100+ days of consistent problem solving on LeetCode, demonstrating dedication to algorithmic skills.',
    Icon: Code,
    category: 'achievement',
  },
  {
    id: 7,
    title: 'Entrepreneurship Strategy: From Ideation to Exit',
    issuer: 'HEC Paris (Coursera)',
    issuedDate: 'Dec 2024',
    description: 'Completed comprehensive course on entrepreneurship strategy, business planning, and startup lifecycle.',
    Icon: Rocket,
    category: 'business',
  },
  {
    id: 8,
    title: 'Introduction to Python',
    issuer: 'Infosys Springboard',
    issuedDate: 'Sep 2024',
    description: 'Successfully completed Python programming fundamentals course covering core concepts and applications.',
    Icon: Code,
    category: 'programming',
  },
  {
    id: 9,
    title: 'Core Java Programming Revisited',
    issuer: 'Infosys Springboard',
    issuedDate: 'Mar 2025',
    description: 'Advanced Java programming course covering core concepts, OOP principles, and best practices.',
    Icon: Code,
    category: 'programming',
  },
  {
    id: 10,
    title: 'Technology Job Simulation',
    issuer: 'Deloitte (Forage)',
    issuedDate: 'Jun 2025',
    description: 'Completed practical coding and development tasks simulating real-world technology consulting work.',
    Icon: Briefcase,
    category: 'experience',
  },
  {
    id: 11,
    title: 'HiveMinds: Strategy Conquest S1 - National Finalist',
    issuer: 'PrepBee',
    issuedDate: '2025',
    description: 'Emerged as National Finalist representing Bennett University as Team AlphaQ in the Strategy Conquest competition.',
    Icon: Trophy,
    category: 'achievement',
  },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'cloud', name: 'Cloud' },
  { id: 'ai', name: 'AI & ML' },
  { id: 'programming', name: 'Programming' },
  { id: 'achievement', name: 'Achievements' },
  { id: 'business', name: 'Business' },
];

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredCerts = activeCategory === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === activeCategory);

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
              targets: gridRef.current?.querySelectorAll('.cert-card'),
              opacity: [0, 1],
              scale: [0.9, 1],
              easing: 'easeOutExpo',
              duration: 600,
              delay: anime.stagger(80, { start: 300 }),
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

  // Re-animate when category changes
  useEffect(() => {
    anime({
      targets: gridRef.current?.querySelectorAll('.cert-card'),
      opacity: [0, 1],
      scale: [0.95, 1],
      easing: 'easeOutExpo',
      duration: 400,
      delay: anime.stagger(50),
    });
  }, [activeCategory]);

  const handleCardClick = (cert: typeof certifications[0]) => {
    setSelectedCert(cert);
  };

  const closeModal = () => {
    setSelectedCert(null);
  };

  return (
    <section id="certifications" ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-12 section-title opacity-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Certifications & Achievements
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl">
            A collection of professional certifications, course completions, and achievements that demonstrate my commitment to continuous learning.
          </p>
          <div className="w-16 h-1 bg-primary mt-4" />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary/30 text-muted-foreground hover:bg-secondary/50 hover:text-foreground border border-primary/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleCardClick(cert)}
              className="cert-card relative group cursor-pointer overflow-hidden rounded-xl border border-primary/10 hover:border-primary/40 transition-all duration-300 bg-secondary/20"
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <cert.Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
                    {cert.issuedDate}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <p className="text-xs text-primary font-medium mb-1">{cert.issuer}</p>
                  <h3 className="font-semibold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {cert.description}
                  </p>
                </div>

                {/* View indicator */}
                <div className="mt-4 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View details</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card-hover p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">11+</div>
            <p className="text-sm text-muted-foreground">Certifications</p>
          </div>
          <div className="glass-card-hover p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">5+</div>
            <p className="text-sm text-muted-foreground">Platforms</p>
          </div>
          <div className="glass-card-hover p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">100+</div>
            <p className="text-sm text-muted-foreground">Days LeetCode</p>
          </div>
          <div className="glass-card-hover p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">1</div>
            <p className="text-sm text-muted-foreground">National Finalist</p>
          </div>
        </div>

        {/* Skill Tags */}
        <div className="mt-10 flex flex-wrap gap-2 justify-center">
          {['Cloud Computing', 'Machine Learning', 'Generative AI', 'Java', 'Python', 'Entrepreneurship', 'Problem Solving'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Modal for Certificate Detail */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-lg w-full bg-background border border-primary/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-primary/20 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            {/* Header with gradient */}
            <div className="relative h-32 bg-gradient-to-br from-primary/20 to-secondary/30 flex items-center justify-center">
              <div className="p-4 bg-background/20 rounded-2xl backdrop-blur-sm border border-primary/20">
                <selectedCert.Icon className="w-12 h-12 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <span className="text-sm text-primary font-medium">{selectedCert.issuer}</span>
              <h3 className="text-xl font-bold text-foreground mt-1 mb-3">{selectedCert.title}</h3>
              <p className="text-muted-foreground mb-4">{selectedCert.description}</p>

              <div className="flex flex-wrap gap-4 text-sm pt-4 border-t border-primary/10">
                <div>
                  <span className="text-muted-foreground">Issued: </span>
                  <span className="text-foreground font-medium">{selectedCert.issuedDate}</span>
                </div>
                {selectedCert.validUntil && (
                  <div>
                    <span className="text-muted-foreground">Valid Until: </span>
                    <span className="text-foreground font-medium">{selectedCert.validUntil}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
