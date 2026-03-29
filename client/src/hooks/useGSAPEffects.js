import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useShimmer = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const shimmer = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    shimmer.fromTo(
      ref.current,
      {
        backgroundPosition: '-200% center',
      },
      {
        backgroundPosition: '200% center',
        duration: 2,
        ease: 'power1.inOut',
      }
    );

    return () => shimmer.kill();
  }, []);

  return ref;
};

export const useGentlePulse = (scale = 1.03, duration = 2) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      scale,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, [scale, duration]);

  return ref;
};

export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;
      const scrolled = window.pageYOffset;
      gsap.to(ref.current, {
        y: scrolled * speed,
        duration: 0.5,
        ease: 'power1.out',
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

export const useTypingEffect = (text, speed = 50) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !text) return;

    const element = ref.current;
    element.textContent = '';
    let index = 0;

    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    };

    setTimeout(type, 300);
  }, [text, speed]);

  return ref;
};

export const useMaskReveal = (direction = 'left') => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const clipValues = {
      left: ['polygon(0 0, 0 0, 0 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
      right: ['polygon(100% 0, 100% 0, 100% 100%, 100% 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
      top: ['polygon(0 0, 100% 0, 100% 0, 0 0)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
      bottom: ['polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'],
    };

    gsap.fromTo(
      ref.current,
      {
        clipPath: clipValues[direction][0],
      },
      {
        clipPath: clipValues[direction][1],
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [direction]);

  return ref;
};

export const useCursorTrail = (particleCount = 5) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleMouseMove = (e) => {
      particlesRef.current.forEach((particle, index) => {
        if (!particle) return;

        gsap.to(particle, {
          x: e.clientX - 5,
          y: e.clientY - 5,
          duration: 0.3 + index * 0.1,
          ease: 'power2.out',
        });

        gsap.to(particle, {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          delay: 0.2,
          onComplete: () => {
            gsap.set(particle, { opacity: 0.6, scale: 1 });
          },
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [particleCount]);

  return { containerRef, particlesRef };
};

export const useSplitText = (delay = 0) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const text = ref.current.textContent;
    ref.current.innerHTML = text
      .split('')
      .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    const chars = ref.current.querySelectorAll('span');

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.03,
        delay,
        ease: 'back.out(1.2)',
      }
    );
  }, [delay]);

  return ref;
};

export default {
  useShimmer,
  useGentlePulse,
  useParallax,
  useTypingEffect,
  useMaskReveal,
  useCursorTrail,
  useSplitText,
};
