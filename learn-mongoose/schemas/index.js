const mongoose = require("mongoose");

const connect = () => {
  //1️⃣  개발 환경일 때만 콘솔을 통해 몽구스가 생성하는 쿼리 내용을 확인
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  // 2️⃣  몽고디비 연결

  mongoose
    .connect("mongodb://ITKSangwoo:dnsdidehd!2@localhost:27017/admin", {
      dbName: "nodejs", // 실제 사용할 데이터베이스
      useNewUrlParser: true, // 현재 URL 스트링 파서가 deprecated 되었으므로 이를 대체하기 위한 옵션
    })
    .then(() => console.log("몽고디비 연결 성공"))
    .catch((err) => console.log("몽고디비 연결 에러", error));

  //3️⃣  연결 시 이벤트 리스너
  mongoose.connection.on("error", (error) => {
    console.error("몽고디비 연결 에러", error);
  });
  mongoose.connection.on("disconnected", () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
  });
};

module.exports = connect;
