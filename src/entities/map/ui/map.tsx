import { RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'

import { usePlayerStore } from '@/entities/player'

import { Pointer } from './pointer'
import { TileSet } from './tileset'

import type { ThreeEvent } from '@react-three/fiber'
import type { Mesh } from 'three'

const Map = () => {
  const setPosition = usePlayerStore((state) => state.setPosition)

  const refPointer = useRef<Mesh>(null)

  const [pointerOpacity, setPointerOpacity] = useState<number>(0.75)

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (!refPointer.current) {
      return
    }

    const { point } = event

    refPointer.current.position.x = point.x
    refPointer.current.position.z = point.z
  }

  const onPointerDown = (event: ThreeEvent<PointerEvent>) => {
    const { point } = event

    setPointerOpacity(1.0)

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
