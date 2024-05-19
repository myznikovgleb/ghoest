import { useState } from 'react'
import { MathUtils } from 'three'

import { generateTileset } from '../utils'

import { Tile } from './tile'

import type { TileType } from '../model'
import type { ThreeEvent } from '@react-three/fiber'

const TILESET_WIDTH = 25
const TILESET_DEPTH = 25

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
      <mesh position={[0, -0.1, 0]} scale={[TILESET_WIDTH, 1, TILESET_DEPTH]}>
        <boxGeometry args={[2, 0.2, 2]} />
        <meshBasicMaterial color="#93E14D" />
      </mesh>

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
