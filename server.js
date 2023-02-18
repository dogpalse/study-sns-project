const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const pageRouter = require('./routes/page');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');

dotenv.config();
passportConfig();

const app = express();
app.set('port', process.env.PORT || 8080);
// 뷰 엔진 설정
// app.set('view engine', 'html');
// app.set('view engine', 'ejs');

// DB 연결
sequelize.sync({ force: false }).then(() => {
    console.log('데이터베이스 연결 성공...!');
}).catch(err => {
    console.error(err);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}));
// passport 미들웨어 등록
// passport.initialize() => req 객체에 passport 설정 등록
// passport.session() => req.session(express-session에 의해 생성되는 객체) 객체에 passport 정보 저장
app.use(passport.initialize());
app.use(passport.session());

// 라우터 연결
app.use('/', pageRouter);
// 404 응답 미들웨어
app.use((req, res, next) => {
    const error = new Error("Happen 404 Error");
    error.status = 404;
    next(error);
});
// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV === 'production' ? err : {};
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'views/error.html'));
});



app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}에 연결...!`);
});