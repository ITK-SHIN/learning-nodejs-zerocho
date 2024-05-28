const spawn = require("child_process").spawn; // spawn 모듈 불러오기

const process = spawn("python", ["test.py"]); // spawn으로 파이썬 프로그램 실행

// 실행 결과 출력
process.stdout.on("data", function (data) {
  console.log(data.toString());
}); // 실행 결과

// 실행 에러 출력
process.stderr.on("data", function (data) {
  console.error(data.toString());
}); // 실행 에러
