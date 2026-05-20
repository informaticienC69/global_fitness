import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomSelect = ({ value, onChange, options, placeholder = 'Sélectionnez une option…' }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt === value || opt.value === value);
  const displayValue = selectedOption?.label || selectedOption || placeholder;

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-[#1A1A1A] border ${open ? 'border-[#F5A623]/50' : 'border-white/8'} text-left px-4 py-3 rounded-xl focus:outline-none focus:border-[#F5A623]/50 transition-all font-body text-sm flex items-center justify-between cursor-pointer`}
      >
        <span className={!value ? 'text-gray-500' : 'text-gray-300'}>{displayValue}</span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((opt, idx) => {
              const optValue = opt.value || opt;
              const optLabel = opt.label || opt;
              const isSelected = optValue === value;
              
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onChange(optValue);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 font-body text-sm transition-colors flex items-center justify-between ${
                    isSelected ? 'bg-[#F5A623]/10 text-[#F5A623]' : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {optLabel}
                  {isSelected && (
                    <svg className="w-4 h-4 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomSelect;
