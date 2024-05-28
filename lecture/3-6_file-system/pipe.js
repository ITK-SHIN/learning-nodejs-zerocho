const fs = require("fs");

const readStream = fs.createReadStream("readme4.txt");
const writeStream = fs.createWriteStream("writeme3.txt");
readStream.pipe(writeStream); // pipe() 메서드로 연결하면 스트림 사이에 데이터가 전달됩니다.
