import { Vector3Tuple } from 'three'

interface PointerProps {
  position?: Vector3Tuple
  intensity?: number
}

const Pointer = (props: PointerProps) => {
  const { position = [0, 0 + 0.01, 0] } = props

  return (
    <mesh position={position} rotation-x={-Math.PI / 2}>
      <ringGeometry args={[0.1, 0.2]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export { Pointer }
