const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('models/User');

module.exports = () => {
    // 로그인 요청에 실행
    // req.session 객체에 저장할 데이터 설정
    passport.serializeUser((user, done) => {
        // done(error, data)
        // error = 에러 발생 시 실행
        // data = req.session에 저장할 데이터
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findOne({ where: { id }}).then(user => {
            done(null, user);
        }).catch(err => done(err));
    });

    local();
    kakao();
};