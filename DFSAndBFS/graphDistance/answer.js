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

const t = new PriorityQueue()
a = [12, 11, 10, 9, 1, 2, 3, 4, 8, 7, 5, 6]
a.forEach(t.push.bind(t))

for (let i = 0; i < a.length; i++) {
  console.log(t.pop());
}

function graphDistances(g, s) {
  // do djikstra

  // get edges from s
  // push all of them in priority queue
  // break until all g.length filled

  const DEFAULT_MIN = -1

  // store the min costs for every node reachable from s
  const mins = new Array(g.length).fill(DEFAULT_MIN)
  const pq = new PriorityQueue((a, b) => a.cost < b.cost)
  const visitedIds = new Set()

  const pushNodeEdgesToQueue = nodeId => {
    g[nodeId].forEach((edge, id) => {
      // ignore the edge if no edge exist (-1)
      if (edge === -1) {
        return
      }

      // add accumulated cost (mins[nodeId] + edge)
      pq.push({ to: id, cost: (mins[nodeId] === DEFAULT_MIN ? 0 : mins[nodeId]) + edge })
    })
  }

  // mark current is defined
  mins[s] = 0
  visitedIds.add(s)
  pushNodeEdgesToQueue(s)

  // exit the queue only until all children are exhausted or
  // all the edges distance to every node is filled
  while (pq.length > 0 && visitedIds.size < g.length) {
    const curr = pq.pop()
    if (visitedIds.has(curr.to)) {
      continue
    }

    // only fill the empty ones
    if (mins[curr.to] === DEFAULT_MIN) {
      mins[curr.to] = curr.cost
    }

    visitedIds.add(curr.to)
    pushNodeEdgesToQueue(curr.to)
  }

  return mins
}

g = [[-1, 3, 2],
[2, -1, 0],
[-1, 0, -1]]
// expected output of (g, 0) = [0, 2, 2]

g2 = [[-1, 1, 2],
[0, -1, 3],
[0, 0, -1]]
// expected output for graphDistances(g2, 1) = [0, 0, 2]

g3 = [[-1, 3, 2, -1],
[3, -1, -1, 1],
[2, -1, -1, 3],
[-1, 1, 3, -1]]
// expected output of (g, 3) = [4, 1, 3, 0]
console.time("1");
console.log(graphDistances(g3, 3));
console.timeEnd("1");

// below is top leaderboard result in codefights and time measurement
// this has been modified and commented out to make it clearer
const graphDistances2 = (g, s) => {
  // fill the array with random number (should be big enough),
  // since it is only being used to take advantage Math.min
  mins = Array(g.length).fill(31)

  // create queue of indexes
  q = [...g.keys()]

  // loop until queue finish
  for (mins[s] = 0; q.length;) {
    // sort the queue by largest cost to smallest cost for visiting each node (g[y])
    // then take the smallest one index, and start branching from there
    const y = q.sort((a, b) => mins[b] - mins[a]).pop()

    for (let x in g[y]) {
      if (g[y][x] < 0)
        continue

      // add accumulated cost, just make sure it is smaller than the cost from other node
      mins[x] = Math.min(g[y][x] + mins[y], mins[x])
    }
  }
  return mins
}

console.time("2");
console.log(graphDistances2(g, 0));
console.timeEnd("2");
