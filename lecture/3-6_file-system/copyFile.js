const fs = require("fs").promises; // fs 모듈의 프로미스 버전을 사용합니다.

fs.copyFile("readme4.txt", "writeme4.txt") // readme4.txt를 writeme4.txt로 복사합니다.
  .then(() => {
    // 복사가 완료된 후
    console.log("복사 완료");
  })
  .catch((error) => {
    console.error(error);
  });
