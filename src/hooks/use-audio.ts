import { useLoader } from '@react-three/fiber'
import { useState } from 'react'
import { AudioListener, AudioLoader } from 'three'

export const useAudioBuffer = (path: string) => useLoader(AudioLoader, path)

export const useAudioListener = () => useState<AudioListener>(new AudioListener())
