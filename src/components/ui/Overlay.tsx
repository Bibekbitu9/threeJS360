import React from 'react';

const Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-8 md:p-12">
      <header className="animate-fade-in-down" style={{ animation: 'fadeInDown 1s ease-out' }}>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-md">
          Ancient Ruins
        </h1>
        <p className="text-white/70 mt-2 text-lg font-medium tracking-wide max-w-md drop-shadow-sm">
          Interactive 3D Exploration
        </p>
      </header>

      <footer className="animate-fade-in-up flex flex-col md:flex-row justify-between items-start md:items-end gap-4" style={{ animation: 'fadeInUp 1s ease-out' }}>
        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-sm">
            🖱️ Drag to rotate
          </div>
          <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/80 text-sm">
            🔍 Scroll to zoom
          </div>
        </div>
        
        <div className="text-white/40 text-xs text-right">
          Optimized for Performance
        </div>
      </footer>
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Overlay;
