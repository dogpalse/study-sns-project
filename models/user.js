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

    // DB 관계
    static associate(db) {}
};