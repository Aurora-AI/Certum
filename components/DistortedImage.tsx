import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DistortedImageProps {
  imageSrc: string;
  className?: string;
}

function getImageDimensions(image: unknown): { width: number; height: number } {
  if (typeof image !== "object" || image === null) return { width: 1, height: 1 };
  const maybe = image as { width?: unknown; height?: unknown };
  const width = typeof maybe.width === "number" && Number.isFinite(maybe.width) ? maybe.width : 1;
  const height = typeof maybe.height === "number" && Number.isFinite(maybe.height) ? maybe.height : 1;
  return { width, height };
}

function getTextureDimensions(texture: THREE.Texture | null): { width: number; height: number } {
  if (!texture) return { width: 1, height: 1 };
  const image = (texture as unknown as { image?: unknown }).image;
  return getImageDimensions(image);
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float hoverState;
  uniform sampler2D texture1;
  varying vec2 vUv;

  void main() {
    vec2 newUV = vUv;

    float splitLine = 0.4;

    if (newUV.y < splitLine) {
      float intensity = smoothstep(splitLine, 0.0, newUV.y);
      float scanline = sin(newUV.y * 200.0 + time * 10.0) * 0.005;
      float drag = hoverState * 0.08;
      newUV.x += (scanline + drag - 0.02) * intensity;
    }

    vec4 color = texture2D(texture1, newUV);
    gl_FragColor = vec4(color.rgb * 0.95, color.a);
  }
`;

const DistortedImage: React.FC<DistortedImageProps> = ({ imageSrc, className }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(1, 1, 1, 1, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const uniforms = {
      time: { value: 0 },
      hoverState: { value: 0 },
      texture1: { value: null as THREE.Texture | null },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms,
    });

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), material);
    plane.scale.x = -1;
    scene.add(plane);

    let raf = 0;
    let disposed = false;

    let hoverTarget = 0;
    let hoverTimer: ReturnType<typeof setTimeout> | null = null;

    const resize = () => {
      if (!mount) return;
      const width = mount.clientWidth || 1;
      const height = mount.clientHeight || 1;

      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      const tex = uniforms.texture1.value;
      const { width: imgW, height: imgH } = getTextureDimensions(tex);
      const imageAspect = imgW / imgH;
      const containerAspect = width / height;

      let planeW = width;
      let planeH = height;
      if (imageAspect > containerAspect) {
        planeH = width / imageAspect;
      } else {
        planeW = height * imageAspect;
      }

      plane.scale.set(-planeW, planeH, 1);
    };

    const onMouseMove = () => {
      hoverTarget = 1;
      if (hoverTimer) clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => {
        hoverTarget = 0;
      }, 500);
    };

    const animate = () => {
      uniforms.time.value += 0.01;
      uniforms.hoverState.value += (hoverTarget - uniforms.hoverState.value) * 0.08;
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(animate);
    };

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      imageSrc,
      (tex) => {
        if (disposed) return;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        uniforms.texture1.value = tex;
        resize();
        raf = window.requestAnimationFrame(animate);
      },
      undefined,
      () => {
        if (disposed) return;
        raf = window.requestAnimationFrame(animate);
      },
    );

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      disposed = true;
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      if (hoverTimer) clearTimeout(hoverTimer);
      window.cancelAnimationFrame(raf);

      scene.remove(plane);
      plane.geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();

      mount.removeChild(renderer.domElement);
    };
  }, [imageSrc]);

  return <div ref={mountRef} className={className} style={{ pointerEvents: 'none' }} />;
};

export default DistortedImage;
