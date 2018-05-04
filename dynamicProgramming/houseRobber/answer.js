// [1,3,1] = 3
// -----
// [1,3,1,1,3] = 6
// starts from n=1
// 1 + 1 + 3 = 4
// 1 + 1 = 2
// 1 + 3 = 4
// starts from n=2
// 3 + 1 = 4
// 3 + 3 = 6
// starts from n=3
// 1 + 3 = 4
// -----
// [1,3,1,1,3,5] = 9
// starts from n=1
// 1 + 1 + 3 = 4
// 1 + 1 + 5 = 7
// 1 + 3 = 4
// starts from n=2
// 3 + 1 + 5 = 9
// 3 + 3 = 6
// starts from n=3
// 1 + 3 = 4
// 1 + 5 = 6
// starts from n=4
// 1 + 5 = 6
// starts from n=5
// 5
// 
// -----
// Xn + Xn+2...n+l + Xn+4...n+l+2 + Xn+6...n+l+4
// Xn + Xy where y >= n+2
// Xn + Xy + Xz where y >= n+2 and z >= y+2
// rules =>
//  pick Xn sum with Xy where y >= n + 2 => sum
//  sum += Xz where z >= y + 2
//  sum += Xa where a >= z + 2
//  
// -----
// sum = Xn
// max = { n: Xn }
// 
// sum = Xn-1
// max = { n: Xn, n-1: Xn-1}
// 
// sum = Xn-2 + Xn
// max = { n: Xn, n-1: Xn-1, n-2: Xn-2 + Xn }
// 
// sum = Xn-3 + Xn-1
// sum = Xn-3 + Xn
// 
// sum = Xn-4 + Xn-2
// sum = Xn-4 + Xn-1
// sum = Xn-4 + Xn
// 
// sum = Xn-5 + Xn-3 + Xn-1
// sum = Xn-5 + Xn-3 + Xn
// sum = Xn-5 + Xn-2 + Xn
// sum = Xn-5 + Xn-1
// sum = Xn-5 + Xn
// converted to
// sum = Xn-5 + max[n-3]
// sum = Xn-5 + max[n-2]
// sum = Xn-5 + max[n-1]
// sum = Xn-5 + max[n]

function houseRobber(nums) {
  if (!nums.length) {
    return 0
  }

  const max = {}
  const length = nums.length

  const findMax = ((num, index) => {
    if (index > length - 2) {
      return num
    }

    const values = []
    for (let i = index + 2; i <= length; i++) {
      values.push(num + max[i])
    }

    return Math.max(...values)

  })

  nums.reverse().forEach((num, reverseId) => {
    const id = length - reverseId
    max[id] = findMax(num, id)
  })

  return Math.max(...Object.values(max))
}
