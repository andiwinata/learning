const divideEvenly = (totalSpaces, nSpace) => {
  const baseValue = Math.floor(totalSpaces / nSpace)
  const reminder = totalSpaces % nSpace
  return [
    ...new Array(reminder).fill(baseValue + 1),
    ...new Array(nSpace - reminder).fill(baseValue)
  ]
}

function textJustification(words, l) {
  const lines = [[]]

  let lineId = 0
  let count = 0

  for (word of words) {
    // append word length to count
    // if exceed than l
    // move to new line
    if (word.length + count > l) {
      lineId++
      lines[lineId] = [word]
      count = word.length + 1
    } else { // push to current line, and add count + 1 extra space for next word
      lines[lineId].push(word)
      count += word.length + 1
    }
  }

  const res = []
  for (let lineI = 0; lineI < lines.length; lineI++) {
    const line = lines[lineI]
    if (line.length === 1) {
      // align left for the 1 length word
      res.push(`${line[0]}${' '.repeat(l - line[0].length)}`)
      continue
    }

    if (lineI === lines.length - 1) {
      const joined = line.join(' ')
      res.push(`${joined}${' '.repeat(l - joined.length)}`)
      continue
    }

    const wordsLength = line.reduce((acc, word) => acc + word.length, 0)
    const totalSpaces = l - wordsLength
    const numOfSpaces = divideEvenly(totalSpaces, line.length - 1)

    const sentence = line.map((word, i) => {
      if (i === line.length - 1) return word
      return `${word}${' '.repeat(numOfSpaces[i])}`
    })
    res.push(sentence.join(''))
  }

  return res
}

words1 = ["This", "is", "an", "example", "of", "text", "justification."]
l1 = 16
// ["This    is    an",
// "example  of text",
//   "justification.  "]

words2 = ['12345678', '1234567']
l2 = 16

words3 = ['12345678', '12345678']
l3 = 16

words4 = ["Two", "words."]
l4 = 11
// ["Two words. "]

words5 = ["vba", "gaff", "ye", "gs", "cthj", "hf", "vetjj", "jm", "k", "f", "cgbf", "zzz"]
// ["vba gaff", 
//  "ye    gs", 
//  "cthj  hf", 
//  "vetjj jm", 
//  "k f cgbf", 
//  "zzz     "]
l5 = 8

words6 = ["Looks", "like", "it", "can", "be", "a", "tricky", "test"]
l6 = 25
// ["Looks  like  it  can be a", 
//  "tricky test              "]

const textJustificationTest = (w, l) => {
  return textJustification(w, l).map(x => x.replace(/\s/g, '@'))
}

// console.log(textJustificationTest(words1, l1));
// console.log(textJustificationTest(words2, l2));
// console.log(textJustificationTest(words3, l3));
// console.log(textJustificationTest(words4, l4));
// console.log(textJustificationTest(words5, l5));
console.log(textJustificationTest(words6, l6));