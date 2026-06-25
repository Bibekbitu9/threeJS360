import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import type { EnvironmentMode, WeatherMode } from '../../store/useAppStore';

const Overlay: React.FC = () => {
  const {
    environment, setEnvironment,
    weather, setWeather,
    autoSpin, setAutoSpin
  } = useAppStore();

  const checkIsMobile = () => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const [showControls, setShowControls] = useState(!checkIsMobile());

  // Shared button styles
  const buttonActive = "bg-indigo-500/20 border-indigo-400 text-indigo-100 shadow-[0_0_15px_rgba(99,102,241,0.4)]";
  const buttonInactive = "bg-black/40 border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20";

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-8 overflow-hidden select-none">
      {/* Header */}
      <header className="pointer-events-auto max-w-sm md:max-w-md animate-fade-in-down">
        <h1 className="text-3xl md:text-5xl font-black tracking-widest text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] uppercase">
          Chausathi Jogini Temple
        </h1>
        <p className="text-indigo-300 mt-1 text-sm md:text-base font-bold tracking-[0.2em] uppercase text-shadow-sm">
          Interactive Simulation
        </p>
      </header>

      {/* Control Panel (Right Side Desktop, Bottom Mobile) */}
      <div className="pointer-events-auto flex flex-col gap-4 self-end w-full md:w-auto md:min-w-[320px] mt-4 md:mt-0 md:absolute md:top-8 md:right-8 md:bottom-auto">
        {/* Toggle Button for All Devices */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowControls(!showControls)}
          className="self-end w-12 h-12 flex items-center justify-center bg-zinc-900/90 backdrop-blur-md border border-indigo-500/50 rounded-full text-xl shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-colors hover:bg-indigo-900/50"
        >
          {showControls ? '✕' : '🏛️'}
        </motion.button>

        <AnimatePresence>
          {showControls && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-zinc-950/80 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-5 flex flex-col gap-6 shadow-[0_0_30px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 border-b border-indigo-500/20 pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                System Parameters
              </h2>

              {/* Time of Day */}
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Environment</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['day', 'sunset'] as EnvironmentMode[]).map((env) => (
                    <motion.button
                      key={env}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEnvironment(env)}
                      className={`py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all duration-300 ${
                        environment === env ? buttonActive : buttonInactive
                      }`}
                    >
                      {env}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Weather */}
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Atmosphere</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['clear', 'rain', 'snow', 'fog'] as WeatherMode[]).map((w) => (
                    <motion.button
                      key={w}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setWeather(w)}
                      className={`py-2 text-xs font-bold uppercase tracking-wider rounded border transition-all duration-300 ${
                        weather === w ? buttonActive : buttonInactive
                      }`}
                    >
                      {w}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Rotation Control */}
              <div className="flex items-center justify-between border-t border-indigo-500/20 pt-4 mt-2 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Auto-Orbit</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setAutoSpin(!autoSpin)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 border ${
                    autoSpin ? 'bg-indigo-600/40 border-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-black/50 border-white/20'
                  }`}
                >
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 700, damping: 30 }}
                    className={`inline-block h-4 w-4 transform rounded-full ${
                      autoSpin ? 'bg-indigo-300 translate-x-6' : 'bg-white/50 translate-x-1'
                    }`}
                  />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer / Instructions */}
      <footer className="pointer-events-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mt-4 md:mt-0 animate-fade-in-up" style={{ animation: 'fadeInUp 0.8s ease-out' }}>
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-white/70 text-xs">
            🖱️ Drag to rotate
          </div>
          <div className="px-3 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/5 text-white/70 text-xs">
            🔍 Scroll to zoom
          </div>
        </div>
        <div className="text-white/30 text-[10px]">
          Rendering Hybrid Quality Engine
        </div>
      </footer>

      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Overlay;
