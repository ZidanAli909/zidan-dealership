const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.router;
const passport = require("../configs/strategy-google");

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile']
  })
);
 
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login'
  }),
  function(req, res, next) {
    const token = jwt.sign(
      { id: req.user.id },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );
    res.json( token );
    res.redirect('/');
  }
);

router.post('/auth/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});