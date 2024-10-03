import { useLoader } from '@react-three/fiber'
import { useState } from 'react'
import { MMDAnimationHelper, MMDLoader } from 'three/examples/jsm/Addons.js'

export const useMMD = (path: string) => useLoader(MMDLoader, path)

export const useMMDAnimationHelper = () => useState<MMDAnimationHelper>(new MMDAnimationHelper())
