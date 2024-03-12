import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface PlayerState {
  position: Vector3Tuple
}

const initialState: PlayerState = {
  position: [0, 0, 0],
}

export const usePlayerStore = create<PlayerState>()(() => ({
  ...initialState,
}))
