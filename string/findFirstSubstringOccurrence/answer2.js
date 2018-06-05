function findFirstSubstringOccurrenceNotPerfect(s, x) {
  if (x.length === 0 || s.length === 0) {
    return 0
  }

  let xI = 0
  let id
  for (let i = 0; i < s.length; i++) {
    const l = s.charAt(i)
    if (xI > 0 && l !== x.charAt(xI)) {
      // doesnt' match after some matching sequence
      xI = 0
    }

    if (l === x.charAt(xI)) {
      if (xI === 0) {
        id = i
      }

      if (xI === x.length - 1) {
        return id
      }
      xI++
    }
  }

  return -1
}

function findFirstSubstringOccurrenceTimeLimitExceeded(s, x) {
  for (var i = 0; i < s.length; i++) { // can be improved here by just using i < s.length - x.length + 1
    for (var q = 0; q < x.length; q++) {
      if (s[i + q] !== x[q]) {
        break;
      }
      if (q === x.length - 1) {
        return i;
      }
    }
  }
  return -1;
}

function findFirstSubstringOccurrencePyOnlyTesting(s, x) {
  patt = x
  text = s
  if (!patt || !text) {
    return -1
  }

  // First build the pattern lookup table
  tbl = new Array(1 + patt.length).fill(0)
  let i = 1;
  let j = 0;
  while (i < patt.length) {
    if (patt[i] === patt[j]) {
      i += 1;
      j += 1;
      tbl[i] = j
    } else if (0 === j) {
      i += 1
    } else {
      console.log('here', tbl, j);
      j = tbl[j]
    }
  }
  console.log(tbl)
  return tbl
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

console.log(findFirstSubstringOccurrencePyOnlyTesting(s7,x7));

console.log(s7.indexOf(x7));

console.log(findFirstSubstringOccurrenceNotPerfect(s1, x1));
console.log(findFirstSubstringOccurrenceNotPerfect(s2, x2));
console.log(findFirstSubstringOccurrenceNotPerfect(s3, x3));
console.log(findFirstSubstringOccurrenceNotPerfect(s4, x4));
console.log(findFirstSubstringOccurrenceNotPerfect(s5, x5));
console.log(findFirstSubstringOccurrenceNotPerfect(s6, x6));
console.log(findFirstSubstringOccurrenceNotPerfect(s7, x7));
console.log(findFirstSubstringOccurrenceNotPerfect(s9, x9));

// const test = require('./test-18.json')
// const { s: s8, x: x8 } = test.input
// console.log(s8.length, x8.length);
// console.log([...new Set(s8.split(''))], [...new Set(x8.split(''))]);
// console.log(findFirstSubstringOccurrence(s8, x8));
