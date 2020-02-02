const createError = require('http-errors');
const userService = require('./user.service');
const jwtService = require('./jwt.service');
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

  async login({ email, password }) {
    function throwInvalidError() {
      throw createError(401, 'Invalid email or password');
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throwInvalidError();
    }

    debugInfo(user);

    const valid = user.hash === userService.hash(password + user.salt);

    if (!valid) {
      throwInvalidError();
    }

    return jwtService.sign({ email: user.email });
  }
}

module.exports = new AuthService();
