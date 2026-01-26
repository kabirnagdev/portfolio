'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00ff88"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mesh2Ref = useRef<THREE.Mesh>(null);
  const mesh3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2;
      meshRef.current.rotation.y = t * 0.3;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
    
    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = t * 0.15;
      mesh2Ref.current.rotation.z = t * 0.2;
      mesh2Ref.current.position.y = Math.cos(t * 0.4) * 0.3 + 2;
    }
    
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.y = t * 0.25;
      mesh3Ref.current.rotation.z = t * 0.1;
      mesh3Ref.current.position.x = Math.sin(t * 0.3) * 0.5 - 3;
    }
  });

  return (
    <>
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.3} />
      </mesh>
      
      <mesh ref={mesh2Ref} position={[-2, 2, -3]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.25} />
      </mesh>
      
      <mesh ref={mesh3Ref} position={[-3, -1, -2]}>
        <torusGeometry args={[0.4, 0.15, 8, 20]} />
        <meshBasicMaterial color="#00ff88" wireframe transparent opacity={0.2} />
      </mesh>
    </>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleField />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
