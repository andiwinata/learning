function fillingBlocks(n) {
  // https://math.stackexchange.com/questions/664113/count-the-ways-to-fill-a-4-times-n-board-with-dominoes
  // http://oeis.org/A005178
  // f(n)=f(n−1)+5f(n−2)+f(n−3)−f(n−4)
  // f(2)=f(1)+5f(0)+f(-1)-f(-2) = 5

  const dp = [0, 1]
  const getDp = id => {
    if (id < 0) return 1
    return dp[id]
  }

  for (let i = 2; i <= n + 1; i++) {
    const dpMin1 = getDp(i - 1)
    const dpMin2 = getDp(i - 2)
    const dpMin3 = getDp(i - 3)
    const dpMin4 = getDp(i - 4)
    dp[i] = dpMin1 + 5 * dpMin2 + dpMin3 - dpMin4
  }

  return dp[n + 1]
}

console.log(fillingBlocks(4));

// to read:
// https://stackoverflow.com/questions/38824236/what-is-the-total-number-of-ways-in-which-the-bricks-can-be-arranged-on-the-wall
