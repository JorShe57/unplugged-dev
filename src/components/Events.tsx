'use client';
import React from 'react';
import { Hop, Beer, GlassWater, Calendar, MapPin, Star, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useUpcomingEvents } from '@/hooks/useEvents';

export default function Events() {
  const { events, loading, error } = useUpcomingEvents();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // Helper function to format date
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Helper function to format time
  const formatEventTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <section
      id="events"
      ref={ref}
      className={`relative py-20 px-2 md:px-0 bg-brewery-dark text-white overflow-hidden premium-bg ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
      style={{
        background:
          'radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%), url(/events1.png) center/cover no-repeat',
      }}
    >
      {/* Decorative Top Divider */}
      <div className="section-divider-hero-menu w-screen left-1/2 -translate-x-1/2 absolute top-0 z-10" style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:'100vw',zIndex:10}} aria-hidden="true">
        <svg width="100vw" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100vw',minWidth:'100vw',maxWidth:'100vw'}}>
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

      {/* Events Container */}
      <div
        className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center justify-center bg-brewery-gold rounded-3xl shadow-2xl border-4 border-brewery-gold overflow-hidden premium-iframe-frame animate-fade-in-up p-4 sm:p-8"
        style={{
          boxShadow: '0 8px 32px 0 #0008, 0 1.5px 0 #DAA520',
          borderRadius: '2rem',
        }}
      >
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 sm:py-20 w-full animate-fade-in-up">
            <div className="brewery-loader mb-4">
              <span className="foam-bubble" />
              <span className="foam-bubble" />
              <span className="foam-bubble" />
            </div>
            <span className="text-brewery-gold text-lg font-hero mt-2">Loading events...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-6 sm:py-12 w-full animate-fade-in-up">
            <span className="text-brewery-gold text-base sm:text-xl font-bold mb-2">Unable to load events.</span>
            <span className="text-brewery-gold text-sm sm:text-lg mb-4 text-center">Please check back later for our latest events!</span>
          </div>
        )}

        {/* Events List */}
        {!loading && !error && (
          <div className="w-full">
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 sm:py-12 w-full animate-fade-in-up">
                <Calendar className="w-16 h-16 text-brewery-gold mb-4 opacity-60" />
                <span className="text-brewery-gold text-base sm:text-xl font-bold mb-2">No upcoming events</span>
                <span className="text-brewery-gold text-sm sm:text-lg text-center">Check back soon for exciting brewery events!</span>
              </div>
            ) : (
              <div className="grid gap-6 w-full">
                {events.map((event, idx) => (
                  <div
                    key={event._id}
                    className={`event-card ${event.featured ? 'featured' : ''}`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Event Image */}
                    {event.image?.asset?.url && (
                      <div className="event-image">
                        <img
                          src={event.image.asset.url}
                          alt={event.title}
                          className="event-img"
                        />
                      </div>
                    )}

                    {/* Event Info */}
                    <div className="event-content">
                      <div className="event-header">
                        <h3 className="event-title">
                          {event.featured && <Star className="w-5 h-5 text-brewery-gold fill-current" />}
                          {event.title}
                        </h3>
                        <p className="event-description">{event.description}</p>
                      </div>

                      <div className="event-details">
                        <div className="detail-row">
                          <Calendar className="w-5 h-5 text-brewery-gold flex-shrink-0" />
                          <span className="detail-label">Date:</span>
                          <span className="detail-value">{formatEventDate(event.date)}</span>
                        </div>
                        <div className="detail-row">
                          <Clock className="w-5 h-5 text-brewery-gold flex-shrink-0" />
                          <span className="detail-label">Time:</span>
                          <span className="detail-value">{formatEventTime(event.date)}</span>
                        </div>
                        <div className="detail-row">
                          <MapPin className="w-5 h-5 text-brewery-gold flex-shrink-0" />
                          <span className="detail-label">Location:</span>
                          <span className="detail-value">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decorative Bottom Divider */}
      <div className="section-divider-hero-menu w-screen left-1/2 -translate-x-1/2 absolute bottom-0 z-10 mt-12" style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:'100vw',zIndex:10}} aria-hidden="true">
        <svg width="100vw" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100vw',minWidth:'100vw',maxWidth:'100vw'}}>
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

        .brewery-loader {
          display: flex;
          gap: 0.5rem;
        }

        .foam-bubble {
          width: 18px;
          height: 18px;
          background: #DAA520;
          border-radius: 50%;
          opacity: 0.7;
          animation: foam-bounce 1.2s infinite alternate;
        }

        .foam-bubble:nth-child(2) {
          width: 12px;
          height: 12px;
          animation-delay: 0.3s;
        }

        .foam-bubble:nth-child(3) {
          width: 8px;
          height: 8px;
          animation-delay: 0.6s;
        }

        @keyframes foam-bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-12px); }
        }

        .event-card {
          display: flex;
          background: linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(45, 45, 45, 0.9) 100%);
          border-radius: 1.5rem;
          padding: 1.5rem;
          border: 2px solid rgba(218, 165, 32, 0.3);
          transition: all 0.3s ease;
          opacity: 0;
          animation: slideInUp 0.6s ease forwards;
          color: #fffbe6;
        }

        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(218, 165, 32, 0.4);
          border-color: #DAA520;
        }

        .event-card.featured {
          border-color: #DAA520;
          box-shadow: 0 4px 24px rgba(218, 165, 32, 0.4), 0 0 0 4px rgba(218, 165, 32, 0.1);
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, rgba(139, 69, 19, 0.95) 50%, rgba(45, 45, 45, 0.9) 100%);
        }

        .event-image {
          flex-shrink: 0;
          width: 120px;
          height: 120px;
          border-radius: 1rem;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
        }

        .event-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .event-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .event-header {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .event-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #DAA520;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .event-description {
          font-family: 'Montserrat', sans-serif;
          font-size: 1rem;
          color: #fffbe6;
          line-height: 1.5;
          margin: 0;
          opacity: 0.9;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Oswald', sans-serif;
          font-size: 0.95rem;
        }

        .detail-label {
          font-weight: 600;
          color: #DAA520;
          min-width: 70px;
        }

        .detail-value {
          font-weight: 700;
          color: #fffbe6;
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

        .delay-200 { animation-delay: 0.2s; }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .event-card {
            flex-direction: column;
            text-align: center;
            padding: 1.5rem;
          }

          .event-image {
            align-self: center;
            margin-right: 0;
            margin-bottom: 1rem;
            width: 100px;
            height: 100px;
          }

          .event-details {
            align-items: center;
          }

          .detail-row {
            justify-content: center;
            text-align: center;
            flex-wrap: wrap;
          }

          .detail-label {
            min-width: auto;
          }
        }

        @media (max-width: 500px) {
          .event-card {
            padding: 1rem;
          }

          .event-title {
            font-size: 1.25rem;
          }

          .detail-row {
            font-size: 0.85rem;
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