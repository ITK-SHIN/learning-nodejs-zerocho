const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

if (isMainThread) {
  // 메인 스레드인지 아닌지 확인
  // 부모일 때
  const threads = new Set(); // 워커 스레드를 관리할 Set 생성
  threads.add(
    // 워커 스레드 생성
    new Worker(__filename, {
      // 현재 파일을 워커 스레드로 생성
      workerData: { start: 1 }, // 워커 스레드에 전달할 데이터
    })
  );
  threads.add(
    new Worker(__filename, {
      // 현재 파일을 워커 스레드로 생성
      workerData: { start: 2 }, // 워커 스레드에 전달할 데이터
    })
  );
  for (let worker of threads) {
    // 워커 스레드에 이벤트 리스너 등록
    worker.on("message", (message) => console.log("from worker", message)); // 워커 스레드로부터 메시지 받기
    worker.on("exit", () => {
      // 워커 스레드가 종료되면
      threads.delete(worker); // Set에서 삭제
      if (threads.size === 0) {
        // 모든 워커 스레드가 종료되면
        console.log("job done"); // 작업 완료 출력
      }
    });
  }
} else {
  // 워커일 때
  const data = workerData; // 워커 스레드에 전달된 데이터
  parentPort.postMessage(data.start + 100); // 부모 스레드에 메시지 보내기
}
