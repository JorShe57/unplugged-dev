"use client";

import React, { useEffect, useState } from 'react';
import { sanityClient } from '../lib/sanity/client';
import { Beer as BeerIcon, Hop, Award, GlassWater } from 'lucide-react';
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
  const [expanded, setExpanded] = useState<string | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    setLoading(true);
    sanityClient
      .fetch<Beer[]>(
        `*[_type == "beer"] | order(featured desc, name asc) {
          _id,
          name,
          abv,
          ibu,
          description,
          type,
          price,
          available,
          featured,
          image { asset->{url} }
        }`
      )
      .then((data) => {
        setBeers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load beers.');
        setLoading(false);
      });
  }, []);

  const filteredBeers = showAvailable ? beers.filter((b) => b.available) : beers;

  // Helper: pick icon based on beer type
  const getBeerIcon = (type: string) => {
    if (/ipa|hoppy|pale/i.test(type)) return <Hop className="w-6 h-6 text-brewery-gold inline-block mr-1 animate-float" aria-label="Hoppy" />;
    if (/award|special/i.test(type)) return <Award className="w-6 h-6 text-brewery-gold inline-block mr-1 animate-float-delay" aria-label="Award" />;
    if (/lager|pils/i.test(type)) return <GlassWater className="w-6 h-6 text-brewery-gold inline-block mr-1 animate-float" aria-label="Lager" />;
    return <BeerIcon className="w-6 h-6 text-brewery-gold inline-block mr-1 animate-float" aria-label="Beer" />;
  };

  // Brewery-themed loading animation
  if (loading) {
    return (
      <section
        id="menu"
        ref={ref}
        className={`beer-menu-section premium-bg ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="beer-menu-header font-hero flex items-center justify-center gap-3">
            <Hop className="w-8 h-8 text-brewery-gold animate-float" />
            Our Beers
            <BeerIcon className="w-8 h-8 text-brewery-gold animate-float-delay" />
          </h2>
          <div className="brewery-loader mt-10 flex flex-col items-center gap-2">
            <div className="foam-loader">
              <span className="foam-bubble" />
              <span className="foam-bubble" />
              <span className="foam-bubble" />
            </div>
            <div className="beer-glass-loader">
              <GlassWater className="w-10 h-10 text-brewery-gold animate-float" />
            </div>
            <span className="text-brewery-gold text-lg font-hero mt-2">Pouring fresh pints...</span>
          </div>
        </div>
        <style jsx>{`
          .beer-menu-section { position: relative; min-height: 60vh; padding: 4rem 0; background: #1F1F1F url('/menu.png') center/cover no-repeat; }
          .premium-bg::before { content: ''; position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%); pointer-events: none; }
        `}</style>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="menu"
        ref={ref}
        className={`beer-menu-section premium-bg ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
      >
        <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in-up">
          <h2 className="beer-menu-header font-hero flex items-center justify-center gap-3">
            <Hop className="w-8 h-8 text-brewery-gold animate-float" />
            Our Beers
            <BeerIcon className="w-8 h-8 text-brewery-gold animate-float-delay" />
          </h2>
          <div className="text-red-600 mt-6">{error}</div>
        </div>
        <style jsx>{`
          .beer-menu-section { position: relative; min-height: 60vh; padding: 4rem 0; background: #1F1F1F url('/menu.png') center/cover no-repeat; }
          .premium-bg::before { content: ''; position: absolute; inset: 0; z-index: 0; background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%); pointer-events: none; }
        `}</style>
      </section>
    );
  }

  return (
    <section
      id="menu"
      ref={ref}
      className={`beer-menu-section premium-bg ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
    >
      {/* Decorative SVG overlays */}
      <div className="woodgrain-overlay" aria-hidden="true" />
      <div className="section-divider w-screen absolute top-0 left-0 z-10" style={{ width: '100vw', left: 0, right: 0, position: 'absolute', zIndex: 10 }} aria-hidden="true">
        <svg width="100%" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', width: '100%', minWidth: '100vw', maxWidth: '100vw' }}>
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4 animate-fade-in-up">
          <h2 className="beer-menu-header font-hero flex items-center gap-4 text-center md:text-left">
            <Hop className="w-10 h-10 text-brewery-gold animate-float" />
            Our Beers
            <BeerIcon className="w-10 h-10 text-brewery-gold animate-float-delay" />
          </h2>
          <button
            className="tap-handle-btn brewery-filter-btn inline-block font-bold px-6 py-2 sm:px-10 sm:py-3 rounded-full shadow-lg border-4 border-brewery-gold text-lg bg-brewery-primary text-brewery-gold hover:bg-brewery-gold hover:text-brewery-primary transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brewery-gold"
            onClick={() => setShowAvailable((v) => !v)}
            aria-pressed={showAvailable}
          >
            <Hop className="w-6 h-6 mr-2 inline-block text-brewery-gold" />
            {showAvailable ? 'Show All Beers' : 'Show Currently Available'}
          </button>
        </div>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
          {filteredBeers.length === 0 ? (
            <div className="col-span-full text-center text-brewery-gold animate-fade-in-up">No beers found.</div>
          ) : (
            filteredBeers.map((beer, idx) => {
              const isExpanded = expanded === beer._id;
              const isFeatured = beer.featured;
              return (
                <div
                  key={beer._id}
                  className={`beer-card premium-coaster animate-fade-in-up delay-${idx * 100} ${isFeatured ? 'featured-beer' : ''} ${beer.available ? 'beer-available' : 'beer-unavailable'} p-4 sm:p-8 min-h-[220px] sm:min-h-[420px]`}
                  onClick={() => setExpanded(isExpanded ? null : beer._id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isExpanded}
                  aria-label={beer.name + (isFeatured ? ' (Featured)' : '')}
                >
                  {isFeatured && (
                    <span className="featured-ribbon" aria-label="Featured Beer">
                      <Award className="w-5 h-5 mr-1 text-brewery-gold animate-float" />
                      Featured
                    </span>
                  )}
                  {beer.image?.asset?.url && (
                    <img
                      src={beer.image.asset.url}
                      alt={beer.name}
                      className="w-full h-32 sm:h-52 max-h-32 sm:max-h-52 object-contain rounded-t-2xl premium-img beer-card-img"
                      style={{ background: '#fffbe6', objectFit: 'contain', aspectRatio: '4/3', padding: '0.5rem', display: 'block', margin: '0 auto' }}
                    />
                  )}
                  <div className="p-8 flex flex-col gap-4 h-full">
                    <h3 className="text-2xl md:text-3xl font-hero font-extrabold text-brewery-gold mb-1 drop-shadow-xl beer-title text-center justify-center">
                      {beer.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-base mb-1 items-center">
                      <span className="tap-handle-badge font-bold text-brewery-dark bg-brewery-gold border-2 border-brewery-primary px-3 py-1 rounded-xl shadow-inner flex items-center gap-1">
                        {beer.type}
                      </span>
                      <span className="abv-badge font-bold text-brewery-gold bg-brewery-primary px-3 py-1 rounded-xl shadow flex items-center gap-1">
                        ABV: <span className="text-lg">{beer.abv}%</span>
                      </span>
                      {beer.ibu !== undefined && (
                        <span className="ibu-badge font-bold text-brewery-gold bg-brewery-primary px-3 py-1 rounded-xl shadow flex items-center gap-1">
                          IBU: <span className="text-lg">{beer.ibu}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xl font-bold text-brewery-gold price-badge drop-shadow-lg">
                        <span className="text-brewery-primary mr-1">$</span>{beer.price.toFixed(2)}
                      </span>
                      {!beer.available && (
                        <span className="text-xs text-red-500 font-semibold ml-2">Not Available</span>
                      )}
                    </div>
                    <div className={`beer-desc transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                      aria-hidden={!isExpanded}
                    >
                      <p className="text-brewery-dark dark:text-white text-base leading-relaxed premium-desc">{beer.description}</p>
                    </div>
                    <button
                      className="tap-handle-btn premium-details-btn mt-2 text-base focus:outline-none"
                      onClick={e => { e.stopPropagation(); setExpanded(isExpanded ? null : beer._id); }}
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  {/* Decorative foam effect for featured beers */}
                  {isFeatured && <div className="foam-effect" aria-hidden="true" />}
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* Premium styles and Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Oswald:wght@700&family=Bebas+Neue&display=swap');
        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
          letter-spacing: 0.03em;
        }
        .beer-menu-header {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          color: #DAA520;
          text-shadow: 0 2px 24px #8B4513cc, 0 1px 0 #fff6;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }
        .beer-menu-section {
          position: relative;
          min-height: 60vh;
          padding: 4rem 0;
          background: #1F1F1F url('/menu.png') center/cover no-repeat;
        }
        .premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%);
          pointer-events: none;
        }
        .woodgrain-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
          opacity: 0.12;
          mix-blend-mode: multiply;
        }
        .section-divider {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 2;
        }
        .premium-coaster {
          position: relative;
          background: linear-gradient(135deg, #fffbe6 80%, #ffe066 100%);
          border-radius: 2.5rem;
          border: 4px solid #DAA520;
          box-shadow: 0 8px 48px #8B4513aa, 0 2px 0 #fff6, 0 0 0 8px #DAA52022;
          transition: transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s, border-color 0.3s, filter 0.3s;
          cursor: pointer;
          overflow: hidden;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        .premium-coaster:hover, .premium-coaster:focus {
          transform: scale(1.06) translateY(-8px);
          box-shadow: 0 16px 64px #DAA520cc, 0 4px 0 #fff9, 0 0 0 16px #DAA52044;
          border-color: #fffbe6;
          filter: brightness(1.05) saturate(1.1);
        }
        .beer-available {
          box-shadow: 0 8px 48px #8B4513aa, 0 2px 0 #fff6, 0 0 0 8px #DAA52055, 0 0 24px #ffe06655;
          filter: none;
        }
        .beer-unavailable {
          filter: grayscale(0.7) brightness(0.7) saturate(0.5) !important;
          opacity: 0.7;
        }
        .featured-beer {
          z-index: 10;
          border-width: 6px;
          border-color: #DAA520;
          box-shadow: 0 0 48px 12px #ffe066cc, 0 8px 48px #8B4513cc, 0 0 0 16px #DAA52055;
          transform: scale(1.08) translateY(-10px);
          animation: featured-glow 2.5s ease-in-out infinite alternate;
        }
        @keyframes featured-glow {
          0% { box-shadow: 0 0 48px 12px #ffe066cc, 0 8px 48px #8B4513cc, 0 0 0 16px #DAA52055; }
          100% { box-shadow: 0 0 80px 24px #ffe066ee, 0 16px 64px #8B4513cc, 0 0 0 24px #DAA52077; }
        }
        .featured-ribbon {
          position: absolute;
          top: 0.5rem;
          left: -1.2rem;
          background: linear-gradient(90deg, #ffe066 60%, #fffbe6 100%);
          color: #8B4513;
          font-family: 'Oswald', 'Montserrat', Arial, sans-serif;
          font-size: 1.1rem;
          font-weight: 900;
          padding: 0.5em 2.2em 0.5em 2.5em;
          border-radius: 1.5em 0.7em 0.7em 1.5em;
          box-shadow: 0 2px 12px #ffe06699, 0 1px 0 #fff6;
          border: 2px solid #DAA520;
          display: flex;
          align-items: center;
          z-index: 20;
          letter-spacing: 0.04em;
        }
        .foam-effect {
          position: absolute;
          top: -1.2rem;
          left: 50%;
          transform: translateX(-50%);
          width: 70%;
          height: 2.2rem;
          background: radial-gradient(circle at 20% 60%, #fffbe6 40%, #ffe066 100%);
          border-radius: 2rem 2rem 1.2rem 1.2rem;
          opacity: 0.85;
          box-shadow: 0 2px 12px #fffbe6cc;
          z-index: 15;
          pointer-events: none;
          animation: foam-bounce 2.5s infinite alternate;
        }
        .premium-img {
          border-top-left-radius: 2.2rem;
          border-top-right-radius: 2.2rem;
          box-shadow: 0 2px 16px #8B4513aa;
        }
        .tap-handle-badge {
          font-family: 'Oswald', 'Montserrat', Arial, sans-serif;
          font-size: 1.1rem;
          border-radius: 1.2rem 1.2rem 0.8rem 0.8rem / 1.5rem 1.5rem 0.7rem 0.7rem;
          box-shadow: 0 2px 8px #DAA52055 inset, 0 1px 0 #fff6;
          background: linear-gradient(90deg, #ffe066 60%, #fffbe6 100%);
        }
        .abv-badge, .ibu-badge {
          font-family: 'Bebas Neue', 'Montserrat', Arial, sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.04em;
          box-shadow: 0 1px 4px #DAA52033 inset;
        }
        .price-badge {
          font-family: 'Oswald', 'Montserrat', Arial, sans-serif;
          font-size: 1.4rem;
          background: linear-gradient(90deg, #ffe066 60%, #fffbe6 100%);
          border-radius: 1.2rem;
          padding: 0.2em 0.8em;
          box-shadow: 0 2px 8px #DAA52055 inset, 0 1px 0 #fff6;
        }
        .premium-featured-badge {
          box-shadow: 0 0 16px #ffe06699, 0 1px 0 #fff6;
          border: 2px solid #8B4513;
        }
        .premium-desc {
          font-size: 1.08rem;
          color: #1F1F1F;
          font-family: 'Montserrat', Arial, sans-serif;
        }
        .tap-handle-btn {
          font-family: 'Oswald', 'Montserrat', Arial, sans-serif;
          border-radius: 1.5em 1.5em 1em 1em / 2em 2em 1em 1em;
          background: linear-gradient(90deg, #8B4513 60%, #DAA520 100%);
          color: #fffbe6;
          box-shadow: 0 2px 12px #8B4513cc, 0 1px 0 #fff6;
          border: 4px solid #DAA520;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .tap-handle-btn:hover, .tap-handle-btn:focus {
          background: linear-gradient(90deg, #DAA520 60%, #8B4513 100%);
          color: #8B4513;
          border-color: #fffbe6;
          box-shadow: 0 4px 24px #DAA52099, 0 2px 0 #fff9;
        }
        .brewery-filter-btn {
          min-width: 220px;
        }
        .premium-details-btn {
          font-family: 'Montserrat', Arial, sans-serif;
          font-weight: 700;
          background: linear-gradient(90deg, #8B4513 60%, #DAA520 100%);
          color: #fffbe6;
          border: 3px solid #DAA520;
          border-radius: 1.2em 1.2em 0.8em 0.8em / 1.5em 1.5em 0.7em 0.7em;
          box-shadow: 0 2px 8px #DAA52055 inset, 0 1px 0 #fff6;
          padding: 0.4em 1.2em;
          margin-top: 0.5em;
          transition: background 0.3s, color 0.3s, box-shadow 0.3s, border-color 0.3s;
        }
        .premium-details-btn:hover, .premium-details-btn:focus {
          background: linear-gradient(90deg, #DAA520 60%, #8B4513 100%);
          color: #8B4513;
          border-color: #fffbe6;
          box-shadow: 0 4px 24px #DAA52099, 0 2px 0 #fff9;
        }
        .beer-desc {
          transition: max-height 0.5s cubic-bezier(.4,2,.6,1), opacity 0.5s cubic-bezier(.4,2,.6,1), margin-top 0.3s;
        }
        /* Brewery Loader */
        .brewery-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5em;
        }
        .foam-loader {
          display: flex;
          gap: 0.3em;
        }
        .foam-bubble {
          width: 1.2em;
          height: 1.2em;
          background: #fffbe6;
          border-radius: 50%;
          opacity: 0.7;
          animation: foam-bubble 1.2s infinite alternate;
        }
        .foam-bubble:nth-child(2) {
          width: 1.5em;
          height: 1.5em;
          opacity: 0.9;
          animation-delay: 0.3s;
        }
        .foam-bubble:nth-child(3) {
          width: 1em;
          height: 1em;
          opacity: 0.6;
          animation-delay: 0.6s;
        }
        @keyframes foam-bubble {
          0% { transform: translateY(0); }
          100% { transform: translateY(-0.5em); opacity: 0.5; }
        }
        /* Animations */
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s forwards;
        }
        .delay-0 { animation-delay: 0s; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-900 { animation-delay: 0.9s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float 3s 1.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        /* Responsive grid improvements */
        @media (max-width: 1024px) {
          .grid-cols-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 768px) {
          .grid-cols-2, .grid-cols-3, .grid-cols-4, .xl\:grid-cols-4 { grid-template-columns: 1fr; }
          .premium-coaster { min-height: 340px; }
        }
        @media (min-width: 1280px) {
          .xl\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        .beer-card-img {
          background: #fffbe6;
          object-fit: contain !important;
          aspect-ratio: 4/3;
          padding: 0.5rem;
          display: block;
          margin: 0 auto;
          max-width: 100%;
          max-height: 13rem;
        }
        .beer-title {
          text-align: center !important;
          justify-content: center !important;
        }
      `}</style>
    </section>
  );
} 