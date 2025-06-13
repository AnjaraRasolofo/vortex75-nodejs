const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Category = sequelize.define('categories', {
  name: DataTypes.STRING,
  slug: DataTypes.STRING,
  description: DataTypes.TEXT,
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'created_at',  
  updatedAt: 'updated_at'
});

module.exports = Category;