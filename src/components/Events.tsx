'use client';
import React from 'react';
import { Hop, Beer, GlassWater, Calendar, MapPin, Star, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import FacebookEvents from '@/components/FacebookEvents';

export default function Events() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      id="events"
      ref={ref}
      className={`relative py-16 md:py-20 px-2 md:px-0 bg-brewery-dark text-white overflow-hidden premium-bg scroll-animate ${inView ? 'in-view animate-fade-in-up' : ''}`}
      style={{
        background:
          'radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%), url(/events1.png) center/cover no-repeat',
      }}
    >
      {/* Decorative Top Divider */}
      <div className="section-divider-hero-menu absolute top-0 left-0 right-0 z-10" aria-hidden="true">
        <svg className="w-full h-8" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>

      {/* Header with icons */}
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center mb-10">
        <div className="flex items-center gap-4 mb-2 animate-fade-in-up">
          <Hop className="w-10 h-10 text-brewery-gold animate-float" />
          <h2 className="text-4xl md:text-5xl font-hero font-extrabold text-brewery-gold drop-shadow-xl tracking-tight text-center flex items-center gap-2">
            Upcoming Events
            <Beer className="w-9 h-9 text-brewery-gold animate-float-delay" />
          </h2>
          <GlassWater className="w-10 h-10 text-brewery-gold animate-float" />
        </div>
        <div className="w-24 h-2 bg-gradient-to-r from-brewery-gold/80 via-brewery-primary/80 to-brewery-gold/80 rounded-full my-4 animate-fade-in-up" />
        <p className="text-lg md:text-xl text-brewery-gold text-center font-light max-w-2xl animate-fade-in-up delay-200">
          Join us for unforgettable brewery experiences! Check out our upcoming events below.
        </p>
      </div>

      {/* Decorative hops/beer glass overlays */}
      <Hop className="absolute left-4 top-10 w-16 h-16 text-brewery-gold opacity-30 animate-float z-0" aria-hidden="true" />
      <Beer className="absolute right-8 top-32 w-14 h-14 text-brewery-gold opacity-20 animate-float-delay z-0" aria-hidden="true" />
      <GlassWater className="absolute left-10 bottom-16 w-14 h-14 text-brewery-gold opacity-20 animate-float z-0" aria-hidden="true" />

      {/* Facebook Events Container */}
      <div
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center bg-brewery-gold rounded-3xl shadow-2xl border-4 border-brewery-gold overflow-hidden premium-iframe-frame animate-fade-in-up p-4 sm:p-8"
        style={{
          boxShadow: '0 8px 32px 0 #0008, 0 1.5px 0 #DAA520',
          borderRadius: '2rem',
        }}
      >
        <FacebookEvents />
      </div>

      {/* Decorative Bottom Divider */}
      <div className="section-divider-hero-menu absolute bottom-0 left-0 right-0 z-10 mt-12" aria-hidden="true">
        <svg className="w-full h-8" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>

      {/* Animations and premium styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Oswald:wght@400;600;700&display=swap');

        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
        }

        .premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%);
          pointer-events: none;
        }

        .premium-iframe-frame {
          background: linear-gradient(135deg, rgba(255, 251, 230, 0.95) 0%, rgba(255, 224, 102, 0.9) 100%);
        }

        /* Animations */
        .animate-fade-in-up {
          animation: slideInUp 0.8s ease forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .delay-200 { animation-delay: 0.2s; }

        /* Performance optimizations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}