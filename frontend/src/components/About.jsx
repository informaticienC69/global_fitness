import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const textRef = useScrollReveal();
  const imgRef  = useScrollReveal({ threshold: 0.2 });

  const values = [
    { icon: '🏆', label: 'Qualité Professionnelle', desc: 'Chaque produit est sélectionné parmi les meilleures marques mondiales d\'équipements fitness.' },
    { icon: '🚚', label: 'Livraison Rapide',        desc: 'Livraison sous 24h à Dakar et partout au Sénégal. Suivi de commande en temps réel.' },
    { icon: '🎯', label: 'Conseil Expert',           desc: 'Notre équipe vous guide pour choisir le matériel adapté à vos objectifs et votre budget.' },
  ];

  return (
    <section id="about" className="relative py-32">
      {/* Subtle glow left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* ── Image Side ── */}
          <div ref={imgRef} className="animate-bascule lg:w-5/12 w-full relative flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80"
                alt="Équipements fitness Global Fit Sport"
                className="w-full h-[520px] object-cover"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Bottom label on image */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 border border-white/10 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-white text-sm font-bold uppercase tracking-wide">Matériel Certifié</p>
                    <p className="font-body text-gray-400 text-[11px] uppercase tracking-[0.12em]">Qualité pro · Garantie constructeur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -top-6 -right-6 glass rounded-xl p-5 border border-white/8 shadow-2xl text-center">
              <div className="font-display text-3xl font-black text-gradient">98%</div>
              <div className="font-body text-gray-400 text-[10px] uppercase tracking-[0.15em] mt-1">Clients<br/>satisfaits</div>
            </div>
          </div>

          {/* ── Text Side ── */}
          <div ref={textRef} className="animate-on-scroll lg:w-7/12 w-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-brand" />
              <span className="eyebrow">À propos de nous</span>
            </div>

            <h2 className="font-display text-white mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1' }}>
              SPÉCIALISTE FITNESS<br />
              <span className="text-gradient">AU SÉNÉGAL</span><br />
              DEPUIS 2020
            </h2>

            <p className="font-body text-gray-300 text-base font-light leading-relaxed mb-5">
              <strong className="text-white font-500">Global Fit Sport</strong> est la boutique en ligne de référence pour l'achat d'équipements fitness et de musculation au Sénégal. Basée à Dakar, nous proposons une sélection rigoureuse de matériel professionnel.
            </p>
            <p className="font-body text-gray-400 text-base font-light leading-relaxed mb-10">
              Haltères, barres olympiques, machines de musculation, équipements cardio, accessoires — tout ce qu'il faut pour équiper votre salle à domicile ou votre gym professionnel, livré directement chez vous.
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((v, i) => (
                <div key={i} className="flex items-start gap-4 p-4 glass rounded-xl border border-white/5 card-hover">
                  <div className="text-xl flex-shrink-0 mt-0.5">{v.icon}</div>
                  <div>
                    <h4 className="font-display text-white text-base font-bold uppercase tracking-wide mb-0.5">{v.label}</h4>
                    <p className="font-body text-gray-400 text-sm font-light">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <a href="#shop" className="btn-primary">Voir la boutique</a>
              <a href="#contact" className="btn-outline">Nous contacter</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
