import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { createXRStore, IfInSessionMode, XR } from '@react-three/xr'
import { Leva } from 'leva'

import { Model } from './components/model'
import { Perf } from './components/perf'
import { Stage } from './components/stage'
import { Toolbar } from './components/toolbar'
import { Origin } from './components/xr/origin'

export const App = () => {
  const store = createXRStore({
    controller: { teleportPointer: true },
    depthSensing: true,
    emulate: import.meta.env.DEV ? 'metaQuest3' : false,
    hand: {
      rayPointer: { cursorModel: { color: 'white' } },
      teleportPointer: true,
      touchPointer: { cursorModel: { color: 'white' } },
    },
  })

  return (
    <>
      <Leva />
      <Canvas camera={{ position: [0, 0, 2] }} shadows style={{ flexGrow: 1, width: '100%' }}>
        <XR store={store}>
          <Origin />
          <IfInSessionMode deny={['immersive-ar', 'immersive-vr']}>
            <Perf />
            <Toolbar />
            <OrbitControls
              makeDefault
              maxPolarAngle={Math.PI / 1.9}
              minPolarAngle={0}
              target={[0, 1, 0]}
            />
          </IfInSessionMode>
          <Stage>
            <Model />
          </Stage>
        </XR>
      </Canvas>
    </>
  )
}
