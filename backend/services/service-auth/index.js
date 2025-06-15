require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT || 3001;

/*
    Cek Koneksi Database
*/
const database = require('./configs/database');
(async () => {
  try {
    await database.sequelize.authenticate();
    await database.sequelize.sync(); // sync() = menyamakan, membuat tabel jika tidak cocok
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
  }
})();

/*
    Inisialisasi
    -> Urutan mempengaruhi inisialisasi!
*/
// Passport
const passport = require('passport');
app.use(passport.initialize());
// Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

/*
    Routes
*/
app.use(require('./routes/main'));
app.use(require('./routes/auth_google'));
//app.use(require('./routes/auth_local'));

/*
    Port Exposure
*/
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});