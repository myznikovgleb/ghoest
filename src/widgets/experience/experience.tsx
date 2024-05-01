import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

import { Map } from '@/entities/map'
import { Player } from '@/entities/player'

interface ExperienceProps {
  isDebug: boolean
}

const Experience = (props: ExperienceProps) => {
  const { isDebug } = props

  return (
    <Canvas camera={{ position: [0, 2, 4] }} className="cursor-pointer">
      <Environment preset="city" />

      {isDebug && <OrbitControls />}

      <Physics debug={isDebug}>
        <Player />
        <Map />
      </Physics>
    </Canvas>
  )
}

export { Experience }
