//module dependencies
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { databaseUrl } = require('../config/config');

/**
 * Method to create connection to mongodb database
 * Returns a promise
 */
function connectDatabase() {
  return mongoose
    .connect(databaseUrl, {
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => logger.info('connected to database'))
    .catch(error => {
      logger.error(error);
      process.exit(1);
    });
}

module.exports = connectDatabase;
