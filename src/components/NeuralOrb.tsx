import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralOrb() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Rotate the orb
    meshRef.current.rotation.x = t * 0.1;
    meshRef.current.rotation.y = t * 0.15;
  });

  return (
    <Sphere args={[1, 100, 200]} scale={2.4} ref={meshRef}>
      <MeshDistortMaterial
        color="#8b5cf6"
        emissive="#4c1d95" // Darker violet core
        emissiveIntensity={0.5} // Subtle glow from within
        attach="material"
        distort={0.4}
        speed={1.5}
        roughness={0.2} // Shiny surface
        metalness={0.8} // Metallic look
        wireframe={false} // Solid material
      />
    </Sphere>
  );
}

