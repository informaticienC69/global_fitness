import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── 4 photos de techniciens / installations fitness ──
const SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=85',
    caption: 'Installation sur site',
  },
  {
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=700&q=85',
    caption: 'Mise en service complète',
  },
  {
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=85',
    caption: 'Équipements professionnels',
  },
  {
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=700&q=85',
    caption: 'Salle prête à l\'emploi',
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 3.5 s
  useEffect(() => {
    const id = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { value: '500+', label: 'Clients Équipés' },
    { value: '100+', label: 'Produits Disponibles' },
    { value: '24h',  label: 'Livraison Dakar' },
    { value: '5★',   label: 'Avis Clients' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/70 z-0" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-[#F5A623]/8 blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#E8820C]/6 blur-[100px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20">

          {/* ── Left: Text ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="divider-brand" />
              <span className="eyebrow">Dakar, Sénégal · global_fit_sport</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-white mb-4"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', lineHeight: '0.95' }}
            >
              ÉQUIPEZ VOTRE<br />
              <span className="text-gradient italic font-black">ESPACE.</span><br />
              PERFORMEZ.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-body text-gray-300 text-base md:text-lg font-light leading-relaxed mb-3 max-w-xl"
            >
              <strong className="text-white font-600">Vente · Installation · Maintenance</strong>
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-body text-gray-400 text-sm leading-relaxed mb-10 max-w-xl"
            >
              Nous accompagnons particuliers et professionnels dans la création d'espaces fitness performants — de la sélection du matériel à la mise en service complète.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a href="#shop" id="hero-cta-shop" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
                Voir les produits
              </a>
              <a href="#contact" id="hero-cta-contact" className="btn-outline">
                Devis gratuit
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              {['Installation pro', 'SAV réactif', 'Techniciens certifiés', 'Devis gratuit'].map((b) => (
                <span key={b} className="flex items-center gap-1.5 text-[11px] font-body font-600 uppercase tracking-wider text-gray-400">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="3" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  {b}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Stats + Photo Carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex-shrink-0 lg:w-[360px] w-full flex flex-col gap-3"
          >
            {/* Stats grid 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="glass card-hover rounded-xl p-5 border border-white/5 text-center"
                >
                  <div className="font-display text-3xl font-black text-gradient mb-1">{s.value}</div>
                  <div className="font-body text-gray-400 text-[11px] uppercase tracking-[0.15em]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* ── Photo Carousel ── */}
            <div className="relative mt-1 rounded-2xl overflow-hidden border border-[#F5A623]/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              style={{ height: '230px' }}>

              {/* Sliding images */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={SLIDES[current].url}
                    alt={SLIDES[current].caption}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10 pointer-events-none" />

              {/* Gold top bar accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#F5A623] via-[#FFD080] to-[#E8820C] z-20" />

              {/* Bottom overlay: badge + caption */}
              <div className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 pt-8">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="relative w-2 h-2 flex-shrink-0">
                    <span className="block w-2 h-2 rounded-full bg-[#F5A623]" />
                    <span className="pulse-dot absolute inset-0 rounded-full bg-[#F5A623]" />
                  </div>
                  <span className="font-body text-[10px] font-700 uppercase tracking-[0.2em] text-[#F5A623]">
                    Techniciens Certifiés
                  </span>
                </div>
                {/* Caption */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`cap-${current}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.4 }}
                    className="font-display text-white text-sm uppercase tracking-wide font-bold leading-tight"
                  >
                    {SLIDES[current].caption}
                  </motion.p>
                </AnimatePresence>
                <p className="font-body text-gray-400 text-[10px] mt-0.5 uppercase tracking-[0.12em]">
                  Installation · Maintenance · SAV
                </p>
              </div>

              {/* Dots navigation */}
              <div className="absolute top-3 right-3 z-20 flex gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="focus:outline-none"
                    aria-label={`Photo ${i + 1}`}
                  >
                    <motion.div
                      animate={{
                        width: i === current ? 20 : 6,
                        backgroundColor: i === current ? '#F5A623' : 'rgba(255,255,255,0.3)',
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-1.5 rounded-full"
                    />
                  </button>
                ))}
              </div>

              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 z-20">
                <motion.div
                  key={`progress-${current}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.5, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                  className="h-full bg-gradient-to-r from-[#F5A623] to-[#FFD080]"
                />
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity cursor-pointer"
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        >
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
