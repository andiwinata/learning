function rotateImage(a) {
  // do cycle first
  // from outer to inside
  for (let i = 0; i < Math.floor(a.length / 2); i++) {
    // rotate in place all 4 points
    // a.length - i * 2 - 1 coming from -> 2 of the sides has been taken by i, hence i * 2
    // then the -1 for the total of rotating cycle for 4 points in top right bottom left
    // TO EDIT: this can also (j = i; j < a.length - 1 - i)
    for (let j = 0; j < a.length - i * 2 - 1; j++) {
      // swap point 1->2->3->4->1
      const topLeftY = i
      const topLeftX = j + i
      const topRightY = j + i
      const topRightX = a.length - 1 - i
      const bottomRightY = a.length - 1 - i
      const bottomRightX = a.length - 1 - j - i
      const bottomLeftY = a.length - 1 - j - i
      const bottomLeftX = i

      let tmp = a[topLeftY][topLeftX]
      a[topLeftY][topLeftX] = a[bottomLeftY][bottomLeftX]
      a[bottomLeftY][bottomLeftX] = a[bottomRightY][bottomRightX]
      a[bottomRightY][bottomRightX] = a[topRightY][topRightX]
      a[topRightY][topRightX] = tmp
    }
  }

  return a
}

// 1  2  3  4       13 9  5  1
// 5  6  7  8       14 10 6  2
// 9  10 11 12      15 11 7  3
// 13 14 15 16      16 12 8  4

// 1     -> 4     -> 16    -> 13    -> 1         -> i = 0, j = 0
// [0,0] -> [0,3] -> [3,3] -> [3,0] -> [0,0]

// 2     -> 8     -> 15    -> 9     -> 2         -> i = 0, j = 1
// [0,1] -> [1,3] -> [3,2] -> [2,0] -> [0,1]

// 6     -> 7     -> 11    -> 10    -> 16        -> i = 1, j = 0
// [1,1] -> [1,2] -> [2,2] -> [2,1] -> [1,1]

a = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9]]

b = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]

console.log(rotateImage(a))
