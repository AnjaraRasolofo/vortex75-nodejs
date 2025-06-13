const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const slugify = require('slugify');

const Post = sequelize.define('posts', {
  title: DataTypes.STRING,
  slug: DataTypes.STRING,
  content: DataTypes.TEXT,
  date_publication: DataTypes.DATE,
  image: DataTypes.STRING,
  status: DataTypes.STRING,
  category_id: DataTypes.INTEGER,
  author_id: DataTypes.INTEGER,
  created_at: DataTypes.DATE
}, {
  tableName: 'posts',
  timestamps: true,
  createdAt: 'created_at',   
  updatedAt: 'updated_at'
});

// Génération auto du slug avant création
Post.beforeCreate((post, options) => {
  if (!post.slug && post.title) {
    post.slug = slugify(post.title, { lower: true, strict: true });
  }
});

module.exports = Post;