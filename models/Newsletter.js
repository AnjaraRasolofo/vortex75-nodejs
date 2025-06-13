const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Newsletter = sequelize.define('Newsletter', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
   
} , {
    tableName: 'newsletters',
    timestamps: true,
    createdAt: 'created_at',  
    updatedAt: 'updated_at'
    });

module.exports = Newsletter;