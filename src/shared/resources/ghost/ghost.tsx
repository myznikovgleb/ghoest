import { useGLTF } from '@react-three/drei'
import { forwardRef } from 'react'

import type { Group, Mesh, MeshStandardMaterial, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    body: Mesh
  }
  materials: {
    body: MeshStandardMaterial
  }
}

interface GhostProps {
  position?: Vector3Tuple
}

const Ghost = forwardRef<Group, GhostProps>((props, ref) => {
  const { nodes, materials } = useGLTF('experience/ghost.glb') as GLTFResult

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.body.geometry} material={materials.body} />
    </group>
  )
})

useGLTF.preload('experience/ghost.glb')

export { Ghost }
