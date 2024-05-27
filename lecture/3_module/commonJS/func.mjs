const { odd, even } = require("./var.mjs"); // 불러올 모듈의 경로 , 확장자 생략 가능

function checkOddOrEven(num) {
  if (num % 2) {
    // 홀수이면
    return odd;
  }
  return even;
}

module.exports = checkOddOrEven;
