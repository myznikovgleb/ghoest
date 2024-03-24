import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RigidBody, vec3 } from '@react-three/rapier'
import { useRef } from 'react'

import { Ghost } from '@/shared/resources'

import { usePlayerStore } from '..'

import type { RapierRigidBody } from '@react-three/rapier'
import type { Group } from 'three'

const Player = () => {
  const refRigidBody = useRef<RapierRigidBody>(null)
  const refModel = useRef<Group>(null)

  const position = usePlayerStore((state) => state.position)

  useFrame((_, delta) => {
    if (!refRigidBody.current) {
      return
    }

    const prevPosition = vec3(refRigidBody.current.translation())
    const nextPosition = vec3({
      x: position[0],
      y: 0.5,
      z: position[2],
    })

    const diff = nextPosition.sub(prevPosition)
    const direction = diff.clone().normalize()
    const translation = direction.clone().multiplyScalar(100)

    if (diff.length() > 0.5) {
      refRigidBody.current.setLinvel(translation.multiplyScalar(delta), true)
    }

    if (!refModel.current) {
      return
    }

    if (diff.length() > 0.5) {
      refModel.current.lookAt(
        prevPosition.add(translation).sub(vec3({ x: 0, y: 0.5, z: 0 }))
      )
    }
  })

  return (
    <RigidBody
      colliders={false}
      lockRotations
      ref={refRigidBody}
      position-y={0.5}
    >
      <CuboidCollider args={[0.5, 0.5, 0.5]} />
      <Ghost ref={refModel} position-y={-0.25} />
    </RigidBody>
  )
}

export { Player }
