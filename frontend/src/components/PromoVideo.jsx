import React, { useEffect, useRef, useState } from 'react';

const STATS = [
  { value: '500+', label: 'Membres actifs' },
  { value: '15+',  label: 'Coachs certifiés' },
  { value: '8',    label: 'Disciplines' },
  { value: '6h–22h', label: 'Ouvert / jour' },
];

const PromoVideo = () => {
  const sectionRef = useRef(null);
  const videoRef   = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted,   setMuted]   = useState(true);

  // Auto-play quand la section est visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (entry.isIntersecting) {
          videoRef.current.play()
            .then(() => setPlaying(true))
            .catch(() => setPlaying(false));
        } else {
          videoRef.current.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-brand/8 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="divider-brand" />
              <span className="eyebrow">En Action</span>
            </div>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              L'INTENSITÉ<br />
              <span className="text-gradient">EN DIRECT</span>
            </h2>
          </div>
          <p className="text-gray-400 font-body text-sm font-light max-w-xs leading-relaxed">
            Découvrez l'ambiance réelle de nos entraînements — 100% authentique, 0% filtre.
          </p>
        </div>

        {/* ── Video Player ── */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/8 shadow-[0_40px_100px_rgba(0,0,0,0.7)] group">

          {/* Cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10 pointer-events-none" />

          {/* Video */}
          <video
            ref={videoRef}
            src="/video1.mp4"
            loop
            muted
            playsInline
            preload="metadata"
            className="w-full object-cover block"
            style={{ maxHeight: '72vh', minHeight: '280px' }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {/* Center play button overlay (visible when paused) */}
          {!playing && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 z-20 flex items-center justify-center group/play"
              aria-label="Lire la vidéo"
            >
              <div className="w-20 h-20 rounded-full bg-brand/90 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(230,57,70,0.5)] transition-transform duration-300 group-hover/play:scale-110">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </div>
            </button>
          )}

          {/* Bottom bar — controls + title */}
          <div className="absolute bottom-0 left-0 right-0 z-20 px-6 py-5 flex items-end justify-between gap-4">
            {/* Left — label */}
            <div>
              <p className="font-display text-white text-lg font-bold uppercase tracking-wider leading-none">Global Fitness</p>
              <p className="font-body text-white/60 text-xs mt-1">Dakar, Sénégal</p>
            </div>

            {/* Right — controls */}
            <div className="flex items-center gap-2">
              {/* Mute toggle */}
              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label={muted ? 'Activer le son' : 'Couper le son'}
              >
                {muted ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
                  </svg>
                )}
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                aria-label={playing ? 'Pause' : 'Play'}
              >
                {playing ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 max-w-5xl mx-auto">
          {STATS.map((s) => (
            <div key={s.label} className="glass border border-white/6 rounded-xl px-5 py-4 text-center card-hover">
              <div className="font-display text-gradient text-2xl font-black mb-1">{s.value}</div>
              <div className="font-body text-gray-500 text-xs uppercase tracking-[0.1em]">{s.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PromoVideo;
