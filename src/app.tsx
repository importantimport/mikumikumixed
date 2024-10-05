import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { createXRStore, XR, XROrigin } from '@react-three/xr'

import { Appbar } from './components/appbar'
import { Model } from './components/model'
import { Perf } from './components/perf'
import { Stage } from './components/stage'

export const App = () => {
  const store = createXRStore({
    controller: { teleportPointer: true },
    emulate: import.meta.env.DEV ? 'metaQuest3' : false,
    hand: {
      rayPointer: { cursorModel: { color: 'white' } },
      teleportPointer: true,
      touchPointer: { cursorModel: { color: 'white' } },
    },
  })

  return (
    <Canvas camera={{ position: [0, 0, 2] }} shadows style={{ flexGrow: 1, width: '100%' }}>
      <XR store={store}>
        <group position={[0, 0, 2]}>
          <XROrigin />
        </group>
        <Perf />
        <Appbar />
        <Stage>
          <Model />
          <OrbitControls
            makeDefault
            maxPolarAngle={Math.PI / 1.9}
            minPolarAngle={0}
            target={[0, 1, 0]}
          />
        </Stage>
      </XR>
    </Canvas>
  )
}
