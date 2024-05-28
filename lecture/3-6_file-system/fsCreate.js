const fs = require("fs").promises; // fs 모듈의 프로미스 버전을 사용합니다.
const constants = require("fs").constants; // fs 모듈의 상수들을 사용합니다.

fs.access("./folder", constants.F_OK | constants.W_OK | constants.R_OK) // 폴더나 파일에 접근할 수 있는지 체크합니다.
  .then(() => {
    // 접근할 수 있으면
    return Promise.reject("이미 폴더 있음"); // 에러 메시지를 출력합니다.
  })
  .catch((err) => {
    // 폴더나 파일에 접근할 수 없는 에러가 발생했을 때
    if (err.code === "ENOENT") {
      console.log("폴더 없음");
      return fs.mkdir("./folder"); // 폴더를 만듭니다.
    }
    return Promise.reject(err); // 다른 에러가 발생했을 때 에러 메시지를 출력합니다.
  })
  .then(() => {
    // 폴더를 만들었을 때
    console.log("폴더 만들기 성공");
    return fs.open("./folder/file.js", "w"); // 파일을 만듭니다.
  })
  .then((fd) => {
    // 파일 디스크립터를 가져옵니다.
    console.log("빈 파일 만들기 성공", fd);
    return fs.rename("./folder/file.js", "./folder/newfile.js"); // 파일의 이름을 바꿉니다.
  })
  .then(() => {
    console.log("이름 바꾸기 성공");
  })
  .catch((err) => {
    console.error(err);
  });
