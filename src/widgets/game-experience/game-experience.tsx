import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

import { Ground, Player } from '@/entities'

const GameExperience = () => {
  return (
    <Canvas camera={{ position: [0, 4, 0] }} className="cursor-pointer">
      <Environment preset="city" />

      <OrbitControls />

      <Physics>
        <Player />
        <Ground />
      </Physics>
    </Canvas>
  )
}

export { GameExperience }
