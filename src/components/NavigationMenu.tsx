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

export default function NavigationMenu({ navLinks }: NavigationMenuProps) {
  return (
    <nav>
      <ul className="nav-menu">
        {navLinks.map((link) => (
          <li key={link.href} className="nav-item">
            {link.external ? (
              <a
                href={link.href}
                className="nav-link touch-target mobile-optimized"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ) : (
              <a
                href={link.href}
                className="nav-link touch-target mobile-optimized"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <style jsx>{`
        .nav-menu {
          display: flex;
          flex-direction: row;
          gap: 2rem;
          align-items: center;
          position: static;
          width: auto;
          background: transparent;
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
        .nav-link:hover {
          color: #8b4513;
          background: rgba(218, 165, 32, 0.1);
        }
        .nav-link:focus {
          outline: 2px solid #d4af37;
          outline-offset: 2px;
        }
      `}</style>
    </nav>
  );
}