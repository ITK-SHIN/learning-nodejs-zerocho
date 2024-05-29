const http = require("http");
const fs = require("fs").promises; // fs 모듈의 promise 버전
const path = require("path"); // path 모듈

/* 1️⃣  parseCookies() */
//쿠키 문자열을 쉽게 사용하기 위해 자바스크립트 객체 형식으로 바꾸는 함수
// { name: 'zerocho' } 형식으로 만들어줌
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    //  2️⃣ 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      const url = new URL(req.url, "http://localhost:8084"); // http://localhost:8084/req.url
      const name = url.searchParams.get("name"); // 주소에서 name이라는 키를 가진 데이터를 가져옴
      const expires = new Date();
      expires.setMinutes(expires.getMinutes() + 5); // 쿠키 유효 시간을 현재 시간 + 5분으로 설정
      res.writeHead(302, {
        // 302는 다른 페이지로 이동하라는 상태 코드, 브라우저는 이 코드를 보고 페이지를 리다이렉트함
        Location: "/", // 리다이렉트할 주소
        //헤더에는 한글을 설정할 수 없으므로 name 변수를 encodeURIComponent 메서드로 인코딩
        "Set-Cookie": `name=${encodeURIComponent(
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, // name이라는 쿠키에 name이라는 값과 expires를 설정
      });
      res.end();

      // 3️⃣ 주소가 /이면서 name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    } else {
      // 주소가 /이면서 name이라는 쿠키가 없는 경우
      try {
        const data = await fs.readFile(path.join(__dirname, "cookie2.html"));
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
        });
        res.end(data);
      } catch (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain; charset=utf-8",
        });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!");
  });
