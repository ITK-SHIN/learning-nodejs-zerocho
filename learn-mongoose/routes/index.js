const express = require("express");
const User = require("../schemas/user");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    //find 메서드는 User 스키마를 require한 뒤 사용할 수 있습니다.
    //몽고디비의 db.users.find({}) 쿼리와 같다.
    // find 메서드에는 조건 객체를 넣어주어야 하는데, 이때는 빈 객체를 넣어주어야 전체 데이터를 조회합니다.
    const users = await User.find({});
    res.render("mongoose", { users });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
