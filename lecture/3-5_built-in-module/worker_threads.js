const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // 부모일 때
  const worker = new Worker(__filename); // 현재 파일을 워커로 만들기
  worker.on("message", (message) => console.log("from worker", message)); // worker로부터 메시지 받기
  worker.on("exit", () => console.log("worker exit")); // worker가 종료되면 출력
  worker.postMessage("ping"); // worker에 데이터 보내기
} else {
  // 워커일 때
  parentPort.on("message", (value) => {
    // 부모로부터 메시지 받기
    console.log("from parent", value); // 부모로부터 받은 메시지 출력
    parentPort.postMessage("pong"); // 부모에게 메시지 보내기
    parentPort.close(); // 부모와의 연결 끊기
  });
}
