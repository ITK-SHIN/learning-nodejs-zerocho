const express = require("express");
const User = require("../schemas/user");
const Comment = require("../schemas/comment");

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      // User.create 메서드로 데이터를 생성할 수 있다.
      const user = await User.create({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

// 댓글 작성
//댓글 다큐먼트를 조회하는 라우터
router.get("/:id/comments", async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate(
      // populate 메서드로 관련된 컬렉션의 데이터를 불러올 수 있다.
      "commenter" // commenter 필드를 user 스키마로 채움
    );
    console.log(comments);
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
