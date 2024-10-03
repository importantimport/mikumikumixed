import { Environment, SoftShadows } from '@react-three/drei'
import { IfInSessionMode } from '@react-three/xr'
import { useControls } from 'leva'

export const Stage = ({ children }: React.PropsWithChildren) => {
  const {
    background,
    backgroundBlurriness,
    ground,
    preset,
  } = useControls('Stage', {
    background: true,
    backgroundBlurriness: {
      max: 1,
      min: 0,
      value: 0.5,
    },
    ground: false,
    preset: 'dawn',
  })

  return (
    <>
      <IfInSessionMode deny="immersive-ar">
        <Environment
          background={background}
          backgroundBlurriness={backgroundBlurriness}
          ground={ground}
          preset={preset as 'dawn'}
        />
      </IfInSessionMode>
      <SoftShadows />
      <directionalLight castShadow position={[1, 8, 1]} />
      <ambientLight castShadow />
      {children}
    </>
  )
}
