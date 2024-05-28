const zlib = require("zlib");
const fs = require("fs");

const readStream = fs.createReadStream("./readme4.txt"); // 파일을 읽어서 압축하는 코드
const zlibStream = zlib.createGzip(); // 파일을 읽어서 압축하는 코드
const writeStream = fs.createWriteStream("./readme4.txt.gz"); // 압축 파일을 만드는 코드
readStream.pipe(zlibStream).pipe(writeStream); // 파일을 읽어서 압축하는 코드
