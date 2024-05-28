const http = require("http");

// http.createServer() 메서드는 인자로 요청에 대한 콜백 함수를 넣을 수 있습니다.
const server = http.createServer((req, res) => {
  // 요청이 들어올 때마다 매번 콜백 함수가 실행됩니다.
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello Node! 1-1</h1>");
  res.end("<p>Hello Server!</p>");
});

// listen 메서드에 포트 번호를 넣어 서버를 실행합니다.
// 서버를 실행하면 서버는 클라이언트의 요청을 받을 준비를 합니다.
server.listen(8080); // listen 메서드로 클라이언트에게 공개할 포트 번호를 넣습니다.

// 서버에 listening 이벤트 리스너를 붙여 서버가 실행되었을 때 콘솔에 메시지를 기록하도록 합니다.
// 서버에 listening 이벤트 리스너를 붙이면 서버가 실행되었을 때의 동작을 정의할 수 있습니다.
// 서버가 실행되면 콘솔에 "8080번 포트에서 서버 대기 중입니다!"라는 메시지가 나타납니다.
server.on("listening", () => {
  //
  console.log("8080번 포트에서 서버 대기 중입니다!");
});

// error 이벤트 리스너를 붙여 에러가 발생했을 때 콘솔에 에러 메시지를 기록하도록 합니다.
// 에러가 발생하지 않았다면 error 이벤트 리스너는 필요 없습니다.
// 에러가 발생하면 서버가 멈추지 않도록 하기 위해 에러 이벤트 리스너를 붙여줍니다.
// 에러가 발생했을 때 에러 메시지를 기록하고 서버를 종료하고 싶다면 아래와 같이 작성합니다.
server.on("error", (error) => {
  console.error(error);
});
