'use client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Beer, Award, Hop } from 'lucide-react';
import Counter from './Counter';
import { useInView } from 'react-intersection-observer';

const stats = [
  { label: 'Est. 2020', value: 2020, icon: <Award className="w-7 h-7 text-brewery-gold" /> },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intersection observer with mobile-friendly settings
  const { ref, inView } = useInView({ 
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '50px 0px',
  });

  // Mobile fallback timer
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isVisible && isMobile) {
        setIsVisible(true);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isVisible, isMobile]);

  // Update visibility
  useEffect(() => {
    if (inView || isVisible) {
      setIsVisible(true);
    }
  }, [inView, isVisible]);

  // Preload images
  useEffect(() => {
    const imagePromises = galleryImages.map((img) => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = img.src;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch(() => setImagesLoaded(true));
  }, []);

  // Image slideshow effect
  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
        setIsFading(false);
      }, 400);
    }, 3500);
    
    return () => clearInterval(interval);
  }, [imagesLoaded]);

  // Combine refs
  const combinedRef = useCallback((el: HTMLDivElement | null) => {
    ref(el);
    sectionRef.current = el;
  }, [ref]);

  return (
    <section
      id="about"
      ref={combinedRef}
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white dark:bg-brewery-dark text-brewery-dark dark:text-white scroll-animate ${isVisible ? 'in-view' : ''}`}
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center about-parallax-bg"
        style={{ backgroundImage: "url('/beers.jpg')" }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-brewery-gold/20 dark:from-brewery-dark/90 dark:via-brewery-dark/60 dark:to-brewery-gold/10 z-10" />
      
      <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-stretch gap-12 px-4 py-20 md:py-32">
        {/* Left: Image & Gallery Preview */}
        <div className="flex-1 flex flex-col items-center justify-center gap-6 about-image-section scroll-animate">
          <div className="relative w-auto h-auto max-w-full max-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-brewery-gold flex items-center justify-center bg-white/10">
            {imagesLoaded ? (
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className={`object-contain max-w-full max-h-[400px] transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}
                key={galleryImages[currentIndex].src}
                loading="eager"
                onLoad={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.opacity = '1';
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  console.log('Image failed to load:', target.src);
                }}
              />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-brewery-gold/20">
                <Beer className="w-16 h-16 text-brewery-gold animate-pulse" />
              </div>
            )}
            
            {/* Decorative Icons */}
            <Hop className="absolute top-4 left-4 w-10 h-10 text-brewery-gold opacity-80 animate-float" />
            <Beer className="absolute bottom-4 right-4 w-10 h-10 text-brewery-gold opacity-80 animate-float-delay" />
            
            {/* Slideshow indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {galleryImages.map((img, idx) => (
                <span
                  key={img.src}
                  className={`w-3 h-3 rounded-full border border-brewery-gold bg-white/70 dark:bg-brewery-dark/70 transition-all duration-300 ${idx === currentIndex ? 'bg-brewery-gold scale-110' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content with glass effect */}
        <div className="flex-1 flex flex-col justify-center gap-8 about-content-section scroll-animate bg-white/60 dark:bg-brewery-dark/60 rounded-3xl shadow-2xl border border-brewery-gold/40 backdrop-blur-md p-8">
          {/* Tagline/Hook */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-brewery-primary mb-2 leading-tight drop-shadow-lg">
            Where craft meets character, <span className="text-brewery-gold">unplugged</span> from the ordinary
          </h2>
          
          {/* Quote styling with glass effect */}
          <blockquote className="text-xl md:text-2xl italic font-light text-brewery-gold border-l-4 border-brewery-gold pl-4 mb-4 bg-white/60 dark:bg-brewery-dark/60 rounded-xl shadow border border-brewery-gold/30 backdrop-blur-sm p-4">
            "At Unplugged Brewery, we believe the best moments are brewed together."
          </blockquote>
          
          {/* Stats with glass effect */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2 bg-white/50 dark:bg-brewery-dark/50 rounded-xl shadow border border-brewery-gold/20 backdrop-blur-sm p-2">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="group bg-white/80 dark:bg-brewery-dark/80 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-brewery-gold hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer stat-card scroll-animate touch-target"
                style={{ animationDelay: `${0.2 + i * 0.1}s` }}
              >
                <span className="mb-2">{stat.icon}</span>
                <span className="text-3xl font-extrabold text-brewery-gold mb-1">
                  {stat.value === 2020 ? 'Est. 2020' : stat.value.toLocaleString()}
                </span>
                <span className="text-md font-semibold text-brewery-primary text-center">{stat.label}</span>
              </div>
            ))}
          </div>
          
          {/* Founder Story / Philosophy */}
          <div className="text-lg md:text-xl text-brewery-dark dark:text-white leading-relaxed space-y-2">
            <p>
              <span className="font-bold text-brewery-gold">Our Philosophy:</span> We blend tradition with creativity, crafting beers that inspire connection and celebration. Every pint is a testament to our passion for quality, community, and authenticity.
            </p>
            <p>
              <span className="font-bold text-brewery-gold">Meet the Founder:</span> From a garage dream to a local legend, our founder's journey is rooted in a love for bold flavors and unplugged moments. Join us in our taproom for a taste of something truly special.
            </p>
          </div>
          
          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Unplugged+Brewing+Company,+Elyria,+OH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brewery-gold text-brewery-dark font-bold px-8 py-4 rounded-full shadow-lg text-xl border-2 border-brewery-gold hover:bg-brewery-primary hover:text-white transition-colors duration-300 touch-target focus:outline-none focus:ring-4 focus:ring-brewery-gold/40"
            >
              Visit Us &mdash; Get Directions
            </a>
            <span className="text-brewery-gold text-lg font-semibold">Taproom open daily!</span>
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
        
        /* Custom glass morphism for this component */
        .about-content-section {
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        
        /* Slideshow specific transitions */
        .transition-opacity {
          transition: opacity 0.4s ease;
        }
      `}</style>
    </section>
  );
}