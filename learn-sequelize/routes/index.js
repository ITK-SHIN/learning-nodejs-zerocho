const express = require("express");
const User = require("../models/user");

const router = express.Router(); // 라우터 생성

// GET / 라우터
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll(); // User 테이블의 모든 데이터를 조회
    res.render("sequelize", { users }); // sequelize.html 렌더링
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
