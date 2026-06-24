import React, { Suspense, useState, useCallback, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Loader } from '@react-three/drei';
import Model from './components/3d/Model';
import Overlay from './components/ui/Overlay';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[50, 100, 50]} intensity={1.5} />
      <Model />
      <OrbitControls
        makeDefault
        enablePan={true}
        enableZoom={true}
        minDistance={2}
        maxDistance={5000}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
}

function App() {
  const [contextLost, setContextLost] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCreated = useCallback(({ gl }: any) => {
    gl.setClearColor('#0a0a0a');

    const canvas = gl.domElement as HTMLCanvasElement;
    canvasRef.current = canvas;

    // Listen for context loss and auto-restore
    canvas.addEventListener('webglcontextlost', (e: Event) => {
      e.preventDefault(); // CRITICAL: prevents permanent context loss
      console.warn('WebGL context lost — will attempt restore');
      setContextLost(true);
    });

    canvas.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored');
      setContextLost(false);
    });
  }, []);

  // When context is lost, remount the entire Canvas after a short delay
  useEffect(() => {
    if (contextLost) {
      const timer = setTimeout(() => {
        setCanvasKey((k) => k + 1);
        setContextLost(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [contextLost]);

  return (
    <div className="w-full h-full relative overflow-hidden bg-black text-white">
      <Overlay />

      {contextLost && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto mb-4" />
            <p className="text-white/70 text-sm">Restoring 3D scene...</p>
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <Canvas
          key={canvasKey}
          camera={{ position: [0, 300, 500], fov: 45 }}
          dpr={1}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            precision: 'lowp',
            depth: true,
            stencil: false,
            alpha: false,
          }}
          className="absolute inset-0 z-0"
          onCreated={handleCreated}
        >
          <Scene />
        </Canvas>
      </Suspense>

      <Loader />
    </div>
  );
}

export default App;
