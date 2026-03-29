import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


export const useFadeInUp = (delay = 0) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
      }
    );
  }, [delay]);

  return ref;
};

export const useStaggerFadeIn = (staggerDelay = 0.1) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.children;

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: staggerDelay,
        ease: 'power2.out',
      }
    );
  }, [staggerDelay]);

  return ref;
};

export const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      from = { opacity: 0, y: 50 },
      to = { opacity: 1, y: 0 },
      duration = 1,
    } = options;

    gsap.fromTo(
      ref.current,
      from,
      {
        ...to,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub,
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [options]);

  return ref;
};

export const useHoverScale = (scale = 1.05) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        duration: 0.3,
        ease: 'power1.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power1.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale]);

  return ref;
};

export const useFloatAnimation = (duration = 3) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: -10,
      duration,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });
  }, [duration]);

  return ref;
};

export const useModalAnimation = (isOpen) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isOpen) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    }
  }, [isOpen]);

  return ref;
};

export const useCountUp = (target, duration = 2) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const obj = { value: 0 };

    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power1.out',
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value);
        }
      },
    });
  }, [target, duration]);

  return ref;
};

export default {
  useFadeInUp,
  useStaggerFadeIn,
  useScrollReveal,
  useHoverScale,
  useFloatAnimation,
  useModalAnimation,
  useCountUp,
};
