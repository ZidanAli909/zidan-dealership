import { DataTypes } from 'sequelize';

const sequelize = require('../configs/database');

const User = sequelize.define('User', {
  id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
  username: {type: DataTypes.STRING, unique: true},
  email: {type: DataTypes.STRING, unique: true},
  password_hash: {type: DataTypes.STRING},
  role: {type: DataTypes.STRING, defaultValue: 'user'},
  provider: {type: DataTypes.STRING, defaultValue: 'local'}
}, { tableName: 'Users' });

module.exports = User;