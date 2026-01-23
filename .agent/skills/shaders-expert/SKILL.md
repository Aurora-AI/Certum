---
name: shaders-expert
description: Use when implementing custom visual effects, GPU-based graphics, GLSL shaders, or advanced WebGL techniques. Specializes in fragment/vertex shaders, noise functions, gradients, and post-processing effects.
version: 1.0.0
author: Mad Lab Aurora
tags: [shaders, glsl, webgl, graphics, visual-effects]
---

# Shaders Expert (The Book of Shaders)

## Goal

Create stunning visual effects using GLSL shaders, from noise textures to complex post-processing.

## Knowledge Base

Consult `.antigravity/knowledge/thebookofshaders/` for shader fundamentals and techniques.

## When to Use

- User wants custom visual effects
- User needs noise/grain textures
- User asks about GPU graphics
- User mentions "shader", "GLSL", "fragment", "vertex"
- User wants gradient effects or color manipulation

## Instructions

### 1. Basic Shader Setup (React Three Fiber)

```typescript
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const GrainMaterial = shaderMaterial(
  { uTime: 0, uResolution: [0, 0] },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;
    
    void main() {
      vec3 color = vec3(vUv.x, vUv.y, 1.0);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
);

extend({ GrainMaterial });
```

### 2. Noise Functions (Film Grain)

```glsl
// Simple random
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Perlin-like noise
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Film grain effect
float grain(vec2 uv, float time) {
  return random(uv + fract(time * 0.01)) * 0.1;
}
```

### 3. Gradient Patterns

```glsl
// Linear gradient
vec3 gradient = mix(vec3(0.0), vec3(1.0), vUv.y);

// Radial gradient
float dist = distance(vUv, vec2(0.5));
vec3 radial = mix(vec3(1.0), vec3(0.0), dist);

// Multi-stop gradient
vec3 color1 = vec3(0.0);           // Black
vec3 color2 = vec3(0.77, 0.63, 0.15); // Gold
vec3 color3 = vec3(1.0);           // White
vec3 gradient = mix(mix(color1, color2, smoothstep(0.0, 0.5, vUv.y)),
                    color3, smoothstep(0.5, 1.0, vUv.y));
```

### 4. Certum Visual Effects

**Subtle Vignette:**

```glsl
float vignette(vec2 uv, float radius, float softness) {
  vec2 center = uv - 0.5;
  float dist = length(center);
  return 1.0 - smoothstep(radius, radius + softness, dist);
}
```

**Paper Texture:**

```glsl
float paper(vec2 uv, float time) {
  float n = noise(uv * 500.0 + time * 0.1);
  return mix(0.98, 1.0, n);
}
```

### 5. Post-Processing (Three.js)

```typescript
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';

<EffectComposer>
  <Noise opacity={0.03} />
  <Vignette offset={0.3} darkness={0.5} />
</EffectComposer>
```

### 6. CSS Shader-like Effects (Fallback)

```css
/* SVG Filter for grain */
.grain {
  filter: url(#noise);
}

/* Backdrop blur + noise */
.atmosphere {
  background: white;
  background-image: url("/noise.svg");
  background-blend-mode: multiply;
  opacity: 0.03;
}
```

## Performance Guidelines

- Keep shader math simple on mobile
- Use lower resolution noise textures
- Avoid dependent texture reads
- Prefer `smoothstep` over `pow` for gradients

## Constraints

- 🚫 NEVER use heavy shaders without fallback
- 🚫 NEVER animate uniforms every frame without throttling
- ✅ ALWAYS provide CSS fallback for critical visual elements
- ✅ ALWAYS test on low-end devices

## Output Format

Provide:

1. GLSL code with comments
2. React integration (if R3F)
3. CSS fallback alternative
4. Performance notes
