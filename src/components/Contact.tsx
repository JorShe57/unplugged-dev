'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Brewery-themed SVGs (hops, barley, bubbles, woodgrain)
const HopSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-6 left-4 w-10 h-10 text-brewery-gold opacity-40 animate-float" aria-hidden="true"><path d="M18 2C18 2 7 10 7 20C7 28 18 34 18 34C18 34 29 28 29 20C29 10 18 2 18 2Z" fill="#DAA520" stroke="#8B4513" strokeWidth="2"/><circle cx="18" cy="20" r="6" fill="#fffbe6" stroke="#8B4513" strokeWidth="1.5"/></svg>
);
const BarleySVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-4 right-8 w-8 h-8 text-brewery-gold opacity-30 animate-float-delay" aria-hidden="true"><path d="M16 2C16 2 12 10 12 16C12 22 16 30 16 30C16 30 20 22 20 16C20 10 16 2 16 2Z" fill="#DAA520" stroke="#8B4513" strokeWidth="1.5"/></svg>
);
const BeerBubblesSVG = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 opacity-10 animate-bubble-float" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#fffbe6"/><circle cx="30" cy="8" r="5" fill="#fffbe6"/><circle cx="50" cy="12" r="6" fill="#fffbe6"/></svg>
);
const WoodGrainOverlay = () => (
  <div className="absolute inset-0 z-0 bg-[url('/menu.png')] bg-cover bg-center opacity-60 mix-blend-multiply pointer-events-none" aria-hidden="true" />
);

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    }, 500);
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
    sectionRef.current = el;
  }, [ref]);

  return (
    <section
      id="contact"
      ref={combinedRef}
      className={`relative py-24 px-2 md:px-0 bg-brewery-dark text-white overflow-hidden premium-bg scroll-animate ${isVisible ? 'in-view' : ''}`}
    >
      {/* Backgrounds & Overlays */}
      <WoodGrainOverlay />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brewery-primary/80 via-brewery-dark/90 to-brewery-gold/30 pointer-events-none" aria-hidden="true" />
      <HopSVG />
      <BarleySVG />
      <BeerBubblesSVG />
      
      {/* Section Header */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center mb-12 text-center contact-header scroll-animate">
        <h2 className="text-4xl md:text-5xl font-hero font-extrabold text-brewery-gold drop-shadow-xl tracking-tight mb-2 flex items-center gap-3">
          <span className="inline-block"><HopSVG /></span>
          Contact Unplugged Brewery
          <span className="inline-block rotate-12"><BarleySVG /></span>
        </h2>
        <div className="w-24 h-2 bg-gradient-to-r from-brewery-gold/80 via-brewery-primary/80 to-brewery-gold/80 rounded-full my-4" />
        <p className="text-lg md:text-2xl text-brewery-gold font-light max-w-2xl mx-auto">
          Get in Touch – <span className="font-bold text-brewery-primary">Let's Brew Something Together</span>
        </p>
        <p className="text-base text-white/80 mt-2 max-w-xl mx-auto">
          Book a private event, schedule a brewery tour, ask about catering, or just say cheers!
        </p>
      </div>
      
      {/* Contact Info Layout */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center bg-white/5 dark:bg-brewery-dark/60 rounded-3xl shadow-2xl border border-brewery-gold/30 backdrop-blur-md p-8 md:p-12 contact-content scroll-animate">
        {/* Contact Info */}
        <div className="flex flex-col gap-6 w-full max-w-2xl contact-info scroll-animate">
          {/* Contact Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="group flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer contact-card scroll-animate touch-target">
              <Mail className="w-7 h-7 text-brewery-gold group-hover:text-brewery-primary transition-colors" />
              <div>
                <div className="text-lg font-bold text-brewery-gold">Email</div>
                <a href="mailto:info@unpluggedbrewery.com" className="text-white hover:text-brewery-gold transition-colors">sales@unpluggedbrewery.com</a>
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer contact-card scroll-animate touch-target">
              <Phone className="w-7 h-7 text-brewery-gold group-hover:text-brewery-primary transition-colors" />
              <div>
                <div className="text-lg font-bold text-brewery-gold">Phone</div>
                <a href="tel:+14403967474" className="text-white hover:text-brewery-gold transition-colors">(440) 396-7474</a>
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer contact-card scroll-animate touch-target md:col-span-2">
              <MapPin className="w-7 h-7 text-brewery-gold group-hover:text-brewery-primary transition-colors" />
              <div>
                <div className="text-lg font-bold text-brewery-gold">Address</div>
                <div className="text-white">201 E BridgeSt, Elyria, OH 44035</div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=201+E+BridgeSt,+Elyria,+OH+44035" target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-brewery-gold underline hover:text-brewery-primary transition-colors text-sm font-semibold touch-target">Get Directions</a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg contact-card scroll-animate touch-target md:col-span-2">
              <span className="inline-block w-7 h-7 text-brewery-gold">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="3" fill="#DAA520" stroke="#8B4513" strokeWidth="1.5"/><rect x="7" y="3" width="10" height="4" rx="2" fill="#fffbe6" stroke="#8B4513" strokeWidth="1.5"/></svg>
              </span>
              <div>
                <div className="text-lg font-bold text-brewery-gold">Hours</div>
                <div className="text-white text-sm leading-relaxed">
                  <div>Tuesday: Closed</div>
                  <div>Wednesday: 4–10 PM</div>
                  <div>Thursday: 4–10 PM</div>
                  <div>Friday: 4–10 PM</div>
                  <div>Saturday: 11 AM–11 PM</div>
                  <div>Sunday: 11 AM–8 PM</div>
                  <div>Monday: Closed</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Socials */}
          <div className="mt-8 flex flex-col gap-3 items-center contact-socials scroll-animate">
            <div className="text-brewery-gold font-bold text-xl mb-2">Follow us</div>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/unplugbrew" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brewery-primary transition-colors group touch-target">
                <Facebook className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/unpluggedbrewing/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brewery-primary transition-colors group touch-target">
                <Instagram className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fixed Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
        <svg className="w-full h-8" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>
      
      {/* Component-specific styles only */}
      <style jsx>{`
        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
        }
        
        /* Component-specific timing */
        .contact-header {
          transition-delay: 0.1s;
        }
        
        .contact-content {
          transition-delay: 0.2s;
        }
        
        .contact-info {
          transition-delay: 0.3s;
        }
        
        .contact-card:nth-child(1) { transition-delay: 0.4s; }
        .contact-card:nth-child(2) { transition-delay: 0.5s; }
        .contact-card:nth-child(3) { transition-delay: 0.6s; }
        .contact-card:nth-child(4) { transition-delay: 0.7s; }
        
        .contact-socials {
          transition-delay: 0.8s;
        }
        
        /* Component-specific bubble animation */
        .animate-bubble-float {
          animation: bubbleFloat 6s ease-in-out infinite;
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0); opacity: 0.1; }
          50% { transform: translateY(-20px); opacity: 0.2; }
        }
        
        /* Premium background styling */
        .premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%);
          pointer-events: none;
        }
        
        /* Enhanced glass morphism for contact cards */
        .contact-card {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </section>
  );
}