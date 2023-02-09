const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('morgan');

dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8080);
// 뷰 엔진 설정
// app.set('view engine', 'html');
// app.set('view engine', 'ejs');

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}에 연결...!`);
});