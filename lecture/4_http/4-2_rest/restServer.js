const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const users = {}; // 데이터 저장용

// http 모듈로 서버를 만들고, 요청이 들어왔을 때 어떻게 응답할지 구현
// http 모듈에는 createServer 메서드가 있다.
// 이 메서드는 인자로 요청에 대한 콜백 함수를 넣을 수 있다.
http
  .createServer(async (req, res) => {
    // 요청이 들어올 때마다 매번 콜백 함수가 실행
    try {
      console.log(req.method, req.url); // HTTP 메서드와 URL을 server콘솔에 기록
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile(
            path.join(__dirname, "restFront.html") // restFront.html의 내용을 읽어옴 // __dirname: 현재 파일이 있는 경로 // path.join: 경로를 합쳐줌 // fs.readFile: 파일을 읽어옴
          );

          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data); // 읽은 파일을 클라이언트에게 전송 // res.end: 응답을 종료하는 메서드
        } else if (req.url === "/about") {
          console.log("about 진입");
          const data = await fs.readFile(path.join(__dirname, "about.html"));
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
        /*   /도 /about도 /users도 아니면 */
        try {
          const data = await fs.readFile(path.join(__dirname, req.url));
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 찾지 못했다는 404 Not Found error 발생
        }
      } else if (req.method === "POST") {
        // 주소가 /user이면
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          // 요청의 본문에 들어 있는 데이터를 꺼내기 위한 작업
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/html; charset=utf-8" });
            res.end("등록 성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2]; // /user/1234 형태에서 1234 부분을 가져옴
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2]; // /user/1234 형태에서 1234 부분을 가져옴
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err);
    }
  })
  .listen(8082, () => {
    // 서버 연결
    // 서버 연결 후 실행될 콜백 함수
    console.log("8082번 포트에서 서버 대기 중입니다");
  });
