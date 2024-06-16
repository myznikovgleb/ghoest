import { OrbitControls } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'

import { Map } from '@/entities/map'
import { Player } from '@/entities/player'

enum ExperienceState {
  Pending,
  Mounted,
  PhysicsLaunched,
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

  const { camera } = useThree()

  const [experienceState, setExperienceState] = useState<ExperienceState>(
    ExperienceState.Pending
  )

  useEffect(() => {
    switch (experienceState) {
      case ExperienceState.Pending: {
        setExperienceState(ExperienceState.Mounted)
        break
      }
      case ExperienceState.Mounted: {
        setExperienceState(ExperienceState.PhysicsLaunched)
        break
      }
      case ExperienceState.PhysicsLaunched:
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
      case ExperienceState.PhysicsLaunched:
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

      <Physics debug={isDebugPhysics}>
        {(experienceState === ExperienceState.Mounted ||
          experienceState === ExperienceState.PhysicsLaunched) && <Map />}
        {experienceState === ExperienceState.PhysicsLaunched && (
          <Player isStickedCamera={isStickedCamera} />
        )}
      </Physics>
    </>
  )
}

export { ExperienceContent }
