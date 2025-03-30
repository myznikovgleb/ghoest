import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'

import { useMapStore } from '@/entities/map'
import { usePlayerStore } from '@/entities/player'
import { Key as KeyModel } from '@/shared/resources'

import { useKeyStore } from '../model'

import type { Group, Vector3Tuple } from 'three'

const Key = () => {
  const { incrementKeys } = usePlayerStore()
  const { size: mapSize, tilemap } = useMapStore()
  const { flipPosition, position } = useKeyStore()

  const [isFirstIntersection, setIsFirstIntersection] = useState<boolean>(true)

  const [size] = useState<{ halfSize: number }>({ halfSize: 0.5 })

  const ref = useRef<Group>(null)

  const bounceAnimation = (elapsedTime: number) => {
    if (!ref.current) {
      return
    }

    const phi = elapsedTime * 2 * Math.PI

    ref.current.rotation.y = phi * 0.125

    const y = Math.sin(phi * 0.5) * size.halfSize * 0.25
    ref.current.position.y = y
  }

  useFrame((state) => {
    bounceAnimation(state.clock.elapsedTime)
  })

  const onIntersectionEnter = () => {
    if (isFirstIntersection) {
      setIsFirstIntersection(false)
    } else {
      incrementKeys()
    }

    const tileCandidates = tilemap['G']
    const tileCandidateIndex = Math.floor(tileCandidates.length * Math.random())
    const tileCandidate = tileCandidates[tileCandidateIndex]
    const tileCandidatePosition: Vector3Tuple = [
      tileCandidate[1] - mapSize * 0.5 + 0.5,
      0,
      tileCandidate[0] - mapSize * 0.5 + 0.5,
    ]

    flipPosition(tileCandidatePosition)
  }

  return (
    <RigidBody
      type="fixed"
      colliders={false}
      onIntersectionEnter={onIntersectionEnter}
    >
      <CuboidCollider
        sensor
        args={[size.halfSize * 0.5, size.halfSize * 0.5, size.halfSize * 0.5]}
        position={[position[0], position[1] + size.halfSize, position[2]]}
      />
      <group position={position}>
        <group ref={ref}>
          <KeyModel
            position={[0, size.halfSize * 2.0, 0]}
            rotation={[0, 0, Math.PI]}
          />
        </group>
      </group>
    </RigidBody>
  )
}

export { Key }
