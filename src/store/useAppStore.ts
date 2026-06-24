import { create } from 'zustand';

export type AppMode = 'explore' | 'tour' | 'cinematic';
export type EnvironmentMode = 'day' | 'sunset' | 'night' | 'festival';
export type WeatherMode = 'clear' | 'rain' | 'snow' | 'fog';
export type CameraPreset = 'hero' | 'front' | 'back' | 'top' | 'side' | 'drone';

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  
  environment: EnvironmentMode;
  setEnvironment: (env: EnvironmentMode) => void;
  
  weather: WeatherMode;
  setWeather: (weather: WeatherMode) => void;
  
  cameraPreset: CameraPreset;
  setCameraPreset: (preset: CameraPreset) => void;
  
  autoSpin: boolean;
  setAutoSpin: (spin: boolean) => void;
  
  rotationSpeed: number;
  setRotationSpeed: (speed: number) => void;
  
  explosionView: boolean;
  setExplosionView: (explode: boolean) => void;
  
  slowMotion: boolean;
  setSlowMotion: (slow: boolean) => void;

  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
  };
  setAccessibility: (settings: Partial<AppState['accessibility']>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  mode: 'explore',
  setMode: (mode) => set({ mode }),
  
  environment: 'day',
  setEnvironment: (environment) => set({ environment }),
  
  weather: 'clear',
  setWeather: (weather) => set({ weather }),
  
  cameraPreset: 'hero',
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
  
  autoSpin: true,
  setAutoSpin: (autoSpin) => set({ autoSpin }),
  
  rotationSpeed: 1,
  setRotationSpeed: (rotationSpeed) => set({ rotationSpeed }),
  
  explosionView: false,
  setExplosionView: (explosionView) => set({ explosionView }),
  
  slowMotion: false,
  setSlowMotion: (slowMotion) => set({ slowMotion }),

  accessibility: {
    reducedMotion: false,
    highContrast: false,
  },
  setAccessibility: (settings) => set((state) => ({ 
    accessibility: { ...state.accessibility, ...settings } 
  })),
}));
