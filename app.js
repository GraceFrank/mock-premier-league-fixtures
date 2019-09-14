//module dependencies
const express = require('express');
const logger = require('./utils/logger');
const connectDatabase = require('./startup/mongodb');
const { connectToRedis } = require('./startup/redis');
const { apiPort } = require('./config/config');

const app = express();

app.use(express.json());

connectToRedis();

//on successful connection of database start server
connectDatabase().then(() => {
  app.listen(apiPort, () => logger.info(`listening on port ${apiPort}`));
});
