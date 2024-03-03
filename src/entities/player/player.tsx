import { useGLTF } from '@react-three/drei'
// @ts-expect-error miss type declaration
import Ecctrl from 'ecctrl'

const Player = () => {
  const gltf = useGLTF('./experience/ghost.glb')
  return (
    <Ecctrl mode="PointToMove">
      <primitive object={gltf.scene} position-y={-0.5} rotation-y={Math.PI} />
    </Ecctrl>
  )
}

useGLTF.preload('./experience/ghost.glb')

export { Player }
