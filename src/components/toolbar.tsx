import { Fullscreen, Text } from '@react-three/uikit'
import { Button, Card } from '@react-three/uikit-apfel'
import { BoxIcon, GithubIcon, PauseIcon, PlayIcon, ScanIcon } from '@react-three/uikit-lucide'
import { useXRStore } from '@react-three/xr'
import { useControls } from 'leva'

import { usePlaying, useTogglePlaying } from '../contexts/playing'

export const Toolbar = () => {
  const playing = usePlaying()
  const togglePlaying = useTogglePlaying()

  const store = useXRStore()
  const { showToolbar } = useControls('Debug', {
    showToolbar: true,
  })

  return showToolbar && (
    <Fullscreen
      alignItems="flex-end"
      flexDirection="row"
      justifyContent="center"
      padding={12}
    >
      <Card
        alignItems="center"
        borderRadius={24}
        flexDirection="row"
        gap={12}
        justifyContent="space-between"
        padding={8}
      >

        <Button
          onClick={() => window.open('https://github.com/importantimport/mikumikumixed')}
          variant="icon"
        >
          <GithubIcon />
        </Button>
        <Button
          gap={8}
          onClick={() => store.enterVR()}
          platter
          variant="rect"
        >
          <BoxIcon />
          <Text>Enter VR</Text>
        </Button>
        <Button
          gap={8}
          onClick={() => store.enterAR()}
          platter
          variant="rect"
        >
          <ScanIcon />
          <Text>Enter AR</Text>
        </Button>
        <Button onClick={togglePlaying} variant="icon">
          <PlayIcon display={playing ? 'none' : 'flex'} />
          <PauseIcon display={playing ? 'flex' : 'none'} />
        </Button>
      </Card>
    </Fullscreen>
  )
}
