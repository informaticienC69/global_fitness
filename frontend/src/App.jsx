import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Installations from './components/Installations';
import Shop from './components/Shop';
import Contact from './components/Contact';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  // Initialize Smooth Scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for premium feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <CartProvider>
      {/* ── Premium Studio Background ── */}
      <div className="fixed inset-0 z-[-2] bg-[#0A0A0A] overflow-hidden">
        {/* Technical grid */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        
        {/* Deep radial shadow (vignette) to hide grid edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0A0A0A_80%)]" />

        {/* Ambient brand glows */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-gradient-to-b from-[#F5A623]/5 to-transparent blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#E8820C]/4 to-transparent blur-[100px] pointer-events-none" />
        
        {/* Noise overlay for matte finish */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay noise pointer-events-none" />
      </div>

      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-0 relative z-10 overflow-hidden">
        <Hero />
        <Services />
        <Installations />
        <Shop />
        <About />
        <Contact />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
