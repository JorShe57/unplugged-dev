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
      className={`relative py-24 md:py-32 bg-[#120A07] text-[#FDF5E6] overflow-hidden scroll-animate ${inView ? 'in-view' : ''}`}
      style={{
        background: 'radial-gradient(circle at 70% 30%, rgba(230, 179, 37, 0.08) 0%, #120A07 100%)',
      }}
    >
      {/* Premium Header Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 flex flex-col items-center mb-16 text-center">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[1px] bg-[#E6B325]/40" />
            <Hop className="w-8 h-8 text-[#E6B325] animate-float" />
            <div className="w-12 h-[1px] bg-[#E6B325]/40" />
          </div>
          <h2 className="text-4xl md:text-7xl font-hero font-bold text-[#E6B325] tracking-tight drop-shadow-2xl">
            The Social Tap
          </h2>
          <p className="text-lg md:text-2xl font-body font-light max-w-2xl text-[#C68642] tracking-wide uppercase">
            Curated Experiences & Community Gatherings
          </p>
        </div>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#E6B325]/40 to-transparent mb-8" />
      </div>

      {/* Decorative Assets */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-[#E6B325]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-[#C68642]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Facebook Events - Gilded Frame */}
      <div
        className="relative z-10 max-w-6xl mx-auto w-full flex flex-col items-center justify-center bg-[#1A120E]/40 backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-[#E6B325]/15 overflow-hidden p-6 sm:p-10 transition-all duration-700"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6B325]/5 to-transparent pointer-events-none" />
        <FacebookEvents />
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E6B325]/20 to-transparent" />

      {/* Animations and premium styles */}
      <style jsx>{`
        .font-hero {
          font-family: var(--font-serif);
        }
        
        .font-body {
          font-family: var(--font-sans);
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
      `}</style>
    </section>
  );
}