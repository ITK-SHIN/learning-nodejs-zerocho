import { setTimeout, setInterval } from "timers/promises";

await setTimeout(3000);
console.log("3초 뒤 실행");

for await (const startTime of setInterval(1000, Date.now())) {
  console.log("1초마다 실행", new Date(startTime));
}

/* 
3초 뒤 실행
1초마다 실행 2022-04-12T08:10:54.969Z
1초마다 실행 2022-04-12T08:10:54.969Z
1초마다 실행 2022-04-12T08:10:54.969Z
1초마다 실행 2022-04-12T08:10:54.969Z
1초마다 실행 2022-04-12T08:10:54.969Z
*/
