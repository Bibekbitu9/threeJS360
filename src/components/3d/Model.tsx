import React from 'react';
import { useGLTF } from '@react-three/drei';

const Model: React.FC = () => {
  const { scene } = useGLTF('/model_glb_F_4k.glb');

  return (
    <group position={[0, -1, 0]}>
      <primitive object={scene} />
    </group>
  );
};

// Preload the model
useGLTF.preload('/model_glb_F_4k.glb');

export default Model;
