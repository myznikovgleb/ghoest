import { Vector3Tuple } from 'three'

const POINTER_ELEVATION = 0.02

interface PointerProps {
  position: Vector3Tuple
  opacity?: number
}

const Pointer = (props: PointerProps) => {
  const { position, opacity = 1.0 } = props

  return (
    <mesh
      position={[position[0], POINTER_ELEVATION, position[2]]}
      rotation-x={-Math.PI / 2}
    >
      <ringGeometry args={[0.1, 0.2]} />
      <meshStandardMaterial opacity={opacity} transparent />
    </mesh>
  )
}

export { Pointer }
