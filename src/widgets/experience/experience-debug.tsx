import { useState } from 'react'

import { ExperienceContent } from './experience-content'

const ExperienceDebug = () => {
  const [isDebugPhysics] = useState<boolean>(true)
  const [isEnabledControls] = useState<boolean>(true)
  const [isStickedCamera] = useState<boolean>(true)

  return (
    <ExperienceContent
      isEnabledControls={isEnabledControls}
      isDebugPhysics={isDebugPhysics}
      isStickedCamera={isStickedCamera}
    />
  )
}

export { ExperienceDebug }
