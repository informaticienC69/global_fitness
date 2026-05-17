import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
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
      {/* Clean dark brand background */}
      <div className="fixed inset-0 z-[-2] bg-[#0F0F0F]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#0F0F0F] to-[#0F0F0F]" />
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full bg-[#F5A623]/4 blur-[180px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-[#E8820C]/3 blur-[150px]" />
      </div>

      <Navbar />
      <CartDrawer />
      <main className="flex-grow pt-0 relative z-10">
        <Hero />
        <Services />
        <Shop />
        <About />
        <Contact />
      </main>
      <Footer />
    </CartProvider>
  );
}

export default App;
