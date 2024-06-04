import { Canvas } from '@react-three/fiber'

import { ExperienceContent } from './experience-content'

const ExperienceWrapper = () => {
  return (
    <Canvas flat className="cursor-none">
      <ExperienceContent />
    </Canvas>
  )
}

export { ExperienceWrapper as Experience }
