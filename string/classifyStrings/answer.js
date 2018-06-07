// [c3]------------------------------------------------------------
//  | + c1                                                        | + v1
//  | + v1 + c3                                                   | + v1 + c3
// [c4,v1,c3] ---------------                                 [c3,v2,c3] ------------------
//  | + c1                  | + v1                                | + c1                  | + v1
//  | + c1 + v1 + c5        | + c1 + v1 + c5                      | + c1 + v1 + c5        | + c1 + v1 + c5
// [c4,v1,c5,v1,c5]       [c4,v1,c3,v1,c1,v1,c5]           [c3,v2,c5,v1,c5]       [c3,v2,c3,v1,c1,v1,c5]
// bad                    bad                              bad                    bad

function classifyStrings(s) {
  let mixed = false
  const vowels = new Set(['a', 'i', 'u', 'e', 'o'])

  const res = []

  const traverse = (startIndex, vCount, cCount, str) => {
    for (let i = startIndex; i < str.length; i++) {
      const char = str.charAt(i)
      if (char === '?') {
        // replace ? with vowel
        traverse(i, vCount, cCount, `${str.substring(0, i)}a${str.substring(i + 1)}`)
        // replace ? with consonant
        traverse(i, vCount, cCount, `${str.substring(0, i)}b${str.substring(i + 1)}`)
        break
      }

      if (vowels.has(char)) {
        vCount++
        cCount = 0
      } else {
        cCount++
        vCount = 0
      }

      if (vCount >= 3 || cCount >= 5) {
        res.push('bad')
        break
      }
      if (i === s.length - 1) {
        res.push('good')
      }
    }
  }

  traverse(0, 0, 0, s)

  // without '?'
  if (res.length === 1) return res[0]
  // with '?'
  if (res.every(x => x === 'bad')) return 'bad'
  if (res.every(x => x === 'good')) return 'good'
  return 'mixed'
}

s1 = "aeu"
// classifyStrings(s) = "bad";
s2 = "a?u"
// classifyStrings(s) = "mixed";
s3 = "aba"
// classifyStrings(s) = "good"
s4 = 'bbbb?a?bb'
//    bbbbaabbb
//    bbbbaaabb
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

// console.log(classifyStrings(s1));
// console.log(classifyStrings(s2));
// console.log(classifyStrings(s3));
// console.log(classifyStrings(s4));
// console.log(classifyStrings(s5));
// console.log(classifyStrings(s6));
// console.log(classifyStrings(s7));
// console.log(classifyStrings(s12));