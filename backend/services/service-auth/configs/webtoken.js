require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION_ACCESS || '15m';

const generateAccessToken = (user) => jwt.sign(
  { id: user.id, email: user.email },
  JWT_SECRET,
  { expiresIn: JWT_EXPIRATION }
);

const generateRefreshToken = (user) => jwt.sign(
  { id: user.id },
  JWT_SECRET,
  { expiresIn: '7d' }
);

/*
    Export modul dan fungsi
*/
module.exports = {
  JWT_SECRET,
  JWT_EXPIRATION,
  generateAccessToken,
  generateRefreshToken,
};