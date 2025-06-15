require('dotenv').config();
const sequelize = require("../configs/database");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;