import { TeleportTarget, XROrigin } from '@react-three/xr'
import { useState } from 'react'
import { Vector3 } from 'three'

export const Origin = () => {
  const [position, setPosition] = useState(new Vector3(0, 0, 2))

  /** @see {@link https://pmndrs.github.io/xr/docs/tutorials/teleport} */
  return (
    <>
      <XROrigin position={position} />
      <TeleportTarget onTeleport={setPosition}>
        <mesh position={[0, 0, 0]} scale={[0.5, 0.001, 0.5]}>
          <sphereGeometry />
          <meshPhysicalMaterial
            color="white"
            ior={1.5}
            opacity={0.15}
            specularColor="white"
            specularIntensity={1}
            transmission={1}
            transparent
          />
        </mesh>
      </TeleportTarget>
    </>
  )
}
