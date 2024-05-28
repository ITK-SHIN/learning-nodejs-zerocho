const fs = require("fs").promises; // fs 모듈의 프로미스 버전을 사용합니다.

fs.readdir("./folder") // 폴더 내용을 확인합니다.
  .then((dir) => {
    // 폴더 내용을 확인한 후
    console.log("폴더 내용 확인", dir); // 폴더 내용을 출력합니다.
    return fs.unlink("./folder/newfile.js"); // 파일을 삭제합니다.
  })
  .then(() => {
    // 파일을 삭제한 후
    console.log("파일 삭제 성공");
    return fs.rmdir("./folder"); // 폴더를 삭제합니다.
  })
  .then(() => {
    // 폴더를 삭제한 후
    console.log("폴더 삭제 성공");
  })
  .catch((err) => {
    console.error(err);
  });
