import React, { useRef, useMemo } from 'react';
import { Sparkles, Cloud } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

const Rain: React.FC = () => {
  const count = 5000;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 50;
      const z = (Math.random() - 0.5) * 100;
      const speed = 0.5 + Math.random() * 0.5;
      temp.push({ x, y, z, speed });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    particles.forEach((particle, i) => {
      particle.y -= particle.speed;
      if (particle.y < -5) {
        particle.y = 50;
        particle.x = (Math.random() - 0.5) * 100;
        particle.z = (Math.random() - 0.5) * 100;
      }
      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.scale.set(0.03, 1.5, 0.03);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshBasicMaterial color="#aaddff" transparent opacity={0.4} />
    </instancedMesh>
  );
};

const WeatherManager: React.FC = () => {
  const { weather } = useAppStore();

  return (
    <>
      {weather === 'snow' && (
        <Sparkles count={4000} scale={60} size={4} speed={0.4} opacity={0.8} color="#ffffff" />
      )}
      {weather === 'rain' && <Rain />}
      {weather === 'fog' && (
        <group position={[0, 0, 0]}>
          <Cloud opacity={0.5} speed={0.4} segments={40} bounds={[30, 10, 30]} />
        </group>
      )}
    </>
  );
};

export default WeatherManager;
