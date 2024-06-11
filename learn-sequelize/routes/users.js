const express = require("express");
const User = require("../models/user");
const Comment = require("../models/comment");

const router = express.Router(); // 라우터 생성

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll(); // User 테이블의 모든 데이터를 조회
      res.json(users); // JSON 형식으로 반환
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      // User 테이블에 데이터 추가
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user); // 201 Created
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get("/:id/comments", async (req, res, next) => {
  try {
    // Comment 테이블의 모든 데이터를 조회
    const comments = await Comment.findAll({
      include: {
        model: User, // User 모델과 조인
        where: { id: req.params.id }, // id가 일치하는 데이터만 조회
      },
    });
    console.log(comments);
    res.json(comments); // JSON 형식으로 반환
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router; // 라우터 모듈로 사용
