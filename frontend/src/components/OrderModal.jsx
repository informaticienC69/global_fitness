import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const OrderModal = ({ onClose, onSuccess }) => {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm]     = useState({ name: '', email: '', phone: '', address: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const fmt = (n) => Number(n).toLocaleString('fr-SN') + ' FCFA';

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            id: i.id, name: i.name, price: i.price, qty: i.qty,
          })),
          total: totalPrice,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        onSuccess({ orderId: data.orderId, email: form.email, message: data.message });
      } else {
        // Affiche le détail technique (data.details) en plus du message générique
        // pour faciliter le debug en production (Vercel)
        const detail = data.details ? ` — ${data.details}` : '';
        const codeStr = data.code ? ` [${data.code}]` : '';
        setError((data.error || 'Erreur lors de la commande.') + detail + codeStr);
      }
    } catch (err) {
      setError('Impossible de joindre le serveur. Vérifiez votre connexion. ' + (err?.message || ''));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col pt-28 pb-8 px-4 sm:px-6 overflow-y-auto"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row relative animate-in fade-in zoom-in-95 duration-300 my-auto flex-shrink-0">
        
        {/* Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* ── Left Column : Order Summary ── */}
        <div className="md:w-[40%] bg-[#111] p-8 md:p-10 border-b md:border-b-0 md:border-r border-white/5 flex flex-col relative overflow-hidden">
          {/* Subtle gradient glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <div className="mb-8">
              <h2 className="font-display text-white text-2xl uppercase tracking-wider mb-2">Récapitulatif</h2>
              <p className="font-body text-gray-400 text-sm">{items.length} article{items.length > 1 ? 's' : ''} dans le panier</p>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar max-h-[30vh] md:max-h-none">
              {items.map((i) => (
                <div key={i.id} className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden flex-shrink-0">
                    <img src={i.image} alt={i.name} className="w-full h-full object-cover" onError={e => e.target.style.display='none'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-white text-xs font-500 truncate">{i.name}</p>
                    <p className="font-body text-gray-500 text-[10px] mt-0.5">Qté : {i.qty}</p>
                  </div>
                  <div className="font-display text-white text-sm">
                    {fmt(i.price * i.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="font-body text-gray-400 text-sm">Sous-total</span>
                <span className="font-body text-white text-sm">{fmt(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-body text-gray-400 text-sm">Livraison</span>
                <span className="font-body text-gray-500 text-xs italic">À déterminer</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="font-display text-white text-lg uppercase tracking-wider">Total</span>
                <span className="font-display text-brand text-2xl font-black">{fmt(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Column : Checkout Form ── */}
        <div className="md:w-[60%] p-8 md:p-10 flex flex-col justify-center">
          <h2 className="font-display text-white text-3xl uppercase tracking-widest mb-2">Paiement</h2>
          <p className="font-body text-gray-400 text-sm mb-8">Saisissez vos informations pour finaliser la commande.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-5">
              {/* Name */}
              <div className="relative">
                <input
                  type="text" id="name" name="name" required
                  value={form.name} onChange={handleChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 text-white px-0 py-2 placeholder-transparent focus:outline-none focus:border-brand transition-colors font-body text-base"
                  placeholder="Nom complet"
                />
                <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-gray-500 font-body uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand">Nom complet *</label>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                  <input
                    type="email" id="email" name="email" required
                    value={form.email} onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-white/10 text-white px-0 py-2 placeholder-transparent focus:outline-none focus:border-brand transition-colors font-body text-base"
                    placeholder="Email"
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-xs text-gray-500 font-body uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand">Email *</label>
                </div>

                <div className="relative">
                  <input
                    type="tel" id="phone" name="phone" required
                    value={form.phone} onChange={handleChange}
                    className="peer w-full bg-transparent border-b-2 border-white/10 text-white px-0 py-2 placeholder-transparent focus:outline-none focus:border-brand transition-colors font-body text-base"
                    placeholder="Téléphone"
                  />
                  <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-gray-500 font-body uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand">Téléphone *</label>
                </div>
              </div>

              {/* Address */}
              <div className="relative">
                <input
                  type="text" id="address" name="address" required
                  value={form.address} onChange={handleChange}
                  className="peer w-full bg-transparent border-b-2 border-white/10 text-white px-0 py-2 placeholder-transparent focus:outline-none focus:border-brand transition-colors font-body text-base"
                  placeholder="Adresse de livraison"
                />
                <label htmlFor="address" className="absolute left-0 -top-3.5 text-xs text-gray-500 font-body uppercase tracking-wider transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-600 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-brand">Adresse de livraison *</label>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl font-body break-words">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full relative overflow-hidden group bg-white text-black font-display uppercase font-bold tracking-wider py-4 rounded-xl mt-4 transition-transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-brand translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black/30 border-t-black group-hover:border-white/30 group-hover:border-t-white rounded-full animate-spin" />
                    Traitement...
                  </>
                ) : (
                  <>Valider la commande</>
                )}
              </span>
            </button>
            <p className="text-center font-body text-gray-500 text-[11px] mt-4">
              Paiement à la livraison. Une facture vous sera envoyée par email.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
