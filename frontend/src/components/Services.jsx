import React, { useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ServiceModal from './ServiceModal';

// Hook-safe card component
const ServiceCard = ({ icon, title, desc, tag, delay, onLearnMore }) => {
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
      <button 
        onClick={onLearnMore}
        className="mt-6 flex items-center gap-2 text-brand text-xs font-body font-semibold uppercase tracking-[0.12em] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 cursor-pointer w-full text-left focus:outline-none"
      >
        <span>En savoir plus</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  );
};

const Services = () => {
  const headerRef = useScrollReveal();
  const [selectedService, setSelectedService] = useState(null);

  const disciplines = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-7 h-7">
          <path d="M6 4v16M18 4v16M6 12h12M3 6h3M18 6h3M3 18h3M18 18h3"/>
        </svg>
      ),
      title: 'Musculation',
      desc: 'Plateaux équipés de machines professionnelles, poids libres et câbles. Pour sculpter chaque groupe musculaire.',
      fullDesc: 'Notre espace musculation est conçu pour répondre aux exigences des débutants comme des athlètes confirmés. Nous mettons à votre disposition une gamme complète d\'équipements biomécaniques de pointe et de charges libres.',
      benefits: [
        'Machines guidées dernière génération (Leg Press, Hack Squat, etc.)',
        'Zone haltères allant de 2 kg à 60 kg',
        'Plateformes d\'haltérophilie avec dalles amortissantes',
        'Cages à squat et racks de développé couché professionnels'
      ],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
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
      fullDesc: 'Atteignez vos objectifs plus rapidement avec un accompagnement individuel. Nos personal trainers certifiés analysent votre métabolisme, votre posture et votre style de vie pour concevoir un plan d\'action exclusif.',
      benefits: [
        'Bilan initial complet (InBody, mensurations, tests de force)',
        'Programme d\'entraînement évolutif sur 12 semaines',
        'Suivi technique permanent pour éviter les blessures',
        'Motivation et ajustement des charges en temps réel'
      ],
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
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
      fullDesc: 'Que ce soit pour vous défouler, apprendre les techniques de frappe ou préparer un combat, notre zone de boxe équipée vous accueille. Un entraînement intense combinant coordination, vitesse et endurance cardio-vasculaire.',
      benefits: [
        'Sacs de frappe lourds et poires de vitesse',
        'Cours encadrés par des combattants professionnels',
        'Travail aux paos (pattes d\'ours) pour la réactivité',
        'Ring d\'entraînement homologué pour le sparring sécurisé'
      ],
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80',
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
      fullDesc: 'L\'entraînement ne représente que 30% des résultats. Nos experts en diététique sportive vous aident à structurer vos repas pour nourrir vos muscles, perdre de la graisse et maximiser votre niveau d\'énergie quotidien.',
      benefits: [
        'Analyse de vos habitudes alimentaires actuelles',
        'Création d\'un plan nutritionnel réaliste et adapté',
        'Conseils sur la supplémentation (protéines, vitamines)',
        'Recettes saines et faciles à préparer pour le quotidien'
      ],
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
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
      fullDesc: 'Boostez votre métabolisme de base avec nos circuits Training et nos équipements cardio dernière génération. Le High Intensity Interval Training (HIIT) est la méthode la plus rapide pour améliorer votre souffle et sécher.',
      benefits: [
        'Tapis de course, vélos elliptiques, rameurs et Air Bikes',
        'Cours collectifs dynamiques en musique',
        'Exercices au poids de corps et plyométrie',
        'Moniteurs de fréquence cardiaque connectés disponibles'
      ],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
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
      fullDesc: 'La récupération est la clé pour durer. Notre espace dédié à la mobilité vous permet de relâcher les tensions musculaires, d\'améliorer votre souplesse articulaire et de retrouver un corps sans douleur.',
      benefits: [
        'Cours de stretching et yoga pour sportifs',
        'Mise à disposition de Foam Rollers (rouleaux de massage)',
        'Ateliers d\'automassage myofascial',
        'Espace calme et relaxant favorisant la détente nerveuse'
      ],
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80',
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
            <ServiceCard key={i} {...d} onLearnMore={() => setSelectedService(d)} />
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceModal service={selectedService} onClose={() => setSelectedService(null)} />
      )}
    </section>
  );
};

export default Services;
