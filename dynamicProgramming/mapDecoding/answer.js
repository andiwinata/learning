// ['1111']________________________________________________________
//     |                                                           \
// a + ['111']_______________________                            k + ['11']________________
//     |                             \                              |                      \
// aa + ['11']_____                ak + ['1']                    ka + ['1']              kk + ['']
//     |           \                   |                            |
// aaa + ['1']     aak + ['']      aka + ['']                    kaa + ['']
//     |
// aaaa + ['']

function mapDecoding(msg) {
  const counts = []

  function recursiveTree(message, id = 0) {
    if (id >= message.length) {
      return 1
    }
    let count = 0

    // leftNode for current digit
    const leftNode = parseInt(message[id], 10)
    if (leftNode > 0) {
      if (counts[id + 1] !== undefined) {
        count += counts[id + 1]
      } else {
        count += recursiveTree(message, id + 1)
      }
    }

    count = count % (1e9 + 7)

    // rightNode for current and next digit
    const rightNode = parseInt(message.substring(id, id + 2), 10)
    if (rightNode >= 10 && rightNode <= 26) {
      if (counts[id + 2] !== undefined) {
        count += counts[id + 2]
      } else {
        count += recursiveTree(message, id + 2)
      }
    }

    count = count % (1e9 + 7)
    counts[id] = count

    return count
  }

  return recursiveTree(msg)
}

const a = mapDecoding('')
console.log(a)
