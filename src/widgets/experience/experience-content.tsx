import { Environment, OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'

import { Map } from '@/entities/map'
import { Player } from '@/entities/player'
import { useIsDebug } from '@/shared/utils/hooks'

const ExperienceContent = () => {
  const isDebug = useIsDebug()

  const { camera } = useThree()

  const [cameraPositionDebug] = useState(new Vector3(0, 2, 4))
  const [cameraTargetDebug] = useState(new Vector3(0, 0, 0))

  useEffect(() => {
    if (isDebug) {
      camera.position.copy(cameraPositionDebug)

      camera.lookAt(cameraTargetDebug)
    }
  }, [camera, cameraPositionDebug, cameraTargetDebug, isDebug])

  return (
    <>
      <Environment preset="city" />

      {isDebug && <OrbitControls />}

      <Physics debug={isDebug}>
        <Player />
        <Map />
      </Physics>
    </>
  )
}

export { ExperienceContent }
