import { match } from 'ts-pattern'

import { Ground } from '@/shared/resources'

import type { Vector3Tuple } from 'three'

export type TileType = 'G'

interface TileProp {
  position: Vector3Tuple
  tileType: TileType
}

const Tile = (props: TileProp) => {
  const { position, tileType } = props

  return match(tileType)
    .with('G', () => <Ground position={position} />)
    .exhaustive()
}

export { Tile }
