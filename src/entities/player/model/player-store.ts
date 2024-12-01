import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface PlayerState {
  size: { halfHeight: number; radius: number }
  position: Vector3Tuple
  items: {
    keys: number
  }
}

interface PlayerActions {
  setPosition: (nextPosition: Vector3Tuple) => void
  incrementKeys: () => void
}

type PlayerStore = PlayerState & PlayerActions

const initialState: PlayerState = {
  size: { halfHeight: 0.4, radius: 0.3 },
  position: [0, 0, 0],
  items: {
    keys: 0,
  },
}

export const usePlayerStore = create<PlayerStore>()((set) => ({
  ...initialState,

  setPosition: (nextPosition) => set({ position: nextPosition }),
  incrementKeys: () =>
    set((state) => ({
      ...state,
      items: { ...state.items, keys: state.items.keys + 1 },
    })),
}))
