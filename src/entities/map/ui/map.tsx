import { RigidBody } from '@react-three/rapier'
import { useRef } from 'react'

import { usePlayerStore } from '@/entities/player'

import { Pointer } from './pointer'
import { TileSet } from './tileset'

import type { ThreeEvent } from '@react-three/fiber'
import type { Group, Vector3 } from 'three'

const Map = () => {
  const setPosition = usePlayerStore((state) => state.setPosition)

  const refPointer = useRef<Group>(null)

  const setPointerPosition = (point: Vector3) => {
    if (!refPointer.current) {
      return
    }

    refPointer.current.position.x = point.x
    refPointer.current.position.z = point.z
  }

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPointerPosition(point)
  }

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPointerPosition(point)
    setPosition([point.x, point.y, point.z])
  }

  const onPointerUp = () => {}

  return (
    <group>
      <Pointer ref={refPointer} />

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
