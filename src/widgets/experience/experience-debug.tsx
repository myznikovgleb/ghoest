import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

import { ExperienceContent } from './experience-content'

const ExperienceDebug = () => {
  const { isDebugPhysics, isEnabledControls, isHiddenPerf, isStickedCamera } =
    useControls(
      'Debug options',
      {
        isDebugPhysics: { value: false, label: 'Is physics in debug mode' },
        isEnabledControls: { value: false, label: 'Is controls enabled' },
        isStickedCamera: { value: false, label: 'Is camera sticked' },
        isHiddenPerf: { value: false, label: 'Is perf hidden' },
      },
      {
        collapsed: true,
      }
    )

  return (
    <>
      <ExperienceContent
        isEnabledControls={isEnabledControls}
        isDebugPhysics={isDebugPhysics}
        isStickedCamera={isStickedCamera}
      />

      {!isHiddenPerf && <Perf position="top-left" showGraph={false} />}
    </>
  )
}

export { ExperienceDebug }
