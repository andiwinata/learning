function combinationSum(arr, sum) {
  a = [...new Set(arr)].sort()

  const res = []
  const trySum = (id, total, seq) => {
    if (total === sum) {
      res.push(seq)
      return true
    }

    const arrNum = a[id]
    const nextTotal = total + arrNum
    if (nextTotal > sum) {
      return true
    }

    let iResult
    for (let i = id; i < a.length; i++) {
      // if iResult returns true, it means the seq has exceeding the sum
      // no point to keep traversing
      if (iResult) {
        break
      }
      iResult = trySum(i, nextTotal, [...seq, arrNum])
    }
  }

  a.forEach((_, i) => {
    trySum(i, 0, [])
  })
  return res.length > 0 ? res.map(x => `(${x.join(' ')})`).join('') : 'Empty'
}

a = [2, 3, 5, 9]
sum = 9
// combinationSum(a, sum) = "(2 2 2 3)(2 2 5)(3 3 3)(9)"

a2 = [8, 1, 8, 6, 8]
sum2 = 12
// (1 1 1 1 1 1 1 1 1 1 1 1)(1 1 1 1 1 1 6)(1 1 1 1 8)(6 6)

console.log(combinationSum(a, sum));
console.log(combinationSum(a2, sum2));