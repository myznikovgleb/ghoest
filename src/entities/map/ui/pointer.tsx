import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { forwardRef, useRef } from 'react'

import type { Group } from 'three'

const POINTER_ELEVATION = 0.02

interface PointerProps {
  isPartiallyTransparent?: boolean
  isPulsing?: boolean
}

const Pointer = forwardRef<Group, PointerProps>((props, refExternal) => {
  const { isPartiallyTransparent = false, isPulsing = false } = props

  const refInternal = useRef<Group>(null)

  const matcapPointer = useTexture('./experience/matcap_pointer.png')

  const pulseAnimation = (elapsedTime: number) => {
    if (!refInternal.current) {
      return
    }

    const phi = elapsedTime * 2 * Math.PI

    const scaleUnit = (Math.sin(phi) + 1) * 0.5
    const scale = scaleUnit * 0.5 + 1

    refInternal.current.scale.x = scale
    refInternal.current.scale.z = scale
  }

  useFrame((state) => {
    if (isPulsing) {
      pulseAnimation(state.clock.elapsedTime)
    }
  })

  return (
    <group ref={refExternal}>
      <group ref={refInternal}>
        <group position={[0, POINTER_ELEVATION, 0]} scale={[0.15, 1, 0.15]}>
          <mesh rotation-x={-Math.PI / 2}>
            <ringGeometry />
            <meshMatcapMaterial
              matcap={matcapPointer}
              transparent={isPartiallyTransparent}
              opacity={isPartiallyTransparent ? 0.5 : 1.0}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
})

useTexture.preload('./experience/matcap_pointer.png')

export { Pointer }
