const jwt = require('jsonwebtoken');
const JWT_PROPS = require('../config/properties').JWT;

class JwtService {
  sign(payload) {
    const options = {
      expiresIn: 60 * 15 // 15 minutes
    };

    return jwt.sign(payload, JWT_PROPS.SECRET, options);
  }
}

module.exports = new JwtService();
