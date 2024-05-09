import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RigidBody } from '@react-three/rapier'
import { useRef, useState } from 'react'
import { Euler, Object3D, Quaternion, Vector3 } from 'three'

import { Ghost } from '@/shared/resources'
import { useIsDebug } from '@/shared/utils/hooks'
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

  const isDebug = useIsDebug()

  const refRigidBody = useRef<RapierRigidBody>(null)
  const refModel = useRef<Group>(null)

  const [cameraPositionCoarse] = useState<Vector3>(new Vector3())
  const [cameraPositionSmooth] = useState<Vector3>(new Vector3())
  const [cameraPositionShift] = useState<Vector3>(new Vector3(0, 1.0, 5.0))

  const [cameraTargetCoarse] = useState<Vector3>(new Vector3())
  const [cameraTargetSmooth] = useState<Vector3>(new Vector3())
  const [cameraTargetShift] = useState<Vector3>(new Vector3(0, 0, 0))

  const [prevPosition] = useState<Vector3>(new Vector3())
  const [prevVelocity] = useState<Vector3>(new Vector3())

  const [nextPosition] = useState<Vector3>(new Vector3())
  const [nextVelocity] = useState<Vector3>(new Vector3())

  const [nextEuler] = useState<Euler>(new Euler())
  const [nextQuaternion] = useState<Quaternion>(new Quaternion())

  const [diffPosition] = useState<Vector3>(new Vector3())

  const [stepModel] = useState<Object3D>(new Object3D())
  const [stepDirection] = useState<Vector3>(new Vector3())
  const [stepAcceleration] = useState<Vector3>(new Vector3())
  const [stepForce] = useState<Vector3>(new Vector3())
  const [stepImpulse] = useState<Vector3>(new Vector3())

  const [vectorZ] = useState<Vector3>(new Vector3(0, 0, 1))

  const [bufferVector] = useState<Vector3>(new Vector3())

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

  const stepMovement = (delta: number) => {
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

  const setCamera = () => {
    cameraPositionCoarse.copy(prevPosition).add(cameraPositionShift)

    cameraTargetCoarse.copy(prevPosition).add(cameraTargetShift)
  }

  const stepCamera = (camera: Camera, delta: number) => {
    cameraPositionSmooth.lerp(
      cameraPositionCoarse,
      delta * FACTOR_CAMERA_SMOOTH
    )
    camera.position.copy(cameraPositionCoarse)

    cameraTargetSmooth.lerp(cameraTargetCoarse, delta * FACTOR_CAMERA_SMOOTH)
    camera.lookAt(cameraTargetSmooth)
  }

  useFrame((state, delta) => {
    !isDebug && setCamera()
    setMovement()

    !isDebug && stepCamera(state.camera, delta)
    stepMovement(delta)
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
