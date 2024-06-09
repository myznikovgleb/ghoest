import { match } from 'ts-pattern'

import {
  Coffin,
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
    .with('C', () => <Coffin position={position} />)
    .with('P', () => <Pumpkin position={position} />)
    .with('T', () => <Tree position={position} />)
    .with('Y', () => <Graveyard position={position} />)
    .with('NW', () => (
      <FenceCorner position={position} rotation={[0, 0 * Math.PI * 0.5, 0]} />
    ))
    .with('NE', () => (
      <FenceCorner position={position} rotation={[0, 3 * Math.PI * 0.5, 0]} />
    ))
    .with('SE', () => (
      <FenceCorner position={position} rotation={[0, 2 * Math.PI * 0.5, 0]} />
    ))
    .with('SW', () => (
      <FenceCorner position={position} rotation={[0, 1 * Math.PI * 0.5, 0]} />
    ))
    .with('N', () => (
      <FenceStraight position={position} rotation={[0, 0 * Math.PI * 0.5, 0]} />
    ))
    .with('E', () => (
      <FenceStraight position={position} rotation={[0, 3 * Math.PI * 0.5, 0]} />
    ))
    .with('S', () => (
      <FenceStraight position={position} rotation={[0, 2 * Math.PI * 0.5, 0]} />
    ))
    .with('W', () => (
      <FenceStraight position={position} rotation={[0, 1 * Math.PI * 0.5, 0]} />
    ))
    .exhaustive()
}

export { Tile }
