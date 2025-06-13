const sequelize = require('../config/database');
const User = require('./User');
const Ressource = require('./Ressource');
const Post = require('./Post');
const Category = require('./Category');
const Signal = require('./Signal');

Category.hasMany(Post, { foreignKey: 'category_id' });

User.hasMany(Ressource, { foreignKey: 'author_id', as: 'ressources' });
Ressource.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Ressource.belongsTo(Category, { foreignKey: 'category_id', as: 'category'});

User.hasMany(Post, { foreignKey: 'author_id' });
Post.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Post.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });

Signal.belongsTo(User, { as: 'author', foreignKey: 'author_id' });

module.exports = {
  sequelize,
  User : User,
  Ressource : Ressource,
  Post : Post,
  Category : Category
};
