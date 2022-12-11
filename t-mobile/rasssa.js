const generateKeys = function () {
  return crypto.subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: {
      name: "SHA-256"
    }
  }, !1, ["sign", "verify"]).then(function (e) {
    return {
      publicKey: e.publicKey,
      privateKey: e.privateKey
    }
  }, function (e) {
    throw console.error(e),
    e
  })
}

generateKeys().then(function (e) {
  console.log("Added new keys")
  global.keyPair = e
  crypto.subtle.exportKey("spki", e.publicKey).then(function (e) {
    var n = btoa(String.fromCharCode.apply(null, new Uint8Array(e)))
    var pKey = "-----BEGIN PUBLIC KEY----- " + n + " -----END PUBLIC KEY-----"
    console.log(pKey)
  })
})