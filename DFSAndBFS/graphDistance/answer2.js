// This solution is for searching smallest weight regardless of direction
function graphDistances(g, s) {
  const nodes = []
  g.forEach((row, y) => {
    row.forEach((edgeWeight, x) => {
      // create object if doesn't exist
      nodes[y] = nodes[y] || {}
      nodes[x] = nodes[x] || {}

      // if no weight exist store it as it is
      const weightFilled = Number.isInteger(nodes[y][x])
      const sameXY = x === y
      if (sameXY) {
        nodes[y][x] = nodes[x][y] = 0
        return
      }

      if (edgeWeight === -1) {
        if (weightFilled) {
          return
        }

        nodes[y][x] = nodes[x][y] = -1
        return
      }
      // store the min weight
      nodes[y][x] = nodes[x][y] = Number.isInteger(nodes[y][x]) ? Math.min(nodes[y][x], edgeWeight) : edgeWeight
    })
  })

  return Object.keys(nodes[s]).sort().map(key => nodes[s][key])
}

g = [[-1, 3, 2],
[2, -1, 0],
[-1, 0, -1]]

g2 = [[-1, 1, 2],
[0, -1, 3],
[0, 0, -1]]
// expected output for graphDistances(g2, 1) = [0, 0, 2]

console.log(graphDistances(g2, 1));
