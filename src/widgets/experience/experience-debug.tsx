import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

import { ExperienceContent } from './experience-content'

const ExperienceDebug = () => {
  const { isDebugPhysics, isEnabledControls, isHiddenPerf, isStickedCamera } =
    useControls(
      'Debug options',
      {
        isDebugPhysics: { value: true, label: 'Is physics in debug mode' },
        isStickedCamera: { value: true, label: 'Is camera sticked' },
        isEnabledControls: {
          value: true,
          label: 'Is controls enabled',
          render: (get) => get('Debug options.isStickedCamera'),
        },
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
