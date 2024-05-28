import { pipeline } from "stream/promises";
import zlib from "zlib";
import fs from "fs";

const ac = new AbortController(); // AbortController 객체를 만듭니다.
const signal = ac.signal;

setTimeout(() => ac.abort(), 1); // 1ms 뒤에 중단

// pipeline() 메서드로 스트림끼리 연결할 수 있습니다.
await pipeline(
  fs.createReadStream("./readme4.txt"),
  zlib.createGzip(),
  fs.createWriteStream("./readme4.txt.gz"),
  { signal } // signal 옵션에 signal을 넣으면 중단됩니다.
);
