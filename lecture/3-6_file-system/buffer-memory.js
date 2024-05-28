const fs = require("fs");

console.log("before: ", process.memoryUsage().rss); // 프로그램이 시작할 때의 메모리 사용량을 출력합니다.

const data1 = fs.readFileSync("./big.txt"); // big.txt 파일의 내용을 읽어옵니다.
fs.writeFileSync("./big2.txt", data1); // big2.txt 파일에 읽어온 내용을 씁니다.
console.log("buffer: ", process.memoryUsage().rss); // 버퍼링을 사용했을 때의 메모리 사용량을 출력합니다.
