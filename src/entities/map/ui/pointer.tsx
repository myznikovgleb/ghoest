import { forwardRef } from 'react'

import type { Mesh } from 'three'

const POINTER_ELEVATION = 0.02

interface PointerProps {
  opacity?: number
}

const Pointer = forwardRef<Mesh, PointerProps>((props, ref) => {
  const { opacity = 1.0 } = props

  return (
    <mesh
      ref={ref}
      position={[0, POINTER_ELEVATION, 0]}
      rotation-x={-Math.PI / 2}
    >
      <ringGeometry args={[0.1, 0.2]} />
      <meshStandardMaterial opacity={opacity} transparent />
    </mesh>
  )
})

export { Pointer }
