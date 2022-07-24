const crypto = require("crypto-js");

//the secret key used for encrypting and decrypting messages
const secretKey = "thisisnotreallyasecretkeylol"

//returns the encrypted text
const encrypt = (text) => {
  let encrypted = crypto.AES.encrypt(JSON.stringify(text), secretKey).toString()
  return encrypted
};

// retruns decryped message
const decrypt = (cipher, username) => {
  if(username == "admin") return cipher //admin messages dont get encrypted therefore dont need to be decrypted

  let bytes = crypto.AES.decrypt(cipher, secretKey)
  let decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8))

  return decrypted
}

module.exports = {
  encrypt,
  decrypt
}

// let cipher = encrypt("test")
// console.log(decrypt(cipher))