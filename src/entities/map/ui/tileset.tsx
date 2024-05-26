import { useState } from 'react'
import { MathUtils } from 'three'

import { Ground } from '@/shared/resources'

import { generateTileset } from '../utils'

import { Tile } from './tile'

import type { TileType } from '../model'
import type { ThreeEvent } from '@react-three/fiber'

const TILESET_WIDTH = 30
const TILESET_DEPTH = 30

interface TileSetProps {
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void
}

const TileSet = (props: TileSetProps) => {
  const { onPointerMove, onPointerDown, onPointerUp } = props

  const [tileSet] = useState<TileType[][]>(
    generateTileset(TILESET_WIDTH, TILESET_DEPTH)
  )

  return (
    <group
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Ground scale={[TILESET_WIDTH, 1, TILESET_DEPTH]} />

      {tileSet
        .map((tileLine, tileLineIndex) =>
          tileLine.map((tile, tileIndex) => (
            <Tile
              key={MathUtils.generateUUID()}
              tileType={tile}
              position={[
                tileIndex * 2 - tileLine.length + 1,
                0,
                tileLineIndex * 2 - tileSet.length + 1,
              ]}
            />
          ))
        )
        .flat()}
    </group>
  )
}

export { TileSet }
