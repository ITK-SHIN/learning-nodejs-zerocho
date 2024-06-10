const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

const { sequelize } = require("./models");

const app = express();
app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");
// views 폴더를 템플릿 폴더로 지정
nunjucks.configure("views", {
  express: app,
  watch: true, // 파일이 변경될 때 템플릿 엔진을 다시 로드
});
