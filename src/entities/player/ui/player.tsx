import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, vec3 } from '@react-three/rapier'
import { useRef } from 'react'

import type { RapierRigidBody } from '@react-three/rapier'

import { usePlayerStore } from '..'

const Player = () => {
  const gltf = useGLTF('./experience/ghost.glb')

  const ref = useRef<RapierRigidBody>(null)

  const position = usePlayerStore((state) => state.position)

  useFrame(() => {
    if (!ref.current) {
      return
    }

    ref.current.setTranslation(
      vec3({ x: position[0], y: position[1], z: position[2] }),
      true
    )
  })

  return (
    <RigidBody ref={ref} lockRotations>
      <primitive object={gltf.scene} />
    </RigidBody>
  )
}

useGLTF.preload('./experience/ghost.glb')

export { Player }
