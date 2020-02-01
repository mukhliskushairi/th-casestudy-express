const Sequelize = require('sequelize');
const dbService = require('../services/db.service');

const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    email: {
      type: Sequelize.STRING(192),
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    salt: {
      type: Sequelize.CHAR(172),
      allowNull: false
    },
    hash: {
      type: Sequelize.CHAR(64),
      allowNull: false
    }
  },
  {
    sequelize: dbService,
    modelName: 'user'
  }
);

User.sync();

module.exports = User;
