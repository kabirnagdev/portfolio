'use client';

import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedText({ text, className = '', delay = 0 }: AnimatedTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const letters = containerRef.current.querySelectorAll('.letter');
      anime({
        targets: letters,
        opacity: [0, 1],
        translateY: [20, 0],
        easing: 'easeOutExpo',
        duration: 800,
        delay: (_el: Element, i: number) => delay + i * 50,
      });
    }
  }, [delay]);

  return (
    <span ref={containerRef} className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="letter inline-block opacity-0"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

export function useAnimeOnScroll(options: anime.AnimeParams) {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            anime({
              targets: elementRef.current,
              ...options,
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return elementRef;
}

export function useStaggerAnimation(selector: string, delay: number = 0) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target.querySelectorAll(selector),
              opacity: [0, 1],
              translateY: [30, 0],
              easing: 'easeOutExpo',
              duration: 800,
              delay: anime.stagger(100, { start: delay }),
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-stagger-parent]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [selector, delay]);
}

export function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const obj = { count: 0 };
            anime({
              targets: obj,
              count: value,
              round: 1,
              duration: duration,
              easing: 'easeOutExpo',
              update: () => {
                if (counterRef.current) {
                  counterRef.current.textContent = obj.count.toString();
                }
              },
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={counterRef}>0</span>;
}
