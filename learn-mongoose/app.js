const express = require("express");
const path = require("path");
const morgan = require("morgan"); // 로깅 미들웨어
const nunjucks = require("nunjucks"); // 템플릿 엔진

const connect = require("./schemas");

const app = express();
app.set("port", process.env.PORT || 3002);
app.set("view engine", "html"); // 템플릿 엔진을 html로 설정

// views 폴더를 템플릿 파일들이 있는 곳으로 설정
nunjucks.configure("views", {
  express: app, // app 객체를 express로 설정
  watch: true, // HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링
});
connect(); // 몽고디비 연결

app.use(morgan("dev")); // 개발 시 morgan 미들웨어를 사용하여 요청과 응답을 콘솔에 기록
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(express.json()); // JSON 형식의 데이터를 받을 수 있게 함
app.use(express.urlencoded({ extended: false })); // form 형식의 데이터를 받을 수 있게 함

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message; // 에러 메시지를 템플릿 엔진에 변수로 넣음
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 개발 환경일 때 에러 스택을 템플릿 엔진에 변수로 넣음
  res.status(err.status || 500); // 에러 상태 코드를 지정
  res.render("error"); // 에러 템플릿 렌더링
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
