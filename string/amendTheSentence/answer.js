function amendTheSentence(s) {
  const x = s.replace(/[A-Z]/g, match => ` ${match.toLowerCase()}`)
  return x.charAt(0) === ' ' ? x.substring(1) : x
}

function amendTheSentence2(s) {
  return s.replace(/[A-Z]/g, match => ` ${match.toLowerCase()}`).trim()
}
