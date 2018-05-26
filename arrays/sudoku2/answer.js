function sudoku2(grid) {
  const valid = (set, num) => {
    if (num === '.') return true
    if (set.has(num)) return false
    set.add(num)
    return true
  }

  // check column and row
  for (let i = 0; i < grid.length; i++) {
    const rowSet = new Set()
    const colSet = new Set()
    for (let j = 0; j < grid.length; j++) {
      const rowItem = grid[i][j]
      let res = valid(rowSet, rowItem)
      if (!res) return false

      const colItem = grid[j][i]
      res = valid(colSet, colItem)
      if (!res) return false
    }
  }

  // check 3x3
  for (let i = 0; i < grid.length; i += 3) {
    for (let j = 0; j < grid.length; j += 3) {
      const set = new Set()

      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          const num = grid[i + k][j + l]
          const res = valid(set, num)
          if (!res) return false
        }
      }
    }
  }

  return true
}

const grid = [['.', '.', '.', '1', '4', '.', '.', '2', '.'],
['.', '.', '6', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '1', '.', '.', '.', '.', '.', '.'],
['.', '6', '7', '.', '.', '.', '.', '.', '9'],
['.', '.', '.', '.', '.', '.', '8', '1', '.'],
['.', '3', '.', '.', '.', '.', '.', '.', '6'],
['.', '.', '.', '.', '.', '7', '.', '.', '.'],
['.', '.', '.', '5', '.', '.', '.', '7', '.']]

const grid2 = [['.', '.', '.', '.', '2', '.', '.', '9', '.'],
['.', '.', '.', '.', '6', '.', '.', '.', '.'],
['7', '1', '.', '.', '7', '5', '.', '.', '.'],
['.', '7', '.', '.', '.', '.', '.', '.', '.'],
['.', '.', '.', '.', '8', '3', '.', '.', '.'],
['.', '.', '8', '.', '.', '7', '.', '6', '.'],
['.', '.', '.', '.', '.', '2', '.', '.', '.'],
['.', '1', '.', '2', '.', '.', '.', '.', '.'],
['.', '2', '.', '.', '3', '.', '.', '.', '.']]

console.log(sudoku2(grid));
