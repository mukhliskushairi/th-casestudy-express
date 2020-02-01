const createError = require('http-errors');
const userService = require('./user.service');
const debugInfo = require('debug')('case-study:info');
const User = require('../models/User');

class AuthService {
  constructor() {}

  async register({ name, email, password }) {
    const userData = {
      email,
      name,
      ...userService.hashPassword(password)
    };

    try {
      await User.create(userData);
    } catch (err) {
      throw createError(409, 'Account already exists');
    }
  }
}

module.exports = new AuthService();
