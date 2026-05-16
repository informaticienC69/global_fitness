import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'globalfitness_cart';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload ? { ...i, qty: i.qty + 1 } : i
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        items: state.items
          .map(i => i.id === action.payload ? { ...i, qty: i.qty - 1 } : i)
          .filter(i => i.qty > 0),
      };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'TOGGLE_DRAWER':
      return { ...state, drawerOpen: !state.drawerOpen };
    case 'OPEN_DRAWER':
      return { ...state, drawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, drawerOpen: false };
    case 'HYDRATE':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

// Load saved cart from localStorage
const loadCart = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const initialState = { items: loadCart(), drawerOpen: false };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist cart to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch { /* ignore quota errors */ }
  }, [state.items]);

  // Add item — ne PAS ouvrir le drawer automatiquement
  const addItem = useCallback((product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    // Le drawer ne s'ouvre plus automatiquement → l'utilisateur peut continuer à ajouter
  }, []);

  const removeItem  = useCallback((id) => dispatch({ type: 'REMOVE_ITEM', payload: id }), []);
  const increment   = useCallback((id) => dispatch({ type: 'INCREMENT',   payload: id }), []);
  const decrement   = useCallback((id) => dispatch({ type: 'DECREMENT',   payload: id }), []);
  const clearCart   = useCallback(()   => dispatch({ type: 'CLEAR' }), []);
  const toggleDrawer = useCallback(()  => dispatch({ type: 'TOGGLE_DRAWER' }), []);
  const openDrawer   = useCallback(()  => dispatch({ type: 'OPEN_DRAWER' }), []);
  const closeDrawer  = useCallback(()  => dispatch({ type: 'CLOSE_DRAWER' }), []);

  const totalItems = state.items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items: state.items,
      drawerOpen: state.drawerOpen,
      totalItems, totalPrice,
      addItem, removeItem, increment, decrement, clearCart,
      toggleDrawer, openDrawer, closeDrawer,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
