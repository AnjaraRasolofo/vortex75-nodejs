
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vortex75', 'root', 'Niarovana', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch(error => console.error('Erreur de connexion :', error));

module.exports = sequelize;