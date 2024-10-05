import type { Group } from 'three'

import { useControllerLocomotion, XROrigin } from '@react-three/xr'
import { useRef } from 'react'

export const Origin = () => {
  const ref = useRef<Group>(null)

  useControllerLocomotion(ref)

  /**
   * TODO: rapier physics
   * @see {@link https://pmndrs.github.io/xr/docs/getting-started/all-hooks#usecontrollerlocomotion}
   */
  return (<XROrigin position={[0, 0, 2]} ref={ref} />)
}
