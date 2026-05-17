import React from 'react';
import { motion } from 'framer-motion';

// Configuration de la grille façon "Bento" (asymétrique et moderne)
const IMAGES = [
  { id: 1, src: '/photos/installations/inst1.jpg', span: 'col-span-12 md:col-span-8', height: 'h-[350px] md:h-[500px]' },
  { id: 2, src: '/photos/installations/inst2.jpg', span: 'col-span-12 md:col-span-4', height: 'h-[350px] md:h-[500px]' },
  { id: 3, src: '/photos/installations/inst3.jpg', span: 'col-span-12 md:col-span-4', height: 'h-[300px] md:h-[400px]' },
  { id: 4, src: '/photos/installations/inst4.jpg', span: 'col-span-12 md:col-span-4', height: 'h-[300px] md:h-[400px]' },
  { id: 5, src: '/photos/installations/inst5.jpg', span: 'col-span-12 md:col-span-4', height: 'h-[300px] md:h-[400px]' },
  { id: 6, src: '/photos/installations/inst6.jpg', span: 'col-span-12 md:col-span-6', height: 'h-[350px] md:h-[450px]' },
  { id: 7, src: '/photos/installations/inst7.jpg', span: 'col-span-12 md:col-span-6', height: 'h-[350px] md:h-[450px]' },
];

const Installations = () => {
  return (
    <section id="portfolio" className="py-32 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#F5A623]/3 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-[#E8820C]/3 blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-brand" />
              <span className="eyebrow">Portfolio & Réalisations</span>
            </div>
            <h2 className="font-display text-white uppercase" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              Nos Dernières<br />
              <span className="text-gradient">Installations</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-400 font-body text-sm font-light leading-relaxed max-w-sm"
          >
            Découvrez nos chantiers de montage, d'agencement et de mise en service d'équipements professionnels. Un travail de précision réalisé par nos experts sur le terrain.
          </motion.p>
        </div>

        {/* Dynamic Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {IMAGES.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`${img.span} ${img.height} relative rounded-2xl overflow-hidden group border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
            >
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#F5A623] flex items-center justify-center text-black transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </div>
              </div>
              
              <img
                src={img.src}
                alt={`Installation ${img.id}`}
                className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Installations;
