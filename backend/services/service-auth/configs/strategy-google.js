const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  async(accessToken, refreshToken, profile, callback) => {
    let user = await User.findOne({ where: { googleId: profile.id } });
    if (!user) {
      user = await User.create({
        username: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        provider: 'google',
      });
    }
    callback(null, user);
  }
));

passport.serializeUser(function(user, callback) {
  process.nextTick(function() {
    callback(null, {
      id: user.id,
      username: user.username,
      name: user.name 
    });
  });
});

passport.deserializeUser(function(user, callback) {
  process.nextTick(function() {
    return callback(null, user);
  });
});