require('dotenv').config();
const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

/*
    Inisialisasi Sequelize (sekaligus MySQL)
*/
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "mysql",
  dialectOptions: {
    host: DB_HOST,
    port: DB_PORT,
  },
});
const database = {};
database.sequelize = sequelize;
database.Sequelize = Sequelize;

/*
    Sequelize Models
    -> Tempatkan model-model disini!
*/
database.User = require('../models/user')(sequelize);
// database.User.sync(); // sync() = menyamakan, membuat tabel jika tidak cocok

/*
    Export modul
*/
module.exports = database;

/*
    mysql2 Leftover
    -> Deprecated, sudah menggunakan Sequelize

const mysql = require('mysql2');

module.exports = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
*/