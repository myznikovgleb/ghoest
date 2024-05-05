import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useMemo, useRef, useState } from 'react'
import { Euler, Object3D, Quaternion, Vector3 } from 'three'

import { Ghost } from '@/shared/resources'
import { approximatelyEqual } from '@/shared/utils/math'

import { usePlayerStore } from '..'

import type { RapierRigidBody } from '@react-three/rapier'
import type { Camera, Group } from 'three'

const FACTOR_ROTATION = 5
const FACTOR_VELOCITY = 10
const FACTOR_FORCE_DAMPING = 0.5
const FACTOR_CAMERA_SMOOTH = 5

const Player = () => {
  const capsuleCollider = usePlayerStore((state) => state.capsuleCollider)
  const nextPositionSerialized = usePlayerStore((state) => state.position)

  const refRigidBody = useRef<RapierRigidBody>(null)
  const refModel = useRef<Group>(null)

  const [cameraPositionCoarse] = useState(new Vector3())
  const [cameraPositionSmooth] = useState(new Vector3())
  const [cameraPositionShift] = useState(new Vector3(0, 1, 4))

  const [cameraTargetCoarse] = useState(new Vector3())
  const [cameraTargetSmooth] = useState(new Vector3())
  const [cameraTargetShift] = useState(new Vector3(0, 0.5, 0))

  const prevPosition = useMemo<Vector3>(() => new Vector3(), [])
  const prevVelocity = useMemo<Vector3>(() => new Vector3(), [])

  const nextPosition = useMemo<Vector3>(() => new Vector3(), [])
  const nextVelocity = useMemo<Vector3>(() => new Vector3(), [])

  const nextEuler = useMemo<Euler>(() => new Euler(), [])
  const nextQuaternion = useMemo<Quaternion>(() => new Quaternion(), [])

  const diffPosition = useMemo<Vector3>(() => new Vector3(), [])

  const stepModel = useMemo<Object3D>(() => new Object3D(), [])
  const stepDirection = useMemo<Vector3>(() => new Vector3(), [])
  const stepAcceleration = useMemo<Vector3>(() => new Vector3(), [])
  const stepForce = useMemo<Vector3>(() => new Vector3(), [])
  const stepImpulse = useMemo<Vector3>(() => new Vector3(), [])

  const vectorZ = useMemo<Vector3>(() => new Vector3(0, 0, 1), [])

  const bufferVector = useMemo<Vector3>(() => new Vector3(), [])

  const setMovement = () => {
    if (!refRigidBody.current || !refModel.current) {
      return
    }

    prevPosition.copy(refRigidBody.current.translation())
    nextPosition.set(...nextPositionSerialized)
    diffPosition.set(
      nextPosition.x - prevPosition.x,
      0,
      nextPosition.z - prevPosition.z
    )

    bufferVector.crossVectors(vectorZ, diffPosition)
    nextEuler.y = Math.sign(bufferVector.y) * vectorZ.angleTo(diffPosition)
    nextQuaternion.setFromEuler(nextEuler)

    stepDirection.copy(vectorZ).applyQuaternion(stepModel.quaternion)

    prevVelocity.copy(refRigidBody.current.linvel())
    nextVelocity
      .set(stepDirection.x, 0, stepDirection.z)
      .multiplyScalar(FACTOR_VELOCITY)
    stepAcceleration.subVectors(nextVelocity, prevVelocity)

    stepForce.copy(stepAcceleration).multiplyScalar(refRigidBody.current.mass())

    const isRotationCompleted = approximatelyEqual(
      Math.sin(nextEuler.y),
      Math.sin(stepModel.rotation.y),
      3
    )

    if (!isRotationCompleted) {
      stepForce.multiplyScalar(FACTOR_FORCE_DAMPING)
    }
  }

  const setCamera = (camera: Camera) => {
    cameraPositionCoarse.copy(prevPosition).add(cameraPositionShift)
    cameraPositionSmooth.lerp(cameraPositionCoarse, FACTOR_CAMERA_SMOOTH)
    camera.position.copy(cameraPositionCoarse)

    cameraTargetCoarse.copy(prevPosition).add(cameraTargetShift)
    cameraTargetSmooth.lerp(cameraTargetCoarse, FACTOR_CAMERA_SMOOTH)
    camera.lookAt(cameraPositionCoarse)
  }

  const step = (delta: number) => {
    if (!refRigidBody.current || !refModel.current) {
      return
    }

    const hasSpaceToMove = diffPosition.length() > capsuleCollider.radius * 1.5
    if (!hasSpaceToMove) {
      return
    }

    stepModel.quaternion.rotateTowards(nextQuaternion, delta * FACTOR_ROTATION)
    refModel.current.quaternion.copy(stepModel.quaternion)

    stepImpulse.copy(stepForce).multiplyScalar(delta)
    refRigidBody.current.applyImpulse(stepImpulse, true)
  }

  useFrame((state, delta) => {
    setCamera(state.camera)
    setMovement()

    step(delta)
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
