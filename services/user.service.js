const crypto = require('crypto');

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
}

module.exports = new UserService();
