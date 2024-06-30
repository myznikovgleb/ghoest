import { useCallback, useRef, useState } from 'react'

import { usePlayerStore } from '@/entities/player'

import { Pointer } from './pointer'
import { Tileset } from './tileset'

import type { ThreeEvent } from '@react-three/fiber'
import type { Group, Vector3 } from 'three'

const Map = () => {
  const setPosition = usePlayerStore((state) => state.setPosition)

  const [isCursorMoved, setIsCursorMoved] = useState<boolean>(false)

  const refPointerTarget = useRef<Group>(null)
  const refPointerShadow = useRef<Group>(null)

  const setPointerPosition = (point: Vector3, pointer: Group | null) => {
    if (!pointer) {
      return
    }

    pointer.position.x = point.x
    pointer.position.z = point.z
  }

  const onPointerMove = useCallback((event: ThreeEvent<PointerEvent>) => {
    const { point, pointerType } = event

    if (pointerType !== 'mouse') {
      return
    }

    setIsCursorMoved(true)

    setPointerPosition(point, refPointerShadow.current)
  }, [])

  const onPointerUp = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      const { point } = event

      setPointerPosition(point, refPointerTarget.current)
      setPosition([point.x, point.y, point.z])
    },
    [setPosition]
  )

  return (
    <group>
      <Pointer ref={refPointerTarget} isPulsing />
      {isCursorMoved && (
        <Pointer ref={refPointerShadow} isPartiallyTransparent />
      )}

      <Tileset onPointerMove={onPointerMove} onPointerUp={onPointerUp} />
    </group>
  )
}

export { Map }
