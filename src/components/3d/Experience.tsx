import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import WeatherManager from './WeatherManager';
import CameraController from './CameraController';
import EnvironmentManager from './EnvironmentManager';
import { useAppStore } from '../../store/useAppStore';

const Experience: React.FC = () => {
  const { autoSpin } = useAppStore();

  return (
    <>
      <CameraController />
      <EnvironmentManager />
      <WeatherManager />
      
      <Suspense fallback={null}>
        <Model />
      </Suspense>

      <OrbitControls 
        makeDefault 
        enablePan={true}
        enableZoom={true}
        maxPolarAngle={Math.PI / 2 + 0.1}
        minDistance={2}
        maxDistance={50}
        dampingFactor={0.05}
        autoRotate={autoSpin}
        autoRotateSpeed={1.0}
      />
    </>
  );
};

export default Experience;
