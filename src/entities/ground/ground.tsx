import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Ground = () => {
  const gltf = useGLTF('./experience/ground.glb')
  return (
    <RigidBody type="fixed">
      <primitive object={gltf.scene} />
    </RigidBody>
  )
}

useGLTF.preload('./experience/ground.glb')

export { Ground }
