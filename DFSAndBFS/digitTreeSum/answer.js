//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function digitTreeSum(t) {
  let sum = 0
  const recur = (node, sequence = '') => {
    if (!Number.isInteger(node.value)) {
      return
    }
  
    if (node.left) {
      recur(node.left, `${sequence}${node.value}`)
    }

    if (node.right) {
      recur(node.right, `${sequence}${node.value}`)
    }

    // reaches the leaf
    if (!node.left && !node.right) {
      console.log(parseInt(`${sequence}${node.value}`, 10));
      sum += parseInt(`${sequence}${node.value}`, 10)
    }
  }

  recur(t)
  return sum
}

t = {
  "value": 1,
  "left": {
      "value": 0,
      "left": {
          "value": 3,
          "left": null,
          "right": null
      },
      "right": {
          "value": 1,
          "left": null,
          "right": null
      }
  },
  "right": {
      "value": 4,
      "left": null,
      "right": null
  }
}

console.log(digitTreeSum(t));
