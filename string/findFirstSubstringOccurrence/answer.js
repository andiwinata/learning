function findFirstSubstringOccurrence(text, pat) {
  // use KMP algorithm
  // build lookup
  const lookup = new Array(pat.length).fill(0)

  let i = 1
  let j = 0
  while (i < pat.length) {
    if (pat[i] === pat[j]) {
      lookup[i] = j + 1
      i++
      j++
    } else {
      if (j === 0) {
        lookup[i] = 0
        i++
      } else { // j > 0
        j = lookup[j - 1]
      }
    }
  }

  // match text with pattern
  i = j = 0
  while (i < text.length) {
    if (text[i] === pat[j]) {
      if (j === pat.length - 1) {
        // if it matches the pattern until the end, return the index
        return i - j
      }
      i++
      j++
    } else {
      if (j === 0) {
        i++
      } else {
        j = lookup[j - 1]
      }
    }
  }

  return -1
}

s1 = "CodefightsIsAwesome"
x1 = "IA"

s2 = "CodefightsIsAwesome"
x2 = "IsA"

s3 = "a"
x3 = "a"

s4 = ""
x4 = ""

s5 = "a"
x5 = ""

s6 = ""
x6 = "a"

s7 = "yyyz"
x7 = "yyz"

s9 = "yyyyyz"
x9 = "yyyz"

console.log(s7.indexOf(x7));

console.log(findFirstSubstringOccurrence(s1, x1));
console.log(findFirstSubstringOccurrence(s2, x2));
console.log(findFirstSubstringOccurrence(s3, x3));
console.log(findFirstSubstringOccurrence(s4, x4));
console.log(findFirstSubstringOccurrence(s5, x5));
console.log(findFirstSubstringOccurrence(s6, x6));
console.log(findFirstSubstringOccurrence(s7, x7));
console.log(findFirstSubstringOccurrence(s9, x9));