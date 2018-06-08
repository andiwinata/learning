Given a pattern string and a test string, your task is to implement regex substring matching. If pattern is preceded by a ^, the pattern, excluding the ^, will be matched with the starting position of the test string. If pattern is followed by a $, the pattern, excluding the $, will be matched with the ending position of the test string. If no such markers are present, check whether pattern is a substring of test, regardless of its position.

Example

For pattern = "^code" and test = "codefights", the output should be
regexMatching(pattern, test) = true;
For pattern = "hts$" and test = "codefights", the output should be
regexMatching(pattern, test) = true;
For pattern = "hello" and test = "world", the output should be
regexMatching(pattern, test) = false.
Input/Output

[execution time limit] 4 seconds (js)

[input] string pattern

A string that can contain lowercase English characters, ^, or $.

Guaranteed constraints:
1 ≤ pattern.length ≤ 105.

[input] string test

A string composed of lowercase English characters.

Guaranteed constraints:
1 ≤ test.length ≤ 105.

[output] boolean

Return true if the test string matches the given pattern, otherwise return false.