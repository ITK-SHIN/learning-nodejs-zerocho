const fs = require("fs");

console.log("시작 전: ", process.memoryUsage().rss); // 프로그램이 시작할 때의 메모리 사용량을 출력합니다.

const readStream = fs.createReadStream("./big.txt"); // 읽기 스트림을 생성합니다. 이 스트림은 "big.txt" 파일의 내용을 읽습니다.
const writeStream = fs.createWriteStream("./big3.txt"); // 쓰기 스트림을 생성합니다. 이 스트림은 "big3.txt" 파일에 데이터를 씁니다.

readStream.pipe(writeStream); // 읽기 스트림의 데이터를 쓰기 스트림으로 전달합니다.

// 모든 데이터가 전달되었을 때 "end" 이벤트가 발생하고, 이 시점의 메모리 사용량을 출력합니다.
readStream.on("end", () => {
  console.log("스트림 종료: ", process.memoryUsage().rss);
});
