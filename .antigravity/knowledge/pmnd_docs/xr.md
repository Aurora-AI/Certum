# https://docs.pmnd.rs/xr

```
npm install three @react-three/fiber @react-three/xr@latest
```

[What does it look like?
-----------------------](#what-does-it-look-like?)

| A simple scene with a mesh that toggles its material color between `"red"` and `"blue"` when clicked through touching or pointing. | recording of interacting with the code below |
| --- | --- |

```
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { useState } from 'react'

const store = createXRStore()

export function App() {
  const [red, setRed] = useState(false)
  return <>
    <button onClick={() => store.enterAR()}>Enter AR</button>
    <Canvas>
      <XR store={store}>
        <mesh pointerEventsType={{ deny: 'grab' }} onClick={() => setRed(!red)} position={[0, 1, -1]}>
          <boxGeometry />
          <meshBasicMaterial color={red ? 'red' : 'blue'} />
        </mesh>
      </XR>
    </Canvas>
  </>
}
```

[### Turn any @react-three/fiber app into an XR experience](#turn-any-@react-three/fiber-app-into-an-xr-experience)

1. `const store = createXRStore()` create a xr store
2. `store.enterAR()` call enter AR when clicking on a button
3. `<XR>...</XR>` wrap your content with the XR component

... or read this guide for [converting a react-three/fiber app to XR](../getting-started/convert-to-xr).

[Tutorials
---------](#tutorials)

* 💾 [Store](../tutorials/store)
* 👆 [Interactions](../tutorials/interactions)
* 👌 [Handles](../handles/introduction)
* 🧊 [Object Detection](../tutorials/object-detection)
* ✴ [Origin](../tutorials/origin)
* 🪄 [Teleport](../tutorials/teleport)
* 🕹️ [Gamepad](../tutorials/gamepad)
* ➕ [Secondary Input Sources](../tutorials/secondary-input-sources)
* 📺 [Layers](../tutorials/layers)
* 🎮 [Custom Controller/Hands/...](../tutorials/custom-inputs)
* ⚓️ [Anchors](../tutorials/anchors)
* 📱 [Dom Overlay](../tutorials/dom-overlay)
* 🎯 [Hit Test](../tutorials/hit-test)
* ⛨ [Guards](../tutorials/guards)

[External Tutorials
------------------](#external-tutorials)

* 🥇 [**WebXR First Steps React** by Meta Quest](https://github.com/meta-quest/webxr-first-steps-react)

[Roadmap
-------](#roadmap)

* 🤳 XR Gestures
* 🕺 Tracked Body

[Migration guides
----------------](#migration-guides)

* from [@react-three/xr v5](../migration/from-react-three-xr-5)
* from [natuerlich](../migration/from-natuerlich)

[Sponsors
--------](#sponsors)

This project is supported by a few companies and individuals building cutting-edge 3D Web & XR experiences. Check them out!

![Sponsors Overview](https://bbohlender.github.io/sponsors/screenshot.png)

[Edit this page](https://github.com/pmndrs/xr/edit/main/docs/getting-started/introduction.md)