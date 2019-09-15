//module dependencies
const express = require('express');
const logger = require('./utils/logger');
const { apiPort } = require('./config/config');
const connectDatabase = require('./startup/mongodb');
const { connectToRedis } = require('./startup/redis');
const routes = require('./routes/index');

const app = express();

routes(app);

connectToRedis();

//on successful connection of database start server
connectDatabase().then(() => {
  app.listen(apiPort, () => logger.info(`listening on port ${apiPort}`));
});
