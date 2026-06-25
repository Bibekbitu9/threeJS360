import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';

const TIPS = [
  "Tip: Drag with your mouse or finger to orbit around the ancient structures.",
  "Tip: Use the weather panel to change the atmosphere to rain, snow, or fog.",
  "Tip: Switch to the Festival theme at night to see the ruins glowing with lanterns.",
  "Tip: Toggle Cinematic mode to sit back and watch a guided flythrough of the ruins.",
  "Tip: Scroll or pinch to zoom in and inspect the high-resolution 4K stone textures."
];

const LoadingScreen: React.FC = () => {
  const { active, progress, loaded, total } = useProgress();
  const [tipIndex, setTipIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  // Cycle tips every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % TIPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Soft transition when loaded
  useEffect(() => {
    if (!active && progress === 100) {
      const timer = setTimeout(() => setIsDone(true), 800);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  if (isDone) return null;

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 text-white font-sans overflow-hidden select-none"
    >
      {/* Cinematic Cyber Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="z-10 flex flex-col items-center max-w-lg px-6 w-full text-center">
        {/* Pulsing Cyber/Mystic Logo Container */}
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center"
          >
            <div className="w-18 h-18 rounded-full border border-white/20 animate-pulse flex items-center justify-center">
              <span className="text-xl">🏛️</span>
            </div>
          </motion.div>
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full bg-white/5 blur-xl pointer-events-none" />
        </div>

        {/* Game Title */}
        <h1 className="text-3xl md:text-4xl font-black tracking-[0.25em] text-white uppercase drop-shadow-md">
          Chausathi Jogini Temple
        </h1>
        <div className="h-[2px] w-24 bg-white/20 my-4 mx-auto" />

        {/* Progress Value */}
        <div className="text-5xl font-mono font-bold tracking-tight text-white/90 tabular-nums">
          {Math.round(progress)}<span className="text-2xl text-white/40">%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-6 border border-white/5 relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-zinc-500 via-white to-zinc-400 shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Technical Asset Counter */}
        <div className="mt-3 text-[10px] font-mono tracking-widest text-white/30 uppercase">
          {loaded === total && progress === 100 
            ? "Syncing simulation world..." 
            : `Loading assets: ${loaded} / ${total}`
          }
        </div>

        {/* Rotating Tips Box */}
        <div className="mt-16 h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={tipIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm text-white/50 italic max-w-sm leading-relaxed"
            >
              {TIPS[tipIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
