import { RigidBody } from '@react-three/rapier'
import { useState } from 'react'

import { Pointer } from './pointer'
import { Tile } from './tile'

import type { ThreeEvent } from '@react-three/fiber'
import type { Vector3Tuple } from 'three'

import { usePlayerStore } from '..'

const Map = () => {
  const [pointerPosition, setPointerPosition] = useState<Vector3Tuple>([
    0,
    0 + 0.01,
    0,
  ])

  const setPosition = usePlayerStore((state) => state.setPosition)

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPointerPosition((prevPointerPosition) => {
      return [point.x, prevPointerPosition[1], point.z]
    })
  }

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPosition([point.x, point.y, point.z])
  }

  return (
    <group>
      <Pointer position={pointerPosition} />
      <RigidBody type="fixed">
        <group onPointerMove={onPointerMove} onPointerDown={onPointerDown}>
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
