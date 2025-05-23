import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'
import { SRGBColorSpace } from 'three'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    ghost: Mesh
  }
  materials: Record<string, never>
}

interface GhostProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const Ghost = forwardRef<Group, GhostProps>((props, ref) => {
  const { nodes } = useGLTF('./experience/ghost.glb') as unknown as GLTFResult

  const matcapBody = useTexture('./experience/matcap_body.png')
  matcapBody.colorSpace = SRGBColorSpace

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.ghost.geometry}>
        <meshMatcapMaterial matcap={matcapBody} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/ghost.glb')
useTexture.preload('./experience/matcap_body.png')

export { Ghost }
