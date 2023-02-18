exports.isLoggin = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send('로그인을 해야합니다.');
    }
}

exports.notLoggin = (req, res, next) => {
    if(!req.isAuthenticated) {
        next();
    } else {
        const message = encodeURIComponent('로그인 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
}