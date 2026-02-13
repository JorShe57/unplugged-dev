'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Brewery-themed SVGs (hops, barley, bubbles, woodgrain)
const HopSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-6 left-4 w-10 h-10 text-brewery-gold opacity-40 animate-float" aria-hidden="true"><path d="M18 2C18 2 7 10 7 20C7 28 18 34 18 34C18 34 29 28 29 20C29 10 18 2 18 2Z" fill="#DAA520" stroke="#8B4513" strokeWidth="2" /><circle cx="18" cy="20" r="6" fill="#fffbe6" stroke="#8B4513" strokeWidth="1.5" /></svg>
);
const BarleySVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-4 right-8 w-8 h-8 text-brewery-gold opacity-30 animate-float-delay" aria-hidden="true"><path d="M16 2C16 2 12 10 12 16C12 22 16 30 16 30C16 30 20 22 20 16C20 10 16 2 16 2Z" fill="#DAA520" stroke="#8B4513" strokeWidth="1.5" /></svg>
);
const BeerBubblesSVG = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 opacity-10 animate-bubble-float" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#fffbe6" /><circle cx="30" cy="8" r="5" fill="#fffbe6" /><circle cx="50" cy="12" r="6" fill="#fffbe6" /></svg>
);
const WoodGrainOverlay = () => (
  <div className="absolute inset-0 z-0 bg-[url('/menu.png')] bg-cover bg-center opacity-60 mix-blend-multiply pointer-events-none" aria-hidden="true" />
);

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);


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
  const combinedRef = useCallback((el: HTMLElement | null) => {
    ref(el);
    sectionRef.current = el;
  }, [ref]);

  return (
    <section
      id="contact"
      ref={combinedRef}
      className={`relative py-32 md:py-48 px-4 bg-[#1A120E] text-[#FDF5E6] overflow-hidden scroll-animate ${isVisible ? 'in-view' : ''}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-30 grayscale mix-blend-overlay pointer-events-none bg-[url('/menu.png')] bg-cover bg-center brightness-110" aria-hidden="true" />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1A120E]/60 via-transparent to-[#1A120E]/40 pointer-events-none" aria-hidden="true" />

      {/* Header Container */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center mb-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="p-4 rounded-full bg-[#E6B325]/5 border border-[#E6B325]/10 animate-float">
            <Mail className="w-8 h-8 text-[#E6B325]" />
          </div>
          <h2 className="text-5xl md:text-8xl font-hero font-bold text-[#E6B325] tracking-tight drop-shadow-2xl">
            Stay Connected
          </h2>
          <div className="w-24 h-[1px] bg-[#E6B325]/30 mb-4" />
          <p className="text-xl md:text-2xl font-body font-light max-w-2xl text-[#C68642] tracking-widest uppercase mb-4">
            Visit the Taproom &bull; Book an Event
          </p>
          <p className="text-[#FDF5E6]/60 font-body font-light max-w-xl text-center leading-relaxed">
            Experience the unplugged life at our historic Elyria location. Whether it's a private celebration or a casual pint, we're here to make it legendary.
          </p>
        </div>
      </div>

      {/* Contact Grid - Liquid Glass Layout */}
      <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="bg-[#1A120E]/30 backdrop-blur-2xl rounded-[2rem] border border-[#E6B325]/15 p-10 flex flex-col gap-10 shadow-2xl">
          <div className="space-y-8">
            <div className="group flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[#C68642]/15 border border-[#C68642]/20 group-hover:bg-[#C68642]/25 transition-all duration-300">
                <MapPin className="w-6 h-6 text-[#C68642]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase text-opacity-80">Location</span>
                <span className="text-lg font-body font-medium text-[#FDF5E6]">201 E Bridge St, Elyria, OH 44035</span>
                <a href="https://www.google.com/maps/dir/?api=1&destination=201+E+BridgeSt,+Elyria,+OH+44035" target="_blank" rel="noopener noreferrer" className="text-sm font-body font-bold text-[#C68642] hover:text-[#E6B325] underline decoration-[#C68642]/30 underline-offset-4 transition-colors">Open in Maps</a>
              </div>
            </div>

            <div className="group flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[#C68642]/15 border border-[#C68642]/20 group-hover:bg-[#C68642]/25 transition-all duration-300">
                <Phone className="w-6 h-6 text-[#C68642]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase text-opacity-80">Call Us</span>
                <a href="tel:+14403097928" className="text-lg font-body font-medium text-[#FDF5E6] hover:text-[#E6B325] transition-colors">(440) 309-7928</a>
              </div>
            </div>

            <div className="group flex items-start gap-6">
              <div className="p-4 rounded-2xl bg-[#C68642]/15 border border-[#C68642]/20 group-hover:bg-[#C68642]/25 transition-all duration-300">
                <Mail className="w-6 h-6 text-[#C68642]" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase text-opacity-80">Email</span>
                <a href="mailto:sales@unplugbrew.com" className="text-lg font-body font-medium text-[#FDF5E6] hover:text-[#E6B325] transition-colors">sales@unplugbrew.com</a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#E6B325]/10 flex gap-6">
            <a href="https://www.facebook.com/unplugbrew" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#120A07]/50 border border-[#E6B325]/10 text-[#C68642] hover:text-[#E6B325] hover:border-[#E6B325]/40 transition-all duration-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/unpluggedbrewing/?hl=en" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[#120A07]/50 border border-[#E6B325]/10 text-[#C68642] hover:text-[#E6B325] hover:border-[#E6B325]/40 transition-all duration-300">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Hours Card */}
        <div className="bg-[#1A120E]/30 backdrop-blur-2xl rounded-[2rem] border border-[#E6B325]/15 p-10 flex flex-col items-center justify-center text-center shadow-2xl lg:col-span-2">
          <Clock className="w-12 h-12 text-[#E6B325] mb-8 animate-float" />
          <h3 className="text-3xl font-hero font-bold text-[#FDF5E6] mb-10 tracking-tight">Taproom Hours</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-3xl">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.2em] font-body font-bold text-[#C68642] uppercase">Tue / Mon</span>
              <span className="text-sm font-body text-[#FDF5E6]/60">Closed</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase">Wed / Thu</span>
              <span className="text-sm font-body text-[#FDF5E6]">4 PM &ndash; 10 PM</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase">Friday</span>
              <span className="text-sm font-body text-[#FDF5E6]">4 PM &ndash; 11 PM</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase">Saturday</span>
              <span className="text-sm font-body text-[#FDF5E6]">11 AM &ndash; 11 PM</span>
            </div>
            <div className="flex flex-col gap-1 sm:col-span-4 mt-6">
              <span className="text-[10px] tracking-[0.2em] font-body font-bold text-[#E6B325] uppercase">Sunday</span>
              <span className="text-sm font-body text-[#FDF5E6]">11 AM &ndash; 8 PM</span>
            </div>
          </div>

          <div className="mt-12 p-4 px-8 rounded-full bg-[#E6B325]/5 border border-[#E6B325]/10 text-[#E6B325] font-body text-xs tracking-[0.3em] uppercase">
            Come get unplugged
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
          font-family: var(--font-serif);
        }
        
        .font-body {
          font-family: var(--font-sans);
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}
