import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Schedule = () => {
  const sectionRef = useScrollReveal();
  const [activeDay, setActiveDay] = useState('Lundi');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

  const categoryColors = {
    'Musculation': { bg: 'bg-blue-500/10', border: 'border-blue-500/25', text: 'text-blue-400' },
    'Boxing':      { bg: 'bg-brand/10',    border: 'border-brand/25',    text: 'text-brand' },
    'Cardio':      { bg: 'bg-orange-500/10', border: 'border-orange-500/25', text: 'text-orange-400' },
    'Coaching':    { bg: 'bg-purple-500/10', border: 'border-purple-500/25', text: 'text-purple-400' },
    'Collectif':   { bg: 'bg-green-500/10', border: 'border-green-500/25', text: 'text-green-400' },
  };

  const allData = {
    'Lundi': [
      { time: '06:30 – 07:30', name: 'Musculation — Épaules & Dos',       trainer: 'Coach Moussa',  category: 'Musculation', spots: 12 },
      { time: '09:00 – 10:00', name: 'HIIT Cardio Express',                trainer: 'Coach Fatou',   category: 'Cardio',      spots: 8  },
      { time: '12:30 – 13:30', name: 'Coaching Personnalisé',              trainer: 'Coach Ibra',    category: 'Coaching',    spots: 3  },
      { time: '18:00 – 19:30', name: 'Boxing Intensif',                    trainer: 'Coach Seydou',  category: 'Boxing',      spots: 15 },
    ],
    'Mardi': [
      { time: '07:00 – 08:00', name: 'Musculation — Pectoraux & Bras',     trainer: 'Coach Moussa',  category: 'Musculation', spots: 10 },
      { time: '10:00 – 11:00', name: 'Cours Collectif Full Body',          trainer: 'Coach Fatou',   category: 'Collectif',   spots: 20 },
      { time: '18:30 – 19:30', name: 'Boxing Technique',                   trainer: 'Coach Seydou',  category: 'Boxing',      spots: 12 },
    ],
    'Mercredi': [
      { time: '06:30 – 07:30', name: 'Musculation — Jambes & Fessiers',    trainer: 'Coach Ibra',    category: 'Musculation', spots: 14 },
      { time: '12:00 – 13:00', name: 'Cardio & Mobilité',                  trainer: 'Coach Fatou',   category: 'Cardio',      spots: 16 },
      { time: '19:00 – 20:30', name: 'Boxing Sparring',                    trainer: 'Coach Seydou',  category: 'Boxing',      spots: 8  },
    ],
    'Jeudi': [
      { time: '07:00 – 08:00', name: 'Musculation — Dos & Biceps',         trainer: 'Coach Moussa',  category: 'Musculation', spots: 12 },
      { time: '18:00 – 19:00', name: 'Coaching Personnalisé',              trainer: 'Coach Ibra',    category: 'Coaching',    spots: 3  },
    ],
    'Vendredi': [
      { time: '06:30 – 07:30', name: 'Full Body Power',                    trainer: 'Coach Moussa',  category: 'Collectif',   spots: 20 },
      { time: '12:30 – 13:30', name: 'HIIT Cardio',                        trainer: 'Coach Fatou',   category: 'Cardio',      spots: 10 },
      { time: '18:30 – 20:00', name: 'Boxing Intensif',                    trainer: 'Coach Seydou',  category: 'Boxing',      spots: 15 },
    ],
    'Samedi': [
      { time: '08:00 – 10:00', name: 'Open Gym — Accès Libre',             trainer: 'Supervision',   category: 'Musculation', spots: 30 },
      { time: '10:00 – 11:30', name: 'Cours Collectif Weekend',            trainer: 'Coach Fatou',   category: 'Collectif',   spots: 25 },
    ],
    'Dimanche': [
      { time: '10:00 – 20:00', name: 'Open Gym — Accès Libre',             trainer: 'Supervision',   category: 'Musculation', spots: 30 },
    ],
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setClasses(allData[activeDay] || []);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeDay]);

  return (
    <section id="schedule" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="divider-brand" />
              <span className="eyebrow">Organisation</span>
            </div>
            <h2 className="font-display text-white" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
              PLANNING<br />
              <span className="text-gradient">HEBDOMADAIRE</span>
            </h2>
          </div>
          <p className="text-gray-400 font-body text-sm font-light max-w-xs">
            Réservez vos séances directement depuis le planning. Places limitées.
          </p>
        </div>

        {/* Day tabs */}
        <div ref={sectionRef} className="animate-on-scroll">
          <div className="flex overflow-x-auto gap-2 mb-6 pb-2 scrollbar-hide">
            {days.map(day => (
              <button
                key={day}
                id={`schedule-tab-${day.toLowerCase()}`}
                onClick={() => setActiveDay(day)}
                className={`whitespace-nowrap flex-1 min-w-[90px] py-3 px-4 text-[11px] font-body font-700 uppercase tracking-[0.12em] rounded-lg transition-all duration-300 ${
                  activeDay === day
                    ? 'bg-brand-gradient text-white shadow-[0_4px_20px_rgba(230,57,70,0.35)]'
                    : 'glass text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Classes list */}
          <div className="glass rounded-2xl border border-white/5 overflow-hidden min-h-[340px] relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="spinner" />
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {classes.map((cls, idx) => {
                  const cat = categoryColors[cls.category] || categoryColors['Musculation'];
                  return (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 md:p-7 hover:bg-white/2 transition-colors group"
                    >
                      {/* Time */}
                      <div className="sm:w-44 font-body text-sm font-500 text-gray-300 flex-shrink-0">
                        {cls.time}
                      </div>

                      {/* Class info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <h4 className="font-display text-white text-xl font-bold uppercase">{cls.name}</h4>
                          <span className={`text-[10px] font-body font-700 uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full border ${cat.bg} ${cat.border} ${cat.text}`}>
                            {cls.category}
                          </span>
                        </div>
                        <p className="font-body text-gray-400 text-xs uppercase tracking-[0.1em]">
                          {cls.trainer} &nbsp;·&nbsp; {cls.spots} places disponibles
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="flex-shrink-0">
                        <button
                          id={`schedule-reserve-${idx}`}
                          className="btn-primary py-2.5 px-6 text-[11px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          Réserver
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
