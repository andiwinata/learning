function classifyStrings(s) {
  let mixed = false
  const vowels = new Set(['a', 'i', 'u', 'e', 'o'])
  const vCounts = []
  const cCounts = []
  let vCurrCount = 0
  let cCurrCount = 0

  for (c of s) {
    if (c === '?') { // ?
      mixed = true
      vCurrCount++
      cCurrCount++
    } else if (vowels.has(c)) { // vowel
      if (cCurrCount > 0) {
        cCounts.push(cCurrCount)
      }
      cCurrCount = 0
      vCurrCount++
    } else { // consonant
      if (vCurrCount > 0) {
        vCounts.push(vCurrCount)
      }
      vCurrCount = 0
      cCurrCount++
    }
  }

  // for last element
  if (cCurrCount > 0) {
    cCounts.push(cCurrCount)
  }
  if (vCurrCount > 0) {
    vCounts.push(vCurrCount)
  }

  const vMax = Math.max(...vCounts)
  const cMax = Math.max(...cCounts)
  if (!mixed) {
    return vMax >= 3 || cMax >= 5 ? 'bad' : 'good'
  }

  const vMin = Math.min(...vCounts)
  const cMin = Math.min(...cCounts)
  if (vMin >= 3 && cMin >= 5) return 'bad'
  else if (vMax >= 3 || cMax >= 5) return 'mixed'
  return 'good'
}

s1 = "aeu"
// classifyStrings(s) = "bad";
s2 = "a?u"
// classifyStrings(s) = "mixed";
s3 = "aba"
// classifyStrings(s) = "good"
s4 = 'bbbb?a?bb'
//    bbbbaabbb
// mixed
s5 = 'bbbb?aa'
//    bbbbbaa
//    bbbbaaa
// bad
s6 = 'ei?'
// mixed
s7 = 'c?b'
// good

s12 = 'typ?asdf?relkhfd'
// bad

console.log(classifyStrings(s1));
console.log(classifyStrings(s2));
console.log(classifyStrings(s3));
console.log(classifyStrings(s4));
console.log(classifyStrings(s5));
console.log(classifyStrings(s6));
console.log(classifyStrings(s7));
console.log(classifyStrings(s12));

// bad is when: min(v) >= 3 && min(c) >= 5 && has ?

// s5 b b b b ? a a
// v  0 0 0 0 1 2 3
// c  1 2 3 4 5 0 0
// min(v) = 3, min(c) = 5, has ?
// max(v) = 3, max(c) = 5, has ?
// bad

// s4 b b b b ? a ? b b
// v  0 0 0 0 1 2 3 0 0
// c  1 2 3 4 5 0 1 2 3
// min(v) = 3, min(c) = 3, has ?
// max(v) = 3, max(c) = 5, has ?
// mixed

// s11 b b b ? b a a b b
// v   0 0 0 1 0 1 2 0 0
// c   1 2 3 4 5 0 0 1 2
// min(v) = 1, min(c) = 2, has ?
// max(v) = 2, max(c) = 5, has ?
// mixed

// s7 c ? b
// v  0 1 0
// c  1 2 3
// min(v) = 1, min(c) = 3, has ?
// max(v) = 1, max(c) = 3, has ?
// good

// s9 a ? a
// v  1 2 3
// c  0 1 0
// min(v) = 3, min(c) = 1, has ?
// max(v) = 3, max(c) = 1, has ?
// mixed

// s12 t y p ? a s d f ? r e l k h f d
// s12 b b b ? a b b b ? b a b b b b b
// v   0 0 0 1 2 0 0 0 1 0 1 0 0 0 0 0
// c   1 2 3 4 0 1 2 3 4 5 0 1 2 3 4 5
// min(v) = 1, min(c) = 4, has ?
// max(v) = 2, max(c) = 5, has ?
// bad

// [c3]------------------------------------------------------------
//  | + c1                                                        | + v1
//  | + v1 + c3                                                   | + v1 + c3
// [c4,v1,c3] ---------------                                 [c3,v2,c3] ------------------
//  | + c1                  | + v1                                | + c1                  | + v1
//  | + c1 + v1 + c5        | + c1 + v1 + c5                      | + c1 + v1 + c5        | + c1 + v1 + c5
// [c4,v1,c5,v1,c5]       [c4,v1,c3,v1,c1,v1,c5]           [c3,v2,c5,v1,c5]       [c3,v2,c3,v1,c1,v1,c5]
// bad                    bad                              bad                    bad

// s6 e i ?
// v  1 2 3
// c  0 0 1
// min(v) = 3, min(c) = 1, has ?
// mixed

// s2 a ? u
// v  1 2 3
// c  0 1 0
// min(v) = 3, min(c) = 1, has ?
// mixed

// s8 b ? b a b b b b b
// v  0 1 0 1 0 0 0 0 0
// c  1 2 3 0 1 2 3 4 5
// min(v) = 1, min(c) = 3, has ?
// mixed

// s1 a e u
// v  1 2 3
// c  0 0 0
// min(v) = 3, min(c) = 0, no ?
// max(v) = 3, max(c) = 0
// bad

// s3 a b a
// v  1 0 1
// c  0 1 0
// min(v) = 1, min(c) = 1, no ?
// max(v) = 1, max(c) = 1
// good

// s10 a e u b b a e
// v   1 2 3 0 0 1 2
// c   0 0 0 1 2 0 0
// min(v) = 2, min(c) = 2, no ?
// max(v) = 3, max(c) = 2, no ?
// bad
