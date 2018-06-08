function regexMatching(pattern, test) {
  if (pattern.charAt(0) === '^') {
    return pattern.substring(1) === test.substring(0, pattern.length - 1)
  }

  if (pattern.charAt(pattern.length - 1) === '$') {
    return pattern.substring(0, pattern.length - 1) === test.substring(test.length - pattern.length + 1)
  }

  return test.indexOf(pattern) !== -1
}
