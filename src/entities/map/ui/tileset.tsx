import { RigidBody } from '@react-three/rapier'
import { memo, useState } from 'react'
import { MathUtils } from 'three'

import { Ground } from '@/shared/resources'

import { generateTileset } from '../utils'

import { Tile } from './tile'

import type { TileType } from '../model'
import type { ThreeEvent } from '@react-three/fiber'

const TILESET_WIDTH = 55

interface TilesetProps {
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void
}

const Tileset = memo((props: TilesetProps) => {
  const { onPointerMove, onPointerUp } = props

  const [tileset] = useState<TileType[][]>(generateTileset(TILESET_WIDTH))

  return (
    <RigidBody type="fixed">
      <group onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        <Ground scale={TILESET_WIDTH} />

        {tileset
          .map((row, rowIndex) =>
            row.map((tile, tileIndex) => (
              <Tile
                key={MathUtils.generateUUID()}
                tileType={tile}
                position={[
                  tileIndex - row.length * 0.5 + 0.5,
                  0,
                  rowIndex - tileset.length * 0.5 + 0.5,
                ]}
              />
            ))
          )
          .flat()}
      </group>
    </RigidBody>
  )
})

export { Tileset }
