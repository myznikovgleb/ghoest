import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Suspense, useEffect, useState } from 'react'
import { Vector3 } from 'three'

import { Map } from '@/entities/map'
import { Player } from '@/entities/player'

enum ExperienceState {
  Pending,
  Mounted,
}

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

  const camera = useThree((state) => state.camera)

  const [experienceState, setExperienceState] = useState<ExperienceState>(
    ExperienceState.Pending
  )

  useEffect(() => {
    switch (experienceState) {
      case ExperienceState.Pending: {
        setExperienceState(ExperienceState.Mounted)
        break
      }
      case ExperienceState.Mounted:
      default: {
        break
      }
    }
  }, [experienceState])

  useEffect(() => {
    const stickCamera = () => {
      const cameraPositionDebug = new Vector3(0, 4, 4)
      const cameraTargetDebug = new Vector3(0, 0, 0)

      camera.position.copy(cameraPositionDebug)
      camera.lookAt(cameraTargetDebug)
    }

    switch (experienceState) {
      case ExperienceState.Pending: {
        stickCamera()

        break
      }
      case ExperienceState.Mounted:
      default: {
        if (!isStickedCamera) {
          break
        }

        stickCamera()

        break
      }
    }
  }, [experienceState, isStickedCamera, camera])

  return (
    <>
      {isEnabledControls && <OrbitControls />}

      <Suspense>
        <Physics debug={isDebugPhysics}>
          <Player isStickedCamera={isStickedCamera} />
          <Map />
        </Physics>
      </Suspense>
    </>
  )
}

export { ExperienceContent }
