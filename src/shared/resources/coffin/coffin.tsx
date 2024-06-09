import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    coffin_top: Mesh
    coffin_bottom: Mesh
  }
  materials: Record<string, never>
}

interface CoffinProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const Coffin = forwardRef<Group, CoffinProps>((props, ref) => {
  const { nodes } = useGLTF('./experience/coffin.glb') as GLTFResult

  const matcapWood = useTexture('./experience/matcap_wood.png')

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.coffin_top.geometry}>
        <meshMatcapMaterial matcap={matcapWood} />
      </mesh>
      <mesh geometry={nodes.coffin_bottom.geometry}>
        <meshMatcapMaterial matcap={matcapWood} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/coffin.glb')
useTexture.preload('./experience/matcap_wood.png')

export { Coffin }
