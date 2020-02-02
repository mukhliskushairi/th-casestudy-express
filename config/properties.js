const dotenv = require('dotenv');
dotenv.config();

const properties = {
  PORT: process.env.PORT,
  JWT: {
    SECRET: process.env.JWT_SECRET
  },
  DB: {
    SCHEMA: process.env.DB_SCHEMA,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT
  }
};

module.exports = properties;
