import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const FloatingPetals = ({ count = 12 }) => {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      petalsRef.current.forEach((petal, index) => {
        if (!petal) return;

        const startX = Math.random() * 100;
        const duration = 5 + Math.random() * 4;
        const delay = index * 0.5;

        gsap.set(petal, {
          x: `${startX}vw`,
          y: -100,
          rotation: Math.random() * 360,
          scale: 0.8 + Math.random() * 0.8,
        });

        const tl = gsap.timeline({ repeat: -1, delay });

        tl.to(petal, {
          y: '110vh',
          x: `${startX + (Math.random() * 50 - 25)}vw`,
          rotation: 720 + Math.random() * 360,
          duration,
          ease: 'none',
        })
        .set(petal, {
          x: `${Math.random() * 100}vw`,
          y: -100,
          rotation: Math.random() * 360,
        });

        gsap.to(petal, {
          x: `+=${Math.random() * 60 - 30}`,
          duration: 1.5 + Math.random() * 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [count]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (petalsRef.current[index] = el)}
          className="absolute w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7"
        >
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse
              cx="10"
              cy="10"
              rx="8"
              ry="12"
              fill={index % 3 === 0 ? '#FF69B4' : index % 3 === 1 ? '#FFB6C1' : '#FFC0CB'}
              opacity="0.85"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingPetals;
