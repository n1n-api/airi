import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Planet() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
        meshRef.current.rotation.y = t * 0.02;
    }
    if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y = t * 0.03;
        atmosphereRef.current.rotation.z = t * 0.01;
    }
  });

  return (
    <group position={[0, -3.5, 0]}> {/* Positioned lower to accommodate larger size */}
      
      {/* Main Planet Core */}
      <Sphere args={[1, 128, 128]} scale={4.5} ref={meshRef}>
         <MeshDistortMaterial
            color="#cbd5e1" // Slate-300
            emissive="#475569" // Slate-600
            emissiveIntensity={0.2}
            attach="material"
            distort={0.05} // Very subtle distortion for terrain feel, almost spherical
            speed={0.2}    // Slow movement
            roughness={0.7} // Matte surface like a moon
            metalness={0.4}
        />
      </Sphere>

      {/* Atmosphere / Haze Glow */}
      <Sphere args={[1.05, 64, 64]} scale={4.5} ref={atmosphereRef}>
        <meshStandardMaterial
            color="#f8fafc"
            transparent
            opacity={0.1}
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
        />
      </Sphere>
      
    </group>
  );
}
