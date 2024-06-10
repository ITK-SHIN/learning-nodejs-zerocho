const Sequelize = require("sequelize");

class Comment extends Sequelize.Model {
  // static 메서드로 init 메서드 정의
  static initiate(sequelize) {
    // init 메서드로 모델의 속성 정의
    Comment.init(
      {
        comment: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: Sequelize.NOW,
        },
      },
      // 옵션 설정
      {
        sequelize,
        timestamps: false,
        modelName: "Comment",
        tableName: "comments",
        paranoid: false,
        charset: "utf8mb4", // 이모티콘을 저장하기 위해 utf8mb4로 설정 (한글, 이모티콘 저장)
        collate: "utf8mb4_general_ci", // utf8mb4_general_ci로 설정 (이모티콘 저장)
      }
    );
  }

  // 다른 모델과의 관계를 정의
  static associate(db) {
    // Comment 모델은 User 모델에 속한다.
    // Comment 모델은 User 모델의 id를 외래키로 가진다.
    // Comment 모델은 User 모델의 commenter 속성을 참조한다.
    // Comment 모델은 User 모델의 id 속성을 참조한다.
    db.Comment.belongsTo(db.User, { foreignKey: "commenter", targetKey: "id" });
  }
}

module.exports = Comment; // Comment 모델을 모듈로 사용
