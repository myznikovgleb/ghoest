import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tree_bottom: Mesh
    tree_top: Mesh
  }
  materials: Record<string, never>
}

interface TreeProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const Tree = forwardRef<Group, TreeProps>((props, ref) => {
  const { nodes } = useGLTF('./experience/tree.glb') as GLTFResult

  const matcapLeaves = useTexture('./experience/matcap_leaves.png')
  const matcapTrunk = useTexture('./experience/matcap_wood.png')

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.tree_bottom.geometry}>
        <meshMatcapMaterial matcap={matcapTrunk} />
      </mesh>
      <mesh geometry={nodes.tree_top.geometry}>
        <meshMatcapMaterial matcap={matcapLeaves} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/tree.glb')
useTexture.preload('./experience/matcap_leaves.png')
useTexture.preload('./experience/matcap_wood.png')

export { Tree }
