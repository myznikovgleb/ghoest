import type { TileType } from '../model'

const generateTileset = (width: number, depth: number): TileType[][] => {
  const widthCenterSet: Set<number> = getCenterSet(width)
  const depthCenterSet: Set<number> = getCenterSet(depth)

  const tileset: TileType[][] = new Array(depth)

  for (let i = 0; i < depth; i++) {
    const tileLine: TileType[] = new Array(width)

    for (let j = 0; j < width; j++) {
      if (isCenterTile(i, widthCenterSet, j, depthCenterSet)) {
        tileLine[j] = 'G'
        break
      }

      const tileIndex = Math.floor(Math.random() * 10)

      switch (tileIndex) {
        case 0: {
          tileLine[j] = 'Y'
          break
        }
        case 1: {
          tileLine[j] = 'T'
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

  return tileset
}

const isCenterTile = (
  i: number,
  widthCenterSet: Set<number>,
  j: number,
  depthCenterSet: Set<number>
): boolean => {
  return widthCenterSet.has(i) && depthCenterSet.has(j)
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
