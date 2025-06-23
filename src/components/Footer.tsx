"use client";

import React from 'react';
import { Instagram, Facebook, Twitter } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const socials = [
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
];

export default function Footer() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <footer
      ref={ref}
      className={`w-full py-6 bg-brewery-dark text-white text-center ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-lg font-semibold">&copy; {new Date().getFullYear()} Unplugged Brewery</div>
        <div className="flex gap-6">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-brewery-primary transition-colors"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
} 