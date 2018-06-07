You categorize strings into three types: good, bad, or mixed. If a string has 3 consecutive vowels or 5 consecutive consonants, or both, then it is categorized as bad. Otherwise it is categorized as good. Vowels in the English alphabet are ["a", "e", "i", "o", "u"] and all other letters are consonants.

The string can also contain the character ?, which can be replaced by either a vowel or a consonant. This means that the string "?aa" can be bad if ? is a vowel or good if it is a consonant. This kind of string is categorized as mixed.

Implement a function that takes a string s and returns its category: good, bad, or mixed.

Example

For s = "aeu", the output should be
classifyStrings(s) = "bad";

For s = "a?u", the output should be
classifyStrings(s) = "mixed";

For s = "aba", the output should be
classifyStrings(s) = "good".

Input/Output

[execution time limit] 4 seconds (js)

[input] string s

A string that can contain only lowercase English letters and the character ?.

Guaranteed constraints:
1 ≤ s.length ≤ 50.

[output] string

good, bad or mixed.