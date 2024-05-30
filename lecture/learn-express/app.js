const express = require("express"); // express 모듈을 가져온다.
const path = require("path");

const app = express(); // express 함수를 실행해서 앱을 만든다.
app.set("port", process.env.PORT || 3000); // 포트 번호를 설정한다.

// GET 요청에 대해 응답을 보낸다.
app.get("/", (req, res) => {
  //res.send("Hello, Express"); // send 메서드로 응답을 보낸다.
  res.sendFile(path.join(__dirname, "index.html")); // sendFile 메서드로 파일을 응답한다.
});

// 서버를 실행한다.
app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
