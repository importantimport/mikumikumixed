import type { AnimationClip } from 'three'

import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useEffect } from 'react'
import { Audio, Clock } from 'three'
import { AmmoPhysics, MMDLoader } from 'three/examples/jsm/Addons.js'

import { useAudioBuffer, useAudioListener } from '../hooks/use-audio'
import { useMMD, useMMDAnimationHelper } from '../hooks/use-mmd'

export const Model = () => {
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
      max: 1,
      min: 0.01,
      value: 0.1,
    },

  })

  useEffect(() => {
    (async () => {
      await AmmoPhysics()
    })()
  }, [])

  const [helper] = useMMDAnimationHelper()
  const model = useMMD(modelPath)
  const buffer = useAudioBuffer(audioPath)
  const [listener] = useAudioListener()

  const clock = new Clock()

  useEffect(() => {
    const loader = new MMDLoader()
    loader.loadAnimation(animationPath, model, (animation) => {
      model.animations.push(animation as AnimationClip)
      helper.add(model, { animation: model.animations, physics: true })
      const audio = new Audio(listener).setBuffer(buffer)
      helper.add(audio, { delayTime: audioDelayTime })
    })
  }, [animationPath, audioDelayTime, buffer, helper, listener, model])

  const { play } = useControls({ play: false })

  useEffect(() => {
    const mixer = helper?.objects.get(model)?.mixer

    if (!mixer)
      return

    model.animations.forEach((animation) => {
      const action = mixer.clipAction(animation)
      if (!play) {
        action.timeScale = 0
      }
      else if (!action.isRunning()) {
        action.timeScale = 1
        action.play()
      }
    })
  }, [helper, model, play])

  useFrame(() => play && helper.update(clock.getDelta()))

  return (<primitive castShadow object={model} scale={modelScale} />)
}
