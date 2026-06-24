import React from 'react';
import { Sparkles, Cloud } from '@react-three/drei';
import { useAppStore } from '../../store/useAppStore';

const WeatherManager: React.FC = () => {
  const { weather } = useAppStore();

  return (
    <>
      {weather === 'snow' && (
        <Sparkles count={2000} scale={15} size={2} speed={0.4} opacity={0.6} color="#ffffff" />
      )}
      {weather === 'rain' && (
        <Sparkles count={3000} scale={15} size={1} speed={5} opacity={0.4} color="#a0c0ff" noise={0} />
      )}
      {weather === 'dust' && (
        <Sparkles count={500} scale={12} size={3} speed={0.2} opacity={0.2} color="#fcd34d" noise={2} />
      )}
      {weather === 'fog' && (
        <group position={[0, -2, 0]}>
          <Cloud opacity={0.5} speed={0.4} segments={20} bounds={[10, 2, 1.5]} />
        </group>
      )}
    </>
  );
};

export default WeatherManager;
