function isValid(n) {
  return typeof n !== 'undefined' && n !== null
}

class PriorityQueue {
  constructor(comparer = (a, b) => a < b) {
    this._comparer = comparer
    this._heap = []
  }

  get length() {
    return this._heap.length
  }

  swap(id0, id1) {
    console.log(id0, id1);
    console.log(this._heap[id0], this._heap[id1]);
    const tmp = this._heap[id0]
    this._heap[id0] = this._heap[id1]
    this._heap[id1] = tmp
  }

  push(item) {
    this._heap.push(item)

    let result = true
    let itemId = this.length - 1
    // swap with parent until it reaches correct position
    while (result) {
      // exit if reachest root
      if (itemId === 0) {
        break
      }
      // compare with parent
      const parentId = Math.floor((itemId - 1) / 2)
      console.log(parentId)
      result = this._comparer(item, this._heap[parentId])

      // swap with parent
      if (result) {
        this.swap(parentId, itemId)
        itemId = parentId
      }
    }
  }

  // checking whether the node need to swap to one of the child
  swapNodeWithChildren(itemId) {
    const item = this._heap[itemId]
    const leftChildId = itemId * 2 + 1
    const leftChild = leftChildId < this._heap.length ? this._heap[leftChildId] : undefined

    if (!isValid(leftChild)) {
      // meaning there is no children for this node
      return itemId
    }
    const leftCanBeSwapped = this._comparer(leftChild, item)

    const rightChildId = itemId * 2 + 2
    const rightChild = rightChildId < this._heap.length ? this._heap[rightChildId] : undefined
    const rightCanBeSwapped = isValid(rightChild) && this._comparer(rightChild, item)

    if (!leftCanBeSwapped && !rightCanBeSwapped) {
      // means that the current tree is valid, the item doesn't need to move
      return itemId
    }

    const toSwapChildId = !isValid(rightChild) ||
      this._comparer(leftChild, rightChild) ? leftChildId : rightChildId

    this.swap(itemId, toSwapChildId)
    return toSwapChildId
  }

  pop() {
    // swap first item with last item
    this.swap(0, this._heap.length - 1)
    const poppedItem = this._heap.pop()

    // make sure the first item is in correct position
    let itemId = 0

    while (true) {
      const resultId = this.swapNodeWithChildren(itemId)
      // meaning there is no swap happening
      if (itemId === resultId) {
        break
      }

      // otherwise continue to validate the tree
      itemId = resultId
    }

    return poppedItem
  }
}

/*
  0
  1       2
  3   4   5   6
  7 8 9 9 1 2 3 4
*/

const t = new PriorityQueue()
a = [100, 7,12,1,2,3,5,8,7,6]
a.forEach(t.push.bind(t))

for (let i = 0; i < a.length; i++) {
  console.log(t.pop());
}

function graphDistances(g, s) {
  // create tree
  const nodes = []
  g.forEach((row, y) => {
    row.forEach((edgeWeight, x) => {
      // create object if doesn't exist
      nodes[y] = nodes[y] || {}

      // if no weight exist store it as it is
      const sameXY = x === y
      if (sameXY) {
        nodes[y][x] = 0
        return
      }

      if (edgeWeight === -1) {
        nodes[y][x] = Number.MAX_SAFE_INTEGER
        return
      }
      nodes[y][x] = edgeWeight
    })
  })

  // do djikstra
  const result = []
  for (let i = 0; i < g.length; i++) {
    if (i === s) {
      result[i] = 0
      continue
    }


  }

  const djikstra = () => {
    // create priorityQueue
  }

  return Object.keys(nodes[s]).sort().map(key => nodes[s][key])
}

g = [[-1, 3, 2],
[2, -1, 0],
[-1, 0, -1]]
// expected output of (g, 0) = [0, 2, 2]

g2 = [[-1, 1, 2],
[0, -1, 3],
[0, 0, -1]]
// expected output for graphDistances(g2, 1) = [0, 0, 2]

console.log(graphDistances(g, 0));
