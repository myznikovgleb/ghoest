import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

import { usePlayerStore } from '..'

const Player = () => {
  const gltf = useGLTF('./experience/ghost.glb')
  const position = usePlayerStore((state) => state.position)

  return (
    <RigidBody position={[...position]}>
      <primitive object={gltf.scene} />
    </RigidBody>
  )
}

useGLTF.preload('./experience/ghost.glb')

export { Player }
