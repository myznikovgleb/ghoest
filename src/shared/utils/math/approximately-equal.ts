const approximatelyEqual = (
  a: number,
  b: number,
  digitPosition: number = 0
): boolean => {
  const aRounded = Math.round(a * 10 ** digitPosition)
  const bRounded = Math.round(b * 10 ** digitPosition)

  return aRounded === bRounded
}

export { approximatelyEqual }
