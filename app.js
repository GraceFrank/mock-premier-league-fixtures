//module dependencies
const express = require('express');
const logger = require('./utils/logger');
const connectDatabase = require('./startup/mongodb');
const { connectToRedis } = require('./startup/redis');
const routes = require('./routes/index');
const config = require('./config/config');

const app = express();

//ensure that application secret key is set
if (!config.jwtSecretKey) {
  logger.error(`API Private Key not defined. Exiting process...`);
  process.exit(1);
}

routes(app);

connectToRedis();
const apiPort = config.apiPort || 3000;
//on successful connection of database start server
connectDatabase().then(() => {
  app.listen(apiPort, () => logger.info(`listening on port ${apiPort}`));
});

module.exports = app;
