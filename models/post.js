const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            content: {
                type: Sequelize.STRING(140),
                allowNull: false
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true
            }
        }, {
            sequelize,
            timestamp: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });
    }

    // Post 모델 관계 정의
    // N(Post) : 1(User) 관계
    // N(Post) : M(Hashtag) 관계
    // PostHashtag 모델 생성
    static associate(db) {
        db.Post.belongsTo(db.User);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    };
}