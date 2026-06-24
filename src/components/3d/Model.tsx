import React from 'react';
import { useGLTF } from '@react-three/drei';

const isMobile = typeof window !== 'undefined' && (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
  window.innerWidth < 768
);

const MODEL_URL = isMobile
  ? 'https://asi-tour.in/model_glb_F_4k.glb'
  : 'https://asi-tour.in/model_glb_F.glb';

const Model: React.FC = () => {
  const { scene } = useGLTF(MODEL_URL);

  return (
    <group position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model
useGLTF.preload(MODEL_URL);

export default Model;
