//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function traverseTree(t) {
  let q = [t]
  const res = []

  while (q.length > 0) {
    const curr = q[0]
    q = q.slice(1, q.length)

    if (!curr) {
      continue
    }

    if (Number.isInteger(curr.value)) {
      res.push(curr.value)
    }

    if (curr.left) {
      q.push(curr.left)
    }

    if (curr.right) {
      q.push(curr.right)
    }
  }

  return res
}

t = {
  "value": 1,
  "left": {
    "value": 2,
    "left": null,
    "right": {
      "value": 3,
      "left": null,
      "right": null
    }
  },
  "right": {
    "value": 4,
    "left": {
      "value": 5,
      "left": null,
      "right": null
    },
    "right": null
  }
}

console.log(traverseTree(t));
