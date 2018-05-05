function climbingStairs(n) {
  // 1 = [1]
  // 2 = [1,1], [2]
  // 3 = [1,1,1], [2,1], [1,2]
  // 4 = [1,1,1,1], [2,1,1], [1,2,1], [1,1,2], [2,2]
  // 5 = [1,1,1,1,1], [2,1,1,1], [1,2,1,1], [1,1,2,1], [1,1,1,2], [2,2,1], [2,1,2], [1,2,2]
  
  let prev = 1
  let res = 1
  while (n > 1) {
      const tmp = prev
      prev = res
      res += tmp
      n--;
  }
  
  return res
}

// fibonacci
// https://math.stackexchange.com/questions/789804/how-many-distinct-ways-to-climb-stairs-in-1-or-2-steps-at-a-time
