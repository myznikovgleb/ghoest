import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'

import type { Group } from 'three'

const POINTER_ELEVATION = 0.02

interface PointerProps {
  isPulsing?: boolean
}

const Pointer = forwardRef<Group, PointerProps>((props, ref) => {
  const { isPulsing = true } = props

  const refGroup = useRef<Group>(null)

  const matcapPointer = useTexture('./experience/matcap_pointer.png')

  const pulsingAnimation = (elapsedTime: number) => {
    if (!refGroup.current) {
      return
    }

    const phi = (elapsedTime % 1) * 2 * Math.PI

    const scaleUnit = (Math.sin(phi) + 1) * 0.5
    const scale = scaleUnit * 0.5 + 1

    refGroup.current.scale.x = scale
    refGroup.current.scale.z = scale
  }

  useFrame((state) => {
    if (isPulsing) {
      pulsingAnimation(state.clock.elapsedTime)
    }
  })

  return (
    <group ref={ref}>
      <group ref={refGroup}>
        <group position={[0, POINTER_ELEVATION, 0]} scale={[0.15, 1, 0.15]}>
          <mesh rotation-x={-Math.PI / 2}>
            <ringGeometry />
            <meshMatcapMaterial matcap={matcapPointer} />
          </mesh>
        </group>
      </group>
    </group>
  )
})

useTexture.preload('./experience/matcap_pointer.png')

export { Pointer }
