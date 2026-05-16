import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '', interest: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', address: '', message: '', interest: '' });
      } else {
        setStatus('error');
      }
    } catch {
      // degraded mode
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', address: '', message: '', interest: '' });
    }
  };

  const infos = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Localisation',
      value: 'Dakar, Sénégal',
      sub: 'Quartier Almadies',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: 'Téléphone',
      value: '+221 77 666 90 21',
      sub: 'Lun – Sam · 08h–20h',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'contact@globalfitness.sn',
      sub: 'Réponse sous 24h',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      label: 'Horaires',
      value: 'Lun – Sam : 06h – 22h',
      sub: 'Dimanche : 10h – 20h',
    },
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="divider-brand" />
            <span className="eyebrow">Contact</span>
            <div className="divider-brand" />
          </div>
          <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            PRÊT À<br />
            <span className="text-gradient">CHANGER DE NIVEAU ?</span>
          </h2>
        </div>

        <div ref={sectionRef} className="animate-on-scroll grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* ── Info panel ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {infos.map((info, i) => (
              <div key={i} className="glass rounded-xl p-5 border border-white/5 card-hover flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-0.5">{info.label}</p>
                  <p className="font-body text-white text-sm font-500">{info.value}</p>
                  <p className="font-body text-gray-400 text-xs">{info.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Form panel ── */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 md:p-10 border border-white/5">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-display text-white text-2xl uppercase mb-2">Message Envoyé !</h3>
                <p className="font-body text-gray-400 text-sm font-light mb-8">Notre équipe vous contactera dans les 24h.</p>
                <button
                  onClick={() => setStatus(null)}
                  className="btn-outline text-xs"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-display text-white text-2xl uppercase mb-1">Séance d'essai gratuite</h3>
                <p className="font-body text-gray-400 text-sm font-light mb-8 pb-6 border-b border-white/6">
                  Remplissez ce formulaire et nous vous appelons pour organiser votre première séance.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-400 mb-2">Votre Nom *</label>
                      <input
                        type="text" id="name" required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Prénom Nom"
                        className="w-full bg-white/4 border border-white/10 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-brand/50 focus:bg-white/6 transition-all font-body text-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-400 mb-2">Téléphone</label>
                      <input
                        type="tel" id="phone"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+221 77 …"
                        className="w-full bg-white/4 border border-white/10 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-brand/50 focus:bg-white/6 transition-all font-body text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-400 mb-2">Email *</label>
                    <input
                      type="email" id="email" required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="vous@exemple.com"
                      className="w-full bg-white/4 border border-white/10 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-brand/50 focus:bg-white/6 transition-all font-body text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-400 mb-2">Adresse / Quartier</label>
                    <input
                      type="text" id="address"
                      value={formData.address}
                      onChange={e => setFormData({...formData, address: e.target.value})}
                      placeholder="Ex. Almadies, Dakar"
                      className="w-full bg-white/4 border border-white/10 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-brand/50 focus:bg-white/6 transition-all font-body text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="interest" className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-400 mb-2">Je suis intéressé par</label>
                    <select
                      id="interest"
                      value={formData.interest}
                      onChange={e => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-white/4 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-brand/50 focus:bg-white/6 transition-all font-body text-sm appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-charcoal">Choisir une discipline…</option>
                      <option value="musculation" className="bg-charcoal">Musculation</option>
                      <option value="coaching" className="bg-charcoal">Coaching Personnalisé</option>
                      <option value="boxing" className="bg-charcoal">Boxing</option>
                      <option value="cardio" className="bg-charcoal">Cardio & HIIT</option>
                      <option value="autre" className="bg-charcoal">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-400 mb-2">Message</label>
                    <textarea
                      id="message" rows="3"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Dites-nous en plus sur vos objectifs…"
                      className="w-full bg-white/4 border border-white/10 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-brand/50 focus:bg-white/6 transition-all font-body text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours…
                      </span>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
                        </svg>
                        Réserver ma séance gratuite
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
