import { RigidBody } from '@react-three/rapier'
import { memo } from 'react'
import { MathUtils } from 'three'

import { Ground } from '@/shared/resources'

import { useMapStore } from '../model'

import { Tile } from './tile'

import type { ThreeEvent } from '@react-three/fiber'

interface TilesetProps {
  onPointerMove: (event: ThreeEvent<PointerEvent>) => void
  onPointerUp: (event: ThreeEvent<PointerEvent>) => void
}

const Tileset = memo((props: TilesetProps) => {
  const { onPointerMove, onPointerUp } = props

  const { size, tileset } = useMapStore()

  return (
    <RigidBody type="fixed">
      <group onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
        <Ground scale={size} />

        {tileset
          .map((row, rowIndex) =>
            row.map((tile, tileIndex) => (
              <Tile
                key={MathUtils.generateUUID()}
                tileType={tile}
                position={[
                  tileIndex - size * 0.5 + 0.5,
                  0,
                  rowIndex - size * 0.5 + 0.5,
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
