import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { createXRStore, IfInSessionMode, XR } from '@react-three/xr'
import { Leva } from 'leva'
import { Suspense } from 'react'

import { Model } from './components/model'
import { Perf } from './components/perf'
import { Stage } from './components/stage'
import { Toolbar } from './components/toolbar'
import { Loading } from './components/uikit/loading'
import { Origin } from './components/xr/origin'
import { PlayingProvider } from './contexts/playing'

export const App = () => {
  const store = createXRStore({
    controller: { teleportPointer: true },
    // depthSensing: import.meta.env.PROD, // TODO: make option
    emulate: import.meta.env.DEV ? 'metaQuest3' : false,
    hand: { teleportPointer: true },
  })

  return (
    <PlayingProvider>
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
            <Suspense fallback={<Loading />}>
              <Model />
            </Suspense>
          </Stage>
        </XR>
      </Canvas>
    </PlayingProvider>
  )
}
