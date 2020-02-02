const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
const debugError = require('debug')('case-study:error');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const dbService = require('./services/db.service');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const passport = require('passport');
const strategy = require('./config/passport-strategy');
passport.use(strategy);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(compression());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  debugError(err);
  res.status(err.status || 500).json(err);
});

module.exports = app;
