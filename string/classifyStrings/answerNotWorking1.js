function classifyStringsWrong(s) {
  const reg = /[aiueo]{3}|[^aiueo]{5}/i
  if (s.indexOf('?') === -1) {
    return reg.test(s) ? 'bad' : 'good'
  }

  const vowels = s.replace(/\?/g, 'a')
  const consonants = s.replace(/\?/g, 'b')

  const vowelsTest = reg.test(vowels)
  const consonantsTest = reg.test(consonants)

  if (vowelsTest && consonantsTest) return 'bad'
  if (vowelsTest || consonantsTest) return 'mixed'
  return 'good'
}

function classifyStringsNotWorking(s) {
  const badReg = /[aiueo]{3}|[^aiueo]{5}/
  const mixedReg = /(?=.{0,2}\?)[aeiou?]{3}|(?=.{0,4}\?)[^aeiou]{5}/

  if (badReg.test(s)) return 'bad'
  if (mixedReg.test(s)) return 'mixed'
  return 'good'
}

function classifyStrings(s) {
  let [vCount, cCount, vMixCount, cMixCount] = [0, 0, 0, 0]
  const vowels = new Set(['a', 'i', 'u', 'e', 'o'])
  let mixedIsBad = true

  let mixed = false
  for (c of s) {
    if (vowels.has(c)) { // vocal
      vCount++
      if (vMixCount > 0) vMixCount++
      if (cMixCount > 0 && cMixCount < 5) mixedIsBad = false
      cCount = cMixCount = 0
    } else if (c === '?') {
      vMixCount += vCount + 1
      cMixCount += cCount + 1
      vCount = cCount = 0
    } else { // consonant
      cCount++
      if (cMixCount > 0) cMixCount++
      if (vMixCount > 0 && vMixCount < 3) mixedIsBad = false
      vCount = vMixCount = 0
    }

    console.log(vCount, cCount);
    console.log(vMixCount, cMixCount);

    if (vCount >= 3 || cCount >= 5) return 'bad'
    if (vMixCount >= 3 || cMixCount >= 5) mixed = true
  }
  
  if (!mixed) {
    return 'good'
  }

  return mixedIsBad ? 'bad' : 'mixed'
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

// console.log(classifyStrings(s1));
// console.log(classifyStrings(s2));
// console.log(classifyStrings(s3));
// console.log(classifyStrings(s4));
console.log(classifyStrings(s5));
