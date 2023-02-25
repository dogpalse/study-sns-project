const express = require('express');
const path = require('path');
const { isLogin, notLogin } = require('./authMiddleware');
const router = express.Router();

router.use((req, res, next) => {
    console.log('router page');
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/', isLogin, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/home.html'));
});

router.get('/join', notLogin, (req, res) => {
    res.sendFile('join');
});

module.exports = router;