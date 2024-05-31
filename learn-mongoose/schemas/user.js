const mongoose = require("mongoose");

const { Schema } = mongoose;

// 스키마 생성
const userSchema = new Schema({
  name: {
    type: String,
    required: true, // 필수 항목
    unique: true, // 고유한 값
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema); // 스키마를 모델로 변환하여 내보냄
