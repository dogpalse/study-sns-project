const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('morgan');
const pageRouter = require('./routes/page');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8080);
// 뷰 엔진 설정
// app.set('view engine', 'html');
// app.set('view engine', 'ejs');

// DB 연결


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
})

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}에 연결...!`);
});