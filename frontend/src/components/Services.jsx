import React, { useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// Hook-safe card component
const ServiceCard = ({ icon, title, desc, tag, delay }) => {
  const cardRef = useScrollReveal();

  return (
    <div
      ref={cardRef}
      className="animate-on-scroll glass card-hover rounded-xl p-7 border border-white/5 group relative overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Tag */}
      <span className="absolute top-5 right-5 text-[10px] font-body font-bold uppercase tracking-[0.15em] text-brand bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20">
        {tag}
      </span>

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand mb-6 transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_20px_rgba(230,57,70,0.3)]">
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-display text-xl text-white mb-3 group-hover:text-gradient transition-colors uppercase">{title}</h3>
      <p className="font-body text-gray-400 text-sm font-light leading-relaxed">{desc}</p>

      {/* Arrow link */}
      <div className="mt-6 flex items-center gap-2 text-brand text-xs font-body font-semibold uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
        <span>En savoir plus</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
    </div>
  );
};

const Services = () => {
  const headerRef = useScrollReveal();

  const disciplines = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <path d="M6 4v16M18 4v16M6 12h12M3 6h3M18 6h3M3 18h3M18 18h3"/>
        </svg>
      ),
      title: 'Musculation',
      desc: 'Plateaux équipés de machines professionnelles, poids libres et câbles. Pour sculpter chaque groupe musculaire.',
      tag: 'Force',
      delay: 0,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <circle cx="12" cy="5" r="2"/>
          <path d="M12 7v8M8 19h8M8 19l-2 2M16 19l2 2"/>
        </svg>
      ),
      title: 'Coaching Perso',
      desc: 'Un programme 100% sur-mesure créé par nos experts selon vos objectifs et votre niveau.',
      tag: 'Premium',
      delay: 80,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <rect x="3" y="8" width="18" height="9" rx="3"/>
          <path d="M6 8V5a2 2 0 012-2h8a2 2 0 012 2v3"/>
        </svg>
      ),
      title: 'Boxing',
      desc: 'Technique, cardio, sparring. Cours collectifs et entraînement individuel pour tous niveaux.',
      tag: 'Combat',
      delay: 160,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <path d="M12 2a9 9 0 100 18A9 9 0 0012 2z"/>
          <path d="M8 12l3 3 5-5"/>
        </svg>
      ),
      title: 'Nutrition',
      desc: 'Plans alimentaires personnalisés par nos coachs certifiés pour maximiser vos résultats.',
      tag: 'Bien-être',
      delay: 240,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
      title: 'Cardio & HIIT',
      desc: 'Séances haute intensité pour brûler les graisses et booster votre endurance cardiovasculaire.',
      tag: 'Énergie',
      delay: 320,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <path d="M4 12s2-4 8-4 8 4 8 4-2 4-8 4-8-4-8-4z"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      title: 'Mobilité & Récup',
      desc: 'Récupération active, prévention des blessures et amélioration durable de la flexibilité.',
      tag: 'Récupération',
      delay: 400,
    },
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 animate-on-scroll">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-brand" />
              <span className="eyebrow">Nos Disciplines</span>
            </div>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              TOUT CE DONT<br />
              <span className="text-gradient">VOUS AVEZ BESOIN</span>
            </h2>
          </div>
          <p className="text-gray-400 font-body text-sm font-light leading-relaxed max-w-sm">
            De la force brute au cardio explosif, chaque discipline est animée par des coachs certifiés avec une vision : vos résultats.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {disciplines.map((d, i) => (
            <ServiceCard key={i} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
