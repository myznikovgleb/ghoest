import { create } from 'zustand'

import type { Vector3Tuple } from 'three'

interface KeyState {
  position: Vector3Tuple
}

interface KeyActions {
  flipPosition: (position: Vector3Tuple) => void
}

type KeyStore = KeyState & KeyActions

const initialState: KeyState = {
  position: [0, 0, 0],
}

export const useKeyStore = create<KeyStore>()((set) => ({
  ...initialState,

  flipPosition: (position: Vector3Tuple) =>
    set((state) => ({
      ...state,
      position,
    })),
}))
