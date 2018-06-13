function longestCommonSubstring(s, t) {
  const dp = []
  let max = 0
  for (let i = 0; i < s.length; i++) {
    dp[i] = []
    for (let j = 0; j < t.length; j++) {
      if (s[i] === t[j]) {
        if (i - 1 >= 0 && j - 1 >= 0) {
          dp[i][j] = dp[i-1][j-1] + 1
        } else {
          dp[i][j] = 1
        }
        max = Math.max(max, dp[i][j])
      } else {
        dp[i][j] = 0
      }
    }
  }
  // console.log(dp);
  return max
}

st = 'ABC'
tt = 'DEFG'

s1 = "abcdxyz"
t1 = "xyzabcd"
// longestCommonSubstring(s, t) = 4;

s2 = "zxabcdezy"
t2 = "yzabcdezx"
// longestCommonSubstring(s, t) = 6

s3 = "ABC"
t3 = "ABCD"
// longest = 3

s4 = "ABCDGH"
t4 = "ACDGHR"
// longest = 4

s5 = "BXRUWSZSHXPM"
t5 = "JRHFAWDIBZBFYPDKSBHTAAPZSORBNJPZCXECVJMWJQDJHGVZJCUKFJJZACBPNSOPPVTLEI"
// 2 (ZS)
// s5 =                  "BXRUWSZSHXPM"
// t5 = "JRHFAWDIBZBFYPDKSBHTAAPZSORBNJPZCXECVJMWJQDJHGVZJCUKFJJZACBPNSOPPVTLEI"

s6 = "SZSH"
t6 = "YPDKSPZS"
// 2 (ZS)

s7 = 'FUEMDADGKHUFSUEVJAXRNIVCORHFRQQWNUJQU'
t7 = 'O'
// 1

s8 = '123123'
t8 = ''

// console.log(longestCommonSubstring(st, tt));
// console.log(longestCommonSubstring(s1, t1));
// console.log(longestCommonSubstring(s2, t2));
// console.log(longestCommonSubstring(s3, t3));
// console.log(longestCommonSubstring(s4, t4));
// console.log(longestCommonSubstring(s5, t5));
// console.log(longestCommonSubstring(s6, t6));
console.log(longestCommonSubstring(s7, t7));
console.log(longestCommonSubstring(s8, t8));