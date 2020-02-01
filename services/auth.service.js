const createError = require('http-errors');
const userService = require('./user.service');
const debugInfo = require('debug')('case-study:info');

class AuthService {
  constructor() {}

  async register({ name, email, password }) {
    debugInfo(userService.hashPassword(password));
    throw createError(409, 'Account already exists');
  }
}

module.exports = new AuthService();
