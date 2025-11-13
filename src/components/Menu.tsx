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
        <div className="flex items-center justify-center gap-4 mb-6">
          <Hop className="w-10 h-10 text-brewery-gold animate-float" />
          <h2 className="text-4xl md:text-5xl font-hero font-bold text-brewery-gold drop-shadow-xl">
            View Our Amazing Selection
          </h2>
          <Beer className="w-10 h-10 text-brewery-gold animate-float-delay" />
        </div>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
          Discover our carefully crafted selection of ales, lagers, and seasonal specialties.
        </p>

        <Link 
          href="/menu"
          className="inline-flex items-center justify-center bg-brewery-gold hover:bg-brewery-primary text-brewery-dark hover:text-white font-bold text-lg px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 border-brewery-gold touch-target"
        >
          View Full Beer Menu
          <svg 
            className="ml-2 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <style jsx>{`
        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
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
      `}</style>
    </section>
  );
}