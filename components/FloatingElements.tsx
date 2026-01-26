'use client';

interface FloatingElementsProps {
  scrollY: number;
}

export default function FloatingElements({ scrollY }: FloatingElementsProps) {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(0, 255, 136, 0.05) 25%, rgba(0, 255, 136, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.05) 75%, rgba(0, 255, 136, 0.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(0, 255, 136, 0.05) 25%, rgba(0, 255, 136, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 255, 136, 0.05) 75%, rgba(0, 255, 136, 0.05) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Floating corners */}
      <div
        className="absolute top-20 left-10 w-32 h-32 border-l-2 border-t-2 border-primary opacity-20 animate-float"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />

      <div
        className="absolute bottom-32 right-10 w-40 h-40 border-r-2 border-b-2 border-secondary opacity-20 animate-float"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
          animationDelay: '1s',
        }}
      />

      {/* Floating dots */}
      <div
        className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-primary animate-pulse-glow"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`,
        }}
      />

      <div
        className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-secondary animate-pulse-glow"
        style={{
          transform: `translateY(${scrollY * 0.6}px)`,
          animationDelay: '0.5s',
        }}
      />

      {/* Connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
        }}
      >
        <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="url(#gradient1)" strokeWidth="1" />
        <line x1="60%" y1="30%" x2="90%" y2="70%" stroke="url(#gradient2)" strokeWidth="1" />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(0, 255, 136)" />
            <stop offset="100%" stopColor="rgba(0, 255, 136, 0)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(0, 212, 255)" />
            <stop offset="100%" stopColor="rgba(0, 212, 255, 0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
