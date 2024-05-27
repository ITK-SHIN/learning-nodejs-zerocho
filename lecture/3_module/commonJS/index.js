const { odd, even } = require("./var.mjs");
const checkNumber = require("./func.mjs");

function checkStringOddOrEven(str) {
  if (str.length % 2) {
    // 홀수이면
    return odd;
  }
  return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven("hello"));
console.log(module.exports === exports); // true
