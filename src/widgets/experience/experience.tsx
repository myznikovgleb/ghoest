import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

import { Map, Player } from '@/entities'

const Experience = () => {
  return (
    <Canvas camera={{ position: [0, 2, -4] }} className="cursor-pointer">
      <Environment preset="city" />

      <OrbitControls />

      <Physics>
        <Player />
        <Map />
      </Physics>
    </Canvas>
  )
}

export { Experience }
