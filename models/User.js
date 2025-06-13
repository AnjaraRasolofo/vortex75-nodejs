
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Signal = require('../models/Signal');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email_verified_at: {
    type: DataTypes.DATE,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  remember_token: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamp: true,
  createdAt : 'created_at',
  updatedAt: 'updated_at',
  tableName: 'users'
});

User.hasMany(Signal, { as: 'signaux', foreignKey: 'auteur_id' });

User.associate = (models) => {
    User.hasMany(models.Message, { foreignKey: 'senderId' });
    User.hasMany(models.Message, { foreignKey: 'receiverId' });
  };

module.exports = User;