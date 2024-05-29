const cluster = require("cluster"); // cluster 모듈
const http = require("http");
const numCPUs = require("os").cpus().length; // CPU 개수 구하기

// 마스터 프로세스일 때
if (cluster.isMaster) {
  console.log(`마스터 프로세스 아이디: ${process.pid}`);
  // CPU 개수만큼 워커를 생산
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork(); // 워커 생성 // fork() 메서드를 호출하면 워커 프로세스가 생성됨
  }
  // 워커가 종료되었을 때
  cluster.on("exit", (worker, code, signal) => {
    // 워커가 종료되었을 때 발생하는 이벤트
    // worker: 종료된 워커 code: 워커의 종료 코드 signal: 워커의 종료 신호
    console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
    console.log("code", code, "signal", signal);
    cluster.fork(); // 워커가 종료되면 다시 하나를 생성
  });
} else {
  // 워커들이 포트에서 대기
  http
    .createServer((req, res) => {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write("<h1>Hello Node!</h1>");
      res.end("<p>Hello Cluster!</p>");
      setTimeout(() => {
        // 워커가 존재하는지 확인하기 위해 1초마다 강제 종료
        process.exit(1);
      }, 1000);
    })
    .listen(8086);

  console.log(`${process.pid}번 워커 실행`);
}
