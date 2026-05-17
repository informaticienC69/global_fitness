import React, { useState, useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useCart } from '../context/CartContext';
import ProductModal from './ProductModal';

// ─── Custom Sort Dropdown ─────────────────────────────
const SortDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white/4 border border-white/10 hover:border-brand/40 text-gray-300 hover:text-white px-4 py-2.5 rounded-xl font-body text-xs uppercase tracking-[0.1em] transition-all min-w-[180px] justify-between"
      >
        <span>{selected?.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-full glass border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-30">
          {options.map(opt => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full text-left px-4 py-3 font-body text-xs uppercase tracking-[0.1em] transition-colors ${
                opt.value === value
                  ? 'text-brand bg-brand/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Product Card ─────────────────────────────────────
const ProductCard = ({ product, onLearnMore }) => {
  const { addItem, totalItems } = useCart();
  const [added, setAdded] = useState(false);
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    addItem(product);
    setCount(c => c + 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const fmt = (n) => n.toLocaleString('fr-SN') + ' FCFA';

  return (
    <div className="glass card-hover rounded-2xl overflow-hidden border border-white/6 flex flex-col group">
      {/* Image */}
      <div className="relative overflow-hidden bg-[#111] h-52 flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.12em] bg-brand text-white px-2.5 py-1 rounded-full shadow-[0_2px_10px_rgba(230,57,70,0.4)]">
              {product.badge}
            </span>
          )}
          {product.inStock === false && (
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.12em] bg-gray-700/90 text-gray-300 px-2.5 py-1 rounded-full backdrop-blur-sm">
              Rupture
            </span>
          )}
        </div>
        {product.oldPrice && (
          <div className="absolute top-3 right-3 bg-accent/90 text-white text-[10px] font-bold px-2 py-1 rounded-full font-body backdrop-blur-sm">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </div>
        )}

        {/* Toast confirmation overlay */}
        {added && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-200">
            <div className="bg-green-500 text-white font-body font-bold text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              Ajouté au panier !
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <span className="eyebrow mb-2">{product.category}</span>
        <h3 className="font-display text-white text-lg uppercase font-bold leading-snug mb-2">{product.name}</h3>
        <p className="font-body text-gray-500 text-xs font-light leading-relaxed mb-4 flex-1 line-clamp-2">{product.desc}</p>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 24 24"
              fill={i < product.rating ? '#E63946' : 'none'}
              stroke="#E63946" strokeWidth="1.5">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
          <span className="font-body text-gray-600 text-[10px] ml-1">({product.reviews})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-3 mt-auto">
          <div>
            <div className="font-display text-white text-xl font-black">{fmt(product.price)}</div>
            {product.oldPrice && (
              <div className="font-body text-gray-600 text-xs line-through">{fmt(product.oldPrice)}</div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/5">
          <button
            onClick={onLearnMore}
            className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-body text-[10px] font-bold uppercase tracking-wider transition-colors border border-white/10"
          >
            En savoir plus
          </button>
          
          <button
            id={`shop-add-${product.id}`}
            onClick={handleAdd}
            disabled={product.inStock === false}
            className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${
              product.inStock === false
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-brand-gradient text-white shadow-[0_4px_15px_rgba(230,57,70,0.25)] hover:shadow-[0_6px_25px_rgba(230,57,70,0.45)] hover:-translate-y-0.5'
            }`}
            title="Ajouter au panier"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 5v14M5 12h14"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Shop ────────────────────────────────────────
const SORT_OPTIONS = [
  { value: 'default',    label: 'Par défaut' },
  { value: 'price-asc',  label: 'Prix : croissant' },
  { value: 'price-desc', label: 'Prix : décroissant' },
  { value: 'rating',     label: 'Mieux notés' },
];

const CATEGORIES = ['Tous', 'Haltères & Poids', 'Barres & Disques', 'Machines', 'Cardio', 'Accessoires', 'Vêtements'];

const Shop = () => {
  const headerRef = useScrollReveal();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = products
    .filter(p => activeCategory === 'Tous' || p.category === activeCategory)
    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      return 0;
    });

  return (
    <section id="shop" className="py-32 relative">
      <div className="absolute right-0 top-1/4 w-[400px] h-[400px] rounded-full bg-brand/4 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 animate-on-scroll">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-brand" />
              <span className="eyebrow">Boutique Fitness</span>
            </div>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              ÉQUIPEZ-VOUS<br />
              <span className="text-gradient">COMME UN PRO</span>
            </h2>
          </div>
          <p className="text-gray-400 font-body text-sm font-light leading-relaxed max-w-xs">
            Haltères, machines, accessoires, vêtements — tout le matériel certifié, livré à Dakar.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Rechercher…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/4 border border-white/10 text-white placeholder-gray-600 pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-brand/50 font-body text-sm transition-all"
            />
          </div>
          <SortDropdown value={sortBy} onChange={setSortBy} options={SORT_OPTIONS} />
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              id={`filter-${cat.replace(/[\s&]/g, '-').toLowerCase()}`}
              onClick={() => setActiveCategory(cat)}
              className={`py-2 px-4 rounded-full text-[11px] font-body font-bold uppercase tracking-[0.1em] border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-gradient text-white border-transparent shadow-[0_4px_15px_rgba(230,57,70,0.3)]'
                  : 'bg-transparent border-white/10 text-gray-400 hover:text-white hover:border-white/25'
              }`}
            >{cat}</button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-brand border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-gray-500 text-2xl uppercase">Aucun produit trouvé</p>
          </div>
        ) : (
          <>
            <p className="font-body text-gray-600 text-[11px] uppercase tracking-[0.12em] mb-6">
              {filtered.length} produit{filtered.length > 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  onLearnMore={() => setSelectedProduct(p)} 
                />
              ))}
            </div>
          </>
        )}
      {/* Bottom CTA */}
        <div className="mt-16 glass-brand rounded-2xl p-8 md:p-10 border border-brand/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-white text-2xl uppercase font-bold mb-1">Besoin de conseils ?</h3>
            <p className="font-body text-gray-400 text-sm font-light">Nos coachs vous aident à choisir le bon équipement selon vos objectifs.</p>
          </div>
          <a href="#contact" className="btn-primary flex-shrink-0">Demander conseil</a>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
};

// ─── Catalogue Produits — Équipements Fitness Réels ──────────────────────────
// 6 images générées (local) + 6 Unsplash fitness equipment (matériel uniquement)
const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Haltères Hexagonaux Pro',
    category: 'Haltères & Poids',
    price: 45000,
    oldPrice: 55000,
    image: '/products/dumbbells.png',
    desc: 'Set de 2 haltères hexagonaux caoutchouc vulcanisé. Grip antidérapant moleté. Idéal pour curl, développé et exercices unilatéraux. Disponible de 5 à 30 kg.',
    rating: 5, reviews: 48, badge: 'Bestseller', inStock: true,
  },
  {
    id: 2,
    name: 'Barre Olympique 20 kg',
    category: 'Barres & Disques',
    price: 120000,
    oldPrice: null,
    image: '/products/barbell.png',
    desc: 'Barre olympique acier chromé haute résistance, longueur 220 cm, roulements à billes, charge admissible 680 kg. Knurling centre et double repère.',
    rating: 5, reviews: 32, badge: null, inStock: true,
  },
  {
    id: 3,
    name: 'Kettlebells Fonte Pro',
    category: 'Haltères & Poids',
    price: 28000,
    oldPrice: null,
    image: '/products/kettlebells.png',
    desc: 'Kettlebells monoblocs en fonte brute polie, poignée sablée pour grip parfait, base plate antidérapante. Disponibles en 8 kg, 12 kg, 16 kg et 24 kg.',
    rating: 4, reviews: 51, badge: null, inStock: true,
  },
  {
    id: 4,
    name: 'Banc Réglable 7 Positions',
    category: 'Machines',
    price: 280000,
    oldPrice: 320000,
    image: '/products/bench.png',
    desc: 'Banc de musculation professionnel réglable de -15° à +85°, assise mobile, rembourrage haute densité, charge max 300 kg. 7 positions dossier.',
    rating: 5, reviews: 27, badge: null, inStock: true,
  },
  {
    id: 5,
    name: 'Power Cage Squat Rack',
    category: 'Machines',
    price: 850000,
    oldPrice: null,
    image: '/products/squat_rack.png',
    desc: 'Power rack acier 3 mm sablé noir mat. Barre de traction intégrée, J-hooks réglables, barres de sécurité, charge max 400 kg. Station dips incluse.',
    rating: 5, reviews: 12, badge: 'Pro', inStock: true,
  },
  {
    id: 6,
    name: 'Tapis de Course Motorisé',
    category: 'Cardio',
    price: 650000,
    oldPrice: 750000,
    image: '/products/treadmill.png',
    desc: 'Tapis de course moteur 3.5 CV, vitesse 0–20 km/h, inclinaison motorisée 0–15 %, 24 programmes, écran LCD couleur, pliable, amortisseurs 8 points.',
    rating: 5, reviews: 19, badge: 'Pro', inStock: true,
  },
  {
    id: 7,
    name: 'Disques Bumper 10 kg × 2',
    category: 'Barres & Disques',
    price: 55000,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=85',
    desc: 'Paire de disques bumper caoutchouc vulcanisé haute densité. Diamètre 45 cm standard olympique, alésage 50 mm. Absorbe les chocs, protège le sol.',
    rating: 5, reviews: 44, badge: null, inStock: true,
  },
];

export default Shop;
