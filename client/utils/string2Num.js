
const string2Num = (text) => {
  let input = text
  let num = 0;

  for (var i = 0, len = input.length; i < len; ++i) {
    num += input.charCodeAt(i) * (i + 1);
  }

  return num

}

module.exports = {
  string2Num,
}