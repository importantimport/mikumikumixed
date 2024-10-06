import { createContextState } from 'foxact/context-state'
import { useCallback } from 'foxact/use-typescript-happy-callback'

const [PlayingProvider, usePlaying, useSetPlaying] = createContextState(false)

// eslint-disable-next-line react-refresh/only-export-components
export { PlayingProvider, usePlaying, useSetPlaying }

// eslint-disable-next-line react-refresh/only-export-components
export const useTogglePlaying = () => {
  const setPlaying = useSetPlaying()
  return useCallback(() => setPlaying(prevPlaying => !prevPlaying), [setPlaying])
}
