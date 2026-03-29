import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const particles = [
  { size: 40, left: 10, top: 15, delay: 0, duration: 15 },
  { size: 60, left: 85, top: 25, delay: 2, duration: 18 },
  { size: 35, left: 20, top: 70, delay: 1, duration: 20 },
  { size: 55, left: 75, top: 60, delay: 3, duration: 16 },
  { size: 45, left: 50, top: 30, delay: 1.5, duration: 19 },
  { size: 50, left: 15, top: 45, delay: 2.5, duration: 17 },
  { size: 38, left: 90, top: 80, delay: 0.5, duration: 21 },
  { size: 48, left: 30, top: 85, delay: 3.5, duration: 14 },
  { size: 42, left: 65, top: 10, delay: 1.2, duration: 22 },
  { size: 52, left: 40, top: 55, delay: 2.8, duration: 13 },
];

const ContactScrollAnimation = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const phoneRef = useRef(null);
  const phoneIconRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const phone = phoneRef.current;
    const phoneIcon = phoneIconRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!container || !title || !phone || !phoneIcon || !scrollIndicator) {
      return;
    }

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const titleScale = isMobile ? 1 : 1.2;
      const phoneRotation = isMobile ? 180 : 360;
      const yOffset = isMobile ? -100 : -200;

      gsap.fromTo(
        container,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(title, {
        scale: titleScale,
        duration: 0.3,
        ease: 'back.out(1.7)',
      });

      tl.to(
        phoneIcon,
        {
          scale: 1,
          rotation: phoneRotation,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
        },
        0.3
      );

      tl.to(
        [title, phone],
        {
          y: yOffset,
          opacity: 0.3,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        0.7
      );

      tl.to(
        phone,
        {
          y: -window.innerHeight,
          rotation: -15,
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in',
        },
        1.2
      );

      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        onUpdate: (self) => {
          if (self.progress > 0.01) {
            gsap.to(scrollIndicator, {
              opacity: 0,
              y: 20,
              duration: 0.2,
            });
          } else {
            gsap.to(scrollIndicator, {
              opacity: 1,
              y: 0,
              duration: 0.2,
            });
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center bg-linear-to-b from-primary-50 via-white to-primary-50 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-linear-to-br from-primary-300/20 to-gold-300/20 animate-float"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-6 sm:mb-8"
          style={{
            background: 'linear-gradient(135deg, #FF69B4, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Contáctanos
        </h1>

        <div ref={phoneRef} className="flex justify-center">
          <div
            ref={phoneIconRef}
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl transform scale-0"
            style={{ transformOrigin: 'center' }}
          >
            📞
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 animate-bounce"
      >
        <div className="w-6 h-10 sm:w-8 sm:h-12 border-3 sm:border-4 rounded-full flex items-start justify-center p-2"
          style={{
            borderColor: '#FF1493',
            backgroundColor: 'rgba(255, 255, 255, 0.7)'
          }}
        >
          <div className="w-1 h-2 sm:w-1.5 sm:h-2.5 bg-linear-to-b from-primary-500 to-gold-500 rounded-full"></div>
        </div>
        <span className="text-xs sm:text-sm font-medium text-primary-500">DESLIZA</span>
      </div>
    </div>
  );
};

export default ContactScrollAnimation;
