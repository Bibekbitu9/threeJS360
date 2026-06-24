// Removed unused imports
import { useAppStore } from '../../store/useAppStore';

const EnvironmentManager: React.FC = () => {
  const { environment } = useAppStore();

  return (
    <>
      {environment === 'day' && (
        <>
          <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
          <ambientLight intensity={0.5} />
        </>
      )}
      
      {environment === 'sunset' && (
        <>
          <directionalLight position={[-5, 2, -5]} intensity={3} color="#ffaa55" castShadow />
          <ambientLight intensity={0.8} color="#ffccaa" />
        </>
      )}
      
      {environment === 'night' && (
        <>
          <directionalLight position={[2, 5, 2]} intensity={0.5} color="#5588ff" castShadow />
          <ambientLight intensity={0.2} color="#223355" />
          <pointLight position={[-2, 1, 2]} intensity={1.5} color="#4f46e5" />
        </>
      )}
      
      {environment === 'festival' && (
        <>
          <directionalLight position={[0, 10, 0]} intensity={1} castShadow />
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 2, 3]} intensity={5} color="#ff0055" />
          <pointLight position={[-3, -2, -3]} intensity={5} color="#00ffaa" />
          <pointLight position={[-3, 2, 3]} intensity={5} color="#aa00ff" />
        </>
      )}
    </>
  );
};

export default EnvironmentManager;
