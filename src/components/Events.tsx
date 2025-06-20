'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Hop, Beer, GlassWater, Facebook } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function Events() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // Facebook Page Plugin URL (page with events tab)
  const fbPageUrl =
    'https://www.facebook.com/plugins/page.php?href=https://www.facebook.com/unplugbrew&tabs=events&width=500&height=600&small_header=false&adapt_container_width=true&show_facepile=false';

  // Manual fallback events (example)
  const manualEvents = [
    {
      title: 'Live Music Night',
      date: 'July 20, 2024',
      time: '7:00 PM',
      description: 'Enjoy live music from local bands and great beer!'
    },
    {
      title: 'Trivia Tuesday',
      date: 'July 23, 2024',
      time: '6:30 PM',
      description: 'Test your knowledge and win brewery prizes.'
    },
    // Add more events as needed
  ];

  // Loading timeout effect
  useEffect(() => {
    if (!iframeLoaded && !iframeError) {
      timeoutRef.current = setTimeout(() => {
        setShowFallback(true);
      }, 10000); // 10 seconds
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [iframeLoaded, iframeError]);

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
          Join us for unforgettable brewery experiences! All our events are updated live from our Facebook page.
        </p>
      </div>
      {/* Decorative hops/beer glass overlays */}
      <Hop className="absolute left-4 top-10 w-16 h-16 text-brewery-gold opacity-30 animate-float z-0" aria-hidden="true" />
      <Beer className="absolute right-8 top-32 w-14 h-14 text-brewery-gold opacity-20 animate-float-delay z-0" aria-hidden="true" />
      <GlassWater className="absolute left-10 bottom-16 w-14 h-14 text-brewery-gold opacity-20 animate-float z-0" aria-hidden="true" />
      {/* Facebook Events iframe container */}
      <div
        className="relative z-10 max-w-3xl mx-auto w-full flex flex-col items-center justify-center bg-brewery-gold rounded-3xl shadow-2xl border-4 border-brewery-gold overflow-hidden premium-iframe-frame animate-fade-in-up p-4 sm:p-8"
        style={{
          boxShadow: '0 8px 32px 0 #0008, 0 1.5px 0 #DAA520',
          borderRadius: '2rem',
        }}
      >
        {/* Loading Placeholder & Fallback */}
        {!iframeLoaded && !iframeError && !showFallback && (
          <div className="flex flex-col items-center justify-center py-10 sm:py-20 w-full animate-fade-in-up">
            <div className="brewery-loader mb-4">
              <span className="foam-bubble" />
              <span className="foam-bubble" />
              <span className="foam-bubble" />
            </div>
            <span className="text-brewery-gold text-lg font-hero mt-2">Loading events...</span>
          </div>
        )}
        {/* Fallback after timeout or error */}
        {(iframeError || showFallback) && (
          <div className="flex flex-col items-center justify-center py-6 sm:py-12 w-full animate-fade-in-up">
            <span className="text-brewery-gold text-base sm:text-xl font-bold mb-2">Unable to load Facebook Events.</span>
            <span className="text-brewery-gold text-sm sm:text-lg mb-4 text-center">Facebook may be blocked or unavailable. Please check back later or visit our Facebook page for the latest events!</span>
            <a
              href="https://www.facebook.com/unplugbrew/events"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 rounded-full bg-brewery-gold text-brewery-dark font-bold text-sm sm:text-base shadow-lg border-2 border-brewery-primary hover:bg-brewery-primary hover:text-brewery-gold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brewery-gold mb-4"
            >
              <Facebook className="w-5 h-5" />
              Visit our Facebook Events
            </a>
            {/* Manual event cards */}
            <div className="w-full max-w-xl grid gap-4 mt-4">
              {manualEvents.map((event, idx) => (
                <div key={idx} className="bg-brewery-dark/80 border border-brewery-gold rounded-xl p-3 sm:p-4 shadow-md w-full">
                  <h3 className="text-brewery-gold text-base sm:text-lg font-bold mb-1">{event.title}</h3>
                  <div className="text-brewery-gold/80 text-xs sm:text-sm mb-1">{event.date} &bull; {event.time}</div>
                  <div className="text-white text-sm sm:text-base">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Facebook iframe */}
        <iframe
          title="Unplugged Brewery Facebook Events"
          src={fbPageUrl}
          width="100%"
          height="400"
          style={{
            minHeight: 220,
            border: 'none',
            overflow: 'hidden',
            width: '100%',
            display: iframeLoaded && !iframeError && !showFallback ? 'block' : 'none',
            aspectRatio: '16/10',
          }}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen={true}
          loading="lazy"
          onLoad={() => {
            setIframeLoaded(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
          onError={() => {
            setIframeError(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
          }}
        />
      </div>
      {/* CTA and Socials */}
      <div className="flex flex-col items-center mt-10 animate-fade-in-up delay-300">
        <a
          href="https://www.facebook.com/unplugbrew/events"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-brewery-gold text-brewery-dark font-bold text-lg shadow-lg border-2 border-brewery-primary hover:bg-brewery-primary hover:text-brewery-gold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brewery-gold mb-2"
        >
          <Facebook className="w-6 h-6" />
          Follow us on Facebook
        </a>
        <span className="text-brewery-gold text-base mt-1">Don't miss out – follow for updates and exclusive events!</span>
        <div className="flex gap-6 mt-4">
          <a href="https://facebook.com/unplugbrew" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brewery-primary transition-colors">
            <Facebook className="w-6 h-6" />
          </a>
          {/* Add more socials if needed */}
        </div>
      </div>
      {/* Decorative Bottom Divider */}
      <div className="section-divider-hero-menu w-screen left-1/2 -translate-x-1/2 absolute bottom-0 z-10 mt-12" style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:'100vw',zIndex:10}} aria-hidden="true">
        <svg width="100vw" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100vw',minWidth:'100vw',maxWidth:'100vw'}}>
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>
      {/* Animations and premium styles */}
      <style jsx>{`
        .premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%);
          pointer-events: none;
        }
        .premium-iframe-frame {
          background: none;
        }
        .brewery-loader {
          display: flex;
          gap: 0.5rem;
        }
        .foam-bubble {
          width: 18px;
          height: 18px;
          background: #fffbe6;
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
        @media (max-width: 768px) {
          .premium-iframe-frame iframe {
            height: 400px !important;
            min-height: 300px !important;
            aspect-ratio: 1/1 !important;
          }
        }
        @media (max-width: 500px) {
          .premium-iframe-frame iframe {
            height: 320px !important;
            min-height: 220px !important;
            aspect-ratio: 1/1 !important;
          }
        }
      `}</style>
    </section>
  );
} 