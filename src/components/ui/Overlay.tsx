import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import type { AppMode, EnvironmentMode, WeatherMode, CameraPreset } from '../../store/useAppStore';

const Overlay: React.FC = () => {
  const {
    mode, setMode,
    environment, setEnvironment,
    weather, setWeather,
    cameraPreset, setCameraPreset,
    autoSpin, setAutoSpin
  } = useAppStore();

  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 md:p-8">
      {/* Header */}
      <header className="pointer-events-auto max-w-sm md:max-w-md animate-fade-in-down" style={{ animation: 'fadeInDown 0.8s ease-out' }}>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
          Ancient Ruins
        </h1>
        <p className="text-white/60 mt-1 text-sm md:text-base font-medium tracking-wide">
          Interactive 3D Exploration
        </p>
      </header>

      {/* Control Panel (Right Side Desktop, Bottom Mobile) */}
      <div className="pointer-events-auto flex flex-col gap-4 self-end w-full md:w-auto md:max-w-sm mt-4 md:mt-0 md:absolute md:top-8 md:right-8 md:bottom-auto">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col gap-4 text-white">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/50 border-b border-white/5 pb-2">
            Control Center
          </h2>

          {/* Mode */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Exploration Mode</span>
            <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-lg p-0.5">
              {(['explore', 'tour', 'cinematic'] as AppMode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`py-1 text-xs font-medium rounded-md transition-all ${
                    mode === m ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Time of Day */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Time of Day</span>
            <div className="grid grid-cols-4 gap-1 bg-white/5 rounded-lg p-0.5">
              {(['day', 'sunset', 'night', 'festival'] as EnvironmentMode[]).map((env) => (
                <button
                  key={env}
                  onClick={() => setEnvironment(env)}
                  className={`py-1 text-xs font-medium rounded-md transition-all ${
                    environment === env ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {env.charAt(0).toUpperCase() + env.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Weather Effects</span>
            <div className="grid grid-cols-5 gap-1 bg-white/5 rounded-lg p-0.5">
              {(['clear', 'rain', 'snow', 'fog', 'dust'] as WeatherMode[]).map((w) => (
                <button
                  key={w}
                  onClick={() => setWeather(w)}
                  className={`py-1 text-xs font-medium rounded-md transition-all ${
                    weather === w ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {w.charAt(0).toUpperCase() + w.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Camera View */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Camera Angles</span>
            <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-lg p-0.5">
              {(['hero', 'front', 'back', 'top', 'side', 'drone'] as CameraPreset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setCameraPreset(p)}
                  className={`py-1 text-xs font-medium rounded-md transition-all ${
                    cameraPreset === p ? 'bg-white/15 text-white shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Rotation Control */}
          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <span className="text-xs font-medium text-white/70">Auto-Rotate Camera</span>
            <button
              onClick={() => setAutoSpin(!autoSpin)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                autoSpin ? 'bg-white/30' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                  autoSpin ? 'translate-x-4.5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
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
