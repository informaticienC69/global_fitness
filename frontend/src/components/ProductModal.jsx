import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose(); // Optional: close modal after adding, or leave open. Let's leave open for now.
    }, 1500);
  };

  const fmt = (n) => n.toLocaleString('fr-SN') + ' FCFA';

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
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover absolute inset-0"
          />
          {product.badge && (
            <span className="absolute top-5 left-5 text-xs font-body font-bold uppercase tracking-[0.12em] bg-brand text-white px-3 py-1.5 rounded-full shadow-[0_2px_15px_rgba(230,57,70,0.4)]">
              {product.badge}
            </span>
          )}
        </div>

        {/* ── Right Column : Details ── */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar relative">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex-1 flex flex-col">
            <span className="eyebrow mb-3">{product.category}</span>
            <h2 className="font-display text-white text-3xl md:text-4xl uppercase font-bold leading-tight mb-4">
              {product.name}
            </h2>

            {/* Stars */}
            <div className="flex items-center gap-1.5 mb-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24"
                  fill={i < product.rating ? '#E63946' : 'none'}
                  stroke="#E63946" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span className="font-body text-gray-500 text-xs ml-2 uppercase tracking-wider">{product.reviews} avis clients</span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-white font-body font-bold text-sm uppercase tracking-wider mb-2">Description du produit</h3>
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                {product.desc}
              </p>
              {/* Fake extra details for a more complete look */}
              <ul className="mt-4 space-y-2 font-body text-xs text-gray-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Qualité professionnelle certifiée
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Conçu pour un usage intensif
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                  Livraison disponible à Dakar et environs
                </li>
              </ul>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex items-end gap-4 mb-6">
                <div>
                  <div className="font-display text-white text-3xl font-black">{fmt(product.price)}</div>
                  {product.oldPrice && (
                    <div className="font-body text-gray-500 text-sm line-through mt-1">Ancien prix : {fmt(product.oldPrice)}</div>
                  )}
                </div>
              </div>

              <button
                onClick={handleAdd}
                disabled={product.inStock === false || added}
                className={`w-full relative overflow-hidden group py-4 rounded-xl font-display uppercase font-bold tracking-wider transition-all duration-300 ${
                  product.inStock === false
                    ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                    : added
                      ? 'bg-green-500 text-white'
                      : 'bg-brand text-white shadow-[0_10px_30px_rgba(230,57,70,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(230,57,70,0.5)]'
                }`}
              >
                {added ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Ajouté au panier !
                  </span>
                ) : product.inStock === false ? (
                  'Rupture de stock'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                    </svg>
                    Ajouter au panier
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
