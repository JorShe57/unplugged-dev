'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import NavigationMenu from './NavigationMenu';

const navLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/unplugbrew/', external: true },
  { label: 'Leave Review', href: 'https://g.co/kgs/76LCxnz', external: true },
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

  // Header should always be visible - no need for intersection observer
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Set ref directly
  const combinedRef = useCallback((el: HTMLElement | null) => {
    headerRef.current = el;
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'header-scrolled' : 'header-top'} ${open ? 'menu-open' : ''}`}
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
        {/* Removed hamburger menu button */}

        {/* Navigation Links */}
        <NavigationMenu open={open} setOpen={setOpen} navLinks={navLinks} />
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
        
        /* Header states - Liquid Glass theme */
        .header-top {
          background: rgba(18, 10, 7, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(230, 179, 37, 0.2);
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
        }

        .header-scrolled {
          background: rgba(18, 10, 7, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(230, 179, 37, 0.3);
          box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.4);
        }

        .header-logo {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          filter: drop-shadow(0 0 8px rgba(230, 179, 37, 0.3));
        }

        .header-logo:hover {
          transform: scale(1.08) rotate(5deg);
          filter: drop-shadow(0 0 12px rgba(230, 179, 37, 0.6));
        }

        /* Navigation menu */
        .nav-menu {
          display: flex;
          flex-direction: row;
          gap: 2.5rem;
          align-items: center;
          position: static;
          width: auto;
          background: transparent;
        }

        .nav-item {
          list-style: none;
        }

        .nav-link {
          display: block;
          padding: 0.5rem 0.25rem;
          color: #FDF5E6;
          text-decoration: none;
          font-family: var(--font-jost);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 0.875rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #E6B325;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #E6B325;
        }

        .nav-link:hover::after {
          width: 100%;
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
            justify-content: center;
            gap: 1.5rem;
            width: 100%;
            background: rgba(18, 10, 7, 0.98);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            max-height: 0;
            overflow: hidden;
            z-index: 50;
            transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .nav-menu-open {
            max-height: 100vh;
          }

          .nav-link {
            font-size: 1.5rem;
            padding: 1rem;
          }
        }

        /* Focus states for accessibility */
        .nav-link:focus {
          outline: 2px solid #E6B325;
          outline-offset: 4px;
        }
      `}</style>
    </header>
  );
}