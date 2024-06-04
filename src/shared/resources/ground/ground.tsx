import { ContactShadows, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'

import type { Group, Vector3Tuple } from 'three'

interface GroundProps {
  scale: Vector3Tuple
}

const CONTACT_SHADOWS_OFFSET = 0.01

const Ground = forwardRef<Group, GroundProps>((props, ref) => {
  const { scale } = props

  const matcapGrass = useTexture('./experience/matcap_grass.png')

  return (
    <group ref={ref}>
      <mesh scale={scale} position={[0, -0.1, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshMatcapMaterial matcap={matcapGrass} />
      </mesh>

      <ContactShadows
        scale={[scale[0] * 2, scale[2] * 2]}
        blur={10 / Math.max(scale[0], scale[2])}
        resolution={1024}
        near={-CONTACT_SHADOWS_OFFSET}
        position={[0, CONTACT_SHADOWS_OFFSET, 0]}
        opacity={0.25}
      />
    </group>
  )
})

useTexture.preload('./experience/matcap_grass.png')

export { Ground }
