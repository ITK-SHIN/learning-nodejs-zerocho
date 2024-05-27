console.log("require가 가장 위에 오지 않아도 됩니다.");

module.exports = "저를 찾아보세요.";

require("./var");

console.log("require.cache입니다.");
console.log(require.cache); // 모듈이 한 번 실행되면 require.cache에 저장되어 다음에 require할 때는 캐시된 값을 사용한다.
console.log("require.main입니다.");
console.log(require.main === module); // node 명령어로 실행한 파일이 require.main이 된다.
console.log(require.main.filename); // node 명령어로 실행한 파일의 경로
