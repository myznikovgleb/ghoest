import { Environment, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

import { Ground, Player } from '@/entities'

const GameExperience = () => {
  return (
    <Canvas className="cursor-pointer">
      <Environment preset="city" />

      <OrbitControls />

      <Physics debug>
        <Player />
        <Ground />
      </Physics>
    </Canvas>
  )
}

export { GameExperience }
