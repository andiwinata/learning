const coordStr = (y, x) => `${y},${x}`
const coordArr = str => str.split(',').map(s => parseInt(s, 10))

const getAdjecent = (board, cStr) => {
  const [y, x] = coordArr(cStr)
  const w = board[0].length
  const h = board.length
  const arr = []
  const [t, b, l, r] = [y - 1, y + 1, x - 1, x + 1]
  const [tValid, bValid, lValid, rValid] = [
    y - 1 >= 0,
    y + 1 < h,
    x - 1 >= 0,
    x + 1 < w,
  ]

  if (tValid) {
    if (lValid) {
      arr.push(coordStr(t, l))
    }
    arr.push(coordStr(t, x))
    if (rValid) {
      arr.push(coordStr(t, r))
    }
  }

  if (lValid) {
    arr.push(coordStr(y, l))
  }

  if (rValid) {
    arr.push(coordStr(y, r))
  }

  if (bValid) {
    if (lValid) {
      arr.push(coordStr(b, l))
    }
    arr.push(coordStr(b, x))
    if (rValid) {
      arr.push(coordStr(b, r))
    }
  }

  return arr
}

function wordBoggle(board, words) {
  // create lookup for first letter
  // just for faster lookup in first letter
  // can do without lookup and just use tryBoard starting with wordId 0
  const lookup = {}
  board.forEach((row, y) => {
    row.forEach((tile, x) => {
      lookup[tile] = lookup[tile] ? [...lookup[tile], coordStr(y, x)] : [coordStr(y, x)]
    })
  })

  const resSet = new Set()

  const tryBoard = (visited, word, wordId, coordStr) => {
    if (resSet.has(word)) {
      // return if word is found already from other path
      return
    }
    if (wordId === word.length) {
      resSet.add(word)
      return
    }

    const nextChar = word[wordId]
    getAdjecent(board, coordStr)
      .filter(cStr => {
        return !visited.has(cStr)
      })
      .forEach(cStr => {
        const [y, x] = coordArr(cStr)
        // if one of the adjacent matches the next char in word, visit that
        if (board[y][x] === nextChar) {
          tryBoard(new Set([...visited, cStr]), word, wordId + 1, cStr)
        }
      })
  }

  // then try for each word
  for (word of words) {
    const firstLetter = word.charAt(0)
    const tilesWithFirstLetter = lookup[firstLetter]
    if (!tilesWithFirstLetter) {
      continue
    }
    tilesWithFirstLetter.forEach(coordStr => {
      tryBoard(new Set([coordStr]), word, 1, coordStr)
    })
  }

  return [...resSet].sort()
}

board4 = [["N", "L", "L", "I"],
          ["T", "J", "A", "B"],
          ["L", "E", "T", "S"]]
words4 = ["STALL",
  "NOTHING",
  "ABSTRACTEDNESSES",
  "VITA",
  "SAIL",
  "ACTA",
  "STEAL",
  "JAIL"]
//  ["JAIL", 
//  "SAIL", 
//  "STALL", 
//  "STEAL"]

board = [
  ['R', 'L', 'D'],
  ['U', 'O', 'E'],
  ['C', 'S', 'O']
]
words = ["CODE", "SOLO", "RULES", "COOL"]
// ["CODE", "RULES"]

board2 = [["G", "T"],
["O", "A"]]
words2 = ["TOGGLE",
  "GOAT",
  "TOO",
  "GO"]
// ["GO", "GOAT"]

board3 = [["A", "Q", "A", "H"],
["A", "X", "V", "W"],
["A", "L", "T", "I"],
["T", "T", "J", "I"]]
words3 = ["AXOLOTL",
  "TAXA",
  "ABA",
  "VITA",
  "VITTA",
  "GO",
  "AXAL",
  "LATTE",
  "TALA"]
//   ["AXAL", 
//  "TALA", 
//  "TAXA", 
//  "VITTA"]

console.log(wordBoggle(board, words));
console.log(wordBoggle(board2, words2));
console.log(wordBoggle(board3, words3));
console.log(wordBoggle(board4, words4));
