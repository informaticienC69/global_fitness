import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Hero = () => {
  const revealRef = useScrollReveal();

  const stats = [
    { value: '500+', label: 'Clients Satisfaits' },
    { value: '100+', label: 'Produits Disponibles' },
    { value: '24h',  label: 'Livraison Dakar' },
    { value: '5★',   label: 'Avis Clients' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/75 z-0" />

      {/* Orange glow accent top-right */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-brand/10 blur-[120px] pointer-events-none z-0" />
      {/* Glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">

          {/* ── Left: Text content ── */}
          <div ref={revealRef} className="flex-1 animate-on-scroll">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="divider-brand" />
              <span className="eyebrow">Dakar, Sénégal — Boutique en ligne</span>
            </div>

            {/* Main headline */}
            <h1 className="font-display text-white mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)', lineHeight: '0.95' }}>
              ÉQUIPEZ-VOUS.<br />
              <span className="text-gradient italic font-black">PERFORMEZ.</span>
            </h1>

            <p className="font-body text-gray-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
              La boutique fitness <strong className="text-white font-500">#1 au Sénégal</strong>. Haltères, racks, machines, accessoires — du matériel professionnel livré rapidement à Dakar et partout au Sénégal.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#shop" id="hero-cta-shop" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                Voir les produits
              </a>
              <a href="#contact" id="hero-cta-contact" className="btn-outline">
                Nous contacter
              </a>
            </div>
          </div>

          {/* ── Right: Stats grid ── */}
          <div className="flex-shrink-0 lg:w-80 w-full">
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="glass card-hover rounded-xl p-6 border border-white/5 text-center"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="font-display text-4xl font-black text-gradient mb-1">{s.value}</div>
                  <div className="font-body text-gray-400 text-[11px] uppercase tracking-[0.15em] font-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Livraison badge */}
            <div className="mt-3 glass rounded-xl p-4 border border-white/5 flex items-center gap-3">
              <div className="relative w-3 h-3 flex-shrink-0">
                <span className="block w-3 h-3 rounded-full bg-green-400" />
                <span className="pulse-dot absolute inset-0 rounded-full bg-green-400" />
              </div>
              <div className="font-body">
                <p className="text-white text-xs font-600">Livraison disponible</p>
                <p className="text-gray-400 text-[11px]">Dakar · Toutes régions du Sénégal</p>
              </div>
            </div>
          </div>

        </div>

        {/* ── Bottom scroll indicator ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-gray-400">Scroll</span>
          <svg className="w-4 h-4 text-gray-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
