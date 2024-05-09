import { useGLTF } from '@react-three/drei'

import type { Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    graveyard_ground: Mesh
    graveyard_grave_001: Mesh
    graveyard_grave_002: Mesh
    graveyard_grave_003: Mesh
  }
  materials: {
    ground: MeshStandardMaterial
    grave_light: MeshStandardMaterial
    grave_dark: MeshStandardMaterial
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
      <mesh
        geometry={nodes.graveyard_ground.geometry}
        material={materials.ground}
      />
      <mesh
        geometry={nodes.graveyard_grave_001.geometry}
        material={materials.grave_light}
        position={[0.5, 0, -0.3]}
        rotation={[0, 0.262, 0]}
      />
      <mesh
        geometry={nodes.graveyard_grave_002.geometry}
        material={materials.grave_light}
        position={[-0.5, 0, -0.6]}
        rotation={[0, -0.262, 0]}
      />
      <mesh
        geometry={nodes.graveyard_grave_003.geometry}
        material={materials.grave_dark}
        position={[-0.1, 0, 0.2]}
        rotation={[0, 0.436, 0]}
      />
    </group>
  )
}

useGLTF.preload('./experience/graveyard.glb')

export { Graveyard }
