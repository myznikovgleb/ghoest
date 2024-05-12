import { match } from 'ts-pattern'

import { Graveyard, Ground, Tree } from '@/shared/resources'

import type { Vector3Tuple } from 'three'

export type TileType = 'G' | 'T' | 'Y'

interface TileProp {
  position: Vector3Tuple
  tileType: TileType
}

const Tile = (props: TileProp) => {
  const { position, tileType } = props

  return match(tileType)
    .with('G', () => <Ground position={position} />)
    .with('T', () => <Tree position={position} />)
    .with('Y', () => <Graveyard position={position} />)
    .exhaustive()
}

export { Tile }
