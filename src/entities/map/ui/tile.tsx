import { match } from 'ts-pattern'

import { Graveyard, Ground } from '@/shared/resources'

import type { Vector3Tuple } from 'three'

export type TileType = 'G' | 'Y'

interface TileProp {
  position: Vector3Tuple
  tileType: TileType
}

const Tile = (props: TileProp) => {
  const { position, tileType } = props

  return match(tileType)
    .with('G', () => <Ground position={position} />)
    .with('Y', () => <Graveyard position={position} />)
    .exhaustive()
}

export { Tile }
