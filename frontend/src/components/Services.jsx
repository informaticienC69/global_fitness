import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

// ─── Service Card ──────────────────────────────────────
const ServiceCard = ({ icon, tag, title, desc, features, delay }) => {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className="animate-on-scroll glass rounded-2xl p-8 border border-white/6 group card-hover relative overflow-hidden flex flex-col"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5A623]/0 group-hover:from-[#F5A623]/5 to-transparent transition-all duration-500 pointer-events-none rounded-2xl" />

      {/* Tag */}
      <span className="self-start text-[10px] font-body font-bold uppercase tracking-[0.15em] text-[#F5A623] bg-[#F5A623]/10 border border-[#F5A623]/20 px-3 py-1 rounded-full mb-6">
        {tag}
      </span>

      {/* Icon */}
      <div className="w-16 h-16 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623] mb-6 group-hover:bg-[#F5A623] group-hover:text-black group-hover:border-transparent transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(245,166,35,0.4)]">
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-display text-white text-2xl uppercase font-bold mb-3 group-hover:text-[#F5A623] transition-colors">{title}</h3>
      <p className="font-body text-gray-400 text-sm font-light leading-relaxed mb-6 flex-1">{desc}</p>

      {/* Features list */}
      <ul className="space-y-2">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 font-body text-xs text-gray-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
};

// ─── Main Services Section ─────────────────────────────
const Services = () => {
  const headerRef = useScrollReveal();

  const services = [
    {
      tag: 'Étape 1',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-8 h-8">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
      ),
      title: 'Vente',
      desc: 'Nous proposons une large gamme d\'équipements fitness de qualité professionnelle pour particuliers, salles de sport, hôtels et résidences. Matériel neuf ou reconditionné, adapté à tous les budgets.',
      features: [
        'Haltères, barres, disques, racks',
        'Machines de musculation guidées',
        'Équipements cardio (tapis, vélos, rames)',
        'Accessoires et sols de protection',
        'Matériel neuf ou reconditionné',
      ],
      delay: 0,
    },
    {
      tag: 'Étape 2',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-8 h-8">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
        </svg>
      ),
      title: 'Installation',
      desc: 'Nos techniciens certifiés se déplacent chez vous pour un montage professionnel, rapide et sécurisé. De la réception du matériel à la mise en service complète de votre espace fitness.',
      features: [
        'Montage et assemblage sur site',
        'Agencement optimal de l\'espace',
        'Fixation murale et ancrage au sol',
        'Mise en service et tests de sécurité',
        'Intervention à Dakar et au Sénégal',
      ],
      delay: 100,
    },
    {
      tag: 'Étape 3',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="w-8 h-8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Maintenance & SAV',
      desc: 'Global Fit Sport assure l\'entretien régulier et la réparation de vos équipements pour prolonger leur durée de vie. Un support technique réactif pour éviter toute interruption de service.',
      features: [
        'Entretien préventif périodique',
        'Diagnostic et réparation rapide',
        'Remplacement de pièces d\'usure',
        'Contrats de maintenance disponibles',
        'Support technique réactif par WhatsApp',
      ],
      delay: 200,
    },
  ];

  const clients = [
    { label: 'Home Gym', icon: '🏠' },
    { label: 'Salle de Sport', icon: '🏋️' },
    { label: 'Hôtels', icon: '🏨' },
    { label: 'Entreprises', icon: '🏢' },
    { label: 'Résidences', icon: '🏗️' },
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="absolute left-1/2 top-1/3 w-[500px] h-[500px] -translate-x-1/2 rounded-full bg-[#F5A623]/3 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="animate-on-scroll text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="divider-brand" />
            <span className="eyebrow">Nos Services</span>
            <div className="divider-brand" />
          </div>
          <h2 className="font-display text-white mb-6" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            VOTRE SALLE DE SPORT,<br />
            <span className="text-gradient">PRÊTE À L'EMPLOI</span>
          </h2>
          <p className="font-body text-gray-400 text-base font-light leading-relaxed max-w-2xl mx-auto">
            Nous accompagnons <strong className="text-white">particuliers et professionnels</strong> dans la création d'espaces fitness performants —
            de la sélection du matériel à la mise en service complète.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>

        {/* Clients types */}
        <div className="glass rounded-2xl p-8 border border-white/6">
          <p className="text-center font-body text-gray-500 text-[11px] uppercase tracking-[0.2em] mb-6">Nous intervenons pour</p>
          <div className="flex flex-wrap justify-center gap-4">
            {clients.map((c, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-full px-5 py-2.5 font-body text-sm text-gray-300 hover:border-[#F5A623]/40 hover:text-[#F5A623] transition-all cursor-default">
                <span>{c.icon}</span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a href="#contact" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            Demander un devis gratuit
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
