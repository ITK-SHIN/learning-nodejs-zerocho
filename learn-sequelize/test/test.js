// 시퀄라이즈 쿼리
const { User } = require("../models"); // User 모델 불러옴
// User 테이블에 데이터 추가
User.create({
  name: "zero", // name 컬럼
  age: 24, // age 컬럼
  married: false,
  comment: "자기소개1",
});
