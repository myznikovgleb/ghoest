import { useGLTF } from '@react-three/drei'

import type { Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ground: Mesh
    earth: Mesh
  }
  materials: {
    ground: MeshStandardMaterial
    earth: MeshStandardMaterial
  }
}

interface GroundProps {
  position?: Vector3Tuple
}

const Ground = (props: GroundProps) => {
  const { position = [0, 0, 0] } = props

  const { nodes, materials } = useGLTF('./experience/ground.glb') as GLTFResult

  return (
    <group dispose={null} position={position}>
      <mesh geometry={nodes.ground.geometry} material={materials.ground} />
      <mesh geometry={nodes.earth.geometry} material={materials.earth} />
    </group>
  )
}

useGLTF.preload('./experience/ground.glb')

export { Ground }
