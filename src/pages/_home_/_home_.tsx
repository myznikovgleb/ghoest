import { PlayerBar } from '@/entities/player/ui/player-bar'
import { Layout } from '@/shared/ui'
import { Experience } from '@/widgets/experience'

const _home_ = () => {
  return (
    <Layout>
      <PlayerBar />
      <Experience />
    </Layout>
  )
}

export { _home_ }
