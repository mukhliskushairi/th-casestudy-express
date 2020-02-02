const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const authService = require('../services/auth.service');

router.post('/register', async (req, res, next) => {
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
    return;
  }

  try {
    await authService.register(req.body);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().required()
  }).required();

  const validation = schema.validate(req.body);

  if (validation.error) {
    next(createError(400, validation.error.details[0].message));
    return;
  }

  try {
    const token = await authService.login(req.body);
    res.json(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
