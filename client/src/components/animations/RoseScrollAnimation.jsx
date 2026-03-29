import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RoseScrollAnimation = () => {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);
  const centerRef = useRef(null);
  const stemRef = useRef(null);
  const leavesRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(petalsRef.current, {
        scale: 0.3,
        rotation: -10,
        transformOrigin: 'center center',
      });
      gsap.set(centerRef.current, { scale: 0, opacity: 0 });
      gsap.set(leavesRef.current, { scaleY: 0, opacity: 0 });

      gsap.from(containerRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      const tl = gsap.timeline({
        delay: 1.5,
      });

      petalsRef.current.forEach((petal, index) => {
        tl.to(petal, {
          scale: 1,
          rotation: index * 10 - 20,
          duration: 1.5,
          ease: 'elastic.out(1, 0.6)',
        }, 0);
      });

      tl.to(centerRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'back.out(2)',
      }, 0.5);

      leavesRef.current.forEach((leaf, index) => {
        tl.to(leaf, {
          scaleY: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.7)',
        }, 0.4 + index * 0.2);
      });

      tl.add(() => {
        gsap.to(containerRef.current, {
          y: -12,
          duration: 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });

        petalsRef.current.forEach((petal, index) => {
          gsap.to(petal, {
            scale: 1.05,
            duration: 2.5 + index * 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.2,
          });
        });
      }, "+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed left-8 lg:left-16 top-1/2 -translate-y-1/2 w-32 h-44 md:w-40 md:h-56 lg:w-48 lg:h-64 pointer-events-none z-40 hidden md:block"
    >
      <svg
        viewBox="0 0 100 160"
        className="w-full h-full drop-shadow-2xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={stemRef}
          d="M50 60 L50 150"
          stroke="#2d5016"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        <ellipse
          ref={(el) => (leavesRef.current[0] = el)}
          cx="40"
          cy="100"
          rx="8"
          ry="15"
          fill="#4a7c2a"
          opacity="0.9"
          transform="rotate(-30 40 100)"
        />
        <ellipse
          ref={(el) => (leavesRef.current[1] = el)}
          cx="60"
          cy="120"
          rx="8"
          ry="15"
          fill="#4a7c2a"
          opacity="0.9"
          transform="rotate(30 60 120)"
        />

        <g transform="translate(50, 35)">
          <ellipse
            ref={(el) => (petalsRef.current[0] = el)}
            cx="0"
            cy="-15"
            rx="12"
            ry="20"
            fill="#FF69B4"
            opacity="0.95"
          />
          <ellipse
            ref={(el) => (petalsRef.current[1] = el)}
            cx="13"
            cy="-7"
            rx="12"
            ry="20"
            fill="#FF1493"
            opacity="0.9"
            transform="rotate(45)"
          />
          <ellipse
            ref={(el) => (petalsRef.current[2] = el)}
            cx="13"
            cy="7"
            rx="12"
            ry="20"
            fill="#FF69B4"
            opacity="0.95"
            transform="rotate(90)"
          />
          <ellipse
            ref={(el) => (petalsRef.current[3] = el)}
            cx="0"
            cy="15"
            rx="12"
            ry="20"
            fill="#FF1493"
            opacity="0.9"
            transform="rotate(135)"
          />
          <ellipse
            ref={(el) => (petalsRef.current[4] = el)}
            cx="-13"
            cy="7"
            rx="12"
            ry="20"
            fill="#FF69B4"
            opacity="0.95"
            transform="rotate(180)"
          />
          <ellipse
            ref={(el) => (petalsRef.current[5] = el)}
            cx="-13"
            cy="-7"
            rx="12"
            ry="20"
            fill="#FF1493"
            opacity="0.9"
            transform="rotate(225)"
          />

          <circle
            ref={centerRef}
            cx="0"
            cy="0"
            r="8"
            fill="#FFD700"
            opacity="0.95"
          />
          <circle
            cx="0"
            cy="0"
            r="4"
            fill="#FFA500"
            opacity="0.8"
          />
        </g>

        <circle
          cx="45"
          cy="25"
          r="3"
          fill="white"
          opacity="0.4"
          className="animate-pulse"
        />
      </svg>

      <div className="absolute inset-0 bg-gradient-radial from-primary-300/20 via-transparent to-transparent blur-xl -z-10 scale-150"></div>

      <div className="absolute -inset-4 pointer-events-none">
        <div className="absolute top-0 right-2 w-1 h-1 bg-primary-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-1 w-1 h-1 bg-gold-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/3 right-0 w-0.5 h-0.5 bg-primary-300 rounded-full animate-pulse opacity-40" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default RoseScrollAnimation;
