import type { TileType } from '../model'

const generateTileset = (
  size: number
): {
  tileset: TileType[][]
  tilemap: Record<TileType, Array<[number, number]>>
} => {
  const centerSet: Set<number> = getCenterSet(size)

  const tileset: TileType[][] = new Array(size)
  const tilemap: Record<TileType, Array<[number, number]>> = {
    N: [],
    NE: [],
    E: [],
    SE: [],
    S: [],
    SW: [],
    W: [],
    NW: [],
    C: [],
    G: [],
    P: [],
    T: [],
    Y: [],
  }

  // Generate whole tileset
  for (let i = 0; i < size; i++) {
    const tileLine: TileType[] = new Array(size)

    for (let j = 0; j < size; j++) {
      if (isCenterTile(i, j, centerSet)) {
        tileLine[j] = 'G'
        continue
      }

      if (isPartiallyOddTile(i, j)) {
        tileLine[j] = 'G'
        if (isCompletelyOddTile(i, j)) {
          tilemap['G'].push([i, j])
        }
        continue
      }

      const tileIndex = Math.floor(Math.random() * 50)

      switch (tileIndex) {
        case 0: {
          tileLine[j] = 'C'
          break
        }
        case 1: {
          tileLine[j] = 'P'
          break
        }
        case 2:
        case 3:
        case 4:
        case 5:
        case 6: {
          tileLine[j] = 'T'
          break
        }
        case 7:
        case 8:
        case 9:
        case 10:
        case 11: {
          tileLine[j] = 'Y'
          break
        }
        default: {
          tileLine[j] = 'G'
          break
        }
      }
    }

    tileset[i] = tileLine
  }

  // Generate tileset corners
  tileset[0][0] = 'NW'
  tileset[0][size - 1] = 'NE'
  tileset[size - 1][size - 1] = 'SE'
  tileset[size - 1][0] = 'SW'

  // Generate tileset edges
  for (let i = 1; i < size - 1; i++) {
    tileset[0][i] = 'N'
    tileset[i][size - 1] = 'E'
    tileset[size - 1][i] = 'S'
    tileset[i][0] = 'W'
  }

  return { tileset, tilemap }
}

const isPartiallyOddTile = (i: number, j: number): boolean => {
  return i % 2 === 1 || j % 2 === 1
}

const isCompletelyOddTile = (i: number, j: number): boolean => {
  return i % 2 === 1 && j % 2 === 1
}

const isCenterTile = (
  i: number,
  j: number,
  centerSet: Set<number>
): boolean => {
  return centerSet.has(i) && centerSet.has(j)
}

const getCenterSet = (max: number): Set<number> => {
  const isEvenMax = max % 2 === 0
  const center = Math.floor(max / 2)

  if (isEvenMax) {
    return new Set([center - 1, center])
  } else {
    return new Set([center - 1, center, center + 1])
  }
}

export { generateTileset }
