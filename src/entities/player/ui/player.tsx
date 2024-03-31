import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import { useRef } from 'react'

import { Ghost } from '@/shared/resources'

import { usePlayerStore } from '..'

import type { RapierRigidBody } from '@react-three/rapier'
import type { Group } from 'three'

const TRANSLATION_FACTOR = 75
const EPS_DISTANCE = 1.0

const Player = () => {
  const refRigidBody = useRef<RapierRigidBody>(null)
  const refModel = useRef<Group>(null)

  const capsuleCollider = usePlayerStore((state) => state.capsuleCollider)
  const position = usePlayerStore((state) => state.position)

  useFrame((_, delta) => {
    if (!refRigidBody.current) {
      return
    }

    const prevPosition = vec3(refRigidBody.current.translation())
    const nextPosition = vec3({
      x: position[0],
      y: position[1],
      z: position[2],
    })

    const diff = vec3({
      x: nextPosition.x - prevPosition.x,
      y: 0,
      z: nextPosition.z - prevPosition.z,
    })
    const distance = diff.length()

    const direction = diff.clone().normalize()
    const translation = direction.clone().multiplyScalar(TRANSLATION_FACTOR)

    if (distance > EPS_DISTANCE) {
      refRigidBody.current.setLinvel(translation.multiplyScalar(delta), true)
    }

    if (!refModel.current) {
      return
    }

    const target = vec3({
      x: prevPosition.x + translation.x,
      y: prevPosition.y - capsuleCollider.halfHeight,
      z: prevPosition.z + translation.z,
    })

    if (distance > EPS_DISTANCE) {
      refModel.current.lookAt(target)
    }
  })

  return (
    <RigidBody
      ref={refRigidBody}
      colliders={false}
      lockRotations
      position={[0, capsuleCollider.halfHeight * 4, 0]}
    >
      <CapsuleCollider
        args={[capsuleCollider.halfHeight, capsuleCollider.radius]}
      />
      <Ghost ref={refModel} position={[0, -capsuleCollider.halfHeight, 0]} />
    </RigidBody>
  )
}

export { Player }
