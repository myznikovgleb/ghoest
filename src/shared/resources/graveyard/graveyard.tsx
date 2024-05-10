import { useGLTF } from '@react-three/drei'

import type { Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ground: Mesh
    earth: Mesh
    grave_001: Mesh
    grave_002: Mesh
  }
  materials: {
    ground: MeshStandardMaterial
    earth: MeshStandardMaterial
    grave: MeshStandardMaterial
  }
}

interface GraveyardProps {
  position?: Vector3Tuple
}

const Graveyard = (props: GraveyardProps) => {
  const { position = [0, 0, 0] } = props

  const { nodes, materials } = useGLTF(
    './experience/graveyard.glb'
  ) as GLTFResult

  return (
    <group dispose={null} position={position}>
      <mesh geometry={nodes.ground.geometry} material={materials.ground} />
      <mesh geometry={nodes.earth.geometry} material={materials.earth} />
      <mesh geometry={nodes.grave_001.geometry} material={materials.grave} />
      <mesh geometry={nodes.grave_002.geometry} material={materials.grave} />
    </group>
  )
}

useGLTF.preload('./experience/graveyard.glb')

export { Graveyard }
