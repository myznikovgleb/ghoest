import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface InitialState {
  position: Vector3Tuple
}

interface PlayerState extends InitialState {
  setPosition: (nextPosition: Vector3Tuple) => void
}

const initialState: InitialState = {
  position: [0, 0, 0],
}

export const usePlayerStore = create<PlayerState>()((set) => ({
  ...initialState,
  setPosition: (nextPosition) => set({ position: nextPosition }),
}))
