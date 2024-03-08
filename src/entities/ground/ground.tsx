import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

import type { Mesh, MeshStandardMaterial } from 'three'
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

const Ground = () => {
  const { nodes, materials } = useGLTF('./experience/ground.glb') as GLTFResult

  return (
    <RigidBody type="fixed">
      <group>
        <group dispose={null} position={[0, 0, 0]}>
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
        <group dispose={null} position={[2, 0, 0]}>
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
        <group dispose={null} position={[0, 0, 2]}>
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
        <group dispose={null} position={[2, 0, 2]}>
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
      </group>
    </RigidBody>
  )
}

useGLTF.preload('./experience/ground.glb')

export { Ground }
