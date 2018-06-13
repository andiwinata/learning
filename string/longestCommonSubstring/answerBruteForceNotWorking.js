function longestCommonSubstring(s, t) {
  let longest = 0

  const tryMatch = (short, long, longId) => {
    let startMatch = -1

    // match only valid chars (no going outside from range)
    const totalChars = Math.min(short.length, long.length - longId)
    // no point finding longest if totalChars is smaller or equal than longest
    if (totalChars <= longest) {
      return
    }
    for (let i = 0; i < totalChars; i++) {

      // if character matches
      if (short[i] === long[longId + i]) {
        if (startMatch === -1) {
          startMatch = i
        }

        // still matches until last character
        if (i === totalChars - 1) {
          longest = Math.max(longest, i + 1 - startMatch)
          break;
        }
        continue;
      }

      // if doesn't match anymore after matched several chars
      if (startMatch !== -1) {
        // try add to longest
        longest = Math.max(longest, i - startMatch)
        // reset startMatch
        startMatch = -1
      }
    }
  }

  for (let i = 0; i <= t.length; i++) {
    tryMatch(s, t, i)
  }

  for (let i = 1; i <= s.length; i++) {
    tryMatch(t, s, i)
  }
  return longest
}

st = 'ABC'
tt = 'DEFG'
// [ABC, DEFG]
// ABC
// DEFG

//  ABC
// DEFG

//   ABC
// DEFG

//    ABC
// DEFG

// ABC
//   DEFG

// ABC
//  DEFG

s1 = "abcdxyz"
t1 = "xyzabcd"
// longestCommonSubstring(s, t) = 4;

// abcdxyz <- short
// xyzabcd <- long
//  abcdxyz <- shprt
// xyzabcd <- long
//      abcdxyz
// xyzabcd

s2 = "zxabcdezy"
t2 = "yzabcdezx"
// longestCommonSubstring(s, t) = 6

// zxabcdezy
// yzabcdezx
//         zxabcdezy
// yzabcdezx

s3 = "ABC"
t3 = "ABCD"
// longest = 3

s4 = "ABCDGH"
t4 = "ACDGHR"
// longest = 4

// ABCDGH
// ACDGHR
// ABCDGH
//  ACDGHR
// ABCDGH
//      ACDGHR

s5 = "BXRUWSZSHXPM"
t5 = "JRHFAWDIBZBFYPDKSBHTAAPZSORBNJPZCXECVJMWJQDJHGVZJCUKFJJZACBPNSOPPVTLEI"
// 2 (ZS)
// s5 =                  "BXRUWSZSHXPM"
// t5 = "JRHFAWDIBZBFYPDKSBHTAAPZSORBNJPZCXECVJMWJQDJHGVZJCUKFJJZACBPNSOPPVTLEI"

s6 =                  "SZSH"
t6 = "YPDKSPZS"
// 2 (ZS)


// console.log(longestCommonSubstring(st, tt));
// console.log(longestCommonSubstring(s1, t1));
// console.log(longestCommonSubstring(s2, t2));
// console.log(longestCommonSubstring(s3, t3));
// console.log(longestCommonSubstring(s4, t4));
// console.log(longestCommonSubstring(s5, t5));
console.log(longestCommonSubstring(s6, t6));
