function rotateImage(a) {
  // [cos a   -sin a]    [x]
  // [sin a    cos a]    [y]
  // x' = x cos a - y sin y
  // y' = x sin a + y cos a
  // rotate -90, so do rotate 90 instead to just get the result in that position
  // x' = -y
  // y' = x

  const pivotId = (a.length - 1) / 2

  const res = new Array(a.length)
  for (let y = 0; y < a.length; y++) {
    res[y] = []
    for (let x = 0; x < a.length; x++) {
      const [xCoord, yCoord] = [x - pivotId, a.length - 1 - y - pivotId]
      const [xCoord2, yCoord2] = [-yCoord, xCoord]
      const [xFrom, yFrom] = [xCoord2 + pivotId, a.length - 1 - yCoord2 - pivotId]
      res[y][x] = a[yFrom][xFrom]
    }
  }

  return res
}

a = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9]]

console.log(rotateImage(a))
