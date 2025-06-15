const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const jwtUtils = require("../configs/webtoken");

const passport = require("passport");
require("../configs/passport-google");

/*
    Routes
    -> Masukkan routes disini!
*/

// GET Google Login
router.get('/auth/google/login',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// GET Google Callback
router.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/auth/google/login',
    session: false,
  }),
  (req, res, next) => {
    // Generate cookies
    const accessToken = jwtUtils.generateAccessToken(req.user);
    const refreshToken = jwtUtils.generateRefreshToken(req.user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    // Kembali ke laman
    res.redirect('/');
  }
);

// POST Google Logout
// -> TODO: Logout universal
router.post('/auth/google/logout', function(req, res, next) {
  // res.logout merupakan Session-based
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out (client must clear token)' });
  res.redirect('/');
});

/*
    Export routes
*/
module.exports = router;