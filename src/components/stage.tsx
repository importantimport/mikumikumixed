import { Environment, SoftShadows } from '@react-three/drei'
import { IfInSessionMode } from '@react-three/xr'
import { folder, useControls } from 'leva'

export const Stage = ({ children }: React.PropsWithChildren) => {
  const {
    backgroundBlurriness,
    backgroundEnable,
    backgroundIntensity,
    backgroundRotation,
    groundEnable,
    groundHeight,
    groundRadius,
    groundScale,
    // preset,
  } = useControls('Stage', {
    background: folder({
      backgroundBlurriness: {
        max: 1,
        min: 0,
        value: 0.5,
      },
      backgroundEnable: true,
      backgroundIntensity: 1,
      backgroundRotation: [0, 0, 0],
    }),
    ground: folder({
      groundEnable: false,
      groundHeight: 39,
      groundRadius: 100,
      groundScale: 100,
    }),
    // preset: 'dawn',
  })

  return (
    <>
      <IfInSessionMode deny="immersive-ar">
        <Environment
          background={backgroundEnable}
          backgroundBlurriness={backgroundBlurriness}
          backgroundIntensity={backgroundIntensity}
          backgroundRotation={backgroundRotation}
          files="https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/hdri/kiara_1_dawn_1k.hdr"
          ground={groundEnable && { height: groundHeight, radius: groundRadius, scale: groundScale }}
        // preset={preset as 'dawn'}
        />
      </IfInSessionMode>
      <SoftShadows />
      <directionalLight castShadow position={[0, 5, 1]} />
      <ambientLight />
      {children}
    </>
  )
}
