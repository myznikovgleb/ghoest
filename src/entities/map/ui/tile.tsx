import { match } from 'ts-pattern'

import {
  FenceCorner,
  FenceStraight,
  Graveyard,
  Pumpkin,
  Tree,
} from '@/shared/resources'

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
    .with('P', () => <Pumpkin position={position} />)
    .with('T', () => <Tree position={position} />)
    .with('Y', () => <Graveyard position={position} />)
    .with('NE', 'SE', 'SW', 'NW', () => <FenceCorner position={position} />)
    .with('N', 'E', 'S', 'W', () => <FenceStraight position={position} />)
    .exhaustive()
}

export { Tile }
