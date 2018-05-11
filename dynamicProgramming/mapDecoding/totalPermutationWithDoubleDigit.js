// - 11111
// 1 1 1 1 1
// 5 blue ball
// 5!/5! = 1
// totalSlot! / (doubleDigitLen! . singleDigitLen!) 
// total slot = 5 - (1 * 0) = 5

// 11 1 1 1
// 1 11 1 1
// 1 1 11 1
// 1 1 1 11
// total slot = 5 - (1 * 1) = 4

// 1 blue ball 3 red ball
// how many permutations
// totalSlot! / (doubleDigitLen! . singleDigitLen!)
// const singleDigitLen = nums.length - (doubleDigitLen * 2) => 3
// 4!/3! = 4

// 11 11 1 
// 11 1 11
// 1 11 11
// total slot = 5 - (1 * 2) = 3

// stop until len(doubleDigit) reaches 2
// stop until len(doubleDigit) reaches Math.floor(5 / 2)

// 3!/2! = 3

// number of sorting 11111
// max double digit = Math.floor(len(11111) / 2)
// #permutation with 0 double digit + #permutation with 1 double digit + #permutation with 2 double digit until total slot is impossible
// total slots
// 5 4 3

// sorting n
// max double digit = Math.floor(n.length / 2)


// - 1111
// 1 1 1 1
// 4!/4! = 1
// total slot = 4 - (1 * 0) = 4

// 11 1 1
// 1 11 1
// 1 1 11
// 3!/2! = 3
// total slot = 4 - (1 * 1) = 3

// 11 11
// 2!/2! = 1
// total slot = 4 - (1 * 2) = 2

// stop until len(doubleDigit) reaches 2
// stop until len(doubleDigit) reaches Math.floor(4 / 2)

const permutationOperation = (top, divisor1, divisor2) => {
  // totalSlot! / (doubleDigitLen! . singleDigitLen!)
  // totalSlot ... max(doubleDigitLen, singleDigitLen) / min(doubleDigitLen, singleDigitLen)!
  const removedTopFactorial = Math.max(divisor1, divisor2)
  const leftDivisor = Math.min(divisor1, divisor2)
  let total = 1
  for (let i = top; i > removedTopFactorial; i--) {
    total *= i
  }

  for (let i = leftDivisor; i > 0; i--) {
    total /= i
  }

  return total
}

const findTotal = letters => {
  const nums = letters.split('')
  const doubleDigitLenLimit = Math.floor(nums.length / 2)
  const getTotalSlot = doubleDigitLen => nums.length - (1 * doubleDigitLen)

  let total = 0
  for (let doubleDigitLen = 0; doubleDigitLen <= doubleDigitLenLimit; doubleDigitLen++) {
    const totalSlot = getTotalSlot(doubleDigitLen)
    const singleDigitLen = nums.length - (doubleDigitLen * 2)
    const currTotal = permutationOperation(totalSlot, doubleDigitLen, singleDigitLen)
    console.log('total for doubleDigitLen', doubleDigitLen, ' is ', currTotal)
    total += currTotal
  }

  return total
}
