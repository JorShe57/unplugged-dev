'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const navLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/unplugbrew/', external: true },
  { label: 'Leave a Review', href: 'https://g.co/kgs/76LCxnz', external: true },
  { label: 'Menu', href: '/menu', external: false },
];

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer with mobile-friendly settings
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  // Mobile fallback timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible && isMobile) {
        setIsVisible(true);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isVisible, isMobile]);

  // Update visibility
  useEffect(() => {
    if (inView || isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  // Combine refs
  const combinedRef = useCallback((el: HTMLElement | null) => {
    ref(el);
    headerRef.current = el;
  }, [ref]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={combinedRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 scroll-animate ${isVisible ? 'in-view' : ''} ${isScrolled ? 'header-scrolled' : 'header-top'}`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 header-nav scroll-animate">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center touch-target logo-container mobile-optimized"
        >
          <img 
            src="/favicon.webp" 
            alt="Unplugged Brewery Logo" 
            className="h-10 w-10 object-contain mobile-optimized-img header-logo" 
          />
        </a>

        {/* Desktop Navigation Links - Hidden on Mobile */}
        <ul className="nav-menu scroll-animate hidden md:flex">
          {navLinks.map((link) => (
            <li key={link.href} className="nav-item">
              {link.external ? (
                <a
                  href={link.href}
                  className="nav-link touch-target mobile-optimized"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  className="nav-link touch-target mobile-optimized"
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Component-specific styles */}
      <style jsx>{`
        /* Component-specific timing */
        .header-nav {
          transition-delay: 0.1s;
        }
        
        .logo-container {
          transition-delay: 0.2s;
        }

        /* Header states */
        .header-top {
          background: rgba(218, 165, 32, 0.2);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(218, 165, 32, 0.3);
          box-shadow: 0 0 32px 4px rgba(255, 215, 0, 0.35);
        }

        .header-scrolled {
          background: rgba(218, 165, 32, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(218, 165, 32, 0.5);
          box-shadow: 0 4px 32px 4px rgba(255, 215, 0, 0.4), 0 2px 16px rgba(0, 0, 0, 0.2);
        }

        .header-logo {
          transition: all 0.3s ease;
          filter: drop-shadow(0 0 8px rgba(218, 165, 32, 0.5));
        }

        .header-logo:hover {
          transform: scale(1.05);
          filter: drop-shadow(0 0 12px rgba(218, 165, 32, 0.8));
        }

        /* Navigation menu - Desktop only */
        .nav-menu {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          align-items: center;
          position: static;
          width: auto;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item {
          list-style: none;
        }

        .nav-link {
          display: block;
          padding: 0.5rem 1rem;
          color: #d4af37;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, rgba(218, 165, 32, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          border-radius: 0.5rem;
        }

        .nav-link:hover::before {
          opacity: 1;
        }

        .nav-link:hover {
          color: #8b4513;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(218, 165, 32, 0.3);
        }

        /* Dark mode adjustments */
        .dark .header-top {
          background: rgba(26, 15, 8, 0.8);
          border-bottom-color: rgba(218, 165, 32, 0.2);
        }

        .dark .header-scrolled {
          background: rgba(26, 15, 8, 0.9);
          border-bottom-color: rgba(218, 165, 32, 0.3);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .nav-menu,
          .nav-item,
          .nav-link,
          .header-logo {
            transition-duration: 0.1s !important;
          }
        }

        /* Focus states for accessibility */
        .nav-link:focus {
          outline: 2px solid #d4af37;
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
}