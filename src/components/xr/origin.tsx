import type { Group } from 'three'

import { useFrame } from '@react-three/fiber'
import {
  useControllerLocomotion,
  // useXRControllerButtonEvent,
  useXRInputSourceState,
  XROrigin,
} from '@react-three/xr'
import { useRef } from 'react'

import { useTogglePlaying } from '../../contexts/playing'

export const Origin = () => {
  const togglePlaying = useTogglePlaying()
  const ref = useRef<Group>(null)

  /** @see {@link https://developers.meta.com/horizon/blog/button-action-mapping-user-inputs-controller-meta-quest-horizon-developers-vr-mr/} */
  const controllerRight = useXRInputSourceState('controller', 'right')

  useControllerLocomotion(ref)

  useFrame(() => {
    if (!controllerRight?.gamepad)
      return

    if (controllerRight.gamepad['a-button']?.state === 'pressed') {
      // TODO: jump
    }

    if (controllerRight.gamepad['b-button']?.state === 'pressed') {
      togglePlaying()
    }
  })

  /**
   * TODO: rapier physics
   * @see {@link https://pmndrs.github.io/xr/docs/getting-started/all-hooks#usecontrollerlocomotion}
   */
  return (<XROrigin position={[0, 0, 2]} ref={ref} />)
}
