'use client';

import { Award, Cloud, Bot, Network, Cpu, Briefcase, Code2 } from 'lucide-react';

const highlights = [
  { title: 'OCI 2025 AI Foundations Associate', issuer: 'Oracle University', Icon: Cloud },
  { title: 'Machine Learning Foundations', issuer: 'AWS Educate', Icon: Bot },
  { title: 'Cloud Computing 101', issuer: 'AWS Educate', Icon: Cloud },
  { title: 'The Bits and Bytes of Computer Networking', issuer: 'Google', Icon: Network },
  { title: 'Introduction to Microprocessors', issuer: 'Arm', Icon: Cpu },
  { title: 'Technology Job Simulation', issuer: 'Deloitte', Icon: Briefcase },
  { title: 'Introduction to Tech Entrepreneurship', issuer: 'IIT Bombay', Icon: Award },
  { title: '100 Days Badge 2025', issuer: 'LeetCode', Icon: Code2 },
];

export default function HighlightsCertifications() {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-sm font-mono text-primary mb-2">HIGHLIGHTS</p>
          <h2 className="text-3xl md:text-4xl font-bold font-mono">Selected Certifications</h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-2xl">Industry-recognized credentials selected for relevance across cloud, AI/ML, systems, software, and technology careers.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map(({ title, issuer, Icon }) => (
            <div key={title} className="group border border-border rounded-lg p-5 bg-background/50 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-start justify-between gap-3">
                <div className="w-9 h-9 rounded-md border border-border flex items-center justify-center text-primary group-hover:border-primary/50 transition-colors"><Icon className="w-4 h-4" /></div>
                <Award className="w-4 h-4 text-muted-foreground" />
              </div>
              <h3 className="mt-5 text-sm font-semibold leading-5">{title}</h3>
              <p className="mt-1 text-xs font-mono text-primary">{issuer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
