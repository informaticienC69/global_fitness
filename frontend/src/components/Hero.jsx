import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Hero = () => {
  const revealRef = useScrollReveal();

  const stats = [
    { value: '500+', label: 'Membres Actifs' },
    { value: '8',    label: 'Disciplines' },
    { value: '12+',  label: 'Coachs Experts' },
    { value: '5★',   label: 'Note Moyenne' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/75 z-0" />

      {/* Red glow accent top-right */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-brand/10 blur-[120px] pointer-events-none z-0" />
      {/* Orange glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">

          {/* ── Left: Text content ── */}
          <div ref={revealRef} className="flex-1 animate-on-scroll">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8">
              <div className="divider-brand" />
              <span className="eyebrow">Dakar, Sénégal — Depuis 2020</span>
            </div>

            {/* Main headline */}
            <h1 className="font-display text-white mb-6" style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)', lineHeight: '0.95' }}>
              FORGEZ<br />
              <span className="text-gradient italic font-black">VOTRE</span><br />
              LÉGENDE
            </h1>

            <p className="font-body text-gray-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl">
              Global Fitness est bien plus qu'une salle. C'est un <strong className="text-white font-500">écosystème d'élite</strong> conçu pour transformer votre corps et votre mental — avec les meilleurs coachs de Dakar.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" id="hero-cta-free" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
                Séance d'Essai Gratuite
              </a>
              <a href="#services" id="hero-cta-discover" className="btn-outline">
                Découvrir
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

            {/* Open badge */}
            <div className="mt-3 glass rounded-xl p-4 border border-white/5 flex items-center gap-3">
              <div className="relative w-3 h-3 flex-shrink-0">
                <span className="block w-3 h-3 rounded-full bg-green-400" />
                <span className="pulse-dot absolute inset-0 rounded-full bg-green-400" />
              </div>
              <div className="font-body">
                <p className="text-white text-xs font-600">Ouvert Maintenant</p>
                <p className="text-gray-400 text-[11px]">Lun–Sam · 06:00 – 22:00</p>
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
