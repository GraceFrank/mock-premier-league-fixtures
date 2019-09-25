//Connection to Redis client
const util = require('util');
const redis = require('redis');
const logger = require('../utils/logger');
const config = require('../config/config');

const redisClient = redis.createClient({
  port: config.redisPort, // replace with your port
  host: config.redisHost,
  password: config.redisPassword
});
redisClient.get = util.promisify(redisClient.get);

function connectToRedis() {
  redisClient.on('connect', () => logger.info('connected to redis server'));
  redisClient.on('error', err => {
    logger.error(err);
    process.exit(1);
  });
}

module.exports = { redisClient, connectToRedis };
