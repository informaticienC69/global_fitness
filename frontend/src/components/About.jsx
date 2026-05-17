import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

const TECHNICIAN_IMAGES = [
  '/images/technicians/tech-1.png',
  '/images/technicians/tech-2.png',
  '/images/technicians/tech-3.png',
  '/images/technicians/tech-4.png',
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TECHNICIAN_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] bg-[#111] overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={index}
          src={TECHNICIAN_IMAGES[index]}
          alt={`Intervention Global Fit Sport ${index + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none z-0" />

      {/* Indicators */}
      <div className="absolute top-4 right-4 flex gap-1.5 z-10">
        {TECHNICIAN_IMAGES.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className="p-1 cursor-pointer">
            <div className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-[#F5A623] shadow-[0_0_10px_rgba(245,166,35,0.5)]' : 'w-2 bg-white/30 hover:bg-white/50'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  const textRef = useScrollReveal();
  const imgRef  = useScrollReveal({ threshold: 0.2 });

  const values = [
    { icon: '🏆', label: 'Qualité Professionnelle', desc: 'Matériel sélectionné parmi les meilleures marques mondiales. Adapté aux salles pro, hôtels et home gyms.' },
    { icon: '🔧', label: 'Installation & Expertise', desc: 'Nos techniciens certifiés installent et configurent vos équipements sur site pour une mise en service parfaite.' },
    { icon: '🛡️', label: 'Maintenance & Durabilité', desc: 'Un suivi après-vente réactif pour prolonger la durée de vie de vos équipements et éviter toute interruption.' },
  ];

  return (
    <section id="about" className="relative py-32">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#F5A623]/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* ── Image Side ── */}
          <div ref={imgRef} className="animate-bascule lg:w-5/12 w-full relative flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <ImageSlider />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass rounded-xl p-4 border border-[#F5A623]/20 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F0F0F" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-white text-sm font-bold uppercase tracking-wide">Techniciens Certifiés</p>
                    <p className="font-body text-gray-400 text-[11px] uppercase tracking-[0.12em]">Installation · Maintenance · SAV</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 glass rounded-xl p-5 border border-[#F5A623]/20 shadow-2xl text-center">
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
              <strong className="text-white font-500">Global Fit Sport</strong> est votre partenaire de confiance pour l'équipement, l'installation et la maintenance de vos espaces fitness au Sénégal. Nous intervenons pour les particuliers, les salles de sport, les hôtels et les entreprises.
            </p>
            <p className="font-body text-gray-400 text-base font-light leading-relaxed mb-10">
              Nos techniciens se déplacent chez vous pour un montage professionnel et sécurisé. De la sélection du matériel à la mise en service complète — <strong className="text-[#F5A623]">un accompagnement de A à Z.</strong>
            </p>

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
              <a href="#services" className="btn-primary">Nos services</a>
              <a href="#contact" className="btn-outline">Devis gratuit</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
