function isCryptSolution(crypt, solution) {
  // convert to lookup map
  const lookup = {}
  solution.forEach(pair => {
    lookup[pair[0]] = pair[1]
  })

  const decrypted = []
  for (let word of crypt) {
    let decryptedWord = ''
    for (let i = 0; i < word.length; i++) {
      const decryptChar = lookup[word.charAt(i)]
      // check for trailing 0
      if (i === 0 && decryptChar === '0' && word.length > 1) return false
      decryptedWord += decryptChar
    }
    decrypted.push(decryptedWord)
  }

  const nums = decrypted.map(x => parseInt(x, 10))
  return nums[0] + nums[1] === nums[2]
}

function isCryptSolutionFunctional(crypt, solution) {
  const lookup = solution.reduce((acc, pair) => {
    acc[pair[0]] = pair[1]
    return acc
  }, {})
  const decrypted = crypt.map(word => word.split('').map(c => lookup[c]).join(''))
  return decrypted.every(word => word.length > 1 ? word.charAt(0) !== '0' : true)
    && decrypted.map(x => parseInt(x, 10)).reduce((acc, num, i) => acc + (i === 2 ? -num : num), 0) === 0
}

crypt = ["SEND", "MORE", "MONEY"]
solution = [['O', '0'],
['M', '1'],
['Y', '2'],
['E', '5'],
['N', '6'],
['D', '7'],
['R', '8'],
['S', '9']]

crypt2 = ["TEN", "TWO", "ONE"]
solution2 = [['O', '1'],
['T', '0'],
['W', '9'],
['E', '5'],
['N', '4']]

crypt3 = ["A",
  "A",
  "A"]
solution3 = [["A", "0"]]

console.log(isCryptSolution(crypt, solution));
console.log(isCryptSolutionFunctional(crypt, solution));