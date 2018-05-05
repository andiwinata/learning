// sum = Xn
// max = { n: Xn }
// 
// sum = Xn-1
// sum = Xn
// max = { n: Xn, n-1: Xn-1}
// 
// sum = Xn-2 + max[Xn]
// sum = max[Xn-1]
// max = { n: Xn, n-1: Xn-1, n-2: Xn-2 + Xn }
// 
// sum = Xn-3 + max[Xn-1]
// sum = max[Xn-2]
// 
// sum = Xn-5 + Xn-3 + Xn-1
// sum = Xn-5 + Xn-3 + Xn
// sum = Xn-5 + Xn-2 + Xn
// sum = Xn-5 + Xn-1
// sum = Xn-5 + Xn
// converted to
// sum = Xn-5 + max[n-3]
// sum = max[Xn-3]
//
// f(n) = max(f(n-1), n + f(n-2))
// f(0) = 0
// f(1) = n[1]
// f(2) = max(max[n[1]], n + max[n[0]])

function houseRobber(nums) {

  const dp = []

  nums.forEach((num, id) => {
    if (id === 0) {
      dp[id] = 0
    } else if (id === 1) {
      dp[id] = num
    } else {
      dp[id] = Math.max(dp[id - 1], num + dp[id - 2])
    }
  })

  return dp[nums.length - 1]
}

// OR

houseRobber = nums => {
  // n === 0
  let maxN = 0
  let maxNMin1 = 0

  // start with n === 1
  for (num of nums) {
    const tmpMaxN = maxN
    maxN = Math.max(maxNMin1 + num, maxN)
    maxNMin1 = tmpMaxN
  }
  return maxN
}
