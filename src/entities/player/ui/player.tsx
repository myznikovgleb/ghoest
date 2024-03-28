import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody, vec3 } from '@react-three/rapier'
import { useEffect, useRef } from 'react'

import { Ghost } from '@/shared/resources'

import { usePlayerStore } from '..'

import type { RapierRigidBody } from '@react-three/rapier'
import type { Group } from 'three'

const TRANSLATION_FACTOR = 100
const EPS_DISTANCE = 0.5

const Player = () => {
  const refRigidBody = useRef<RapierRigidBody>(null)
  const refModel = useRef<Group>(null)

  const capsuleCollider = usePlayerStore((state) => state.capsuleCollider)
  const position = usePlayerStore((state) => state.position)

  useEffect(() => {
    if (!refRigidBody.current) {
      return
    }

    refRigidBody.current.setTranslation(
      vec3({ x: 0, y: capsuleCollider.h * 2, z: 0 }),
      true
    )

    if (!refModel.current) {
      return
    }

    refModel.current.position.set(0, -capsuleCollider.h, 0)
    refModel.current.lookAt(0, -capsuleCollider.h, 1)
  }, [capsuleCollider])

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
      y: 0,
      z: prevPosition.z + translation.z,
    })

    if (distance > EPS_DISTANCE) {
      refModel.current.lookAt(target)
    }
  })

  return (
    <RigidBody ref={refRigidBody} colliders={false} lockRotations>
      <CapsuleCollider args={[capsuleCollider.h * 0.5, capsuleCollider.r]} />
      <Ghost ref={refModel} />
    </RigidBody>
  )
}

export { Player }
