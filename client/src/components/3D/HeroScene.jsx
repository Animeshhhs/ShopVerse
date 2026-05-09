import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import { useRef, useMemo } from 'react';

// Animated floating sphere
const AnimatedSphere = () => {
  const meshRef = useRef();
  
  // Create gradient colors
  const colors = useMemo(() => ['#0ea5e9', '#8b5cf6', '#ec4899'], []);
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.8}>
        <MeshDistortMaterial
          color={colors[0]}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Floating particles
const Particles = ({ count = 50 }) => {
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ],
        scale: Math.random() * 0.1 + 0.02
      });
    }
    return temp;
  }, [count]);

  return (
    <group>
      {particles.map((particle, i) => (
        <Sphere key={i} args={[0.1, 8, 8]} position={particle.position} scale={particle.scale}>
          <meshStandardMaterial 
            color="#0ea5e9" 
            transparent 
            opacity={0.6}
            emissive="#0ea5e9"
            emissiveIntensity={0.5}
          />
        </Sphere>
      ))}
    </group>
  );
};

const HeroScene = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        className="bg-gradient-to-br from-slate-50 to-primary-50 dark:from-dark-bg dark:to-slate-900"
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8b5cf6" />
        
        {/* 3D Elements */}
        <AnimatedSphere />
        <Particles count={30} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Controls - disabled for cleaner look, but can enable for interaction */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
      
      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent dark:from-dark-bg/80 pointer-events-none" />
    </div>
  );
};

export default HeroScene;