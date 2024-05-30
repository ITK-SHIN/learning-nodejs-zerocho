const express = require("express");

const router = express.Router(); // 라우터 객체를 만든다.

// GET / 라우터
router.get("/", (req, res) => {
  res.send("Hello, Express");
});

module.exports = router; // 라우터 객체를 모듈로 만든다.
