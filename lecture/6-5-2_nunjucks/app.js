const express = require("express"); // express 모듈을 가져온다.
const morgan = require("morgan"); // morgan 모듈을 가져온다.
const cookieParser = require("cookie-parser"); // cookie-parser 모듈을 가져온다.
const session = require("express-session"); // express-session 모듈을 가져온다.
const dotenv = require("dotenv"); // dotenv 모듈을 가져온다.
const path = require("path");
const nunjucks = require("nunjucks");

dotenv.config(); // .env 파일을 읽어서 process.env로 만든다.
const indexRouter = require("./routes");
const userRouter = require("./routes/user");

const app = express(); // express 함수를 실행해서 앱을 만든다.
app.set("port", process.env.PORT || 3000); // 포트 번호를 설정한다.
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});

app.use(morgan("dev")); // 개발 시에만 사용하는 미들웨어이다.
app.use("/", express.static(path.join(__dirname, "public"))); // static 미들웨어를 사용한다.
app.use(express.json()); // body-parser 미들웨어를 사용한다.
app.use(express.urlencoded({ extended: false })); // body-parser 미들웨어를 사용한다.

app.use(cookieParser(process.env.COOKIE_SECRET)); // cookie-parser 미들웨어를 사용한다.
app.use(
  session({
    resave: false, // 요청이 올 때 세션에 수정사항이 생기지 않더라도 세션을 다시 저장할지 설정한다.
    saveUninitialized: false, // 세션에 저장할 내역이 없더라도 세션을 저장할지 설정한다.
    secret: process.env.COOKIE_SECRET, // 필수 항목이다. cookie-parser의 비밀키와 같은 역할을 한다.
    // 세션 쿠키에 대한 설정.
    cookie: {
      httpOnly: true, // 클라이언트에서 쿠키를 확인하지 못하도록 설정한다.
      secure: false, // https가 아닌 환경에서도 사용할 수 있도록 설정한다.
    },
    name: "session-cookie", // 세션 쿠키의 이름을 설정한다.
  })
);

app.use("/", indexRouter); // 라우터를 등록한다.
app.use("/user", userRouter); // 라우터를 등록한다.

// 404 처리 미들웨어를 등록한다.
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// 모든 요청에 실행되는 미들웨어를 등록.
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error); // 다음 미들웨어로 넘어간다.
});

// GET 요청에만 실행되는 미들웨어를 등록.
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
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// 서버를 실행한다.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
