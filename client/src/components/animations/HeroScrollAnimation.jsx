import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroScrollAnimation = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const flowerRef = useRef(null);
  const subtitleRef = useRef(null);

  const particlePositions = useMemo(() => [
    { left: '10%' }, { left: '23%' }, { left: '38%' }, { left: '52%' }, { left: '67%' },
    { left: '15%' }, { left: '31%' }, { left: '45%' }, { left: '59%' }, { left: '73%' },
    { left: '8%' }, { left: '27%' }, { left: '42%' }, { left: '64%' }, { left: '85%' },
  ], []);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      });

      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      const initialFontSize = isMobile ? '2rem' : isTablet ? '2.5rem' : '3rem';
      const finalFontSize = isMobile ? '4rem' : isTablet ? '5.5rem' : '8rem';
      const titleScale = isMobile ? 1 : 1.2;
      const flowerScale = isMobile ? 2 : isTablet ? 2.5 : 3;
      const flowerFinalScale = isMobile ? 3 : isTablet ? 4 : 5;

      gsap.set(titleRef.current, {
        fontSize: initialFontSize,
        opacity: 1,
        y: 0,
      });

      gsap.set('.scroll-indicator', {
        opacity: 1,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.2,
      }, 0)

      .to(titleRef.current, {
        fontSize: finalFontSize,
        scale: titleScale,
        y: isMobile ? -50 : -100,
        duration: 0.4,
        ease: 'power2.inOut',
      }, 0)
      .to(titleRef.current, {
        opacity: 0,
        y: -200,
        duration: 0.3,
      })
      .fromTo(flowerRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: flowerScale,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
        },
        '-=0.1'
      )
      .to(flowerRef.current, {
        scale: flowerFinalScale,
        opacity: 0.3,
        filter: isMobile ? 'blur(5px)' : 'blur(10px)',
        duration: 0.4,
      })
      .fromTo(subtitleRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        },
        '-=0.2'
      );

      const particles = gsap.utils.toArray('.particle');
      particles.forEach((particle, i) => {
        gsap.fromTo(particle,
          {
            y: '100vh',
            opacity: 0.6,
          },
          {
            y: -300 - Math.random() * 200,
            x: Math.random() * 400 - 200,
            opacity: 0,
            duration: 2,
            repeat: -1,
            delay: i * 0.1,
            ease: 'power1.out',
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-br from-pink-50 via-white to-gold-50"
    >
      {particlePositions.map((position, i) => (
        <div
          key={i}
          className="particle absolute w-2 h-2 rounded-full bg-primary-400 opacity-60"
          style={{
            left: position.left,
            top: '100%',
          }}
        />
      ))}

      <h1
        ref={titleRef}
        className="absolute font-serif font-bold text-center bg-linear-to-r from-primary-600 to-gold-600 bg-clip-text text-transparent leading-tight px-4"
        style={{ fontSize: '3rem' }}
      >
        Momentos Especiales
        <br />
        Regalos Únicos
      </h1>

      <div
        ref={flowerRef}
        className="absolute text-6xl sm:text-7xl md:text-9xl opacity-0"
        style={{ fontSize: 'clamp(6rem, 15vw, 10rem)' }}
      >
        🌹
      </div>

      <div
        ref={subtitleRef}
        className="absolute bottom-20 sm:bottom-24 md:bottom-32 text-center opacity-0 px-4 w-full"
      >
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-700 mb-4 sm:mb-6">
          Descubre la magia de regalar
        </p>
        <div className="flex gap-3 sm:gap-4 justify-center flex-wrap">
          <button className="btn-primary px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg">
            Explorar
          </button>
          <button className="px-6 sm:px-8 py-2 sm:py-3 text-base sm:text-lg border-2 border-primary-500 text-primary-600 rounded-full hover:bg-primary-50 transition-all duration-300">
            Personalizar
          </button>
        </div>
      </div>

      <div className="scroll-indicator absolute bottom-8 sm:bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-100">
        <div className="w-6 h-10 sm:w-8 sm:h-12 border-3 sm:border-4 rounded-full flex items-start justify-center p-2 shadow-2xl" style={{ borderColor: '#FF1493', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <div className="w-1.5 h-2.5 sm:w-2 sm:h-3 rounded-full animate-pulse" style={{ backgroundColor: '#FF1493' }} />
        </div>
        <p className="text-xs sm:text-sm mt-2 sm:mt-3 font-bold tracking-wide" style={{ color: '#FF1493' }}>DESLIZA</p>
      </div>
    </div>
  );
};

export default HeroScrollAnimation;
