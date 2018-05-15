//
// Definition for binary tree:
// function Tree(x) {
//   this.value = x;
//   this.left = null;
//   this.right = null;
// }
function largestValuesInTreeRows(tree) {
	const t = { ...tree }
	const max = []
	t.depth = 0
	const stack = [t]

	while (stack.length > 0) {
		const curr = stack.pop()

		if (Number.isInteger(curr.value)) {
			max[curr.depth] = max[curr.depth] ? Math.max(max[curr.depth], curr.value) : curr.value
		}

		if (curr.left) {
			curr.left.depth = curr.depth + 1
			stack.push(curr.left)
		}

		if (curr.right) {
			curr.right.depth = curr.depth + 1
			stack.push(curr.right)
		}
	}

	return max
}
