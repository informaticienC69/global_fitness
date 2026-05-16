import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Pricing = () => {
  const sectionRef = useScrollReveal();
  const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'

  const plans = [
    {
      name: 'Accès Libre',
      badge: null,
      price: { monthly: '40 000', yearly: '32 000' },
      desc: 'Accès total au plateau. Idéal pour les pratiquants autonomes.',
      features: [
        'Plateau musculation Lun–Sam',
        'Espace poids libres & machines',
        'Vestiaires premium',
        'Suivi mensuel rapide',
        'Application mobile',
      ],
      cta: 'Commencer',
      highlighted: false,
    },
    {
      name: 'Coaching Premium',
      badge: 'Plus populaire',
      price: { monthly: '150 000', yearly: '120 000' },
      desc: 'L\'expertise de nos coachs à votre service exclusif.',
      features: [
        'Accès Libre inclus',
        '3 séances privées / semaine',
        'Plan nutritionnel sur-mesure',
        'Suivi biométrique mensuel',
        'Espace détente & récupération',
        'Accès cours collectifs',
      ],
      cta: 'Rejoindre l\'élite',
      highlighted: true,
    },
    {
      name: 'Boxing Club',
      badge: null,
      price: { monthly: '60 000', yearly: '48 000' },
      desc: 'Plongez dans l\'intensité des sports de combat.',
      features: [
        'Tous cours boxing inclus',
        'Technique & sparring',
        'Cardio intensif',
        'Équipement fourni',
        'Sans engagement',
      ],
      cta: 'Monter sur le ring',
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-32 relative">
      {/* Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand/6 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="divider-brand" />
            <span className="eyebrow">Nos Offres</span>
            <div className="divider-brand" />
          </div>
          <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            INVESTISSEZ DANS<br />
            <span className="text-gradient">VOTRE POTENTIEL</span>
          </h2>
          <p className="font-body text-gray-400 text-sm font-light max-w-md mx-auto">
            Des offres transparentes, sans frais cachés. Engagement flexible.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 mt-8 glass rounded-full p-1.5 border border-white/8">
            <button
              id="pricing-toggle-monthly"
              onClick={() => setBilling('monthly')}
              className={`px-5 py-2 rounded-full text-xs font-body font-700 uppercase tracking-[0.12em] transition-all duration-300 ${billing === 'monthly' ? 'bg-brand-gradient text-white shadow-[0_2px_12px_rgba(230,57,70,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Mensuel
            </button>
            <button
              id="pricing-toggle-yearly"
              onClick={() => setBilling('yearly')}
              className={`px-5 py-2 rounded-full text-xs font-body font-700 uppercase tracking-[0.12em] transition-all duration-300 ${billing === 'yearly' ? 'bg-brand-gradient text-white shadow-[0_2px_12px_rgba(230,57,70,0.4)]' : 'text-gray-400 hover:text-white'}`}
            >
              Annuel &nbsp;<span className="text-green-400 normal-case tracking-normal font-500">–20%</span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div ref={sectionRef} className="animate-on-scroll grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-500 card-hover ${
                plan.highlighted
                  ? 'glass-brand border border-brand/25 shadow-[0_20px_60px_rgba(230,57,70,0.15)] lg:scale-105 z-10'
                  : 'glass border border-white/6'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-gradient text-white text-[10px] font-body font-800 uppercase tracking-[0.18em] px-4 py-1.5 rounded-full shadow-[0_4px_15px_rgba(230,57,70,0.4)] whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <h3 className={`font-display text-2xl font-black uppercase mb-2 ${plan.highlighted ? 'text-gradient' : 'text-white'}`}>
                {plan.name}
              </h3>
              <p className="font-body text-gray-400 text-sm font-light mb-7 min-h-[40px]">{plan.desc}</p>

              {/* Price */}
              <div className="mb-7 pb-7 border-b border-white/8">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-5xl font-black text-white">{plan.price[billing]}</span>
                  <span className="font-body text-gray-500 text-xs uppercase tracking-widest ml-1">FCFA/mois</span>
                </div>
                {billing === 'yearly' && (
                  <p className="font-body text-green-400 text-xs mt-1.5">Économisez avec l'abonnement annuel</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3.5 mb-9">
                {plan.features.map((feat, j) => (
                  <li key={j} className="flex items-center gap-3 font-body text-sm text-gray-300 font-light">
                    <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlighted ? 'text-brand' : 'text-gray-500'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                id={`pricing-cta-${i}`}
                className={`w-full py-3.5 rounded-xl text-sm font-body font-700 uppercase tracking-[0.12em] transition-all ${
                  plan.highlighted
                    ? 'bg-brand-gradient text-white shadow-[0_4px_20px_rgba(230,57,70,0.35)] hover:shadow-[0_6px_30px_rgba(230,57,70,0.5)] hover:-translate-y-0.5'
                    : 'border border-white/12 text-white hover:border-brand hover:text-brand hover:bg-brand/8'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center font-body text-gray-500 text-xs mt-10 uppercase tracking-[0.1em]">
          Tous les abonnements incluent l'accès aux vestiaires & douches premium · Sans frais d'inscription
        </p>
      </div>
    </section>
  );
};

export default Pricing;
