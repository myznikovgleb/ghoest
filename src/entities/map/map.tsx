import { RigidBody } from '@react-three/rapier'
import { useState } from 'react'

import { usePlayerStore } from '..'

import { Pointer } from './pointer'
import { TileSet } from './tileset'

import type { ThreeEvent } from '@react-three/fiber'
import type { Vector3Tuple } from 'three'

const Map = () => {
  const setPosition = usePlayerStore((state) => state.setPosition)

  const [pointerPosition, setPointerPosition] = useState<Vector3Tuple>([
    0, 0, 0,
  ])
  const [pointerOpacity, setPointerOpacity] = useState<number>(0.75)

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
      <Pointer position={pointerPosition} opacity={pointerOpacity} />
      <RigidBody type="fixed">
        <TileSet
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        />
      </RigidBody>
    </group>
  )
}

export { Map }
