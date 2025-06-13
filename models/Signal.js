const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('../models/User');

const Signal = sequelize.define('Signals', {
  date_publication: { type: DataTypes.DATE, allowNull: false },
  type: { type: DataTypes.ENUM('buy', 'sell'), allowNull: false },
  entry: { type: DataTypes.FLOAT, allowNull: false },
  stop_loss: { type: DataTypes.FLOAT, allowNull: false },
  take_profit: { type: DataTypes.FLOAT, allowNull: false },
  result: { type: DataTypes.STRING },
  graphique: { type: DataTypes.STRING }
},{
    timestamp: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'signals'
});

module.exports = Signal;