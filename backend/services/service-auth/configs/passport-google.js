require('dotenv').config();
const database = require("./database"); // Sequelize + Models
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

/*
    Inisialisasi Strategi Passport
*/
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: [ 'profile', 'email' ],
    },
    async function verify(accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(new Error("Google E-mail not found"), null);
        }
        const [user] = await database.User.findOrCreate({
            where: { email },
            defaults: {
                username: profile.displayName,
                email,
                provider: "google"
            },
        });
        return done(null, user);
      } catch (error) {
        console.error("Google Strategy DB error:", error);
        return done(error, null);
      }
    }
  )
);