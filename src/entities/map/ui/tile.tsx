import { match } from 'ts-pattern'

import { Graveyard, Tree } from '@/shared/resources'

import type { TileType } from '../model'
import type { Vector3Tuple } from 'three'

interface TileProp {
  position: Vector3Tuple
  tileType: TileType
}

const Tile = (props: TileProp) => {
  const { position, tileType } = props

  return match(tileType)
    .with('G', () => null)
    .with('T', () => <Tree position={position} />)
    .with('Y', () => <Graveyard position={position} />)
    .exhaustive()
}

export { Tile }
