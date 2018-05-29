const putQueen = (y, x, initialBoard) => {
  const board = initialBoard.slice().map(x => x.slice())
  const n = board.length

  for (let i = 0; i < Math.max(n - y, n - x, x, y); i++) {
    const nextRow = y + i
    const nextCol = x + i
    const prevRow = y - i
    const prevCol = x - i
    // fill 8 directions
    // TODO: can be optimized to count only occupied tiles for next row (ignoring prev row)
    // since it will only move forward to next row
    if (nextRow < n) {
      board[nextRow][x] = 1
    }
    if (nextCol < n) {
      board[y][nextCol] = 1
    }
    if (nextRow < n && nextCol < n) {
      board[nextRow][nextCol] = 1
    }
    if (prevRow >= 0) {
      board[prevRow][x] = 1
    }
    if (prevCol >= 0) {
      board[y][prevCol] = 1
    }
    if (prevRow >= 0 && prevCol >= 0) {
      board[prevRow][prevCol] = 1
    }
    if (nextRow < n && prevCol >= 0) {
      board[nextRow][prevCol] = 1
    }
    if (prevRow >= 0 && nextCol < n) {
      board[prevRow][nextCol] = 1
    }
  }

  return board
}

function nQueens(n) {
  // try positions
  let initialBoard = new Array(n).fill(undefined).map(x => [])

  const tryPlaceQueen = (board, r = 0, seq = []) => {
    if (r >= n) {
      return [seq]
    }

    const res = []
    for (let c = 0; c < n; c++) {
      if (!board[r][c]) {
        const filledBoard = putQueen(r, c, board)

        const attempt = tryPlaceQueen(filledBoard, r + 1, [...seq, c])
        if (attempt.length > 0) {
          res.push(...attempt)
        }
      }
    }

    return res
  }

  return tryPlaceQueen(initialBoard).map(x => x.map(y => y + 1))
}

console.log(nQueens(4));

// n = 4

// not possible
// Q1  1   1   1
// 1   1   2
// 1   Q2  1   2
// 1   2   2   1

// Q1  1   1   1
// 1   1   Q2  2 
// 1   2   1   2
// 1       2   1 

// 1   Q1   1   1
// 1   1    1
//     1        1
//     1       