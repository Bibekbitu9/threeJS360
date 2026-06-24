import React from 'react';
import { useGLTF } from '@react-three/drei';

// TODO: Replace this URL with your Lightsail domain once uploaded
// Example: 'https://your-domain.com/model_glb_F.glb'
const MODEL_URL = 'https://asi-tour.in/model_glb_F.glb';

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
