// 1111
// - 1 -> 111
//       - 1 -> 11
//           -  1 1 x
//           -  11 x
//       - 11 -> 1 x
// - 11 -> 11
//       - 1 1 x
//       - 11 x

// const storage = {
//   '0123': 1 + 1,
//   '123': 1 + 1,
//   '23': 1 + 1  +  1 + 1,
//   '3': 1 + 1 + 1,
//   '': 1 + 1 + 1 + 1 + 1
// }

// Index map
// --------
// ['0123'] = 0
// ['123'] = 1
// ['23'] = 2
// ['3'] = 3
// [''] = 4

// 0      |1       |2       |3       |4
// ------------------------------------------
// ['0123']
// - 0   = ['123']
//         - 1     = ['23']
//                   - 2     = ['3']
//                             - 3    = ['']
//                   - 23    = ['']
//         - 12    = ['3']
//                   - 3     = ['']
// - 01  = ['23']
//         - 2     = ['3']
//                   - 3     = ['']
//         - 23    = ['']

// - 1111
// 1 1 1 1
// 11 1 1
// 1 11 1
// 1 1 11
// 11 11

// ['0123']
// -> 0 -> ['123'] += 1
// ->> 01 -> ['23'] += 1

// ['123']
// -> 1 -> ['23'] += 1
// ->> 12 -> ['3'] += 1

// ['23']
// -> 2 -> ['3'] += 1
// -> 23 -> [''] += 1

// ['3']
// -> 3 -> [''] += 1

// '1111'

// -> 1

// 1 = a
// 11 = k

function mapDecoding(message) {
  const len = message.length
  const counts = new Array(len + 1).fill(0);
  for (let i = 0; i < len; i++) {
    // get 1 digit
    // and ignore negative index
    const next1Index = i + 1
    console.log(next1Index);
    if (next1Index <= len && next1Index >= 0 && message[i] !== '0') {
      counts[i + 1] += 1
    }

    // get 2 digit
    // ignore negative index
    // make sure it is within range 1-26
    const next2Index = i + 2
    if (next2Index <= len && next2Index >= 0 && (message[i + 1] === '1' || (message[i + 1] === '2' && parseInt(message[i + 2], 10) < 7))) {
      console.log('ADDING INDEX 2', next2Index);
      counts[i + 2] += 1
    }

    console.log('COUNTS ARE', counts);
  }

  return counts[len]
  // return counts
}

a = mapDecoding('1111')
console.log(a)

// - 1001
// not possible since there will be 0 always

// - 201
// 20 1

// function mapDecoding(message) {
//   const MIN_NUM = 1
//   const MAX_NUM = 26
//   let totalZero = 0

//   const total = message.split('').reduce((total, letter, id) => {
//     if (letter === '0') {
//       totalZero++
//       return total
//     }
//     if (id > message.length - 2) {
//       return total
//     }

//     const nextLetter = message[id + 1]
//     const combinedWithNext = parseInt(`${letter}${nextLetter}`, 10)
//     const passCriteria = combinedWithNext >= MIN_NUM && combinedWithNext <= MAX_NUM
//     if (passCriteria) {
//       return total + 1
//     }

//     return total
//   }, 1)

//   return totalZero !== message.length ? total : 0
// }
