import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';

const PRESETS = {
  hero: { pos: [0, 4, 16], target: [0, 0, 0] },
  front: { pos: [0, 0, 12], target: [0, 0, 0] },
  back: { pos: [0, 0, -6], target: [0, 0, 0] },
  top: { pos: [0, 8, 0], target: [0, 0, 0] },
  side: { pos: [6, 0, 0], target: [0, 0, 0] },
  drone: { pos: [4, 6, 4], target: [0, 0, 0] },
};

const CameraController: React.FC = () => {
  const { camera, controls } = useThree();
  const { cameraPreset, mode } = useAppStore();
  const cinematicTime = useRef(0);

  // Handle Preset changes
  useEffect(() => {
    if (mode !== 'explore') return; // Presets only in explore mode (or we can override)

    const preset = PRESETS[cameraPreset as keyof typeof PRESETS] || PRESETS.hero;
    
    gsap.to(camera.position, {
      x: preset.pos[0],
      y: preset.pos[1],
      z: preset.pos[2],
      duration: 1.5,
      ease: "power3.inOut",
    });

    if (controls) {
      gsap.to((controls as any).target, {
        x: preset.target[0],
        y: preset.target[1],
        z: preset.target[2],
        duration: 1.5,
        ease: "power3.inOut",
      });
    }
  }, [cameraPreset, camera, controls, mode]);

  // Handle Cinematic & Tour Modes
  useFrame((state, delta) => {
    if (mode === 'cinematic') {
      cinematicTime.current += delta;
      const t = cinematicTime.current;
      
      // Dynamic fly-around using parametric equations
      const x = Math.sin(t * 0.2) * 8;
      const z = Math.cos(t * 0.2) * 8;
      const y = 2 + Math.sin(t * 0.5) * 2;
      
      camera.position.lerp(new THREE.Vector3(x, y, z), 0.05);
      
      if (controls) {
        (controls as any).target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }
    } else if (mode === 'tour') {
      // Basic tour implementation - ping pong between 2 points
      cinematicTime.current += delta;
      const t = cinematicTime.current;
      
      const p1 = new THREE.Vector3(5, 2, 5);
      const p2 = new THREE.Vector3(-5, 4, -5);
      const lerpFactor = (Math.sin(t * 0.3) + 1) / 2; // 0 to 1
      
      const currentPos = new THREE.Vector3().lerpVectors(p1, p2, lerpFactor);
      camera.position.lerp(currentPos, 0.05);
      
      if (controls) {
        (controls as any).target.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      }
    }
  });

  return null;
};

export default CameraController;
