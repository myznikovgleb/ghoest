import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'

import type { Group, Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ground: Mesh
    earth: Mesh
    tree: Mesh
  }
  materials: {
    ground: MeshStandardMaterial
    earth: MeshStandardMaterial
    wood: MeshStandardMaterial
  }
}

interface TreeProps {
  position?: Vector3Tuple
}

const Tree = forwardRef<Group, TreeProps>((props, ref) => {
  const { nodes, materials } = useGLTF('experience/tree.glb') as GLTFResult

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.ground.geometry} material={materials.ground} />
      <mesh geometry={nodes.earth.geometry} material={materials.earth} />
      <mesh geometry={nodes.tree.geometry} material={materials.wood} />
    </group>
  )
})

useGLTF.preload('experience/tree.glb')

export { Tree }
