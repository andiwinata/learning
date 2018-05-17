// doing O(n) iteration
// too primitive tbh

function longestPath(fileSystem) {

  let currWord = ''
  let longestPathLength = 0

  let currDepth = 0
  const currNodes = {}

  let currWordIsFile = false
  let accumulatedWord = ''

  for (let i = 0; i < fileSystem.length; i++) {
    const letter = fileSystem.charAt(i)

    const isLast = i === fileSystem.length - 1
    if (isLast) {
      currWord += letter
    }

    // check if special char \f
    if (letter === '\f' || isLast) {
      // move to new line
      // register currWord as the currNode for currDepth
      const parentNode = currNodes[currDepth - 1]
      const newNode = {
        word: currWord,
        children: [],
        parent: parentNode
      }
      currNodes[currDepth] = newNode

      // if previous parent node exist, then append the new node as children
      if (parentNode && parentNode.children) {
        parentNode.children.push(newNode)
      }

      // check if eligible to compete as longest absolute path
      if (currWordIsFile) {
        const fullPath = `${accumulatedWord}${currWord}`
        if (fullPath.length > longestPathLength) {
          longestPathLength = fullPath.length
        }
      }

      // reset currDepth and currWord
      currDepth = 0
      currWord = ''
      currWordIsFile = false
      accumulatedWord = ''
    } else if (letter === '\t') {
      // increase the depth
      currDepth++
      // append the accumulated word
      accumulatedWord += `${currNodes[currDepth - 1].word}/`
    } else {
      currWord += letter

      // if there is any '.', it means it is a file
      if (letter === '.') {
        currWordIsFile = true
      }
    }
  }

  return longestPathLength
}

a = 'user\f\tpictures\f\t\tphoto.png\f\t\tcamera\f\tdocuments\f\t\tlectures\f\t\t\tnotes.txt'
console.log(longestPath(a));