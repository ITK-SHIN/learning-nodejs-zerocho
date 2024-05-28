import { pipeline } from "stream/promises"; // pipeline() 메서드를 사용하면 스트림끼리 연결할 수 있습니다.
import zlib from "zlib"; // zlib 모듈을 사용하면 파일을 압축할 수 있습니다.
import fs from "fs"; // fs 모듈을 사용하면 파일을 읽거나 쓸 수 있습니다.

// pipeline() 메서드로 스트림끼리 연결할 수 있습니다.
await pipeline(
  fs.createReadStream("./readme4.txt"),
  zlib.createGzip(), // zlib.createGzip() 메서드로 스트림을 연결하면 파일을 읽어서 압축할 수 있습니다.
  fs.createWriteStream("./readme4.txt.gz")
);
