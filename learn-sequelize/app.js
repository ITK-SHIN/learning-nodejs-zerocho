const express = require("express");
const path = require("path"); // 경로 관련 기능 제공
const morgan = require("morgan"); // 요청과 응답에 대한 정보를 콘솔에 기록
const nunjucks = require("nunjucks"); // 템플릿 엔진

const { sequelize } = require("./models"); //require('./models/index.js')와 같다. index.js는 생략 가능
const indexRouter = require("./routes"); // index.js는 생략 가능
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express(); // express 객체 생성
app.set("port", process.env.PORT || 3001); // PORT 환경변수가 설정되어 있지 않다면 3001을 사용
app.set("view engine", "html"); // 템플릿 엔진을 html로 설정
// views 폴더를 템플릿 폴더로 지정
nunjucks.configure("views", {
  express: app,
  watch: true, // 파일이 변경될 때 템플릿 엔진을 다시 로드
});

//sync 메서드 :  Sequelize를 사용하여 데이터베이스와 동기화하는 메서드.
sequelize // 시퀄라이즈 객체를 통해 데이터베이스 연결
  .sync({ force: false }) // force: true로 설정하면 서버 실행 시마다 테이블을 재생성 (기존 데이터 삭제)
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev")); // 개발 시 사용
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 제공
app.use(express.json()); // JSON 데이터 처리
app.use(express.urlencoded({ extended: false })); // form 데이터 처리

app.use("/", indexRouter); // 라우터 등록
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 에러 처리 미들웨어로 전달
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  res.locals.message = err.message; // 에러 메시지를 저장
  res.locals.error = process.env.NODE_ENV != "production" ? err : {}; // 개발 환경이 아닌 경우 에러 스택 추적 X (보안)
  res.status(err.status || 500); // 상태 코드를 지정하거나 500을 기본값으로 사용
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
