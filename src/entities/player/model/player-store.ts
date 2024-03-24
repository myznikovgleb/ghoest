import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface InitialState {
  position: Vector3Tuple
  capsuleCollider: { h: number; r: number }
}

interface PlayerState extends InitialState {
  setPosition: (nextPosition: Vector3Tuple) => void
}

const initialState: InitialState = {
  capsuleCollider: { h: 0.5, r: 0.3 },
  position: [0, 0, 0],
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  ...initialState,

  setPosition: (nextPosition) => set({ position: nextPosition }),
}))
