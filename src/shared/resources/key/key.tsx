import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'
import { SRGBColorSpace } from 'three'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    key_bar: Mesh
    key_bit: Mesh
  }
  materials: Record<string, never>
}

interface KeyProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const Key = forwardRef<Group, KeyProps>((props, ref) => {
  const { nodes } = useGLTF('./experience/key.glb') as unknown as GLTFResult

  const matcapGold = useTexture('./experience/matcap_gold.png')
  matcapGold.colorSpace = SRGBColorSpace

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.key_bar.geometry}>
        <meshMatcapMaterial matcap={matcapGold} />
      </mesh>
      <mesh geometry={nodes.key_bit.geometry}>
        <meshMatcapMaterial matcap={matcapGold} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/key.glb')
useTexture.preload('./experience/matcap_gold.png')

export { Key }
