import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useEffect } from 'react'
import { Vector3 } from 'three'

import { Map } from '@/entities/map'
import { Player } from '@/entities/player'

interface ExperienceContentProps {
  isEnabledControls?: boolean
  isDebugPhysics?: boolean
  isStickedCamera?: boolean
}

const ExperienceContent = (props: ExperienceContentProps) => {
  const {
    isDebugPhysics = false,
    isEnabledControls = false,
    isStickedCamera = false,
  } = props

  const { camera } = useThree()

  useEffect(() => {
    if (isStickedCamera) {
      const cameraPositionDebug = new Vector3(0, 4, 4)
      const cameraTargetDebug = new Vector3(0, 0, 0)

      camera.position.copy(cameraPositionDebug)
      camera.lookAt(cameraTargetDebug)
    }
  }, [camera, isStickedCamera])

  return (
    <>
      {isEnabledControls && <OrbitControls />}

      <Physics debug={isDebugPhysics}>
        <Player isStickedCamera={isStickedCamera} />
        <Map />
      </Physics>
    </>
  )
}

export { ExperienceContent }
