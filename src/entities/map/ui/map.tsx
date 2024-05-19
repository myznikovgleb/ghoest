import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'

import { usePlayerStore } from '@/entities/player'

import { Pointer } from './pointer'
import { TileSet } from './tileset'

import type { ThreeEvent } from '@react-three/fiber'
import type { Mesh, Vector3 } from 'three'

const Map = () => {
  const setPosition = usePlayerStore((state) => state.setPosition)

  const refPointer = useRef<Mesh>(null)

  const [pointerOpacity, setPointerOpacity] = useState<number>(0.75)

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

    setPointerOpacity(1.0)

    setPointerPosition(point)
    setPosition([point.x, point.y, point.z])
  }

  const onPointerUp = () => {
    setPointerOpacity(0.75)
  }

  return (
    <group>
      <Pointer ref={refPointer} opacity={pointerOpacity} />
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
