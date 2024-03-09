import { Ground } from '@/shared/resources'

import type { Vector3Tuple } from 'three'

interface TileProp {
  position?: Vector3Tuple
}

const Tile = (props: TileProp) => {
  const { position = [0, 0, 0] } = props

  return <Ground position={position} />
}

export { Tile }
