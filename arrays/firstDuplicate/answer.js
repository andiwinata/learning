function firstDuplicate(a) {
  const values = new Set()
  for (x of a) {
      if (values.has(x)) {
          return x
      }
      values.add(x)
  }
  return -1
}
