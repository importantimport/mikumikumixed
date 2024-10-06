import type { AnimationClip } from 'three'

import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect } from 'react'
import { Clock } from 'three'
import { AmmoPhysics, MMDLoader } from 'three/examples/jsm/Addons.js'

import { usePlaying } from '../contexts/playing'
import { useAudio, useAudioBuffer, useAudioListener } from '../hooks/use-audio'
import { useMMD, useMMDAnimationHelper } from '../hooks/use-mmd'

export const Model = () => {
  const playing = usePlaying()

  const examples = 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/'
  const pmx = 'https://cdn.jsdelivr.net/gh/iampingoo/SampleWebMMD-master/pmx/'

  const {
    animationPath,
    audioDelayTime,
    audioPath,
    modelPath,
    modelScale,
  } = useControls('Assets', {
    animationPath: `${examples}models/mmd/vmds/wavefile_v2.vmd`,
    audioDelayTime: 160 * 1 / 30,
    audioPath: `${examples}models/mmd/audios/wavefile_short.mp3`,
    modelPath: `${pmx}miku/Tda式初音ミク・アペンド_Ver1.10.pmx`,
    modelScale: {
      max: 0.2,
      min: 0.01,
      step: 0.01,
      value: 0.08,
    },
  })

  useEffect(() => {
    (async () => {
      await AmmoPhysics()
    })()
  }, [])

  const [helper] = useMMDAnimationHelper()
  const model = useMMD(modelPath)

  const [listener] = useAudioListener()
  const [audio] = useAudio(listener)
  const buffer = useAudioBuffer(audioPath)

  const clock = new Clock()

  useEffect(() => {
    const loader = new MMDLoader()

    loader.loadAnimation(animationPath, model, (animation) => {
      model.animations.push(animation as AnimationClip)
      helper.add(model, { animation: model.animations, physics: true })
    })

    audio.setBuffer(buffer)
    helper.add(audio, { delayTime: audioDelayTime })

    return () => {
      helper.remove(audio)
      audio.stop()
      audio.disconnect()
    }
  }, [animationPath, audio, audioDelayTime, buffer, helper, listener, model])

  useEffect(() => {
    const mixer = helper?.objects.get(model)?.mixer

    if (!mixer)
      return

    model.animations.forEach((animation) => {
      const action = mixer.clipAction(animation)
      if (!playing) {
        action.timeScale = 0
      }
      else if (!action.isRunning()) {
        action.timeScale = 1
        action.play()
      }
    })

    if (!playing) {
      audio.pause()
    }
    else if (!audio.isPlaying && audio.context.currentTime > audioDelayTime) {
      audio.play()
    }
  }, [audio, audioDelayTime, helper, model, playing])

  useFrame(() => playing && helper.update(clock.getDelta()))

  return (
    <primitive castShadow object={model} scale={modelScale} />
  )
}
