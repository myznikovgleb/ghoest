import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Player = () => {
  const gltf = useGLTF('./experience/ghost.glb')
  return (
    <RigidBody>
      <primitive object={gltf.scene} />
    </RigidBody>
  )
}

useGLTF.preload('./experience/ghost.glb')

export { Player }
