import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import PromoVideo from './components/PromoVideo';
import Shop from './components/Shop';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Clean dark brand background */}
      <div className="fixed inset-0 z-[-2] bg-[#0F0F0F]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#111111]" />
        {/* Subtle gold glow accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#F5A623]/3 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#E8820C]/4 blur-[120px]" />
      </div>
      {/* Minimal overlay */}
      <div className="fixed inset-0 bg-black/20 z-[-1]"></div>

      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-0 relative z-10">
        <Hero />
        <Services />
        <About />
        <PromoVideo />
        <Shop />
        <Contact />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
