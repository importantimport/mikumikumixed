import { useLoader } from '@react-three/fiber'
import { useState } from 'react'
import { Audio, AudioListener, AudioLoader } from 'three'

export const useAudio = (listener: AudioListener) => useState(() => new Audio(listener))

export const useAudioBuffer = (path: string) => useLoader(AudioLoader, path)

export const useAudioListener = () => useState<AudioListener>(new AudioListener())
