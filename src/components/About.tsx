'use client';
import React, { useRef, useState, useEffect } from 'react';
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
  const [modalOpen, setModalOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
        setIsFading(false);
      }, 400); // Fade duration
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-white dark:bg-brewery-dark text-brewery-dark dark:text-white ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
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
        <div className="flex-1 flex flex-col items-center justify-center gap-6 animate-fade-in-up">
          <div className="relative w-auto h-auto max-w-full max-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-brewery-gold flex items-center justify-center">
            <img
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className={`object-contain max-w-full max-h-[400px] transition-opacity duration-400 ${isFading ? 'opacity-0' : 'opacity-100'}`}
              key={galleryImages[currentIndex].src}
            />
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
        <div className="flex-1 flex flex-col justify-center gap-8 animate-fade-in-up delay-200 bg-white/60 dark:bg-brewery-dark/60 rounded-3xl shadow-2xl border border-brewery-gold/40 backdrop-blur-md p-8">
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
                className="group bg-white/80 dark:bg-brewery-dark/80 rounded-xl shadow-lg p-6 flex flex-col items-center border-2 border-brewery-gold hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer animate-fade-in-up"
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
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-block bg-brewery-gold text-brewery-dark font-bold px-8 py-4 rounded-full shadow-lg text-xl border-2 border-brewery-gold hover:bg-brewery-primary hover:text-white transition-colors duration-300 animate-fade-in-up focus:outline-none focus:ring-4 focus:ring-brewery-gold/40"
            >
              Visit Us &mdash; Experience Unplugged
            </button>
            <span className="text-brewery-gold text-lg font-semibold animate-fade-in-up delay-300">Taproom open daily!</span>
          </div>
        </div>
      </div>
      {/* Modal for Google Maps, Directions, Phone, Google Profile */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white dark:bg-brewery-dark rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-6 animate-fade-in-up">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-2xl text-brewery-gold hover:text-brewery-primary focus:outline-none"
              aria-label="Close modal"
            >
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4 text-brewery-primary text-center">Find Us at Unplugged Brewery</h3>
            <div className="mb-4 rounded-xl overflow-hidden border-2 border-brewery-gold shadow">
              <iframe
                title="Unplugged Brewery Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.248356029331!2d-82.10087398754446!3d41.36868857118251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830996048c03467%3A0x26f6986eaf1e5223!2sUnplugged%20Brewing%20Company!5e0!3m2!1sen!2sus!4v1750177009946!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="flex flex-col gap-3 items-center">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Unplugged+Brewery"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-brewery-gold text-brewery-dark font-bold px-6 py-2 rounded-full shadow border-2 border-brewery-gold hover:bg-brewery-primary hover:text-white transition-colors duration-200"
              >
                Get Directions
              </a>
              <a
                href="tel:+14403967474"
                className="text-lg font-semibold text-brewery-primary hover:text-brewery-gold transition-colors"
              >
                (440) 396-7474
              </a>
              <a
                href="https://g.co/kgs/76LCxnz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-md underline text-brewery-gold hover:text-brewery-primary"
              >
                View Google Profile
              </a>
            </div>
          </div>
        </div>
      )}
      {/* Animations */}
      <style jsx>{`
        .about-parallax-bg {
          filter: brightness(0.85) saturate(1.1);
        }
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s forwards;
        }
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        .animate-fade-in-up.delay-300 {
          animation-delay: 0.3s;
        }
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
        /* Add fade transition for slideshow images */
        .transition-opacity {
          transition: opacity 0.4s ease;
        }
      `}</style>
    </section>
  );
} 