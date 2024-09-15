import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface InitialState {
  position: Vector3Tuple
  collider: { halfHeight: number; radius: number }
}

interface PlayerState extends InitialState {
  setPosition: (nextPosition: Vector3Tuple) => void
}

const initialState: InitialState = {
  collider: { halfHeight: 0.4, radius: 0.3 },
  position: [0, 0, 0],
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  ...initialState,

  setPosition: (nextPosition) => set({ position: nextPosition }),
}))
