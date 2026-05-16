import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { href: '#about',    label: 'Notre ADN' },
    { href: '#services', label: 'Disciplines' },
    { href: '#schedule', label: 'Planning' },
    { href: '#pricing',  label: 'Tarifs' },
    { href: '#contact',  label: 'Contact' },
  ];

  const socials = [
    {
      id: 'footer-instagram',
      label: 'Instagram',
      abbr: 'IG',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
        </svg>
      ),
    },
    {
      id: 'footer-facebook',
      label: 'Facebook',
      abbr: 'FB',
      href: '#',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
      ),
    },
    {
      id: 'footer-whatsapp',
      label: 'WhatsApp',
      abbr: 'WA',
      href: 'https://wa.me/221776669021',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative border-t border-white/6 z-10">
      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />

      <div className="glass py-16 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* ── Brand column ── */}
          <div className="md:col-span-5">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-9 h-9 rounded-md bg-brand-gradient flex items-center justify-center shadow-[0_0_12px_rgba(230,57,70,0.4)] flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M6 4v16M18 4v16M6 12h12M3 6h3M18 6h3M3 18h3M18 18h3"/>
                </svg>
              </div>
              <div className="font-display leading-none">
                <span className="text-xl font-black text-white tracking-wide">GLOBAL</span>
                <span className="text-xl font-light text-white/50 tracking-[0.08em] ml-1.5">FITNESS</span>
              </div>
            </a>

            <p className="font-body text-gray-400 text-sm font-light leading-relaxed mb-8 max-w-xs">
              L'écosystème fitness d'élite de Dakar. Coachs certifiés, équipements premium et une communauté de passionnés pour vous pousser plus loin.
            </p>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(s => (
                <a
                  key={s.id}
                  id={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 rounded-xl glass border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand/40 hover:bg-brand/10 transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Navigation ── */}
          <div className="md:col-span-3">
            <h4 className="font-body text-white text-[10px] font-700 uppercase tracking-[0.2em] mb-5">Navigation</h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-body text-gray-400 text-sm hover:text-white transition-colors relative group"
                  >
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-[2px] bg-brand rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact info ── */}
          <div className="md:col-span-4">
            <h4 className="font-body text-white text-[10px] font-700 uppercase tracking-[0.2em] mb-5">Nous trouver</h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <div className="font-body text-gray-400 text-sm font-light">
                  Dakar, Sénégal<br />
                  <span className="text-gray-500 text-xs">Quartier Almadies</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-brand flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <a href="tel:+221776669021" className="font-body text-gray-400 text-sm hover:text-white transition-colors">+221 77 666 90 21</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-brand flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                <a href="mailto:contact@globalfitness.sn" className="font-body text-gray-400 text-sm hover:text-white transition-colors">contact@globalfitness.sn</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                </svg>
                <div className="font-body text-gray-400 text-sm font-light">
                  Lun – Sam : 06h – 22h<br />
                  <span className="text-gray-500 text-xs">Dimanche : 10h – 20h</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="container mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-gray-600 text-xs">© {year} Global Fitness Sénégal · Tous droits réservés.</p>
          <p className="font-display italic text-sm text-gradient">Forge Your Legacy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
