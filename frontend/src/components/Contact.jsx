import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Contact = () => {
  const sectionRef = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', interest: '', message: '' });
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
        setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', interest: '', message: '' });
    }
  };

  const contactItems = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1.27h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: 'WhatsApp / Appel',
      value: '+221 77 666 90 21',
      href: 'https://wa.me/221776669021',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: 'Email',
      value: 'contact@globalfitsport.sn',
      href: 'mailto:contact@globalfitsport.sn',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: 'Localisation',
      value: 'Dakar, Sénégal',
      href: '#',
    },
  ];

  const interests = [
    'Achat d\'équipement',
    'Installation sur site',
    'Maintenance & SAV',
    'Devis salle de sport',
    'Devis home gym',
    'Autre',
  ];

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full bg-[#F5A623]/4 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-3 mb-5">
            <div className="divider-brand" />
            <span className="eyebrow">Contact</span>
            <div className="divider-brand" />
          </div>
          <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
            DEMANDEZ VOTRE<br />
            <span className="text-gradient">DEVIS GRATUIT</span>
          </h2>
          <p className="font-body text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
            Notre équipe vous répond sous 24h pour vous proposer une solution adaptée à votre projet.
          </p>
        </div>

        <div ref={sectionRef} className="animate-on-scroll grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">

          {/* ── Left: Contact info ── */}
          <div className="lg:col-span-2 flex flex-col gap-4 justify-start">
            {contactItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="glass rounded-2xl p-5 border border-white/6 card-hover flex items-center gap-4 group"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623] flex-shrink-0 group-hover:bg-[#F5A623] group-hover:text-black transition-all duration-300">
                  {item.icon}
                </div>
                <div>
                  <p className="font-body text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-1">{item.label}</p>
                  <p className="font-body text-white text-sm font-500">{item.value}</p>
                </div>
              </a>
            ))}

            {/* Instagram CTA */}
            <a
              href="https://instagram.com/global_fit_sport"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 border border-[#F5A623]/15 flex items-center gap-4 hover:border-[#F5A623]/40 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center flex-shrink-0 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5 text-pink-400">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </div>
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.15em] text-gray-500 mb-1">Instagram</p>
                <p className="font-body text-white text-sm font-500">@global_fit_sport</p>
              </div>
            </a>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3 glass rounded-2xl p-8 border border-white/6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5A623]/3 rounded-full blur-[80px] pointer-events-none" />

            {status === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-display text-white text-2xl uppercase mb-3">Message Envoyé !</h3>
                <p className="font-body text-gray-400 text-sm mb-8">Notre équipe vous contactera dans les 24h.</p>
                <button onClick={() => setStatus(null)} className="btn-outline text-xs">
                  Nouveau message
                </button>
              </div>
            ) : (
              <div className="relative z-10">
                <h3 className="font-display text-white text-2xl uppercase mb-1">Votre projet</h3>
                <p className="font-body text-gray-500 text-sm mb-7 pb-6 border-b border-white/6">
                  Dites-nous en plus, nous vous rappelons rapidement.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-500 mb-2">Nom complet *</label>
                      <input
                        type="text" required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        placeholder="Prénom Nom"
                        className="w-full bg-white/3 border border-white/8 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/5 transition-all font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-500 mb-2">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+221 77 …"
                        className="w-full bg-white/3 border border-white/8 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/5 transition-all font-body text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-500 mb-2">Email *</label>
                    <input
                      type="email" required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="vous@exemple.com"
                      className="w-full bg-white/3 border border-white/8 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/5 transition-all font-body text-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-500 mb-2">Je suis intéressé par</label>
                    <select
                      value={formData.interest}
                      onChange={e => setFormData({...formData, interest: e.target.value})}
                      className="w-full bg-[#1A1A1A] border border-white/8 text-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5A623]/50 transition-all font-body text-sm appearance-none cursor-pointer"
                    >
                      <option value="">Sélectionnez un service…</option>
                      {interests.map(opt => (
                        <option key={opt} value={opt} className="bg-[#1A1A1A]">{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-body text-[10px] font-700 uppercase tracking-[0.15em] text-gray-500 mb-2">Votre projet</label>
                    <textarea
                      rows="3"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      placeholder="Décrivez votre projet : type d'espace, surface, budget estimé…"
                      className="w-full bg-white/3 border border-white/8 text-white placeholder-gray-600 px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5A623]/50 focus:bg-white/5 transition-all font-body text-sm resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs font-body bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      Une erreur s'est produite. Réessayez ou contactez-nous via WhatsApp.
                    </p>
                  )}

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <span className="flex items-center gap-2 justify-center">
                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Envoi en cours…
                      </span>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
                        </svg>
                        Envoyer ma demande
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
