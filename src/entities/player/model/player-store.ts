import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface InitialState {
  position: Vector3Tuple
  capsuleCollider: { halfHeight: number; radius: number }
}

interface PlayerState extends InitialState {
  setPosition: (nextPosition: Vector3Tuple) => void
}

const initialState: InitialState = {
  capsuleCollider: { halfHeight: 0.35, radius: 0.25 },
  position: [0, 0, 0],
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  ...initialState,

  setPosition: (nextPosition) => set({ position: nextPosition }),
}))
