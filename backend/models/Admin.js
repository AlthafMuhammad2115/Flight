// models/Admin.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const bcrypt = require('bcryptjs');

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Hash password before saving
Admin.beforeCreate(async (admin) => {
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password, salt);
});

module.exports = Admin;
