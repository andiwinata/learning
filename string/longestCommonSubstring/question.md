Given two strings, s and t, find the length of their longest common substring.

Example

For s = "abcdxyz" and t = "xyzabcd", the output should be
longestCommonSubstring(s, t) = 4;

For s = "zxabcdezy" and t = "yzabcdezx", the output should be
longestCommonSubstring(s, t) = 6.

The longest common substring is "abcdez" and has a length of 6.

Input/Output

[execution time limit] 6 seconds (js)

[input] string s

A non-empty string.

Guaranteed constraints:
1 ≤ s.length ≤ 105.

[input] string t

A non-empty string.

Guaranteed constraints:
1 ≤ t.length ≤ 105.

[output] integer

The length of the longest common substring of s and t.