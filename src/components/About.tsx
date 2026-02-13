'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Beer, Award, Hop } from 'lucide-react';
import Counter from './Counter';
import { useInView } from 'react-intersection-observer';

// Custom Ribbon Icon
const RibbonIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3L12 2L18 3V8L12 13L6 8V3Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 8L12 13V21L6 18V8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 8L12 13V21L18 18V8Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const stats = [
  { label: 'Established', value: 2020, icon: <RibbonIcon className="w-7 h-7 text-brewery-gold" /> },
  { label: '12 Craft Beers', value: 12, icon: <Beer className="w-7 h-7 text-brewery-gold" /> },
  { label: '10,000+ Pints Served', value: 10000, icon: <Beer className="w-7 h-7 text-brewery-gold" /> },
  { label: 'Award-Winning', value: 8, icon: <Hop className="w-7 h-7 text-brewery-gold" /> },
];

const galleryImages = [
  { src: '/3.png', alt: 'Brewery interior' },
  { src: '/2.png', alt: 'Beers' },
  { src: '/1.png', alt: 'Taproom' },
];

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);


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
  const combinedRef = useCallback((el: HTMLDivElement | null) => {
    ref(el);
    sectionRef.current = el;
  }, [ref]);

  return (
    <section
      id="about"
      ref={combinedRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1A120E] text-[#FDF5E6] py-24 md:py-32`}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center opacity-50 grayscale brightness-110"
        style={{ backgroundImage: "url('/beers.jpg')", backgroundAttachment: 'fixed' }}
        aria-hidden="true"
      />
      {/* Overlay - Lighter, more atmospheric gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A120E]/60 via-transparent to-[#1A120E]/40 z-10" />

      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-12 px-4 py-20 md:py-32">
        {/* Left: Image Gallery */}
        <div className={`flex-1 flex flex-col items-center justify-center gap-6 about-image-section scroll-animate ${isVisible ? 'in-view' : ''}`}>
          {/* Main Featured Image */}
          <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-brewery-gold bg-white">
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].alt}
              className="w-full h-auto object-cover"
              loading="eager"
              style={{ display: 'block', minHeight: '200px' }}
            />

            {/* Decorative Icons */}
            <Hop className="absolute top-4 left-4 w-10 h-10 text-brewery-gold opacity-80 animate-float" />
            <Beer className="absolute bottom-4 right-4 w-10 h-10 text-brewery-gold opacity-80 animate-float-delay" />
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {galleryImages.slice(1).map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden shadow-lg border-2 border-brewery-gold/50 bg-white aspect-square"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  style={{ display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Content with glass effect */}
        <div className={`flex-1 flex flex-col justify-center gap-10 about-content-section scroll-animate ${isVisible ? 'in-view' : ''} bg-[#120A07]/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-[#E6B325]/20 p-10 md:p-14`}>
          {/* Tagline/Hook */}
          <div className="text-3xl md:text-5xl font-hero font-bold text-[#E6B325] leading-tight tracking-tight">
            Where craft meets character. <br className="hidden md:inline" /> Unplugged from the ordinary.
          </div>

          {/* Stats Grid - Liquid Glass Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group bg-[#1A120E]/60 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center border border-[#E6B325]/10 hover:border-[#E6B325]/40 transition-all duration-500 cursor-default stat-card"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-hero font-bold text-[#FDF5E6] mb-1">
                  {stat.value === 2020 ? '2020' : stat.value.toLocaleString()}
                </div>
                <div className="text-[10px] tracking-[0.2em] font-body font-medium uppercase text-[#C68642]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Story / Philosophy */}
          <div className="text-lg md:text-xl font-body font-light leading-relaxed text-[#FDF5E6]/90 space-y-6 max-w-2xl">
            <p>
              <span className="font-bold text-[#E6B325] tracking-wider uppercase text-sm block mb-2">Our Philosophy</span>
              We blend tradition with calculated creativity, crafting beers that inspire deep connection. Every pint is a testament to our passion for quality materials, local community, and the art of the unplugged moment.
            </p>
            <p>
              <span className="font-bold text-[#E6B325] tracking-wider uppercase text-sm block mb-2">The Origin</span>
              From a garage dream to a community landmark, our journey is rooted in a love for bold, unfiltered flavors. We invite you to step into our taproom and experience craft beer exactly as it was meant to be.
            </p>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-6 items-center pt-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Unplugged+Brewing+Company,+Elyria,+OH"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center bg-[#C68642] hover:bg-[#E6B325] text-[#120A07] font-body font-bold text-sm tracking-widest uppercase px-10 py-5 rounded-full transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(198,134,66,0.3)] border border-[#E6B325]/20"
            >
              Get Directions
              <Award className="ml-3 w-4 h-4 transition-transform group-hover:rotate-12" />
            </a>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E6B325] animate-pulse" />
              <span className="text-sm font-body font-medium tracking-widest uppercase text-[#FDF5E6]/70">Taproom Open Daily</span>
            </div>
          </div>
        </div>
      </div>

      {/* Component-specific styles only */}
      <style jsx>{`
        .about-parallax-bg {
          filter: brightness(0.85) saturate(1.1);
        }
        
        /* Component-specific slideshow styling */
        .about-image-section {
          transition-delay: 0.1s;
        }
        
        .about-content-section {
          transition-delay: 0.2s;
        }
        
        .stat-card:nth-child(1) { transition-delay: 0.3s; }
        .stat-card:nth-child(2) { transition-delay: 0.4s; }
        .stat-card:nth-child(3) { transition-delay: 0.5s; }
        .stat-card:nth-child(4) { transition-delay: 0.6s; }
        
        /* Ensure images are visible */
        .about-image-section img {
          opacity: 1 !important;
          display: block !important;
        }
        
        /* Slideshow specific transitions */
        .transition-opacity {
          transition: opacity 0.4s ease;
        }
      `}</style>
    </section>
  );
}