import { useGLTF } from '@react-three/drei'

import type { Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ground: Mesh
    ground_tile_001: Mesh
    ground_tile_002: Mesh
    ground_tile_003: Mesh
    ground_tile_004: Mesh
  }
  materials: {
    ground: MeshStandardMaterial
    ground_tile: MeshStandardMaterial
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
      <mesh
        geometry={nodes.ground_tile_001.geometry}
        material={materials.ground_tile}
      />
      <mesh
        geometry={nodes.ground_tile_002.geometry}
        material={materials.ground_tile}
      />
      <mesh
        geometry={nodes.ground_tile_003.geometry}
        material={materials.ground_tile}
      />
      <mesh
        geometry={nodes.ground_tile_004.geometry}
        material={materials.ground_tile}
      />
    </group>
  )
}

useGLTF.preload('./experience/ground.glb')

export { Ground }
