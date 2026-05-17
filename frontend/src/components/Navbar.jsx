import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, toggleDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '#',        label: 'Accueil' },
    { href: '#shop',    label: 'Boutique' },
    { href: '#about',   label: 'À propos' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-3 shadow-[0_4px_30px_rgba(0,0,0,0.6)]' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
        <a href="#" className="flex items-center gap-2.5 group select-none flex-shrink-0">
          <div className="w-8 h-8 rounded-md bg-brand-gradient flex items-center justify-center shadow-[0_0_12px_rgba(230,57,70,0.5)] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M6 4v16M18 4v16M6 12h12M3 6h3M18 6h3M3 18h3M18 18h3"/>
            </svg>
          </div>
          <div className="font-display leading-none">
            <span className="text-lg font-black text-white tracking-wide">GLOBAL</span>
            <span className="text-lg font-light text-white/60 tracking-[0.06em] ml-1">FIT SPORT</span>
          </div>
        </a>

        <nav className="hidden md:flex gap-5 items-center">
          {links.map(link => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white font-body text-xs font-600 uppercase tracking-[0.15em] transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-gradient rounded-full transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <div className="flex items-center gap-4 ml-4">
            <button onClick={toggleDrawer} className="relative text-gray-300 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>
              )}
            </button>
            <a href="#shop" className="btn-primary py-2.5 px-6 text-[11px]">Voir la boutique</a>
          </div>
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleDrawer} className="relative text-white">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{totalItems}</span>
            )}
          </button>
          <button id="mobile-menu-btn" className="text-white focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h10M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-white/5 py-6">
          <nav className="flex flex-col items-center gap-5 px-6">
            {links.map(link => (
              <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className="text-gray-200 hover:text-white font-body text-sm uppercase tracking-[0.15em] font-500 transition-colors w-full text-center py-2">
                {link.label}
              </a>
            ))}
            <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full mt-2 text-center">
              Voir la boutique
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
