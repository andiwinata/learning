function firstNotRepeatingCharacter(s) {
  const order = []
  const map = {}
  for (let c of s) {
    if (!(c in map)) {
      map[c] = 1
      order.push(c)
    } else {
      map[c] += 1
    }
  }

  for (let o of order) {
    if (map[o] === 1) {
      return o
    }
  }

  return '_'
}

a1 = 'abacabad' // c
a2 = 'abacabaabacaba' // _
a3 = 'bccyb' // y
a4 = 'abab' // _
a5 = 'z' // z
a6 = 'bcccccccb' // _
console.log(firstNotRepeatingCharacter(a6));
