import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const textRef = useScrollReveal();
  const imgRef  = useScrollReveal({ threshold: 0.2 });

  const values = [
    { icon: '⚡', label: 'Performance', desc: 'Chaque programme est conçu pour des résultats mesurables.' },
    { icon: '🎯', label: 'Précision',   desc: 'Un suivi individualisé à chaque étape de votre progression.' },
    { icon: '🤝', label: 'Communauté', desc: 'Une famille de passionnés qui se poussent mutuellement.' },
  ];

  return (
    <section id="about" className="relative py-32">
      {/* Subtle red glow left */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand/6 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* ── Image Side ── */}
          <div ref={imgRef} className="animate-bascule lg:w-5/12 w-full relative flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              <img
                src="/paul.jpeg"
                alt="Global Fitness Head Coach"
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
                    <p className="font-display text-white text-sm font-bold uppercase tracking-wide">Head Coach Certifié</p>
                    <p className="font-body text-gray-400 text-[11px] uppercase tracking-[0.12em]">15 ans d'expérience • Ex-compétiteur</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -top-6 -right-6 glass rounded-xl p-5 border border-white/8 shadow-2xl text-center">
              <div className="font-display text-3xl font-black text-gradient">98%</div>
              <div className="font-body text-gray-400 text-[10px] uppercase tracking-[0.15em] mt-1">Taux de<br/>satisfaction</div>
            </div>
          </div>

          {/* ── Text Side ── */}
          <div ref={textRef} className="animate-on-scroll lg:w-7/12 w-full">
            <div className="flex items-center gap-3 mb-5">
              <div className="divider-brand" />
              <span className="eyebrow">Notre ADN</span>
            </div>

            <h2 className="font-display text-white mb-8" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: '1' }}>
              L'EXCELLENCE<br />
              <span className="text-gradient">AU CŒUR DE</span><br />
              DAKAR
            </h2>

            <p className="font-body text-gray-300 text-base font-light leading-relaxed mb-5">
              Fondé à Dakar, <strong className="text-white font-500">Global Fitness</strong> est né d'une conviction simple : chaque personne mérite un accompagnement d'élite, quelle que soit son point de départ.
            </p>
            <p className="font-body text-gray-400 text-base font-light leading-relaxed mb-10">
              Nos coachs certifiés combinent expertise scientifique et passion du terrain pour vous offrir des résultats concrets, durables et mesurables — dans un environnement premium et bienveillant.
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
              <a href="#contact" className="btn-primary">Nous rejoindre</a>
              <a href="#services" className="btn-outline">Voir les disciplines</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
