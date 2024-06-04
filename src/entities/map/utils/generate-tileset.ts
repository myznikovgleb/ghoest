import type { TileType } from '../model'

const generateTileset = (width: number): TileType[][] => {
  const centerSet: Set<number> = getCenterSet(width)

  const tileset: TileType[][] = new Array(width)

  /**
   * Generate whole tileset
   */
  for (let i = 0; i < width; i++) {
    const tileLine: TileType[] = new Array(width)

    for (let j = 0; j < width; j++) {
      if (isCenterTile(i, j, centerSet)) {
        tileLine[j] = 'G'
        break
      }

      const tileIndex = Math.floor(Math.random() * 20)

      switch (tileIndex) {
        case 0: {
          tileLine[j] = 'P'
          break
        }
        case 1: {
          tileLine[j] = 'T'
          break
        }
        case 2: {
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

  /**
   * Generate tileset corners
   */
  tileset[0][0] = 'NW'
  tileset[0][width - 1] = 'NE'
  tileset[width - 1][width - 1] = 'SE'
  tileset[width - 1][0] = 'SW'

  /**
   * Generate tileset edges
   */
  for (let i = 1; i < width - 1; i++) {
    tileset[0][i] = 'N'
    tileset[i][width - 1] = 'E'
    tileset[width - 1][i] = 'S'
    tileset[i][0] = 'W'
  }

  return tileset
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
