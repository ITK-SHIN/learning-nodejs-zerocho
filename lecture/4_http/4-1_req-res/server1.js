const http = require("http"); // http 모듈을 불러옵니다.

// http 모듈에는 createServer 메서드가 있습니다.
// 이 메서드는 인자로 요청에 대한 콜백 함수를 넣을 수 있습니다.
http
  .createServer((req, res) => {
    // 요청이 들어올 때마다 매번 콜백 함수가 실행됩니다.
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); // 응답에 대한 정보를 기록. 상태 코드는 200이고, 컨텐츠 타입은 text/html이며 한글은 제대로 표시되도록 charset을 utf-8로 지정합니다.
    res.write("<h1>Hello Node!</h1>"); // write 메서드로 응답 데이터를 작성합니다.
    res.end("<p>Hello Server!</p>"); // end 메서드로 응답을 종료합니다. 만약 인자가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료합니다.
  })
  .listen(8080, () => {
    // createServer 뒤에 listen 메서드를 붙이고 클라이언트에게 공개할 포트 번호와 포트 연결 완료 후 실행될 콜백 함수를 넣습니다.
    // 서버 연결
    console.log("8080번 포트에서 서버 대기 중입니다!");
  });
