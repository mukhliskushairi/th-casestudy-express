const express = require('express');
const router = express.Router();
const userService = require('../services/user.service');
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
