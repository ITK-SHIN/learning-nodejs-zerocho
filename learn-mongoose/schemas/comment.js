const mongoose = require("mongoose");

const { Schema } = mongoose;

const {
  Types: { ObjectId }, // ObjectId 타입을 사용하기 위해 mongoose.Types.ObjectId를 ObjectId로 줄여서 사용
} = Schema;

const commentSchema = new Schema({
  commenter: {
    type: ObjectId, // ObjectId 타입으로 선언
    required: true, // 필수 항목
    ref: "User", // User 스키마의 ObjectId와 연결
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // 현재 날짜를 기본값으로 지정
  },
});

module.exports = mongoose.model("Comment", commentSchema); // 스키마를 모델로 변환하여 내보냄
