exports.isLogin = (req, res, next) => {
    if(req.isAuthenticated()) {
        console.log('해당 유저는 접근 권한이 있습니다.');
        next();
    } else {
        res.status(403).send('로그인을 해야합니다.');
    }
}

exports.notLogin = (req, res, next) => {
    if(!req.isAuthenticated) {
        console.log('해당 유저는 접근 권한이 없습니다.');
        next();
    } else {
        const message = encodeURIComponent('로그인 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
}