import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroParticleFieldProps {
  className?: string;
}

const vertexShader = `
  uniform float time;
  uniform float progress;
  uniform vec2 mouse;
  uniform vec2 resolution;

  attribute vec3 aRandomPos;
  attribute float aDelay;
  varying float vFade;

  void main() {
    float localT = clamp((progress - aDelay) / 0.35, 0.0, 1.0);
    float ease = smoothstep(0.0, 1.0, localT);
    vec3 currentPos = mix(aRandomPos, position, ease);

    float dist = distance(currentPos.xy, mouse);
    float influence = smoothstep(160.0, 0.0, dist);
    currentPos.x += (currentPos.x - mouse.x) * influence * 0.08;
    currentPos.z += influence * 40.0;

    currentPos.z += sin(time * 1.6 + currentPos.x * 0.01 + currentPos.y * 0.01) * 6.0 * ease;

    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = (1.5 + 2.2 * ease) * (resolution.y / 900.0);
    vFade = ease;
  }
`;

const fragmentShader = `
  uniform float time;
  varying float vFade;

  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float d = max(abs(p.x), abs(p.y));
    float alpha = 1.0 - smoothstep(0.46, 0.5, d);

    float flicker = 0.85 + 0.15 * sin(time * 12.0 + gl_FragCoord.y * 0.02);
    vec3 ink = vec3(0.05);

    gl_FragColor = vec4(ink, alpha * 0.18 * vFade * flicker);
  }
`;

const easeInOut = (t: number) => t * t * (3 - 2 * t);

const HeroParticleField: React.FC<HeroParticleFieldProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(1, 1, 1, 1, 0.1, 2000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const uniforms = {
      time: { value: 0 },
      progress: { value: 0 },
      mouse: { value: new THREE.Vector2(99999, 99999) },
      resolution: { value: new THREE.Vector2(1, 1) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms,
      depthTest: false,
      blending: THREE.NormalBlending,
    });

    let points: THREE.Points | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let raf = 0;
    let disposed = false;

    const build = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      const step = 22;
      const cols = Math.max(10, Math.floor(width / step));
      const rows = Math.max(10, Math.floor(height / step));
      const count = cols * rows;

      const positions = new Float32Array(count * 3);
      const randomPos = new Float32Array(count * 3);
      const delays = new Float32Array(count);

      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = (x / (cols - 1) - 0.5) * width;
          const py = (y / (rows - 1) - 0.5) * height;

          positions[i * 3] = px;
          positions[i * 3 + 1] = py;
          positions[i * 3 + 2] = 0;

          randomPos[i * 3] = px + (Math.random() - 0.5) * 480;
          randomPos[i * 3 + 1] = py + (Math.random() - 0.5) * 320;
          randomPos[i * 3 + 2] = (Math.random() - 0.5) * 600;

          // Stagger reveal across the grid (left->right with slight randomization)
          const scan = (x / Math.max(cols - 1, 1)) * 0.7 + (y / Math.max(rows - 1, 1)) * 0.2;
          delays[i] = Math.min(1, Math.max(0, scan + (Math.random() - 0.5) * 0.15));

          i++;
        }
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aRandomPos', new THREE.BufferAttribute(randomPos, 3));
      geometry.setAttribute('aDelay', new THREE.BufferAttribute(delays, 1));

      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
      uniforms.resolution.value.set(width, height);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.mouse.value.set(e.clientX - rect.left - rect.width / 2, -(e.clientY - rect.top - rect.height / 2));
    };

    const onMouseLeave = () => {
      uniforms.mouse.value.set(99999, 99999);
    };

    const startTime = performance.now();

    const animate = () => {
      if (disposed) return;
      uniforms.time.value += 0.01;

      const t = Math.min((performance.now() - startTime) / 2200, 1);
      uniforms.progress.value = easeInOut(t);

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    resize();
    build();
    raf = window.requestAnimationFrame(animate);

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      disposed = true;
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.cancelAnimationFrame(raf);

      if (points) scene.remove(points);
      geometry?.dispose();
      material.dispose();
      renderer.dispose();

      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className={className} style={{ pointerEvents: 'none' }} />;
};

export default HeroParticleField;
