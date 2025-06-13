const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: dialect,
  logging: false // désactive les logs SQL dans la console
});

sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie !'))
  .catch(error => console.error('Erreur de connexion :', error));

module.exports = sequelize;