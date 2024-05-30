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
); // express-session 미들웨어를 사용한다.

/*=============== multer 실습하기 ========================= */
const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
// 파일 업로드를 위한 multer 미들웨어를 설정한다.
const upload = multer({
  // 파일 저장 방식을 설정
  storage: multer.diskStorage({
    // 파일이 저장될 경로를 설정한다.
    destination(req, file, done) {
      done(null, "uploads/"); // uploads 폴더에 저장
    },
    // 파일명을 설정
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 파일의 확장자를 가져옴
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일명을 설정
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한을 설정 // 5MB
});
// GET /upload 요청이 들어오면
app.get("/upload", (req, res) => {
  res.sendFile(path.join(__dirname, "multipart.html")); // multipart.html 파일을 응답한다.
});

// POST /upload 요청이 들어오면
// single 미들웨어를 사용해서 이미지를 처리한다.
app.post(
  "/upload",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send("ok");
  }
);
/*============================================ */

// 모든 요청에 실행되는 미들웨어를 등록.
app.use((req, res, next) => {
  console.log("모든 요청에 다 실행된다");
  next(); // 다음 미들웨어로 넘어간다.
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
  console.error(err);
  res.status(500).send(err.message);
});

// 서버를 실행한다.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
