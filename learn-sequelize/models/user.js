const Sequelize = require("sequelize"); // 시퀄라이즈 패키지 불러오기

// 시퀄라이즈의 Model을 상속받는 User 모델 정의
class User extends Sequelize.Model {
  // static 메서드로 init 메서드 정의
  static initiate(sequelize) {
    // init 메서드로 모델의 속성 정의
    User.init(
      // 첫 번째 인수 → 테이블 컬럼에 대한 설정
      // 두 번째 인수 → 테이블 자체에 대한 설정
      {
        name: {
          type: Sequelize.STRING(20),
          allowNull: false, // NOT NULL
          unique: true, // 고유한 값
        },
        age: {
          type: Sequelize.INTEGER.UNSIGNED, // 양수만 허용 (0 ~ 4294967295)
          allowNull: false,
        },
        married: {
          type: Sequelize.BOOLEAN, // true, false
          allowNull: true,
        },
        comment: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE, // DATETIME
          allowNull: false,
          defaultValue: Sequelize.NOW, // 기본값
        },
      },
      // 옵션 설정
      {
        sequelize, // 첫 번째 인수: sequelize 객체
        timestamps: false, // 두 번째 인수: 옵션 설정 (timestamps → 생성일자, 수정일자 컬럼을 자동 생성)
        underscored: false, // 카멜케이스로 변환
        modelName: "User", // 세 번째 인수: 모델 이름
        tableName: "users", //  네 번째 인수: 테이블 이름
        paranoid: false, // 다섯 번째 인수: true로 설정하면 deletedAt 컬럼이 생성됨
        charset: "utf8", // 여섯 번째 인수: utf8 설정 (한글 저장)
        collate: "utf8_general_ci", // 일곱 번째 인수: utf8_general_ci 설정 (한글 저장)
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: "commenter", sourceKey: "id" });
  } // 다른 모델과의 관계를 정의
}

module.exports = User; // User 모델을 모듈로 사용
