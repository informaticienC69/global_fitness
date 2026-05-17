import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {

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
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">

          {/* ── Left: Text content ── */}
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
              className="font-display text-white mb-4" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', lineHeight: '0.95' }}
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

            {/* CTA buttons */}
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

            {/* Trust badges */}
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

            {/* Badge terrain */}
            <div className="mt-3 glass rounded-xl p-4 border border-[#F5A623]/15 flex items-center gap-3">
              <div className="relative w-3 h-3 flex-shrink-0">
                <span className="block w-3 h-3 rounded-full bg-[#F5A623]" />
                <span className="pulse-dot absolute inset-0 rounded-full bg-[#F5A623]" />
              </div>
              <div className="font-body">
                <p className="text-white text-xs font-600">Techniciens disponibles</p>
                <p className="text-gray-400 text-[11px]">Dakar · Toutes régions du Sénégal</p>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity cursor-pointer"
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>
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
