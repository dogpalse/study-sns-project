const Sequelize = require('sequelize');

// 유저 정보 모델
// 이메일 / 닉네임 / 패스워드 / SNS 로그인(provider / snsId)
module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: true,
                unuque: true
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local'
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            talbeName: 'users',
            paranoid: true,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });
    }

    // 유저 모델 관계
    static associate(db) {
        // Post 모델과 1:N 관계
        db.User.hasMany(db.Post);
        // User 모델 자신(Following)과의 관계 N:M 관계
        db.User.belongsToMany(db.User, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow'
        });
        // User 모델 자신(Follower)과의 관계 N:M 관계
        db.User.belongsToMany(db.User, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        });
    }
};