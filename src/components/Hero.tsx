"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const navCards = [
  {
    label: 'About Us',
    href: '#about',
    icon: (
      <svg className="w-8 h-8 text-brewery-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
    ),
  },
  {
    label: 'Events',
    href: '#events',
    icon: (
      <svg className="w-8 h-8 text-brewery-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
    ),
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: (
      <svg className="w-8 h-8 text-brewery-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4" /></svg>
    ),
  },
];

export default function Hero() {
  // State for unplugged effect
  const [unplugged, setUnplugged] = useState(false);
  const [powerSurge, setPowerSurge] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [getUnpluggedFlicker, setGetUnpluggedFlicker] = useState(false);
  const [showGetUnplugged, setShowGetUnplugged] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer with optimized settings
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '100px 0px',
  });

  // Update visibility
  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  // Combine refs
  const combinedRef = useCallback((el: HTMLDivElement | null) => {
    ref(el);
    sectionRef.current = el;
  }, [ref]);

  // Cache calculations for better performance
  const triggerPoint = useRef<number | null>(null);
  const isTransitioning = useRef(false);

  // Page load lighting effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
      setPowerSurge(true);
      setTimeout(() => setPowerSurge(false), 250);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Optimized scroll handler with debouncing
  const handleScroll = useCallback(() => {
    if (isTransitioning.current || !sectionRef.current) return;

    // Calculate trigger point only once or when necessary
    if (triggerPoint.current === null) {
      const rect = sectionRef.current.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      triggerPoint.current = top + rect.height * 0.25;
    }

    const scrollY = window.scrollY;
    const trigger = triggerPoint.current;

    if (trigger === null) return;

    const shouldBeUnplugged = scrollY > trigger;

    if (shouldBeUnplugged !== unplugged) {
      isTransitioning.current = true;
      setPowerSurge(true);
      setTimeout(() => {
        setUnplugged(shouldBeUnplugged);
        setTimeout(() => {
          setPowerSurge(false);
          isTransitioning.current = false;
        }, 200);
      }, 150);
    }
  }, [unplugged]);

  // Optimized scroll handler with requestAnimationFrame
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = window.scrollY;

    const handleScrollOptimized = () => {
      const currentScrollY = window.scrollY;

      // Only process if scroll changed significantly (reduce calculations)
      if (Math.abs(currentScrollY - lastScrollY) < 10) return;

      lastScrollY = currentScrollY;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        handleScroll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScrollOptimized, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScrollOptimized);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [handleScroll]);

  // Reset trigger point on resize
  useEffect(() => {
    const handleResize = () => {
      triggerPoint.current = null;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Enhanced Get Unplugged text behavior
  useEffect(() => {
    let flickerTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    if (unplugged) {
      setShowGetUnplugged(true);
      flickerTimeout = setTimeout(() => {
        setGetUnpluggedFlicker(true);
        hideTimeout = setTimeout(() => {
          setShowGetUnplugged(false);
          setGetUnpluggedFlicker(false);
        }, 700);
      }, 2500);
    } else {
      setShowGetUnplugged(true);
      setGetUnpluggedFlicker(false);
    }
    return () => {
      clearTimeout(flickerTimeout);
      clearTimeout(hideTimeout);
    };
  }, [unplugged]);

  // CSS variable state classes
  const stateClass = unplugged ? 'unplugged' : 'plugged';
  const surgeClass = powerSurge ? 'power-surge' : '';
  const loadedClass = pageLoaded ? 'lit' : 'dark';

  return (
    <section
      id="hero"
      ref={combinedRef}
      className={`relative min-h-screen flex items-center justify-center text-center hero-root scroll-animate ${isVisible ? 'in-view' : ''} ${stateClass} ${surgeClass} ${loadedClass}`}
      aria-live="polite"
      style={{ paddingTop: '5rem', scrollMarginTop: '5rem' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full z-0 transition-all duration-700 hero-background"
        style={{
          backgroundImage: "url('/hero.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
        aria-hidden="true"
      />
      {/* Overlays */}
      <div className="absolute inset-0 z-10 hero-overlay" />
      <div className="absolute inset-0 z-20 pointer-events-none hero-gradient" />

      {/* Content */}
      <div className="relative z-40 flex flex-col items-center justify-center w-full px-4 py-16 sm:py-32 hero-content scroll-animate">
        {/* Logo */}
        <img
          src="/favicon.webp"
          alt="Unplugged Brewery Logo"
          className="w-24 h-24 sm:w-36 sm:h-36 mb-4 rounded-full shadow-lg border-4 border-brewery-gold bg-white/80 object-contain logo-img"
        />

        {/* Title */}
        <h1 className="text-[clamp(2rem,7vw,6rem)] sm:text-[clamp(2.5rem,8vw,6rem)] font-extrabold text-brewery-gold drop-shadow-xl tracking-tight mb-2 font-hero relative hero-title scroll-animate">
          Unplugged Brewery
        </h1>

        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-2xl text-white mb-10 max-w-xl mx-auto font-light tracking-wide relative hero-tagline scroll-animate">
          Crafting unique brews for unplugged moments.
        </p>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 nav-btns-row scroll-animate">
          {navCards.map((card, idx) => (
            <a
              key={card.href}
              href={card.href}
              className={`group nav-btn flex flex-col items-center w-32 sm:w-40 cursor-pointer touch-target mobile-optimized`}
              style={{ transitionDelay: `${0.7 + idx * 0.1}s` }}
            >
              <span className="mb-2 group-hover:text-brewery-primary transition-colors duration-300">{card.icon}</span>
              <span className="font-bold text-lg group-hover:text-brewery-primary transition-colors duration-300">{card.label}</span>
            </a>
          ))}
        </div>

        {/* Get Unplugged message */}
        {showGetUnplugged && (
          <div
            className={`get-unplugged-text transition-opacity duration-700 ease-out text-4xl md:text-5xl font-bold drop-shadow-lg mt-8 mb-6 scroll-animate relative z-[60]
              ${unplugged ? (getUnpluggedFlicker ? 'flicker' : 'stay-bright') : (pageLoaded ? 'glow-bright' : 'glow-dark')}
            `}
            aria-live="polite"
            style={{ color: 'var(--get-unplugged-color)' }}
          >
            Get Unplugged
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center scroll-indicator scroll-animate">
        <span className="text-xs mb-1 tracking-widest uppercase opacity-80">Learn More</span>
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Fixed Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg className="w-full h-8" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>

      {/* Component-specific styles - kept all unique unplugged effect styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
        
        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
        }
        
        /* Component-specific timing */
        .hero-content {
          transition-delay: 0.1s;
        }
        
        .logo-img {
          transition-delay: 0.2s;
        }
        
        .hero-title {
          transition-delay: 0.3s;
        }
        
        .hero-tagline {
          transition-delay: 0.4s;
        }
        
        .nav-btns-row {
          transition-delay: 0.5s;
        }
        
        .get-unplugged-text {
          transition-delay: 0.6s;
        }
        
        .scroll-indicator {
          transition-delay: 0.7s;
        }

        /* Background image responsive handling */
        .hero-background {
          background-size: cover !important;
          background-position: center !important;
          background-attachment: fixed;
        }

        /* Mobile background adjustments */
        @media (max-width: 768px) {
          .hero-background {
            background-attachment: scroll;
            background-size: cover !important;
            min-height: 100vh;
          }
        }

        /* Landscape mobile and tablets */
        @media (max-width: 1024px) and (orientation: landscape) {
          .hero-background {
            background-size: cover !important;
            background-position: center !important;
          }
        }
        
      /* Hero-specific unplugged effect system - Liquid Glass Revamped */
      .hero-root {
        --glow-color: rgba(230, 179, 37, 0.4);
        --glow-shadow: 0 0 50px 15px var(--glow-color), 0 0 20px 8px rgba(253, 245, 230, 0.4);
        --title-glow: 0 0 70px 15px rgba(230, 179, 37, 0.6), 0 0 20px 4px rgba(253, 245, 230, 0.5);
        --logo-glow: 0 0 45px 10px rgba(230, 179, 37, 0.5);
        --btn-glow: 0 10px 30px -5px rgba(18, 10, 7, 0.4);
        --btn-inner-glow: 0 0 25px rgba(253, 245, 230, 0.15) inset;
        --bg-brightness: 1.25;
        --bg-saturate: 1.35;
        --overlay-bg: rgba(18, 10, 7, 0.35);
        --gradient: radial-gradient(circle at center, rgba(230, 179, 37, 0.15) 0%, rgba(18, 10, 7, 0.7) 100%);
        --cta-bright: #E6B325;
        --btn-bg: #C68642;
        --btn-text: #120A07;
        --nav-btn-border: rgba(230, 179, 37, 0.5);
        --scroll-indicator: #E6B325;
        --title-filter: brightness(1.2) contrast(1.1);
        --animation-speed: 1;
        --get-unplugged-color: #E6B325;
        transform: translateZ(0);
      }
      
      .hero-root.unplugged {
        --glow-color: transparent;
        --glow-shadow: none;
        --title-glow: none;
        --logo-glow: none;
        --btn-glow: none;
        --bg-brightness: 0.65;
        --bg-saturate: 0.25;
        --overlay-bg: rgba(18, 10, 7, 0.7);
        --gradient: radial-gradient(circle at center, rgba(18, 10, 7, 0.2) 0%, rgba(18, 10, 7, 0.85) 100%);
        --cta-bright: #4A3B34;
        --btn-bg: #2A1F1A;
        --btn-text: #777;
        --nav-btn-border: #4A3B34;
        --scroll-indicator: #4A3B34;
        --title-filter: brightness(0.75) grayscale(0.85);
        --animation-speed: 0.6;
      }
        
        .hero-root {
          transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hero-root.power-surge {
          animation: surge-flash 0.25s ease-out 2;
        }
        
        @keyframes surge-flash {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.8); }
        }
        
        .hero-overlay {
          background: var(--overlay-bg);
          transition: background 1s ease-in-out;
        }
        
        .hero-gradient {
          background: var(--gradient);
          transition: background 1s ease-in-out;
        }
        
        .logo-img {
          box-shadow: var(--logo-glow);
          filter: var(--logo-filter);
          transition: all 1s ease;
          border-color: #E6B325 !important;
        }
        
        .hero-title {
          font-family: var(--font-serif);
          text-shadow: var(--title-glow);
          filter: var(--title-filter);
          transition: all 1s ease;
          letter-spacing: -0.02em;
          color: #E6B325 !important;
        }
        
        .hero-tagline {
          font-family: var(--font-sans);
          color: #FDF5E6 !important;
          transition: all 1s ease;
        }
        
        .nav-btn {
          background: var(--btn-bg);
          color: var(--btn-text);
          border: 1px solid var(--nav-btn-border);
          box-shadow: var(--btn-glow);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 9999px;
          padding: 1rem 2.5rem;
          font-family: var(--font-sans);
          font-weight: 600;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          font-size: 0.8125rem;
        }
        
        .hero-root.plugged .nav-btn:hover {
          transform: translateY(-5px) scale(1.05);
          background: #E6B325;
          box-shadow: 0 15px 40px -10px rgba(230, 179, 37, 0.5);
        }
        
        .scroll-indicator svg {
          color: var(--scroll-indicator);
          transition: color 1s ease;
        }
        
        .get-unplugged-text {
          font-family: var(--font-serif);
          text-shadow: 0 0 30px rgba(230, 179, 37, 0.4);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .hero-root .animate-bounce {
          animation: bounce calc(1.5s * var(--animation-speed)) infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        
        .hero-root.lit {
          filter: none;
        }
        
        .hero-root.dark {
          filter: brightness(0.3) grayscale(0.8) saturate(0.2);
          transition: filter 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        
        .get-unplugged-text {
          z-index: 60;
          position: relative;
          text-shadow: 0 0 32px #ffe066, 0 0 8px #fffbe6, 0 0 2px #fffbe6;
          transition: opacity 0.7s, color 0.7s, text-shadow 0.7s;
          transform: translateZ(0);
        }
        
        .get-unplugged-text.glow-bright {
          color: #ffe066;
          text-shadow: 0 0 32px #ffe066, 0 0 8px #fffbe6, 0 0 2px #fffbe6;
          opacity: 1;
        }
        
        .get-unplugged-text.stay-bright {
          color: #ffe066;
          text-shadow: 0 0 32px #ffe066, 0 0 8px #fffbe6, 0 0 2px #fffbe6;
          opacity: 1;
        }
        
        .get-unplugged-text.flicker {
          animation: get-unplugged-flicker 0.7s linear 1;
          color: #ffe066;
          text-shadow: 0 0 32px #ffe066, 0 0 8px #fffbe6, 0 0 2px #fffbe6;
        }
        
        .get-unplugged-text.glow-dark {
          color: #444;
          text-shadow: none;
          opacity: 0.2;
        }
        
        @keyframes get-unplugged-flicker {
          0% { opacity: 1; }
          10% { opacity: 0.2; }
          20% { opacity: 1; }
          30% { opacity: 0.2; }
          40% { opacity: 1; }
          100% { opacity: 0.2; }
        }

        /* Mobile optimizations for hero */
        @media (max-width: 768px) {
          .nav-btns-row {
            gap: 1rem;
          }
          
          .nav-btn {
            width: 8rem;
            padding: 1rem 1.5rem;
          }
          
          .nav-btn span:last-child {
            font-size: 0.9rem;
          }
          
          .get-unplugged-text {
            font-size: 2.5rem;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
          
          .hero-title {
            text-align: center;
            line-height: 1.1;
          }
          
          .hero-tagline {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
}