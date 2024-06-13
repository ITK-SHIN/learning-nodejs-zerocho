const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

// NODE_ENV 환경변수가 설정되어 있지 않다면 development를 기본값으로 사용
const env = process.env.NODE_ENV || "development";

// config/config.json 파일에서 환경변수에 따른 설정을 불러옴 (development, test, production)
// config.json 파일은 시퀄라이즈 패키지가 자동으로 생성 (시퀄라이즈 CLI)
const config = require("../config/config")[env];
const db = {}; // db 객체 생성

const sequelize = new Sequelize( // 시퀄라이즈 객체 생성
  config.database, // 데이터베이스 이름
  config.username, // 유저 이름
  config.password, // 비밀번호
  config // 환경변수에 따른 설정
);

db.sequelize = sequelize; // db 객체에 시퀄라이즈 객체를 넣음

db.User = User; // db 객체에 User 모델을 넣음
db.Comment = Comment; // db 객체에 Comment 모델을 넣음

// 모델.init이 실행되어야 테이블이 모델로 연결된다.
User.initiate(sequelize); // User 모델의 init 메서드를 호출
Comment.initiate(sequelize); // Comment 모델의 init 메서드를 호출

// associate 메서드를 호출하여 다른 모델과의 관계를 정의
User.associate(db); //  User, Comment 모델의 associate 메서드를 호출
Comment.associate(db); // User, Comment 모델의 associate 메서드를 호출

module.exports = db; // db 객체를 모듈로 사용
