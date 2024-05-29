const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie); // 쿠키는 req.headers.cookie에 들어있음
    res.writeHead(200, { "Set-Cookie": "mycookie=test" }); // Set-Cookie 헤더를 통해 쿠키를 설정 // 쿠키명=쿠키값
    res.end("Hello Cookie");
  })
  .listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중입니다!");
  });
