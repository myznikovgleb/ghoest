import { Canvas } from '@react-three/fiber'

import { useIsDebug } from '@/shared/utils/hooks'

import { ExperienceContent } from './experience-content'
import { ExperienceDebug } from './experience-debug'

const ExperienceWrapper = () => {
  const isDebug = useIsDebug()

  return (
    <Canvas flat className="cursor-pointer">
      {isDebug ? <ExperienceDebug /> : <ExperienceContent />}
    </Canvas>
  )
}

export { ExperienceWrapper as Experience }
