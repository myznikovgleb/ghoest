import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'
import { SRGBColorSpace } from 'three'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    fence_straight_bottom: Mesh
    fence_straight_mid: Mesh
    fence_straight_top: Mesh
  }
  materials: Record<string, never>
}

interface FenceStraightProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const FenceStraight = forwardRef<Group, FenceStraightProps>((props, ref) => {
  const { nodes } = useGLTF(
    './experience/fence_straight.glb'
  ) as unknown as GLTFResult

  const matcapRock = useTexture('./experience/matcap_rock.png')
  const matcapIron = useTexture('./experience/matcap_iron.png')

  matcapRock.colorSpace = SRGBColorSpace
  matcapIron.colorSpace = SRGBColorSpace

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.fence_straight_bottom.geometry}>
        <meshMatcapMaterial matcap={matcapRock} />
      </mesh>

      <mesh geometry={nodes.fence_straight_mid.geometry}>
        <meshMatcapMaterial matcap={matcapIron} />
      </mesh>

      <mesh geometry={nodes.fence_straight_top.geometry}>
        <meshMatcapMaterial matcap={matcapIron} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/fence_straight.glb')
useTexture.preload('./experience/matcap_rock.png')
useTexture.preload('./experience/matcap_iron.png')

export { FenceStraight }
