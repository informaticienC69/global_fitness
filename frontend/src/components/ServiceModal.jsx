import React from 'react';

const ServiceModal = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col pt-28 pb-8 px-4 sm:px-6 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-300 my-auto flex-shrink-0">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all backdrop-blur-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* ── Left Column : Image ── */}
        <div className="md:w-1/2 relative bg-[#111] flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-full flex-shrink-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover absolute inset-0 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent md:hidden" />
          <div className="absolute top-5 left-5 text-xs font-body font-bold uppercase tracking-[0.12em] bg-brand text-white px-3 py-1.5 rounded-full shadow-[0_2px_15px_rgba(230,57,70,0.4)]">
            {service.tag}
          </div>
          {/* Icon overlay */}
          <div className="absolute bottom-5 left-5 w-14 h-14 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
            {service.icon}
          </div>
        </div>

        {/* ── Right Column : Details ── */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col relative">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className="font-display text-white text-3xl md:text-4xl uppercase font-bold leading-tight mb-6">
              {service.title}
            </h2>

            <div className="mb-8">
              <h3 className="text-white font-body font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E63946" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/>
                </svg>
                Pourquoi choisir ce programme ?
              </h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed mb-6">
                {service.fullDesc}
              </p>
              
              <h3 className="text-white font-body font-bold text-sm uppercase tracking-wider mb-3">Ce qui est inclus :</h3>
              <ul className="space-y-3 font-body text-xs text-gray-400">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <a
                href="#contact"
                onClick={onClose}
                className="w-full relative overflow-hidden group py-4 rounded-xl font-display uppercase font-bold tracking-wider transition-all duration-300 bg-white text-black hover:bg-gray-200 flex items-center justify-center gap-2"
              >
                Réserver une séance d'essai
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="transition-transform group-hover:translate-x-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
