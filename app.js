//module dependencies
const express = require('express');
const logger = require('./utils/logger');
const connectDatabase = require('./startup/mongodb');
const { apiPort } = require('./config/config');

const app = express();

app.use(express.json());

connectDatabase().then(() => {
  app.listen(apiPort, () => logger.info(`listening on port ${apiPort}`));
});
