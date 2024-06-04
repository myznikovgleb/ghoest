import { useState } from 'react'
import { MathUtils } from 'three'

import { Ground } from '@/shared/resources'

import { generateTileset } from '../utils'

import { Tile } from './tile'

import type { TileType } from '../model'
import type { ThreeEvent } from '@react-three/fiber'

const TILESET_WIDTH = 50

interface TileSetProps {
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void
}

const TileSet = (props: TileSetProps) => {
  const { onPointerMove, onPointerDown, onPointerUp } = props

  const [tileSet] = useState<TileType[][]>(generateTileset(TILESET_WIDTH))

  return (
    <group
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <Ground scale={[TILESET_WIDTH, 1, TILESET_WIDTH]} />

      {tileSet
        .map((tileLine, tileLineIndex) =>
          tileLine.map((tile, tileIndex) => (
            <Tile
              key={MathUtils.generateUUID()}
              tileType={tile}
              position={[
                tileIndex - tileLine.length * 0.5 + 0.5,
                0,
                tileLineIndex - tileSet.length * 0.5 + 0.5,
              ]}
            />
          ))
        )
        .flat()}
    </group>
  )
}

export { TileSet }
