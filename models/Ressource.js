
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const slugify = require('slugify');

const Ressource = sequelize.define('ressources', {
  title: DataTypes.STRING,
  slug: DataTypes.STRING,
  content: DataTypes.TEXT,
  date_publication: DataTypes.DATE,
  image: DataTypes.STRING,
  status: DataTypes.STRING,
  author_id: DataTypes.INTEGER,
  created_at: DataTypes.DATE
}, {
  tableName: 'ressources',
  timestamps: true,
  createdAt: 'created_at',  
  updatedAt: 'updated_at'
});

module.exports = Ressource;

