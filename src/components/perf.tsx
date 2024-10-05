import { useControls } from 'leva'
import { Perf as R3FPerf } from 'r3f-perf'

export const Perf = () => {
  const { showPerf } = useControls('Debug', {
    showPerf: import.meta.env.DEV,
  })

  return showPerf && (<R3FPerf position="top-left" />)
}
