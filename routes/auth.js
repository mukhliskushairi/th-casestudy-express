const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const createError = require('http-errors');

router.post('/register', (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }).required();

  const validation = schema.validate(req.body);

  if (validation.error) {
    next(createError(400, validation.error.details[0].message));
  }
});

module.exports = router;
