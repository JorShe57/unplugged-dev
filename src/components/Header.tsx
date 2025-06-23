'use client';

import React, { useState } from 'react';

const navLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/unplugbrew/', external: true },
  { label: 'Leave a Review', href: 'https://g.co/kgs/76LCxnz', external: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="top-0 z-50 bg-brewery-gold/20 dark:bg-brewery-dark/60 backdrop-blur-md border-b border-brewery-gold/30 shadow-lg"
      style={{ boxShadow: '0 0 32px 4px rgba(255, 215, 0, 0.35)' }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center">
          <img src="/favicon.webp" alt="Unplugged Brewery Logo" className="h-10 w-10 object-contain" />
        </a>
        <button
          className="md:hidden text-brewery-gold focus:outline-none"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </svg>
        </button>
        <ul className={`flex-col md:flex-row md:flex gap-8 md:gap-6 items-center md:static absolute left-0 w-full md:w-auto bg-brewery-dark md:bg-transparent transition-all duration-300 ease-in-out ${open ? 'top-16' : '-top-96'} md:top-0`}>
          {navLinks.map(link => (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  className="block py-2 px-4 text-brewery-gold hover:text-brewery-primary transition-colors duration-200 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  href={link.href}
                  className="block py-2 px-4 text-brewery-gold hover:text-brewery-primary transition-colors duration-200 cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
} 