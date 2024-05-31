const express = require("express");
const Comment = require("../schemas/comment");

const router = express.Router();

// 다큐먼트를 등록하는 라우터
router.post("/", async (req, res, next) => {
  try {
    const comment = await Comment.create({
      //1.  Comment.create 메서드로 데이터를 저장
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    //2.  populate 메서드로 프로미스의 결과로 반환된 comment 객체에 다른 컬렉션 다큐먼트를 불러옴
    //path 옵션으로 어떤 필드를 합칠지 설정
    const result = await Comment.populate(comment, { path: "commenter" });
    res.status(201).json(result); //3.  결과를 클라이언트로 응답
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//다큐먼트를 수정하는 라우터
router
  .route("/:id")
  .patch(async (req, res, next) => {
    try {
      // update 메서드로 데이터를 수정
      //. update 메서드의 첫 번째 인수로는 어떤 다큐먼트를 수정할지를 나타낸 쿼리 객체를 제공,
      //두 번째 인수로는 수정할 필드와 값이 들어 있는 객체를 제공
      // 시퀄라이즈와는 인수의 순서가 반대임
      //몽고디비와 다르게 $set 연산자를 사용하지 않아도 기입한 필드만 바꿈
      //실수로 다큐먼트를 통째로 수정할 일이 없어 안전
      const result = await Comment.update(
        {
          _id: req.params.id,
        },
        {
          comment: req.body.comment,
        }
      );
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => {
    //DELETE /comments/:id 라우터는 다큐먼트를 삭제하는 라우터
    try {
      // remove 메서드에도 어떤 다큐먼트를 삭제할지에 대한 조건을 첫 번째 인수에 넣습니다.
      const result = await Comment.remove({ _id: req.params.id }); //remove 메서드를 사용해 삭제
      res.json(result);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
