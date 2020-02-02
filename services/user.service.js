const crypto = require('crypto');
const dbService = require('./db.service');
const User = require('../models/User');

class UserService {
  hashPassword(password) {
    const salt = crypto.randomBytes(128).toString('base64');
    const hash = this.hash(password + salt);

    return { salt, hash };
  }

  hash(value) {
    return crypto
      .createHash('sha256')
      .update(value)
      .digest('hex');
  }

  async getAllUsers() {
    const users = await User.findAll({
      attributes: ['name', 'email'],
      order: [['name', 'ASC']]
    });

    return users;
  }
}

module.exports = new UserService();
