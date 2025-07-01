import React from 'react';

interface NavLink {
  label: string;
  href: string;
  external: boolean;
}

interface NavigationMenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  navLinks: NavLink[];
}

export default function NavigationMenu({ open, setOpen, isMobile, navLinks }: NavigationMenuProps) {
  return (
    <>
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
    </>
  );
} 