# https://docs.pmnd.rs/react-three-fiber/getting-started/introduction

Summary
-------

Build your scene declaratively with re-usable, self-contained components that react to state, are readily interactive and can participate in [React](https://react.dev)'s ecosystem.

[![React Three Fiber banner](https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-r3f.jpg)](/getting-started/examples)

```
npm install three @types/three @react-three/fiber
```

Warning

Three-fiber is a React renderer, it must pair with a major version of React, just like react-dom, react-native, etc. @react-three/fiber@8 pairs with react@18, @react-three/fiber@9 pairs with react@19.

[Does it have limitations?
-------------------------](#does-it-have-limitations?)

None. Everything that works in Threejs will work here without exception.

[Is it slower than plain Threejs?
--------------------------------](#is-it-slower-than-plain-threejs?)

No. There is no overhead. Components render outside of React. It outperforms Threejs in scale due to React's scheduling abilities.

[Can it keep up with frequent feature updates to Threejs?
--------------------------------------------------------](#can-it-keep-up-with-frequent-feature-updates-to-threejs?)

Yes. It merely expresses Threejs in JSX, `<mesh />` dynamically turns into `new THREE.Mesh()`. If a new Threejs version adds, removes or changes features, it will be available to you instantly without depending on updates to this library.

[What does it look like?
-----------------------](#what-does-it-look-like?)

Let's make a re-usable component that has its own state, reacts to user-input and participates in the render-loop:

index.jsx

styles.css

```
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import './styles.css'

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

createRoot(document.getElementById('root')).render(
  <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas>,
)
```

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=undefined "Open in CodeSandbox")

Show TypeScript example

```
npm install @types/three
```

styles.css

index.tsx

```
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame, ThreeElements } from '@react-three/fiber'
import './styles.css'

function Box(props: ThreeElements['mesh']) {
const meshRef = useRef<THREE.Mesh>(null!)
const [hovered, setHover] = useState(false)
const [active, setActive] = useState(false)
useFrame((state, delta) => (meshRef.current.rotation.x += delta))
return (
  <mesh
    {...props}
    ref={meshRef}
    scale={active ? 1.5 : 1}
    onClick={(event) => setActive(!active)}
    onPointerOver={(event) => setHover(true)}
    onPointerOut={(event) => setHover(false)}>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
  </mesh>
)
}

createRoot(document.getElementById('root')).render(
<Canvas>
  <ambientLight intensity={Math.PI / 2} />
  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
  <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
  <Box position={[-1.2, 0, 0]} />
  <Box position={[1.2, 0, 0]} />
</Canvas>,
)
```

[Open on CodeSandboxOpen Sandbox](https://codesandbox.io/api/v1/sandboxes/define?undefined&environment=undefined "Open in CodeSandbox")

Show React Native example

For installation instructions see [react native installation instructions](/getting-started/installation#react-native).

```
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'

function Box(props) {
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}
```

[First steps
-----------](#first-steps)

You need to be versed in both React and Threejs before rushing into this. If you are unsure about React consult the official [React docs](https://react.dev/learn), especially [the section about hooks](https://react.dev/reference/react). As for Threejs, make sure you at least glance over the following links:

1. Make sure you have a [basic grasp of Threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene). Keep that site open.
2. When you know what a scene is, a camera, mesh, geometry, material, fork the [demo above](https://github.com/pmndrs/react-three-fiber#what-does-it-look-like).
3. [Look up](https://threejs.org/docs/index.html#api/en/objects/Mesh) the JSX elements that you see (mesh, ambientLight, etc), *all* threejs exports are native to three-fiber.
4. Try changing some values, scroll through our [API](/api/canvas) to see what the various settings and hooks do.

Some helpful material:

* [Threejs-docs](https://threejs.org/docs) and [examples](https://threejs.org/examples)
* [Discover Threejs](https://discoverthreejs.com), especially the [Tips and Tricks](https://discoverthreejs.com/tips-and-tricks) chapter for best practices
* [Bruno Simons Threejs Journey](https://threejs-journey.com), arguably the best learning resource, now includes a full [R3F chapter](https://threejs-journey.com/lessons/what-are-react-and-react-three-fiber)

[![](https://github.com/pmndrs/react-three-fiber/raw/master/docs/banner-journey.jpg)](https://threejs-journey.com)
[Eco system
----------](#eco-system)

There is a vibrant and extensive eco system around three-fiber, full of libraries, helpers and abstractions.

* [`@react-three/drei`](https://github.com/pmndrs/drei) – useful helpers, this is an eco system in itself
* [`@react-three/gltfjsx`](https://github.com/pmndrs/gltfjsx) – turns GLTFs into JSX components
* [`@react-three/postprocessing`](https://github.com/pmndrs/react-postprocessing) – post-processing effects
* [`@react-three/test-renderer`](https://github.com/pmndrs/react-three-fiber/tree/master/packages/test-renderer) – for unit tests in node
* [`@react-three/flex`](https://github.com/pmndrs/react-three-flex) – flexbox for react-three-fiber
* [`@react-three/xr`](https://github.com/pmndrs/react-xr) – VR/AR controllers and events
* [`@react-three/csg`](https://github.com/pmndrs/react-three-csg) – constructive solid geometry
* [`@react-three/rapier`](https://github.com/pmndrs/react-three-rapier) – 3D physics using Rapier
* [`@react-three/cannon`](https://github.com/pmndrs/use-cannon) – 3D physics using Cannon
* [`@react-three/p2`](https://github.com/pmndrs/use-p2) – 2D physics using P2
* [`@react-three/a11y`](https://github.com/pmndrs/react-three-a11y) – real a11y for your scene
* [`@react-three/gpu-pathtracer`](https://github.com/pmndrs/react-three-gpu-pathtracer) – realistic path tracing
* [`create-r3f-app next`](https://github.com/pmndrs/react-three-next) – nextjs starter
* [`lamina`](https://github.com/pmndrs/lamina) – layer based shader materials
* [`zustand`](https://github.com/pmndrs/zustand) – flux based state management
* [`jotai`](https://github.com/pmndrs/jotai) – atoms based state management
* [`valtio`](https://github.com/pmndrs/valtio) – proxy based state management
* [`react-spring`](https://github.com/pmndrs/react-spring) – a spring-physics-based animation library
* [`framer-motion-3d`](https://www.framer.com/docs/three-introduction/) – framer motion, a popular animation library
* [`use-gesture`](https://github.com/pmndrs/react-use-gesture) – mouse/touch gestures
* [`leva`](https://github.com/pmndrs/leva) – create GUI controls in seconds
* [`maath`](https://github.com/pmndrs/maath) – a kitchen sink for math helpers
* [`miniplex`](https://github.com/hmans/miniplex) – ECS (entity management system)
* [`composer-suite`](https://github.com/hmans/composer-suite) – composing shaders, particles, effects and game mechanics

[How to contribute
-----------------](#how-to-contribute)

If you like this project, please consider helping out. All contributions are welcome as well as donations to [Opencollective](https://opencollective.com/react-three-fiber), or in crypto `BTC: 36fuguTPxGCNnYZSRdgdh6Ea94brCAjMbH`, `ETH: 0x6E3f79Ea1d0dcedeb33D3fC6c34d2B1f156F2682`.

[Backers
-------](#backers)

Thank you to all our backers! 🙏

[![](https://opencollective.com/react-three-fiber/backers.svg?width=890)](https://opencollective.com/react-three-fiber#backers)
[Contributors
------------](#contributors)

This project exists thanks to all the people who contribute.

[![](https://opencollective.com/react-three-fiber/contributors.svg?width=890)](https://github.com/pmndrs/react-three-fiber/graphs/contributors)

[Edit this page](https://github.com/pmndrs/react-three-fiber/edit/master/docs/getting-started/introduction.mdx)