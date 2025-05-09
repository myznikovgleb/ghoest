import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'
import { SRGBColorSpace } from 'three'

import type { Group, Mesh, Vector3Tuple } from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    grave: Mesh
  }
  materials: Record<string, never>
}

interface GraveyardProps {
  position?: Vector3Tuple
  rotation?: Vector3Tuple
}

const Graveyard = forwardRef<Group, GraveyardProps>((props, ref) => {
  const { nodes } = useGLTF(
    './experience/graveyard.glb'
  ) as unknown as GLTFResult

  const matcapRock = useTexture('./experience/matcap_rock.png')
  matcapRock.colorSpace = SRGBColorSpace

  return (
    <group ref={ref} dispose={null} {...props}>
      <mesh geometry={nodes.grave.geometry}>
        <meshMatcapMaterial matcap={matcapRock} />
      </mesh>
    </group>
  )
})

useGLTF.preload('./experience/graveyard.glb')
useTexture.preload('./experience/matcap_rock.png')

export { Graveyard }
