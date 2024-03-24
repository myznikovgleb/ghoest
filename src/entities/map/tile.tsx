import { Ground } from '@/shared/resources'

import type { Vector3Tuple } from 'three'

interface TileProp {
  position: Vector3Tuple
}

const Tile = (props: TileProp) => {
  const { position } = props

  return <Ground position={position} />
}

export { Tile }
