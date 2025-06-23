"use client";

import React, { useEffect, useRef, useState } from 'react';

const navCards = [
  {
    label: 'About Us',
    href: '#about',
    icon: (
      <svg className="w-8 h-8 text-brewery-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
    ),
  },
  {
    label: 'Menu',
    href: '#menu',
    icon: (
      <svg className="w-8 h-8 text-brewery-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
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
  const [pageLoaded, setPageLoaded] = useState(false); // For page load lighting
  const [getUnpluggedFlicker, setGetUnpluggedFlicker] = useState(false); // For flicker animation
  const [showGetUnplugged, setShowGetUnplugged] = useState(true); // For controlling text fade out
  const sectionRef = useRef<HTMLDivElement>(null);

  // Page load lighting effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoaded(true);
      setPowerSurge(true);
      setTimeout(() => setPowerSurge(false), 250);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll trigger at 25% of banner height (no parallax)
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        // Unplugged trigger at 25% of banner height
        const rect = sectionRef.current.getBoundingClientRect();
        const height = rect.height;
        const top = rect.top + window.scrollY;
        const scrollY = window.scrollY;
        const trigger = top + height * 0.25;
        if (!unplugged && scrollY > trigger) {
          setPowerSurge(true);
          setTimeout(() => {
            setUnplugged(true);
            setTimeout(() => setPowerSurge(false), 200);
          }, 150);
        } else if (unplugged && scrollY <= trigger) {
          setPowerSurge(true);
          setTimeout(() => {
            setUnplugged(false);
            setTimeout(() => setPowerSurge(false), 200);
          }, 150);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [unplugged]);

  // Enhanced Get Unplugged text behavior
  useEffect(() => {
    let flickerTimeout: NodeJS.Timeout;
    let hideTimeout: NodeJS.Timeout;
    if (unplugged) {
      // When unplugged, keep text bright for 2.5s, then flicker, then fade out
      setShowGetUnplugged(true);
      flickerTimeout = setTimeout(() => {
        setGetUnpluggedFlicker(true);
        hideTimeout = setTimeout(() => {
          setShowGetUnplugged(false);
          setGetUnpluggedFlicker(false);
        }, 700); // Flicker duration
      }, 2500); // Stay bright for 2.5s
    } else {
      // When plugged, show text immediately
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
      ref={sectionRef}
      className={`relative min-h-screen flex items-center justify-center text-center overflow-hidden hero-root ${stateClass} ${surgeClass} ${loadedClass}`}
      aria-live="polite"
    >
      {/* Parallax Background (now static) */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: "url('/hero.png')",
        }}
        aria-hidden="true"
      />
      {/* Overlays */}
      <div className="absolute inset-0 z-10 hero-overlay" />
      <div className="absolute inset-0 z-20 pointer-events-none hero-gradient" />
      {/* Content */}
      <div className="relative z-40 flex flex-col items-center justify-center w-full px-4 py-16 sm:py-32 animate-hero-fade-in">
        {/* Logo */}
        <img src="/favicon.webp" alt="Unplugged Brewery Logo" className="w-24 h-24 sm:w-36 sm:h-36 mb-4 rounded-full shadow-lg border-4 border-brewery-gold bg-white/80 object-contain logo-img" />
        {/* Title */}
        <h1 className="text-[clamp(2rem,7vw,6rem)] sm:text-[clamp(2.5rem,8vw,6rem)] font-extrabold text-brewery-gold drop-shadow-xl tracking-tight mb-2 font-hero relative hero-title">
          Unplugged Brewery
        </h1>
        {/* Tagline */}
        <p className="text-base sm:text-lg md:text-2xl text-white mb-10 max-w-xl mx-auto font-light tracking-wide relative hero-tagline">
          <span className="bg-brewery-gold/20 px-2 py-1 rounded-md shadow-sm">Crafting unique brews for unplugged moments.</span>
        </p>
        {/* Navigation Buttons Only (no CTA) */}
        <div className="flex flex-wrap justify-center gap-6 mt-4 nav-btns-row">
          {navCards.map((card, idx) => (
            <a
              key={card.href}
              href={card.href}
              className={`group nav-btn flex flex-col items-center w-32 sm:w-40 cursor-pointer`}
              style={{ transitionDelay: `${0.7 + idx * 0.1}s` }}
            >
              <span className="mb-2 group-hover:text-brewery-primary transition-colors duration-300">{card.icon}</span>
              <span className="font-bold text-lg group-hover:text-brewery-primary transition-colors duration-300">{card.label}</span>
            </a>
          ))}
        </div>
        {/* Get Unplugged message appears below buttons and is last to fade out */}
        {showGetUnplugged && (
          <div
            className={`get-unplugged-text transition-opacity duration-700 ease-out text-4xl md:text-5xl font-bold drop-shadow-lg mt-10 mb-8
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center scroll-indicator">
        <span className="text-xs mb-1 tracking-widest uppercase opacity-80">Learn More</span>
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {/* Full-width Section Divider */}
      <div className="w-screen left-1/2 -translate-x-1/2 absolute bottom-0 z-10" style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:'100vw',zIndex:10}} aria-hidden="true">
        <svg width="100vw" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100vw',minWidth:'100vw',maxWidth:'100vw'}}>
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>
      {/* Animations, CSS Variables, and Custom Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap');
        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
        }
        .hero-root {
          --glow-color: #fffbe6;
          --glow-shadow: 0 0 32px 8px var(--glow-color), 0 0 8px 2px #ffe066;
          --title-glow: 0 0 48px 8px #ffe066, 0 0 8px 2px #fffbe6;
          --logo-glow: 0 0 32px 8px #ffe066, 0 0 8px 2px #fffbe6;
          --btn-glow: 0 0 32px 8px #ffe066, 0 0 16px 4px #fffbe6;
          --btn-bg-glow: rgba(255, 224, 102, 0.35);
          --btn-inner-glow: 0 0 16px 4px #fffbe6 inset, 0 0 8px 2px #ffe066 inset;
          --power-line-color: #ffe066;
          --spark-color: #fffbe6;
          --bg-brightness: 1.2;
          --bg-saturate: 1.1;
          --overlay-bg: rgba(0,0,0,0.3);
          --gradient: radial-gradient(ellipse at center, rgba(255,255,200,0.15) 0%, rgba(0,0,0,0.7) 100%);
          --foam-opacity: 1;
          --cta-bright: #ffe066;
          --cta-dark: #bfae5a;
          --btn-bg: #ffe066;
          --btn-text: #2d2d2d;
          --nav-btn-bg: rgba(255,255,255,0.12);
          --nav-btn-border: #ffe066;
          --nav-btn-glow: 0 0 12px 2px #ffe066;
          --scroll-indicator: #ffe066;
          --title-filter: brightness(1.2) contrast(1.1) saturate(1.1);
          --logo-filter: brightness(1.2) contrast(1.1) saturate(1.1);
          --breathing-scale: 1.04;
          --breathing-shadow: 0 8px 48px #ffe066a0, 0 2px 0 #fff6;
          --transition: all 3.5s cubic-bezier(0.4,0,0.2,1);
          --settle-transition: all 0.7s ease-out;
          --scale: 1;
          --opacity: 1;
          --desaturate: 0;
          --animation-speed: 1;
          --get-unplugged-color: #ffe066;
        }
        .hero-root.unplugged {
          --glow-color: #222;
          --glow-shadow: none;
          --title-glow: none;
          --logo-glow: none;
          --btn-glow: none;
          --btn-bg-glow: transparent;
          --btn-inner-glow: none;
          --power-line-color: #444;
          --spark-color: #444;
          --bg-brightness: 0.6;
          --bg-saturate: 0.2;
          --overlay-bg: rgba(0,0,0,0.7);
          --gradient: radial-gradient(ellipse at center, rgba(34,34,34,0.1) 0%, rgba(0,0,0,0.9) 100%);
          --foam-opacity: 0.15;
          --cta-bright: #888;
          --cta-dark: #444;
          --btn-bg: #444;
          --btn-text: #bbb;
          --nav-btn-bg: rgba(44,44,44,0.5);
          --nav-btn-border: #444;
          --nav-btn-glow: none;
          --scroll-indicator: #444;
          --title-filter: brightness(0.6) grayscale(0.8) contrast(0.7) saturate(0.2);
          --logo-filter: brightness(0.6) grayscale(0.8) contrast(0.7) saturate(0.2);
          --breathing-scale: 1.01;
          --breathing-shadow: 0 2px 8px #222a, 0 1px 0 #2226;
          --scale: 0.98;
          --opacity: 0.92;
          --desaturate: 0.8;
          --animation-speed: 0.4;
        }
        .hero-root {
          transition: var(--transition);
        }
        .hero-root.power-surge {
          animation: surge-flash 0.18s linear 2;
        }
        @keyframes surge-flash {
          0% { filter: brightness(1.7); }
          50% { filter: brightness(0.7); }
          100% { filter: brightness(1); }
        }
        .hero-overlay {
          background: var(--overlay-bg);
          transition: background 3.5s cubic-bezier(0.4,0,0.2,1);
        }
        .hero-gradient {
          background: var(--gradient);
          transition: background 3.5s cubic-bezier(0.4,0,0.2,1);
        }
        .logo-img {
          box-shadow: var(--logo-glow);
          filter: var(--logo-filter) grayscale(var(--desaturate));
          transition: var(--transition), var(--settle-transition);
          will-change: transform, opacity, filter;
          transform: scale(var(--scale));
          opacity: var(--opacity);
          transition-delay: 0s;
        }
        .hero-title {
          text-shadow: var(--title-glow);
          filter: var(--title-filter) grayscale(var(--desaturate));
          transition: var(--transition), var(--settle-transition);
          will-change: transform, opacity, filter;
          transform: scale(var(--scale));
          opacity: var(--opacity);
          animation: breathing calc(3s * var(--animation-speed)) ease-in-out infinite;
          transition-delay: 0.2s;
        }
        .hero-root.unplugged .hero-title {
          animation-duration: 6s;
        }
        @keyframes breathing {
          0%, 100% { transform: scale(1); text-shadow: var(--breathing-shadow); }
          50% { transform: scale(var(--breathing-scale)); text-shadow: var(--breathing-shadow); }
        }
        .hero-tagline {
          filter: var(--title-filter) grayscale(var(--desaturate));
          transition: var(--transition), var(--settle-transition);
          will-change: transform, opacity, filter;
          transform: scale(var(--scale));
          opacity: var(--opacity);
          transition-delay: 0.4s;
        }
        /* Enhanced Nav Button Lighting Effects */
        .nav-btn {
          background: var(--btn-bg);
          color: var(--btn-text);
          border: 2px solid var(--nav-btn-border);
          box-shadow: var(--btn-glow), 0 0 0 0 var(--btn-bg-glow);
          filter: var(--title-filter) grayscale(var(--desaturate));
          transition: var(--transition), var(--settle-transition);
          will-change: transform, opacity, filter, box-shadow, background;
          border-radius: 1rem;
          padding: 1.5rem 2rem;
          transform: scale(var(--scale));
          opacity: var(--opacity);
          transition-delay: 0.7s;
          position: relative;
          overflow: hidden;
        }
        .hero-root.plugged .nav-btn {
          background: linear-gradient(135deg, #ffe066 60%, #fffbe6 100%);
          box-shadow: 0 0 32px 8px #ffe06699, 0 0 16px 4px #fffbe6cc, var(--btn-glow);
          filter: brightness(1.15) saturate(1.2);
          animation: nav-btn-breathing 2.8s ease-in-out infinite;
        }
        .hero-root.plugged .nav-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--btn-bg-glow);
          z-index: 0;
          border-radius: 1rem;
          pointer-events: none;
          box-shadow: 0 0 32px 16px #ffe06655, 0 0 16px 8px #fffbe6aa;
          opacity: 0.7;
        }
        .hero-root.plugged .nav-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1rem;
          pointer-events: none;
          box-shadow: var(--btn-inner-glow);
          opacity: 0.7;
        }
        @keyframes nav-btn-breathing {
          0%, 100% { box-shadow: 0 0 32px 8px #ffe06699, 0 0 16px 4px #fffbe6cc, var(--btn-glow); }
          50% { box-shadow: 0 0 48px 16px #ffe066cc, 0 0 32px 8px #fffbe6ee, var(--btn-glow); }
        }
        .hero-root.unplugged .nav-btn {
          background: #232323;
          box-shadow: none;
          filter: brightness(0.7) grayscale(0.7);
          animation: none;
        }
        .foam-bubbles {
          opacity: var(--foam-opacity);
          transition: opacity 3.5s cubic-bezier(0.4,0,0.2,1);
        }
        .scroll-indicator svg {
          color: var(--scroll-indicator);
          transition: color 3.5s cubic-bezier(0.4,0,0.2,1);
        }
        .scroll-indicator span {
          color: var(--scroll-indicator);
          transition: color 3.5s cubic-bezier(0.4,0,0.2,1);
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
        .hero-root.lit .logo-img,
        .hero-root.lit .hero-title,
        .hero-root.lit .hero-tagline,
        .hero-root.lit .nav-btn,
        .hero-root.lit .foam-bubbles,
        .hero-root.lit .scroll-indicator {
          filter: none;
        }
        .hero-root.dark .logo-img,
        .hero-root.dark .hero-title,
        .hero-root.dark .hero-tagline,
        .hero-root.dark .nav-btn,
        .hero-root.dark .foam-bubbles,
        .hero-root.dark .scroll-indicator {
          filter: brightness(0.3) grayscale(0.8) saturate(0.2) !important;
        }
        .get-unplugged-text {
          z-index: 60;
          position: relative;
          text-shadow: 0 0 32px #ffe066, 0 0 8px #fffbe6, 0 0 2px #fffbe6;
          transition: opacity 0.7s, color 0.7s, text-shadow 0.7s;
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
      `}</style>
    </section>
  );
} 