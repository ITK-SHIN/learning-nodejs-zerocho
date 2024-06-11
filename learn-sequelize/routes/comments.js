const express = require("express");
const { Comment } = require("../models");

const router = express.Router(); // 라우터 생성

router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    res.status(201).json(comment); // 201 Created
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      const result = await Comment.update(
        {
          comment: req.body.comment, // 수정할 내용
        },
        {
          where: { id: req.params.id }, // id가 일치하는 데이터만 수정
        }
      );
      res.json(result); // 수정된 데이터 반환
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await Comment.destroy({ where: { id: req.params.id } }); // id가 일치하는 데이터만 삭제
      res.json(result); // 삭제된 데이터 반환
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router; //     라우터 모듈로 사용
