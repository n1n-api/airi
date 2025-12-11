import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'maath';

export default function NeuralCloud() {
  const pointsRef = useRef<THREE.Points>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const pointsMatRef = useRef<THREE.Material>(null!);
  const meshMatRef = useRef<THREE.Material>(null!);

  const count = 5000;

  // 1. Sphere Positions
  const spherePositions = useMemo(() => {
    const data = new Float32Array(count * 3);
    // @ts-ignore
    return random.inSphere(data, { radius: 1.5 }) as Float32Array;
  }, []);

  // 2. Infinity Positions
  const infinityPositions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * 2 * Math.PI; 
      const a = 2.5;
      const den = 1 + Math.sin(t) * Math.sin(t);
      const x = (a * Math.cos(t)) / den;
      const y = (a * Math.sin(t) * Math.cos(t)) / den;
      
      const scatter = 0.4;
      data[i * 3] = x + (Math.random() - 0.5) * scatter;
      data[i * 3 + 1] = y + (Math.random() - 0.5) * scatter;
      data[i * 3 + 2] = (Math.random() - 0.5) * scatter * 2;
    }
    return data;
  }, []);

  // 3. Explosion Positions
  const explosionPositions = useMemo(() => {
    const data = new Float32Array(count * 3);
    // @ts-ignore
    return random.inSphere(data, { radius: 2.2 }) as Float32Array;
  }, []);

  const currentPositions = useMemo(() => new Float32Array(count * 3), []);
  const rotationRef = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    
    // Cycle Duration: 16s
    const duration = 16;
    const time = t % duration;
    
    let targetPositions = spherePositions;
    let startPositions = spherePositions;
    let mix = 0;
    let rotationSpeed = 0.05;

    // Opacity & Visibility Control
    let meshOpacity = 1;
    let pointsOpacity = 0;
    let meshVisible = true;

    // --- TIMELINE ---

    if (time < 2) {
      // 0-2s: SOLID SPHERE (Stable)
      meshOpacity = 1;
      pointsOpacity = 0;
      meshVisible = true;
      rotationSpeed = 0.1;
    } 
    else if (time < 4) {
      // 2-4s: DECOMPOSITION (Solid -> Particles IN PLACE)
      // Material changes, but positions stay as sphere
      const progress = (time - 2) / 2;
      const smooth = progress * progress * (3 - 2 * progress);
      
      meshOpacity = 1 - smooth;
      pointsOpacity = smooth;
      meshVisible = true;

      startPositions = spherePositions;
      targetPositions = spherePositions; // Stay as sphere
      mix = 0;
      rotationSpeed = 0.1;
    }
    else if (time < 5) {
      // 4-5s: EXPLOSION (Particles expand)
      meshOpacity = 0;
      pointsOpacity = 1;
      meshVisible = false; // Hide mesh now

      const progress = (time - 4) / 1;
      const smooth = 1 - Math.pow(1 - progress, 3); // Fast expansion

      startPositions = spherePositions;
      targetPositions = explosionPositions;
      mix = smooth;
      rotationSpeed = 0.3;
    }
    else if (time < 7) {
      // 5-7s: REFORM TO INFINITY
      meshOpacity = 0;
      pointsOpacity = 1;
      meshVisible = false;

      const progress = (time - 5) / 2;
      const smooth = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      startPositions = explosionPositions;
      targetPositions = infinityPositions;
      mix = smooth;
      rotationSpeed = 0.1; 
    } 
    else if (time < 11) {
      // 7-11s: STABLE INFINITY
      meshOpacity = 0;
      pointsOpacity = 1;
      meshVisible = false;

      startPositions = infinityPositions;
      targetPositions = infinityPositions;
      mix = 0;
      rotationSpeed = 0.02;
    } 
    else if (time < 13) {
      // 11-13s: RETURN TO SPHERE (Vortex)
      meshOpacity = 0;
      pointsOpacity = 1;
      meshVisible = false;

      const progress = (time - 11) / 2;
      const smooth = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      startPositions = infinityPositions;
      targetPositions = spherePositions;
      mix = smooth;
      rotationSpeed = 2.0; // Fast spin
    }
    else if (time < 15) {
      // 13-15s: RE-SOLIDIFICATION (Particles -> Solid IN PLACE)
      const progress = (time - 13) / 2;
      const smooth = progress * progress * (3 - 2 * progress);
      
      meshOpacity = smooth;
      pointsOpacity = 1 - smooth;
      meshVisible = true;

      startPositions = spherePositions;
      targetPositions = spherePositions;
      mix = 0;
      rotationSpeed = 0.1; // Back to normal speed
    }
    else {
        // 15-16s: Stable Solid (Buffer)
        meshOpacity = 1;
        pointsOpacity = 0;
        meshVisible = true;
        rotationSpeed = 0.1;
    }

    // Update Opacities & Visibility
    if (meshMatRef.current) meshMatRef.current.opacity = meshOpacity;
    if (pointsMatRef.current) pointsMatRef.current.opacity = pointsOpacity;
    if (meshRef.current) meshRef.current.visible = meshVisible;

    // Interpolate Particles
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const startX = startPositions[i3];
      const startY = startPositions[i3 + 1];
      const startZ = startPositions[i3 + 2];
      const targetX = targetPositions[i3];
      const targetY = targetPositions[i3 + 1];
      const targetZ = targetPositions[i3 + 2];
      
      const vibration = Math.sin(t * 5 + i) * 0.015;

      positionsArray[i3] = startX + (targetX - startX) * mix + vibration;
      positionsArray[i3 + 1] = startY + (targetY - startY) * mix + vibration;
      positionsArray[i3 + 2] = startZ + (targetZ - startZ) * mix + vibration;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotation & Mouse Interaction
    rotationRef.current += rotationSpeed * delta;
    const mouseX = state.pointer.x * 0.5; 
    const mouseY = state.pointer.y * 0.5;

    // Apply rotation to BOTH mesh and points so they sync
    if (meshRef.current) {
        meshRef.current.rotation.y = rotationRef.current + mouseX;
        meshRef.current.rotation.x = -mouseY;
    }
    if (pointsRef.current) {
        pointsRef.current.rotation.y = rotationRef.current + mouseX;
        pointsRef.current.rotation.x = -mouseY;
    }
  });

  return (
    <group rotation={[0, 0, 0]}>
      
      {/* 1. Particle Cloud Layer */}
      <Points ref={pointsRef} positions={currentPositions} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={pointsMatRef}
          transparent
          color="#8b5cf6"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* 2. Solid Mesh Layer (Liquid Metal) */}
      <Sphere args={[1.5, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          ref={meshMatRef}
          color="#8b5cf6"
          emissive="#4c1d95"
          emissiveIntensity={0.5}
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          transparent={true} 
          opacity={1}
        />
      </Sphere>

    </group>
  );
}
