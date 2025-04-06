import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'
import { SRGBColorSpace } from 'three'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    pumpkin_body: Mesh
    pumpkin_tail: Mesh
  }
  materials: Record<string, never>
}

interface PumpkinProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const Pumpkin = forwardRef<Group, PumpkinProps>((props, ref) => {
  const { nodes } = useGLTF('./experience/pumpkin.glb') as unknown as GLTFResult

  const matcapPumpkin = useTexture('./experience/matcap_pumpkin.png')
  const matcapLeaves = useTexture('./experience/matcap_leaves.png')

  matcapPumpkin.colorSpace = SRGBColorSpace
  matcapLeaves.colorSpace = SRGBColorSpace

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.pumpkin_body.geometry}>
        <meshMatcapMaterial matcap={matcapPumpkin} />
      </mesh>
      <mesh geometry={nodes.pumpkin_tail.geometry}>
        <meshMatcapMaterial matcap={matcapLeaves} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/pumpkin.glb')
useTexture.preload('./experience/matcap_pumpkin.png')
useTexture.preload('./experience/matcap_leaves.png')

export { Pumpkin }
