'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Brewery-themed SVGs (hops, barley, bubbles, woodgrain)
const HopSVG = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-6 left-4 w-10 h-10 text-brewery-gold opacity-40 animate-float" aria-hidden="true"><path d="M18 2C18 2 7 10 7 20C7 28 18 34 18 34C18 34 29 28 29 20C29 10 18 2 18 2Z" fill="#DAA520" stroke="#8B4513" strokeWidth="2"/><circle cx="18" cy="20" r="6" fill="#fffbe6" stroke="#8B4513" strokeWidth="1.5"/></svg>
);
const BarleySVG = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-4 right-8 w-8 h-8 text-brewery-gold opacity-30 animate-float-delay" aria-hidden="true"><path d="M16 2C16 2 12 10 12 16C12 22 16 30 16 30C16 30 20 22 20 16C20 10 16 2 16 2Z" fill="#DAA520" stroke="#8B4513" strokeWidth="1.5"/></svg>
);
const BeerBubblesSVG = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 opacity-10 animate-bubble-float" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#fffbe6"/><circle cx="30" cy="8" r="5" fill="#fffbe6"/><circle cx="50" cy="12" r="6" fill="#fffbe6"/></svg>
);
const WoodGrainOverlay = () => (
  <div className="absolute inset-0 z-0 bg-[url('/menu.png')] bg-cover bg-center opacity-60 mix-blend-multiply pointer-events-none" aria-hidden="true" />
);

const initialForm = { name: '', email: '', message: '', newsletter: false };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState<{ [k: string]: boolean }>({});
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  // Brewery-themed validation
  const validate = () => {
    const newErrors: { [k: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Oops! Even our finest ales need a proper name.";
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = "A valid email helps us pour the perfect reply.";
    if (!form.message.trim()) newErrors.message = "Pour out your thoughts – we love a good story!";
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(validation).length === 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
        setForm(initialForm);
        setTouched({});
        setTimeout(() => setSuccess(false), 5000);
      }, 1800);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative py-24 px-2 md:px-0 bg-brewery-dark text-white overflow-hidden premium-bg ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
    >
      {/* Backgrounds & Overlays */}
      <WoodGrainOverlay />
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-brewery-primary/80 via-brewery-dark/90 to-brewery-gold/30 pointer-events-none" aria-hidden="true" />
      <HopSVG />
      <BarleySVG />
      <BeerBubblesSVG />
      {/* Section Header */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center mb-12 text-center animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-hero font-extrabold text-brewery-gold drop-shadow-xl tracking-tight mb-2 flex items-center gap-3">
          <span className="inline-block"><HopSVG /></span>
          Contact Unplugged Brewery
          <span className="inline-block rotate-12"><BarleySVG /></span>
        </h2>
        <div className="w-24 h-2 bg-gradient-to-r from-brewery-gold/80 via-brewery-primary/80 to-brewery-gold/80 rounded-full my-4" />
        <p className="text-lg md:text-2xl text-brewery-gold font-light max-w-2xl mx-auto">
          Get in Touch – <span className="font-bold text-brewery-primary">Let's Brew Something Together</span>
        </p>
        <p className="text-base text-white/80 mt-2 max-w-xl mx-auto">
          Book a private event, schedule a brewery tour, ask about catering, or just say cheers!
        </p>
      </div>
      {/* Split Layout */}
      <div className="relative z-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start bg-white/5 dark:bg-brewery-dark/60 rounded-3xl shadow-2xl border border-brewery-gold/30 backdrop-blur-md p-8 md:p-12 animate-fade-in-up">
        {/* Left: Contact Info & Map */}
        <div className="flex-1 flex flex-col gap-6 min-w-[260px]">
          {/* Contact Cards */}
          <div className="grid gap-4">
            <div className="group flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer animate-fade-in-up">
              <Mail className="w-7 h-7 text-brewery-gold group-hover:text-brewery-primary transition-colors" />
              <div>
                <div className="text-lg font-bold text-brewery-gold">Email</div>
                <a href="mailto:info@unpluggedbrewery.com" className="text-white hover:text-brewery-gold transition-colors">info@unpluggedbrewery.com</a>
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer animate-fade-in-up delay-100">
              <Phone className="w-7 h-7 text-brewery-gold group-hover:text-brewery-primary transition-colors" />
              <div>
                <div className="text-lg font-bold text-brewery-gold">Phone</div>
                <a href="tel:14403967474" className="text-white hover:text-brewery-gold transition-colors">(440) 396-7474</a>
              </div>
            </div>
            <div className="group flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 cursor-pointer animate-fade-in-up delay-200">
              <MapPin className="w-7 h-7 text-brewery-gold group-hover:text-brewery-primary transition-colors" />
              <div>
                <div className="text-lg font-bold text-brewery-gold">Address</div>
                <div className="text-white">201 E BridgeSt, Elyria, OH 44035</div>
                <a href="https://www.google.com/maps/dir/?api=1&destination=201+E+BridgeSt,+Elyria,+OH+44035" target="_blank" rel="noopener noreferrer" className="inline-block mt-1 text-brewery-gold underline hover:text-brewery-primary transition-colors text-sm font-semibold">Get Directions</a>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-brewery-dark/80 border-2 border-brewery-gold rounded-xl p-5 shadow-lg animate-fade-in-up delay-300">
              <span className="inline-block w-7 h-7 text-brewery-gold">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="10" rx="3" fill="#DAA520" stroke="#8B4513" strokeWidth="1.5"/><rect x="7" y="3" width="10" height="4" rx="2" fill="#fffbe6" stroke="#8B4513" strokeWidth="1.5"/></svg>
              </span>
              <div>
                <div className="text-lg font-bold text-brewery-gold">Hours</div>
                <div className="text-white">Daily 4PM – 10PM</div>
              </div>
            </div>
          </div>
          {/* Socials */}
          <div className="mt-8 flex flex-col gap-2 animate-fade-in-up delay-400">
            <div className="text-brewery-gold font-bold text-lg mb-1">Follow us</div>
            <div className="flex gap-5">
              <a href="https://www.facebook.com/unplugbrew" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brewery-primary transition-colors group">
                <Facebook className="w-7 h-7" />
              </a>
              <a href="https://instagram.com/unplugbrew" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brewery-primary transition-colors group">
                <Instagram className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>
        {/* Right: Contact Form */}
        <form onSubmit={handleSubmit} className="flex-1 bg-brewery-dark/70 border-2 border-brewery-gold rounded-2xl shadow-lg p-4 sm:p-8 flex flex-col gap-4 sm:gap-6 w-full max-w-md mx-auto animate-fade-in-up delay-200 relative">
          {/* Brewery-themed floating labels */}
          <div className="relative">
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer px-2 py-2 sm:px-4 sm:py-3 rounded-lg border-2 bg-brewery-dark/80 text-white border-brewery-gold font-semibold focus:outline-none focus:ring-2 focus:ring-brewery-gold focus:border-brewery-primary transition-all w-full shadow-inner text-base sm:text-lg ${errors.name && touched.name ? 'border-red-500 ring-red-400' : ''}`}
              placeholder=" "
              autoComplete="name"
              required
            />
            <label htmlFor="name" className="absolute left-4 top-1/2 -translate-y-1/2 bg-brewery-dark/80 px-2 text-brewery-gold font-bold pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brewery-gold peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-brewery-gold peer-placeholder-shown:-translate-y-1/2 peer-focus:translate-y-0 peer-focus:bg-brewery-dark/90 peer-focus:px-2 peer-focus:py-0 rounded">
              Your Name
            </label>
            {errors.name && touched.name && <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.name}</div>}
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`peer px-2 py-2 sm:px-4 sm:py-3 rounded-lg border-2 bg-brewery-dark/80 text-white border-brewery-gold font-semibold focus:outline-none focus:ring-2 focus:ring-brewery-gold focus:border-brewery-primary transition-all w-full shadow-inner text-base sm:text-lg ${errors.email && touched.email ? 'border-red-500 ring-red-400' : ''}`}
              placeholder=" "
              autoComplete="email"
              required
            />
            <label htmlFor="email" className="absolute left-4 top-1/2 -translate-y-1/2 bg-brewery-dark/80 px-2 text-brewery-gold font-bold pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brewery-gold peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-brewery-gold peer-placeholder-shown:-translate-y-1/2 peer-focus:translate-y-0 peer-focus:bg-brewery-dark/90 peer-focus:px-2 peer-focus:py-0 rounded">
              Your Email
            </label>
            {errors.email && touched.email && <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.email}</div>}
          </div>
          <div className="relative">
            <textarea
              name="message"
              id="message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              className={`peer px-2 py-2 sm:px-4 sm:py-3 rounded-lg border-2 bg-brewery-dark/80 text-white border-brewery-gold font-semibold focus:outline-none focus:ring-2 focus:ring-brewery-gold focus:border-brewery-primary transition-all w-full shadow-inner resize-none text-base sm:text-lg ${errors.message && touched.message ? 'border-red-500 ring-red-400' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="message" className="absolute left-4 top-4 bg-brewery-dark/80 px-2 text-brewery-gold font-bold pointer-events-none transition-all duration-200 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-brewery-gold peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-brewery-gold peer-focus:translate-y-0 peer-focus:bg-brewery-dark/90 peer-focus:px-2 peer-focus:py-0 rounded">
              Your Message
            </label>
            {errors.message && touched.message && <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle className="w-4 h-4" />{errors.message}</div>}
          </div>
          {/* Newsletter Signup */}
          <div className="flex items-center gap-3 mt-2">
            <input
              type="checkbox"
              name="newsletter"
              id="newsletter"
              checked={form.newsletter}
              onChange={handleChange}
              className="accent-brewery-gold w-5 h-5 rounded border-2 border-brewery-gold focus:ring-2 focus:ring-brewery-gold focus:border-brewery-primary transition-all"
            />
            <label htmlFor="newsletter" className="text-brewery-gold font-semibold cursor-pointer select-none">
              Sign up for brewery updates & special events
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-brewery-gold text-brewery-dark font-bold px-8 py-3 rounded-full shadow-lg border-4 border-brewery-gold text-xl flex items-center justify-center gap-2 hover:bg-brewery-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-brewery-gold/40 tap-handle-btn relative overflow-hidden"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                <span className="font-hero">Send Message</span>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="ml-2" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="20" height="12" rx="6" fill="#fffbe6" stroke="#8B4513" strokeWidth="2"/><rect x="12" y="4" width="4" height="8" rx="2" fill="#DAA520" stroke="#8B4513" strokeWidth="1.5"/></svg>
              </>
            )}
          </button>
          {/* Success/Error Messaging */}
          {success && (
            <div className="flex items-center gap-2 text-brewery-gold font-bold mt-4 animate-fade-in-up">
              <CheckCircle className="w-6 h-6" />
              Thanks! Your message is brewing... we&apos;ll get back to you soon! <span role="img" aria-label="beer">🍺</span>
            </div>
          )}
        </form>
      </div>
      {/* Decorative Section Divider */}
      <div className="w-screen left-1/2 -translate-x-1/2 absolute bottom-0 z-10" style={{position:'absolute',left:'50%',transform:'translateX(-50%)',width:'100vw',zIndex:10}} aria-hidden="true">
        <svg width="100vw" height="32" viewBox="0 0 1440 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'100vw',minWidth:'100vw',maxWidth:'100vw'}}>
          <path d="M0 16C120 32 360 0 720 0C1080 0 1320 32 1440 16V32H0V16Z" fill="#DAA520" fillOpacity="0.12" />
        </svg>
      </div>
      {/* Animations & Styles */}
      <style jsx>{`
        .font-hero {
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
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
        .animate-bubble-float {
          animation: bubbleFloat 6s ease-in-out infinite;
        }
        @keyframes bubbleFloat {
          0%, 100% { transform: translateY(0); opacity: 0.1; }
          50% { transform: translateY(-20px); opacity: 0.2; }
        }
        .animate-fade-in-up {
          opacity: 0;
          transform: translateY(40px);
          animation: fadeInUp 1s forwards;
        }
        .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in-up.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in-up.delay-300 { animation-delay: 0.3s; }
        .animate-fade-in-up.delay-400 { animation-delay: 0.4s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: none;
          }
        }
        .tap-handle-btn {
          position: relative;
          font-family: 'Montserrat', 'Oswald', 'Bebas Neue', Arial, sans-serif;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 24px 0 #8B4513aa, 0 1.5px 0 #DAA520;
        }
        .tap-handle-btn:active {
          transform: scale(0.97) rotate(-1deg);
          box-shadow: 0 2px 8px 0 #8B4513aa;
        }
        .premium-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 60% 40%, #DAA52033 0%, #1F1F1F 80%);
          pointer-events: none;
        }
        @media (max-width: 768px) {
          .premium-bg .flex-row {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
} 