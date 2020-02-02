const Sequelize = require('sequelize');
const { DB } = require('../config/properties');

const sequelize = new Sequelize(DB.SCHEMA, DB.USER, DB.PASSWORD, {
  host: DB.HOST,
  port: DB.PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
