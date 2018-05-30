function sumSubsets(arr, num) {
  const mapResult = new Map()
  const insertResult = (seq) => {
    let map = mapResult
    seq.forEach(x => {
      const value = map.get(x)
      if (value) {
        map = value
        return
      }

      const newMap = new Map()
      map.set(x, newMap)
      map = newMap
    })
  }

  const trySum = (seq, total, id) => {
    if (total === num) {
      insertResult(seq)
    }

    for (let i = id; i < arr.length; i++) {
      const nextTotal = total + arr[i]
      if (nextTotal <= num) {
        trySum([...seq, arr[i]], nextTotal, i + 1)
      }
    }

  }

  trySum([], 0, 0)
  const results = []
  const pullTree = (map, acc) => {
    if (map.size === 0) {
      results.push(acc)
    }

    map.forEach((value, key) => {
      pullTree(value, [...acc, key])
    })
  }
  pullTree(mapResult, [])
  return results
}

function sumSubsetsStringify(arr, num) {
  const res = new Set()
  const trySum = (seq, total, id) => {
    if (total === num) {
      res.add(JSON.stringify(seq))
    }

    for (let i = id; i < arr.length; i++) {
      const nextTotal = total + arr[i]
      if (nextTotal <= num) {
        trySum([...seq, arr[i]], nextTotal, i + 1)
      }
    }

  }

  trySum([], 0, 0)
  return [...res].map(JSON.parse)
}

function sumSubsetsObj(arr, num) {
  const hash = {}
  const res = []
  const trySum = (seq, total, id) => {
    if (total === num) {
      if (!hash[seq]) {
        hash[seq] = 1 // seq will be automatically converted to string
        res.push(seq)
      }
    }

    for (let i = id; i < arr.length; i++) {
      const nextTotal = total + arr[i]
      if (nextTotal <= num) {
        trySum([...seq, arr[i]], nextTotal, i + 1)
      }
    }

  }

  trySum([], 0, 0)
  return res
}

arr1 = [1, 2, 3, 4, 5]
num2 = 5

arr2 = [1, 2, 2, 3, 4, 5]
num2 = 5
// [[1,2,2], 
//  [1,4], 
//  [2,3], 
//  [5]]

console.log(sumSubsets(arr2, num2));
console.log(sumSubsetsStringify(arr2, num2));
console.log(sumSubsetsObj(arr2, num2));
