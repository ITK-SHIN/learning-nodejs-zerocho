const fs = require("fs"); // fs 모듈을 불러옵니다.

// target.txt 파일을 감시합니다.
fs.watch("./target.txt", (eventType, filename) => {
  console.log(eventType, filename); // 이벤트 종류와 파일 이름을 출력합니다.
});
