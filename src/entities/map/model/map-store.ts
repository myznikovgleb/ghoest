import { create } from 'zustand'

import { generateTileset } from '../lib'

import { TileType } from './tile'

const TILESET_SIZE = 55

interface MapState {
  size: number
  tileset: TileType[][]
  tilemap: Record<TileType, Array<[number, number]>>
}

type MapStore = MapState

const initialState: MapState = {
  size: TILESET_SIZE,
  ...generateTileset(TILESET_SIZE),
}

export const useMapStore = create<MapStore>()(() => ({
  ...initialState,
}))
