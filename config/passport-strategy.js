const { ExtractJwt, Strategy } = require('passport-jwt');
const JWT_PROPS = require('./properties').JWT;
const User = require('../models/User');

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
    secretOrKey: JWT_PROPS.SECRET
  },
  async ({ email }, next) => {
    const user = await User.findOne({
      attributes: ['email'],
      where: { email }
    });

    if (!user) {
      next(null, false);
      return;
    }

    next(null, { email });
  }
);

module.exports = strategy;
