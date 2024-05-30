const express = require("express"); // express 모듈을 가져온다.
const morgan = require("morgan"); // morgan 모듈을 가져온다.
const cookieParser = require("cookie-parser"); // cookie-parser 모듈을 가져온다.
const session = require("express-session"); // express-session 모듈을 가져온다.
const dotenv = require("dotenv"); // dotenv 모듈을 가져온다.
const path = require("path");

dotenv.config(); // .env 파일을 읽어서 process.env로 만든다.
const app = express(); // express 함수를 실행해서 앱을 만든다.
app.set("port", process.env.PORT || 3000); // 포트 번호를 설정한다.

app.use(morgan("dev")); // 개발 시에만 사용하는 미들웨어이다.
app.use("/", express.static(path.join(__dirname, "public"))); // static 미들웨어를 사용한다.
app.use(express.json()); // body-parser 미들웨어를 사용한다.
app.use(express.urlencoded({ extended: false })); // body-parser 미들웨어를 사용한다.
app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser 미들웨어를 사용한다.
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    name: "session-cookie",
  })
); // express-session 미들웨어를 사용한다.

// 모든 요청에 실행되는 미들웨어를 등록한다.
app.use((req, res, next) => {
  console.log("모든 요청에 다 실행된다");
  next(); // 다음 미들웨어로 넘어간다.
});

// GET 요청에만 실행되는 미들웨어를 등록한다.
app.get(
  "/",
  (req, res, next) => {
    // GET / 요청에만 실행된다.
    console.log("GET / 요청에서만 실행됩니다.");
    next();
  },
  (req, res) => {
    //에러가 발생하고, 이 에러는 그 아래에 있는 에러 처리 미들웨어에 전달된다.
    throw new Error("에러는 에러 처리 미들웨어로 간다");
  }
);

// 에러 처리 미들웨어를 등록한다.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

// 서버를 실행한다.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
