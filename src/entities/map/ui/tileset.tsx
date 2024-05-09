import { useState } from 'react'
import { MathUtils } from 'three'

import { Tile } from './tile'

import type { TileType } from './tile'
import type { ThreeEvent } from '@react-three/fiber'

interface TileSetProps {
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerDown: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void
}

const TileSet = (props: TileSetProps) => {
  const { onPointerMove, onPointerDown, onPointerUp } = props

  const [tileSet] = useState<TileType[][]>([
    ['G', 'G', 'G', 'G', 'G'],
    ['G', 'Y', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'G', 'G'],
    ['G', 'G', 'G', 'Y', 'G'],
    ['G', 'Y', 'G', 'G', 'G'],
  ])

  return (
    <group
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerOut={onPointerUp}
    >
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
