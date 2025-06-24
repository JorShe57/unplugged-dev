"use client";

import React, { useEffect, useState } from 'react';
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

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
        ref={ref}
        className={`beer-menu-section ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
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
        ref={ref}
        className={`beer-menu-section ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
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
      ref={ref}
      className={`beer-menu-section ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
    >
      {/* Section Divider */}
      <div className="section-divider">
        <svg width="100%" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="header-container">
          <h2 className="section-title">
            <Hop className="w-10 h-10 text-brewery-gold animate-float" />
            Our Beers
            <BeerIcon className="w-10 h-10 text-brewery-gold animate-float-delay" />
          </h2>
          <button
            className="filter-btn"
            onClick={() => setShowAvailable((v) => !v)}
            aria-pressed={showAvailable}
          >
            <Hop className="w-5 h-5" />
            {showAvailable ? 'Show All Beers' : 'Show Available Only'}
          </button>
        </div>

        {/* Beer List */}
        <div className="beer-list">
          {filteredBeers.length === 0 ? (
            <div className="no-beers">No beers found.</div>
          ) : (
            filteredBeers.map((beer, idx) => (
              <div
                key={beer._id}
                className={`beer-item ${!beer.available ? 'unavailable' : ''} ${beer.featured ? 'featured' : ''}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Beer Image */}
                {beer.image?.asset?.url && (
                  <div className="beer-image">
                    <img
                      src={beer.image.asset.url}
                      alt={beer.name}
                      className="beer-img"
                    />
                  </div>
                )}

                {/* Beer Info */}
                <div className="beer-info">
                  <div className="beer-header">
                    <div className="beer-name-section">
                      <h3 className="beer-name">
                        {beer.featured && <Star className="w-5 h-5 text-brewery-gold fill-current" />}
                        {beer.name}
                        {!beer.available && <span className="unavailable-badge">Unavailable</span>}
                      </h3>
                      <p className="beer-description">{beer.description}</p>
                    </div>
                    <div className="beer-price">
                      ${beer.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="beer-specs">
                    <div className="spec-item">
                      {getBeerIcon(beer.type)}
                      <span className="spec-label">Type:</span>
                      <span className="spec-value">{beer.type}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">ABV:</span>
                      <span className="spec-value">{beer.abv}%</span>
                    </div>
                    {beer.ibu !== undefined && (
                      <div className="spec-item">
                        <span className="spec-label">IBU:</span>
                        <span className="spec-value">{beer.ibu}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&family=Oswald:wght@400;600;700&display=swap');

        .beer-menu-section {
          position: relative;
          min-height: 60vh;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: #fffbe6;
        }

        .section-divider {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
        }

        .header-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .header-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .section-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          color: #DAA520;
          text-shadow: 0 2px 24px #8B4513cc, 0 1px 0 #fff3;
          letter-spacing: 0.04em;
          line-height: 1.1;
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #DAA520 0%, #ffe066 100%);
          color: #1a1a1a;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 2rem;
          font-family: 'Oswald', sans-serif;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 4px 16px rgba(218, 165, 32, 0.3);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .filter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(218, 165, 32, 0.4);
          background: linear-gradient(135deg, #ffe066 0%, #DAA520 100%);
        }

        .beer-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .beer-item {
          display: flex;
          background: linear-gradient(135deg, rgba(255, 251, 230, 0.95) 0%, rgba(255, 224, 102, 0.9) 100%);
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 24px rgba(139, 69, 19, 0.3);
          border: 2px solid transparent;
          transition: all 0.3s ease;
          opacity: 0;
          animation: slideInUp 0.6s ease forwards;
          color: #1a1a1a;
        }

        .beer-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(139, 69, 19, 0.4);
          border-color: #DAA520;
        }

        .beer-item.featured {
          border-color: #DAA520;
          box-shadow: 0 4px 24px rgba(218, 165, 32, 0.4), 0 0 0 4px rgba(218, 165, 32, 0.1);
        }

        .beer-item.unavailable {
          opacity: 0.6;
          filter: grayscale(0.5);
        }

        .beer-image {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 0.75rem;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
        }

        .beer-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .beer-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .beer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
        }

        .beer-name-section {
          flex: 1;
        }

        .beer-name {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #8B4513;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .unavailable-badge {
          background: #dc3545;
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
          border-radius: 1rem;
          font-weight: 600;
        }

        .beer-description {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          color: #5a5a5a;
          line-height: 1.5;
          margin: 0;
        }

        .beer-price {
          font-family: 'Oswald', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #DAA520;
          text-shadow: 0 1px 2px rgba(139, 69, 19, 0.3);
          flex-shrink: 0;
        }

        .beer-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Oswald', sans-serif;
          font-size: 0.9rem;
        }

        .spec-label {
          font-weight: 600;
          color: #8B4513;
        }

        .spec-value {
          font-weight: 700;
          color: #DAA520;
        }

        .no-beers {
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
          color: #DAA520;
          padding: 3rem;
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
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          color: #DAA520;
        }

        .error-message {
          text-align: center;
          font-family: 'Montserrat', sans-serif;
          font-size: 1.2rem;
          color: #dc3545;
          padding: 3rem;
        }

        /* Animations */
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

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

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

        /* Mobile responsive */
        @media (max-width: 768px) {
          .beer-item {
            flex-direction: column;
            text-align: center;
          }

          .beer-image {
            align-self: center;
            margin-right: 0;
            margin-bottom: 1rem;
            width: 100px;
            height: 100px;
          }

          .beer-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .beer-specs {
            justify-content: center;
          }

          .spec-item {
            font-size: 0.8rem;
          }
        }

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