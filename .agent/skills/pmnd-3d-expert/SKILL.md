---
name: pmnd-3d-expert
description: Use when implementing 3D graphics, WebGL scenes, or interactive 3D elements in React. Specializes in React Three Fiber (R3F), Drei helpers, Three.js fundamentals, and performance optimization for 3D web experiences.
version: 1.0.0
author: Mad Lab Aurora
tags: [3d, threejs, r3f, webgl, drei, 3d-graphics]
---

# PMND 3D Expert (React Three Fiber)

## Goal

Create performant, visually stunning 3D experiences using React Three Fiber and the Poimandres ecosystem.

## Knowledge Base

Consult `.antigravity/knowledge/pmnd_docs/` for React Three Fiber and Drei documentation.

## When to Use

- User wants 3D elements on the page
- User asks about WebGL or Three.js
- User needs interactive 3D scenes
- User mentions "R3F", "React Three Fiber", "Drei", "3D"

## Instructions

### 1. Basic Setup

```typescript
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1A1A1A" />
      </mesh>

      <OrbitControls enableZoom={false} />
      <Environment preset="city" />
    </Canvas>
  );
}
```

### 2. Certum 3D Aesthetic

```typescript
// Dark, metallic materials
<meshStandardMaterial
  color="#0A0A0A"
  metalness={0.9}
  roughness={0.1}
/>

// Glass/Crystal effect
<MeshTransmissionMaterial
  backside
  samples={4}
  thickness={0.5}
  chromaticAberration={0.1}
  transmission={0.95}
/>

// Gold accents
<meshStandardMaterial
  color="#C9A227"
  metalness={1}
  roughness={0.2}
/>
```

### 3. Animation with useFrame

```typescript
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function RotatingMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.3, 32, 64]} />
      <meshStandardMaterial color="#1A1A1A" />
    </mesh>
  );
}
```

### 4. Scroll Integration

```typescript
import { useScroll } from '@react-three/drei';

function ScrollScene() {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scroll.offset * Math.PI * 2;
    }
  });

  return <group ref={groupRef}>...</group>;
}

// Wrap Canvas with ScrollControls
<ScrollControls pages={3}>
  <ScrollScene />
</ScrollControls>
```

### 5. Useful Drei Helpers

```typescript
// Text
import { Text3D, Center } from '@react-three/drei';
<Center>
  <Text3D font="/fonts/inter.json" size={0.5}>
    WEALTH
    <meshStandardMaterial color="#1A1A1A" />
  </Text3D>
</Center>

// Float animation
import { Float } from '@react-three/drei';
<Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
  <mesh>...</mesh>
</Float>

// Performance
import { PerformanceMonitor, AdaptiveDpr } from '@react-three/drei';
<PerformanceMonitor>
  <AdaptiveDpr pixelated />
</PerformanceMonitor>
```

## Performance Guidelines

- Use `instancedMesh` for repeated geometries
- Limit draw calls (batch materials)
- Use `<Suspense>` for async loading
- Set `dpr={[1, 2]}` for adaptive resolution
- Avoid complex shaders on mobile

## Constraints

- 🚫 NEVER block main thread with heavy computations
- 🚫 NEVER use uncompressed textures (use KTX2/Basis)
- 🚫 NEVER render 3D without fallback for low-end devices
- ✅ ALWAYS dispose geometries and materials on unmount

## Output Format

Provide:

1. Canvas setup with proper camera and lighting
2. Materials matching Certum aesthetic
3. Performance considerations
4. Mobile fallback strategy
