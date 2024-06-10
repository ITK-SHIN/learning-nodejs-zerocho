"use strict";

const fs = require("fs"); // 파일 시스템 모듈
const path = require("path"); // 경로 관련 모듈
const Sequelize = require("sequelize"); // 시퀄라이즈 패키지
const process = require("process"); // process.env.NODE_ENV를 사용하기 위해 추가
const basename = path.basename(__filename); // 현재 파일명을 담는다.
const env = process.env.NODE_ENV || "development"; // NODE_ENV 환경변수가 설정되어 있지 않다면 development를 사용
const config = require(__dirname + "/../config/config.json")[env]; // config.json 파일을 불러온다.
const db = {}; // db 객체 생성

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // 환경변수로 연결
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
