import { useGLTF } from '@react-three/drei'

import type { Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    grave_001: Mesh
  }
  materials: {
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
      <mesh geometry={nodes.grave_001.geometry} material={materials.grave} />
    </group>
  )
}

useGLTF.preload('./experience/graveyard.glb')

export { Graveyard }
