import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import PromoVideo from './components/PromoVideo';
import Services from './components/Services';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Shop from './components/Shop';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      {/* Fixed Parallax Background */}
      <div className="parallax-bg fixed inset-0 z-[-2]"></div>
      {/* Dark overlay to make text readable (brightened by lowering opacity) */}
      <div className="fixed inset-0 bg-black/40 z-[-1]"></div>

      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-0 relative z-10">
        <Hero />
        <About />
        <PromoVideo />
        <Services />
        <Schedule />
        <Shop />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
