const { db } = require("../config"); // TODO!
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Konfigurasi passport-local
passport.use(new LocalStrategy((username, password, done) => {
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, [username], (err, result) => {
        if (err) return done(err); // Error lain
        // Tidak ditemukan
        if (result.length === 0) return done(null, false, { message: "[GAGAL] User tidak ditemukan!" });
        const user = result[0];
        // Password; TODO: bcrypt
        if (user.password !== password) return done(null, false, { message: "[GAGAL] Password salah!" });
        return done(null, user);
    });
}));

// Serialize user ke session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user dari session
passport.deserializeUser((user, done) => {
  const sql = "SELECT * FROM user WHERE id = ?";
  db.query(sql, [user], (err, result) => {
    if (err) return done(err); // Error lain
    if (result.length === 0) return done(null, false); // Tidak ditemukan
    done(err, result[0]);
  });
});

module.exports = passport;