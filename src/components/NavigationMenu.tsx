import React from 'react';

interface NavLink {
  label: string;
  href: string;
  external: boolean;
}

interface NavigationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  navLinks: NavLink[];
}

export default function NavigationMenu({ open, setOpen, navLinks }: NavigationMenuProps) {
  return (
    <div>
      {/* Navigation Links */}
      <ul className={`nav-menu scroll-animate ${open ? 'nav-menu-open' : 'nav-menu-closed'}`}>
        {navLinks.map((link, idx) => (
          <li key={link.href} className={`nav-item ${open ? 'nav-item-visible' : 'nav-item-hidden'}`}>
            {link.external ? (
              <a
                href={link.href}
                className="nav-link touch-target mobile-optimized"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <a
                href={link.href}
                className="nav-link touch-target mobile-optimized"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Overlay */}
      {open && (
        <div 
          className="mobile-menu-overlay"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        .nav-menu {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          align-items: center;
          position: static;
          width: auto;
          background: transparent;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-item {
          list-style: none;
        }
        .nav-link {
          display: block;
          padding: 0.5rem 1rem;
          color: #d4af37;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 600;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, rgba(218, 165, 32, 0.1) 100%);
          opacity: 0;
          transition: opacity 0.2s ease;
          border-radius: 0.5rem;
        }
        .nav-link:hover::before {
          opacity: 1;
        }
        .nav-link:hover {
          color: #8b4513;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(218, 165, 32, 0.3);
        }
        @media (max-width: 768px) {
          .nav-menu {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 100vh;
            flex-direction: column;
            gap: 0;
            width: 100%;
            background: rgba(44, 24, 16, 0.95);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-top: 1px solid rgba(218, 165, 32, 0.3);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            max-height: 0;
            overflow: hidden;
            z-index: 50;
            transition: max-height 0.3s ease, padding 0.3s ease;
          }
          .nav-menu-open {
            max-height: 100vh;
            padding: 1rem 0;
          }
          .nav-menu-closed {
            max-height: 0;
            padding: 0;
          }
          .nav-item {
            width: 100%;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .nav-item-hidden {
            opacity: 0;
            transform: translateY(-10px);
            pointer-events: none;
          }
          .nav-item-visible {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
          }
          .nav-menu-open .nav-item:nth-child(1) { transition-delay: 0.1s; }
          .nav-menu-open .nav-item:nth-child(2) { transition-delay: 0.15s; }
          .nav-menu-open .nav-item:nth-child(3) { transition-delay: 0.2s; }
          .nav-link {
            padding: 1rem 2rem;
            border-radius: 0;
            font-size: 1.1rem;
            border-bottom: 1px solid rgba(218, 165, 32, 0.1);
          }
          .nav-link:last-child {
            border-bottom: none;
          }
          .nav-link::before {
            border-radius: 0;
          }
          .nav-link:hover {
            background: rgba(218, 165, 32, 0.1);
            transform: none;
            box-shadow: none;
          }
          .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.3);
            z-index: 40;
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);
          }
          .menu-open {
            overflow: hidden;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .nav-menu,
          .nav-item,
          .nav-link {
            transition-duration: 0.1s !important;
          }
        }
        .nav-link:focus {
          outline: 2px solid #d4af37;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
}