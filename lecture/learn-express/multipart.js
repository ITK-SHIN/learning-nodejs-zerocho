const multer = require("multer");

// 파일 업로드를 위한 multer 미들웨어를 설정한다.
// multer 함수를 실행해서 upload 객체를 만든다.
// storage 속성에는 파일 저장 방식과 경로, 파일명 등을 설정한다.
const upload = multer({
  // 파일 저장 방식을 설정한다.
  storage: multer.diskStorage({
    // 파일이 저장될 경로를 설정한다.
    destination(req, file, done) {
      done(null, "uploads/"); // uploads 폴더에 저장한다.
    },
    // 파일명을 설정한다.
    filename(req, file, done) {
      const ext = path.extname(file.originalname); // 파일의 확장자를 가져온다.
      done(null, path.basename(file.originalname, ext) + Date.now() + ext); // 파일명을 설정한다.
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한을 설정한다.
});
