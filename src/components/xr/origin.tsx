import { TeleportTarget, XROrigin } from '@react-three/xr'
import { useState } from 'react'
import { Vector3 } from 'three'

export const Origin = () => {
  const [position, setPosition] = useState(new Vector3(0, 0, 2))

  /** @see {@link https://pmndrs.github.io/xr/docs/tutorials/teleport} */
  return (
    <>
      <XROrigin position={position} />
      <TeleportTarget onTeleport={setPosition} />
    </>
  )
}
