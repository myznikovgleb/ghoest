import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useState } from 'react'

import { usePlayerStore } from '..'

import { Pointer } from './pointer'
import { Tile } from './tile'

import type { ThreeEvent } from '@react-three/fiber'
import type { Vector3Tuple } from 'three'

const Map = () => {
  const setPosition = usePlayerStore((state) => state.setPosition)

  const [pointerPosition, setPointerPosition] = useState<Vector3Tuple>([
    0, 0, 0,
  ])
  const [pointerOpcacity, setPointerOpacity] = useState<number>(0.75)

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPointerPosition([point.x, point.y, point.z])
  }

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPointerOpacity(1.0)
    setPointerPosition([point.x, point.y, point.z])

    setPosition([point.x, point.y, point.z])
  }

  const onPointerUp = () => {
    setPointerOpacity(0.75)
  }

  return (
    <group>
      <Pointer position={pointerPosition} opacity={pointerOpcacity} />
      <RigidBody type="fixed" colliders={false} position-y={-0.125}>
        <CuboidCollider args={[3, 0.125, 3]} />
        <group
          position-y={0.125}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <Tile position={[-2, 0, -2]} />
          <Tile position={[-2, 0, 0]} />
          <Tile position={[-2, 0, 2]} />
          <Tile position={[0, 0, -2]} />
          <Tile position={[0, 0, 0]} />
          <Tile position={[0, 0, 2]} />
          <Tile position={[2, 0, -2]} />
          <Tile position={[2, 0, 0]} />
          <Tile position={[2, 0, 2]} />
        </group>
      </RigidBody>
    </group>
  )
}

export { Map }
