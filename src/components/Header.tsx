'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const navLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/unplugbrew/', external: true },
  { label: 'Leave a Review', href: 'https://g.co/kgs/76LCxnz', external: true },
  { label: 'Menu', href: '/menu', external: false },
];

export default function Header() {
  const [open, setOpen] = useState(false);
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
    }, 200); // Faster for header
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

  // Close mobile menu on resize to desktop
  useEffect(() => {
    if (!isMobile && open) {
      setOpen(false);
    }
  }, [isMobile, open]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (open && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [open, isMobile]);

  return (
    <header
      ref={combinedRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 scroll-animate ${isVisible ? 'in-view' : ''} ${isScrolled ? 'header-scrolled' : 'header-top'} ${open ? 'menu-open' : ''}`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 header-nav scroll-animate">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center touch-target logo-container mobile-optimized"
          onClick={() => setOpen(false)}
        >
          <img 
            src="/favicon.webp" 
            alt="Unplugged Brewery Logo" 
            className="h-10 w-10 object-contain mobile-optimized-img header-logo" 
          />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-brewery-gold focus:outline-none touch-target mobile-menu-btn mobile-optimized"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          <svg className="w-7 h-7 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} 
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu scroll-animate ${open ? 'nav-menu-open' : 'nav-menu-closed'}`}>
          {navLinks.map((link, idx) => (
            <li key={link.href} className={`nav-item ${open ? 'nav-item-visible' : 'nav-item-hidden'}`}>
              {link.external ? (
                <a
                  href={link.href}
                  className="nav-link touch-target mobile-optimized"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  className="nav-link touch-target mobile-optimized"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Menu Overlay */}
        {open && (
          <div 
            className="mobile-menu-overlay"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        )}
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
        
        .mobile-menu-btn {
          transition-delay: 0.3s;
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

        /* Mobile menu button */
        .mobile-menu-btn {
          border-radius: 0.5rem;
          padding: 0.5rem;
          background: rgba(218, 165, 32, 0.1);
          border: 1px solid rgba(218, 165, 32, 0.3);
          transition: all 0.2s ease;
        }

        .mobile-menu-btn:hover {
          background: rgba(218, 165, 32, 0.2);
          border-color: rgba(218, 165, 32, 0.5);
        }

        .mobile-menu-btn:active {
          transform: scale(0.95);
        }

        /* Navigation menu */
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

        /* Mobile menu styles */
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 100vh;
            flex-direction: column;
            gap: 0;
            width: 100%;
            background: rgba(44, 24, 16, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-top: 1px solid rgba(218, 165, 32, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-height: 0;
            overflow: hidden;
            z-index: 50;
            transition: max-height 0.3s ease, padding 0.3s ease;
          }

          .nav-menu-open {
            max-height: 100vh;
            padding: 1rem 0;
          }

          .nav-menu-closed {
            max-height: 0;
            padding: 0;
          }

          /* FIXED: Simplified nav item animations */
          .nav-item {
            width: 100%;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }

          /* Hidden state */
          .nav-item-hidden {
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
          }

          /* Visible state - no delays to prevent conflicts */
          .nav-item-visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }

          /* Staggered animation using nth-child */
          .nav-menu-open .nav-item:nth-child(1) { 
            transition-delay: 0.1s; 
          }
          .nav-menu-open .nav-item:nth-child(2) { 
            transition-delay: 0.15s; 
          }
          .nav-menu-open .nav-item:nth-child(3) { 
            transition-delay: 0.2s; 
          }

          .nav-link {
            padding: 1rem 2rem;
            border-radius: 0;
            font-size: 1.1rem;
            border-bottom: 1px solid rgba(218, 165, 32, 0.1);
          }

          .nav-link:last-child {
            border-bottom: none;
          }

          .nav-link::before {
            border-radius: 0;
          }

          .nav-link:hover {
            background: rgba(218, 165, 32, 0.1);
            transform: none;
            box-shadow: none;
          }

          /* Mobile menu overlay */
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 40;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          }

          /* Prevent menu from extending beyond viewport */
          .menu-open {
            overflow: hidden;
          }
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

        .dark .nav-menu {
          background: rgba(26, 15, 8, 0.95);
        }

        .dark .mobile-menu-btn {
          background: rgba(218, 165, 32, 0.15);
          border-color: rgba(218, 165, 32, 0.3);
        }

        .dark .mobile-menu-btn:hover {
          background: rgba(218, 165, 32, 0.25);
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .nav-menu,
          .nav-item,
          .nav-link,
          .mobile-menu-btn,
          .header-logo {
            transition-duration: 0.1s !important;
          }
        }

        /* Focus states for accessibility */
        .nav-link:focus,
        .mobile-menu-btn:focus {
          outline: 2px solid #d4af37;
          outline-offset: 2px;
        }
      `}</style>
    </header>
  );
}