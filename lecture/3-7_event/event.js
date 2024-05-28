const EventEmitter = require("events"); // events 모듈을 불러옵니다.

const myEvent = new EventEmitter(); // EventEmitter 인스턴스를 생성합니다.
myEvent.addListener("event1", () => {
  console.log("이벤트 1");
});

myEvent.on("event2", () => {
  console.log("이벤트 2");
});

myEvent.on("event2", () => {
  console.log("이벤트 2 추가");
});

myEvent.once("event3", () => {
  console.log("이벤트 3");
}); // 한 번만 실행됨

myEvent.emit("event1"); // 이벤트 호출
myEvent.emit("event2"); // 이벤트 호출

myEvent.emit("event3"); // 이벤트 호출
myEvent.emit("event3"); // 실행 안 됨

myEvent.on("event4", () => {
  console.log("이벤트 4");
});
myEvent.removeAllListeners("event4"); // 이벤트 리스너 모두 제거
myEvent.emit("event4"); // 실행 안 됨

const listener = () => {
  console.log("이벤트 5");
};
myEvent.on("event5", listener); // 리스너를 만들고
myEvent.removeListener("event5", listener); // 이벤트에 연결된 리스너를 하나씩 제거
myEvent.emit("event5"); // 실행 안 됨

console.log(myEvent.listenerCount("event2")); // 이벤트에 연결된 리스너 개수를 확인합니다.
