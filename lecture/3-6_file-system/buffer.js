const buffer = Buffer.from("저를 버퍼로 바꿔보세요");
console.log("from():", buffer); // from() 메서드는 문자열을 버퍼로 바꿔줍니다.
console.log("length:", buffer.length); // length 프로퍼티는 버퍼의 크기를 알려줍니다.
console.log("toString():", buffer.toString()); // toString() 메서드는 버퍼를 다시 문자열로 바꿔줍니다.

const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array); // concat() 메서드는 배열 안에 든 버퍼들을 하나로 합칩니다.
console.log("concat():", buffer2.toString()); // 합친 버퍼를 다시 문자열로 바꿉니다.

const buffer3 = Buffer.alloc(5); // alloc() 메서드는 인수로 들어온 크기만큼 빈 버퍼를 생성합니다.
console.log("alloc():", buffer3); // allocUnsafe() 메서드는 기존의 버퍼의 데이터를 지우지 않고 사용합니다.
