function climbingStaircase(n, k) {
  // f(n) = f(n-1) + f(n-2) + ... + f(n-k)
  const nodes = []

  const recur = (acc = [], value) => {
    if (value === 0) {
      nodes.push(acc)
      return
    }

    // create nodes
    for (let step = 1; step <= k; step++) {
      if (value - step < 0) {
        break
      }
      recur([...acc, step], value - step)
    }
  }

  recur([], n)
  return nodes
}

function climbingStaircase2(n, k) {
  // f(n) = f(n-1) + f(n-2) + ... + f(n-k)
  const cache = {}

  const recur = (acc = [], value) => {
    if (value === 0) {
      return [acc]
    }

    const nodes = []

    // create nodes
    for (let step = 1; step <= k; step++) {
      if (value - step < 0) {
        break
      }
      nodes.push(...recur([...acc, step], value - step))
    }

    cache[value] = nodes
    return nodes
  }

  return recur([], n)
}

console.log(climbingStaircase(4, 2));
console.log(climbingStaircase2(4, 2));

// n = 4 and k = 2
// f(4)---------------
//  |                |
//  1----------      2-----
//  |          |     |     |
//  1----      2     1     2
//  |    |     |     |
//  1    2     1     1
//  |
//  1

// f(1) = [[1]]
// f(2) = [[1, 1], [2]]
// f(3) = f(2) + f(1)
//      = [[1, 1], [2]] + [[1]]
//      = [[1, 1, 1], [2, 1], [1, 2]]
// f(4) = f(3) + f(2)
//      = [[1, 1, 1], [2, 1], [1, 2]] + [[1, 1], [2]]
//      = [[1, 1, 1, 1], [2, 1, 1], [1, 2, 1], [1, 1, 2], [2, 2]]