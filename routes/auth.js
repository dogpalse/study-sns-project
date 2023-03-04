const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLogin, notLogin } = require('./authMiddleware');
const User = require('./../models/user');

const router = express.Router();

router.post('/join', notLogin, async (req, res, next) => {
  const { email, nick, password } = req.body;

  try {
    const exUser = await User.findOne({ where: { email }});
    if(exUser) {
      return res.redirect('/join?error=exist');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash
    });

    return res.redirect('/');
  } catch(error) {
    console.error(error);

    return next(error);
  }
});

router.post('/login', notLogin, (req, res, next) => {
  // 미들웨어 안에 미들웨어 추가
  // 내부 미들웨어에 (req, res, next) 인수 추가
  // passport.authenticate(login strategy, callback)
  // callback = (error, user, info)
  passport.authenticate('local', (authError, user, info) => {
    if(authError) {
      console.error(authError);
      return next(authError);
    }

    if(!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }

    return req.login(user, loginError => {
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }

      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLogin, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});