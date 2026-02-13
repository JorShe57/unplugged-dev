'use client';

import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Beer, Hop } from 'lucide-react';

export default function Menu() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  return (
    <section
      ref={ref}
      id="menu-preview"
      className={`relative py-20 bg-gradient-to-b from-brewery-dark via-gray-900 to-brewery-dark overflow-hidden scroll-animate ${inView ? 'in-view' : ''}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "url('/menu.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <Hop className="w-12 h-12 text-brewery-gold animate-float" />
          <h2 className="text-4xl md:text-6xl font-hero font-bold text-brewery-gold drop-shadow-2xl tracking-tight">
            The Tap List
          </h2>
          <Beer className="w-12 h-12 text-brewery-gold animate-float-delay" />
        </div>

        <p className="text-lg md:text-xl text-[#FDF5E6]/90 max-w-2xl mx-auto mb-12 font-body font-light leading-relaxed">
          Artisanal small-batch brews crafted for the unplugged life. From crisp lagers to robust stouts.
        </p>

        <Link
          href="/menu"
          className="inline-flex items-center justify-center bg-[#C68642] hover:bg-[#E6B325] text-[#120A07] font-bold text-sm tracking-widest uppercase px-10 py-5 rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(230,179,37,0.4)] border border-[#E6B325]/30 touch-target font-body"
        >
          Explore Our Brews
          <svg
            className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <style jsx>{`
        .font-hero {
          font-family: var(--font-serif);
        }
        
        .font-body {
          font-family: var(--font-sans);
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delay {
          animation: float 3s ease-in-out infinite 1.5s;
        }
        
        #menu-preview {
          background: linear-gradient(180deg, #120A07 0%, #1A120E 50%, #120A07 100%);
        }
      `}</style>
    </section>
  );
}