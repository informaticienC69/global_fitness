import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import OrderModal from './OrderModal';

// ─── Success Screen ────────────────────────────────────────────────────────────
const SuccessScreen = ({ data, onClose }) => (
  <div className="fixed inset-0 z-[90] flex items-center justify-center p-4"
    style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
    <div className="glass border border-white/10 rounded-2xl w-full max-w-sm text-center p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
      <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <h2 className="font-display text-white text-2xl uppercase font-black mb-2">Commande Confirmée !</h2>
      <p className="font-body text-gray-400 text-sm mb-1">
        Référence : <span className="text-brand font-bold">{data.orderId}</span>
      </p>
      <p className="font-body text-gray-400 text-sm mb-5">
        Facture envoyée à <span className="text-white font-medium">{data.email}</span>
      </p>
      <p className="font-body text-gray-500 text-xs mb-6">
        Notre équipe vous contactera sous 24h pour organiser la livraison à Dakar.
      </p>
      <button onClick={onClose} className="btn-primary w-full py-3">Fermer</button>
    </div>
  </div>
);

// ─── Cart Drawer ───────────────────────────────────────────────────────────────
const CartDrawer = () => {
  const {
    items, drawerOpen, closeDrawer,
    increment, decrement, removeItem,
    totalItems, totalPrice, clearCart,
  } = useCart();

  const [showModal,    setShowModal]    = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  const fmt = (n) => Number(n).toLocaleString('fr-SN') + ' FCFA';

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-400 ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'rgba(14,14,14,0.97)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
            </div>
            <div>
              <h2 className="font-display text-white text-lg uppercase font-bold leading-none">Mon Panier</h2>
              <p className="font-body text-gray-500 text-[11px]">{totalItems} article{totalItems > 1 ? 's' : ''}</p>
            </div>
          </div>
          <button
            id="cart-close-btn"
            onClick={closeDrawer}
            className="w-9 h-9 rounded-xl border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-white/4 border border-white/8 flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-gray-500">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
              </div>
              <p className="font-display text-gray-400 text-lg uppercase">Panier vide</p>
              <p className="font-body text-gray-600 text-sm mt-1">Ajoutez des articles depuis la boutique</p>
              <button onClick={closeDrawer} className="btn-primary mt-6 text-xs py-2.5 px-6">Explorer la boutique</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 p-4 glass rounded-xl border border-white/5 group">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/8">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-body text-white text-sm font-500 leading-snug truncate">{item.name}</p>
                      <p className="font-body text-gray-500 text-[11px] uppercase tracking-[0.1em] mt-0.5">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-600 hover:text-brand transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-white/4 rounded-lg border border-white/8 p-1">
                      <button onClick={() => decrement(item.id)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14"/></svg>
                      </button>
                      <span className="font-body text-white text-sm font-600 w-5 text-center">{item.qty}</span>
                      <button onClick={() => increment(item.id)} className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                      </button>
                    </div>
                    <span className="font-display text-white text-base font-bold">{fmt(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="px-4 py-5 border-t border-white/6 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between font-body text-sm text-gray-400">
                <span>Sous-total</span>
                <span className="text-white">{fmt(totalPrice)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-gray-400">
                <span>Livraison</span>
                <span className="text-gray-400">À déterminer</span>
              </div>
              <div className="flex justify-between font-display text-xl text-white font-bold uppercase pt-2 border-t border-white/6">
                <span>Total</span>
                <span className="text-gradient">{fmt(totalPrice)}</span>
              </div>
            </div>
            <button
              id="cart-checkout-btn"
              className="btn-primary w-full py-4"
              onClick={() => { closeDrawer(); setShowModal(true); }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z"/>
              </svg>
              Commander — {fmt(totalPrice)}
            </button>
            <button onClick={clearCart} className="w-full py-2 font-body text-xs text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-[0.1em]">
              Vider le panier
            </button>
          </div>
        )}
      </aside>

      {/* Order Modal */}
      {showModal && (
        <OrderModal
          onClose={() => setShowModal(false)}
          onSuccess={(data) => { setShowModal(false); setOrderSuccess(data); }}
        />
      )}

      {/* Success Screen */}
      {orderSuccess && (
        <SuccessScreen data={orderSuccess} onClose={() => setOrderSuccess(null)} />
      )}
    </>
  );
};

export default CartDrawer;
