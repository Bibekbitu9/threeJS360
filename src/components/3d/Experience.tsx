import React, { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import WeatherManager from './WeatherManager';
import CameraController from './CameraController';
import EnvironmentManager from './EnvironmentManager';

const Experience: React.FC = () => {
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
        maxDistance={20}
        dampingFactor={0.05}
      />
    </>
  );
};

export default Experience;
