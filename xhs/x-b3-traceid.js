function test() {
  for (var e = "", t = 0; t < 16; t++)
    e += "abcdef0123456789".charAt(Math.floor(16 * Math.random()))
  return e
}

console.log(test())