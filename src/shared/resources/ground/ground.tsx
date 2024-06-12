import { ContactShadows, useTexture } from '@react-three/drei'
import { forwardRef } from 'react'

import type { Group } from 'three'

interface GroundProps {
  scale?: number
}

const CONTACT_SHADOWS_OFFSET = 0.01

const Ground = forwardRef<Group, GroundProps>((props, ref) => {
  const { scale = 1 } = props

  const matcapGrass = useTexture('./experience/matcap_grass.png')

  return (
    <group ref={ref}>
      <mesh scale={[scale, 1, scale]} position={[0, -0.1, 0]}>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshMatcapMaterial matcap={matcapGrass} />
      </mesh>

      <ContactShadows
        scale={scale}
        blur={30 / scale}
        resolution={1024}
        near={-CONTACT_SHADOWS_OFFSET}
        position={[0, CONTACT_SHADOWS_OFFSET, 0]}
        opacity={0.5}
      />
    </group>
  )
})

useTexture.preload('./experience/matcap_grass.png')

export { Ground }
