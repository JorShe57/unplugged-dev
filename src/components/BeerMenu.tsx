"use client";

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Beer as BeerIcon, Hop, Award, GlassWater, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export type Beer = {
  _id: string;
  name: string;
  abv: number;
  ibu?: number;
  description: string;
  type: string;
  price: number;
  available: boolean;
  featured: boolean;
  image?: {
    asset: {
      _ref: string;
      url: string;
    };
  };
};

export default function BeerMenu() {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAvailable, setShowAvailable] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});
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

  useEffect(() => {
    async function fetchBeers() {
      setLoading(true);
      try {
        const response = await fetch('/api/beers');
        if (!response.ok) {
          throw new Error(`Failed to fetch beers: ${response.status}`);
        }
        const data = await response.json();
        setBeers(data);
      } catch (err) {
        console.error('Error fetching beers:', err);
        setError('Failed to load beers.');
      } finally {
        setLoading(false);
      }
    }

    fetchBeers();
  }, []);

  // Preload beer images
  useEffect(() => {
    if (beers.length === 0) return;

    const imagePromises = beers
      .filter(beer => beer.image?.asset?.url)
      .map((beer) => {
        return new Promise<void>((resolve) => {
          const image = new Image();
          image.onload = () => {
            setImagesLoaded(prev => ({ ...prev, [beer._id]: true }));
            resolve();
          };
          image.onerror = () => {
            setImagesLoaded(prev => ({ ...prev, [beer._id]: false }));
            resolve();
          };
          image.src = beer.image!.asset.url;
        });
      });

    Promise.all(imagePromises);
  }, [beers]);

  const filteredBeers = showAvailable ? beers.filter((b) => b.available) : beers;

  // Helper: pick icon based on beer type
  const getBeerIcon = (type: string) => {
    if (/ipa|hoppy|pale/i.test(type)) return <Hop className="w-5 h-5 text-brewery-gold" />;
    if (/lager|pils/i.test(type)) return <GlassWater className="w-5 h-5 text-brewery-gold" />;
    return <BeerIcon className="w-5 h-5 text-brewery-gold" />;
  };

  if (loading) {
    return (
      <section
        id="menu"
        ref={combinedRef}
        className={`beer-menu-section scroll-animate ${isVisible ? 'in-view' : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">
            <Hop className="w-8 h-8 text-brewery-gold" />
            Our Beers
            <BeerIcon className="w-8 h-8 text-brewery-gold" />
          </h2>
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <span className="loading-text">Tapping the kegs...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="menu"
        ref={combinedRef}
        className={`beer-menu-section scroll-animate ${isVisible ? 'in-view' : ''}`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="section-title">
            <Hop className="w-8 h-8 text-brewery-gold" />
            Our Beers
            <BeerIcon className="w-8 h-8 text-brewery-gold" />
          </h2>
          <div className="error-message">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="menu"
      ref={combinedRef}
      className={`relative py-16 scroll-animate ${isVisible ? 'in-view' : ''}`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 px-4">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-hero font-bold text-[#E6B325] tracking-tight mb-4 drop-shadow-2xl">
              The Tap List
            </h2>
            <div className="w-24 h-[1px] bg-[#E6B325]/40" />
          </div>

          <button
            className="group flex items-center gap-3 bg-[#1A120E]/40 hover:bg-[#E6B325] text-[#E6B325] hover:text-[#120A07] border border-[#E6B325]/30 px-8 py-4 rounded-full transition-all duration-500 font-body uppercase tracking-[0.2em] text-xs shadow-xl backdrop-blur-md"
            onClick={() => setShowAvailable((v) => !v)}
            aria-pressed={showAvailable}
            type="button"
          >
            <Hop className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {showAvailable ? 'Show All Brews' : 'Show Available Only'}
          </button>
        </div>

        {/* Beer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-animate">
          {filteredBeers.length === 0 ? (
            <div className="col-span-full py-20 text-center">
              <p className="text-[#C68642] font-body uppercase tracking-[0.2em] text-sm animate-pulse">
                Tapping new kegs soon...
              </p>
            </div>
          ) : (
            filteredBeers.map((beer, idx) => (
              <div
                key={beer._id}
                className={`group relative flex flex-col sm:flex-row bg-[#1A120E]/25 backdrop-blur-2xl rounded-[2rem] border border-[#E6B325]/10 hover:border-[#E6B325]/40 transition-all duration-500 hover:-translate-y-1 p-6 sm:p-8 overflow-hidden ${!beer.available ? 'opacity-40 grayscale' : ''} ${beer.featured ? 'shadow-[0_0_40px_-10px_rgba(230,179,37,0.2)]' : ''}`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {/* Liquid Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#E6B325]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Beer Visual */}
                <div className="relative flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-[#120A07] overflow-hidden border border-[#E6B325]/5 mb-6 sm:mb-0 sm:mr-8 flex items-center justify-center p-4">
                  {beer.image?.asset?.url ? (
                    <img
                      src={beer.image.asset.url}
                      alt={beer.name}
                      className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      <BeerIcon className="w-16 h-16 text-[#E6B325]/10 group-hover:text-[#E6B325]/20 transition-colors" />
                    </div>
                  )}
                  {beer.featured && (
                    <div className="absolute top-3 right-3">
                      <Star className="w-4 h-4 text-[#E6B325] fill-current drop-shadow-[0_0_8px_rgba(230,179,37,0.6)]" />
                    </div>
                  )}
                </div>

                {/* Beer Details */}
                <div className="flex-grow flex flex-col justify-between relative z-10">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-2xl md:text-3xl font-hero font-bold text-[#FDF5E6] tracking-tight group-hover:text-[#E6B325] transition-colors leading-tight">
                        {beer.name}
                      </h3>
                      <div className="text-xl font-hero font-bold text-[#C68642]/80 group-hover:text-[#E6B325] transition-colors whitespace-nowrap">
                        ${beer.price.toFixed(2)}
                      </div>
                    </div>

                    <p className="text-[#FDF5E6]/60 font-body text-sm leading-relaxed mb-6 line-clamp-2 italic">
                      {beer.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 border-t border-[#E6B325]/10 pt-6 mt-auto">
                    <div className="flex items-center gap-2 text-[#E6B325]/80">
                      {getBeerIcon(beer.type)}
                      <span className="text-[10px] font-body font-bold uppercase tracking-widest leading-none mt-0.5">{beer.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#C68642]">
                      <Award className="w-4 h-4 opacity-60" />
                      <span className="text-[10px] font-body font-bold uppercase tracking-widest leading-none mt-0.5">{beer.abv}% ABV</span>
                    </div>
                    {beer.ibu !== undefined && (
                      <div className="flex items-center gap-2 text-[#C68642]">
                        <GlassWater className="w-4 h-4 opacity-60" />
                        <span className="text-[10px] font-body font-bold uppercase tracking-widest leading-none mt-0.5">{beer.ibu} IBU</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 3rem;
        }

        .loading-spinner {
          width: 3rem;
          height: 3rem;
          border: 4px solid rgba(218, 165, 32, 0.3);
          border-top: 4px solid #DAA520;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .loading-text {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          color: #DAA520;
        }

        .error-message {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 1.2rem;
          color: #dc3545;
          padding: 3rem;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}