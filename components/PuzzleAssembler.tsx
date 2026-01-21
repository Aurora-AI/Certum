import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PuzzleAssemblerProps {
  imageSrc: string;
  className?: string;
}

const vertexShader = `
  uniform float time;
  uniform float progress;
  uniform vec2 mouse;

  attribute vec3 aRandomPos;
  attribute vec2 aUv;

  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vUv = aUv;

    float ease = smoothstep(0.0, 1.0, progress);
    vec3 currentPos = mix(aRandomPos, position, ease);

    float dist = distance(currentPos.xy, mouse);
    if (dist < 0.18 && progress > 0.8) {
      float repel = (0.18 - dist) * 1.8;
      currentPos.z += repel;
      currentPos.x += (currentPos.x - mouse.x) * repel * 0.6;
    }

    currentPos.z += sin(time * 2.0 + currentPos.x * 8.0) * 0.03 * ease;

    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = 2.0 + 3.0 * ease;
    vDepth = currentPos.z;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vDepth;

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    if (color.a < 0.08) discard;

    vec2 p = gl_PointCoord - 0.5;
    float d = max(abs(p.x), abs(p.y));
    float alpha = 1.0 - smoothstep(0.48, 0.5, d);

    float depthGlow = smoothstep(0.0, 0.6, abs(vDepth)) * 0.18;
    gl_FragColor = vec4(color.rgb + depthGlow, color.a * alpha);
  }
`;

const easeInOut = (t: number) => t * t * (3 - 2 * t);

const PuzzleAssembler: React.FC<PuzzleAssemblerProps> = ({ imageSrc, className }) => {
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
      mouse: { value: new THREE.Vector2(999, 999) },
      uTexture: { value: null as unknown as THREE.Texture },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms,
      depthTest: false,
      blending: THREE.NormalBlending,
    });

    let particles: THREE.Points | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let texture: THREE.Texture | null = null;

    let raf = 0;
    let disposed = false;

    const resize = () => {
      const width = container.clientWidth || 1;
      const height = container.clientHeight || 1;

      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      if (!texture || !particles) return;

      const img = (texture as any).image as { width?: number; height?: number } | undefined;
      const imgW = img?.width ?? 1;
      const imgH = img?.height ?? 1;
      const imageAspect = imgW / imgH;
      const containerAspect = width / height;

      let planeW = width;
      let planeH = height;
      if (imageAspect > containerAspect) {
        planeH = width / imageAspect;
      } else {
        planeW = height * imageAspect;
      }

      particles.scale.set(-planeW, planeH, 1);
    };

    const buildParticles = () => {
      if (!texture) return;

      const img = (texture as any).image as { width?: number; height?: number } | undefined;
      const imgW = img?.width ?? 1;
      const imgH = img?.height ?? 1;
      const aspect = imgW / imgH;

      const rows = 120;
      const cols = Math.max(60, Math.round(rows * aspect));
      const count = rows * cols;

      const positions = new Float32Array(count * 3);
      const randomPos = new Float32Array(count * 3);
      const uvs = new Float32Array(count * 2);

      let i = 0;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const u = cols === 1 ? 0.5 : x / (cols - 1);
          const v = rows === 1 ? 0.5 : y / (rows - 1);

          const px = (u - 0.5);
          const py = (v - 0.5);

          positions[i * 3] = px;
          positions[i * 3 + 1] = py;
          positions[i * 3 + 2] = 0;

          randomPos[i * 3] = px + (Math.random() - 0.5) * 1.8;
          randomPos[i * 3 + 1] = py + (Math.random() - 0.5) * 1.8;
          randomPos[i * 3 + 2] = (Math.random() - 0.5) * 1.2;

          uvs[i * 2] = u;
          uvs[i * 2 + 1] = v;

          i++;
        }
      }

      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('aRandomPos', new THREE.BufferAttribute(randomPos, 3));
      geometry.setAttribute('aUv', new THREE.BufferAttribute(uvs, 2));

      uniforms.uTexture.value = texture;

      particles = new THREE.Points(geometry, material);
      scene.add(particles);
      resize();
    };

    const startTime = performance.now();
    const progressDelayMs = 500;
    const progressDurationMs = 2500;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - startTime;

      uniforms.time.value += 0.01;

      const t = Math.min(Math.max((elapsed - progressDelayMs) / progressDurationMs, 0), 1);
      uniforms.progress.value = easeInOut(t);

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      uniforms.mouse.value.set(nx, -ny);
    };

    const onMouseLeave = () => {
      uniforms.mouse.value.set(999, 999);
    };

    const loader = new THREE.TextureLoader();
    texture = loader.load(imageSrc, (tex) => {
      if (disposed) return;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      texture = tex;
      buildParticles();
    });

    window.addEventListener('resize', resize);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    raf = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.cancelAnimationFrame(raf);

      if (particles) scene.remove(particles);
      geometry?.dispose();
      material.dispose();
      texture?.dispose();
      renderer.dispose();

      container.removeChild(renderer.domElement);
    };
  }, [imageSrc]);

  return <div ref={containerRef} className={className} style={{ pointerEvents: 'none' }} />;
};

export default PuzzleAssembler;

