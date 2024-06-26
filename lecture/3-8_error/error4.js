// uncaughtException 이벤트 리스너를 달아주면 예기치 못한 에러가 발생했을 때 이벤트 리스너가 실행되고 프로세스가 유지됨
process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러", err);
});

setInterval(() => {
  throw new Error("서버를 고장내주마!");
}, 1000);

setTimeout(() => {
  console.log("실행됩니다");
}, 2000);
